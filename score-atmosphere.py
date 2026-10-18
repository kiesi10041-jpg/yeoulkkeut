"""Original procedural, evolving location scores. No recorded samples or speech.
Physical foley and received-message static are handled by app.js, not these beds.
"""
from pathlib import Path
import numpy as np, subprocess, wave, json
from scipy.signal import butter,sosfilt
out=Path(__file__).resolve().parent/'assets/audio';sr=24000;seconds=96;t=np.arange(sr*seconds)/sr
profiles={
 'room':(110,[220,261.63,207.65],.007,170),
 'coast':(55,[146.83,164.81,130.81],.030,550),
 'school':(146.83,[440,392,523.25],.008,260),
 'water':(49,[98,110,82.41],.035,750),
 'archive':(65.41,[196,246.94,220],.010,320),
 'dawn':(130.81,[329.63,293.66,261.63],.012,390),
 'threat':(46.25,[92.5,97.99,138.59],.016,200),
 'signal':(82.41,[246.94,233.08,329.63],.004,150)}
report=[]
for i,(name,(base,notes,air,cut)) in enumerate(profiles.items()):
 rng=np.random.default_rng(417080+i);x=np.zeros(len(t));
 # Four passages, including a genuinely sparse passage. No repeating short phrase.
 sections=np.interp(t,[0,6,18,27,38,46,59,69,80,90,96],[0,.6,.9,.18,.12,.65,1,.26,.7,.25,0])
 for j,(at,dur) in enumerate([(0,24),(31,25),(61,30)]):
  u=t-at;m=(u>=0)&(u<dur);v=u[m];env=np.sin(np.pi*v/dur)**2
  f=base*(1 if j!=1 else (1.5 if name=='dawn' else .75))
  x[m]+=.018*env*(np.sin(2*np.pi*f*v+.16*np.sin(v*.6))+.32*np.sin(2*np.pi*f*1.501*v))
 for j,at in enumerate([8.5,24.3,48.7,73.2,86.1]):
  dur=8 if name not in ['school','threat'] else 5;u=t-at;m=(u>=0)&(u<dur);v=u[m];f=notes[j%3]
  env=(1-np.exp(-v/(.22 if name=='school' else 1.1)))*np.exp(-v/2.3)*np.minimum((dur-v)/.8,1)
  x[m]+=.020*env*(np.sin(2*np.pi*f*v)+.15*np.sin(2*np.pi*f*2.013*v))
 wind=sosfilt(butter(2,cut,fs=sr,output='sos'),rng.normal(size=len(t)));wind/=max(np.std(wind),1e-8)
 swell=.35+.45*np.sin(t/(3.8+i*.31))**2
 x+=air*wind*swell
 if name in ['water','coast']:
  high=sosfilt(butter(2,[650,2400],fs=sr,btype='bandpass',output='sos'),rng.normal(size=len(t)));x+=high*.008*(.5+.5*np.sin(t/6))**3
 if name=='threat':x+=.010*np.sin(2*np.pi*37*t)*(np.maximum(0,np.sin(t*1.1))**7)*sections
 x*=sections;fade=np.minimum(np.minimum(t/3,(seconds-t)/4),1).clip(0,1);x*=fade
 # Fixed relative scaling retains differences between quiet interior and rough coast.
 x*=2.0*(1 if name in ['water','coast'] else 2.5);stereo=np.stack([x,np.roll(x,37)*.10+x*.90],axis=1);peak=float(abs(stereo).max());assert peak<.8
 wav=out/(name+'.wav');mp3=out/(name+'.mp3')
 with wave.open(str(wav),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((stereo*32767).astype('<i2').tobytes())
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','96k',str(mp3)],check=True);wav.unlink()
 rms=[float(np.sqrt(np.mean(x[k*sr:(k+6)*sr]**2))) for k in range(0,seconds,6)]
 probe=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-of','json',str(mp3)]));assert float(probe['format']['duration'])>=seconds
 report.append(dict(track=name,seconds=float(probe['format']['duration']),peak=peak,passage_rms=rms,bytes=mp3.stat().st_size))
(Path(__file__).parent/'experience-audio.json').write_text(json.dumps(report,indent=2));print(json.dumps([{'track':r['track'],'seconds':r['seconds'],'bytes':r['bytes'],'rms_range':[min(r['passage_rms']),max(r['passage_rms'])]} for r in report]))
