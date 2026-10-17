"""Original procedural scene score. No samples or recorded speech."""
from pathlib import Path
import numpy as np, wave, subprocess, json
p=Path(__file__).resolve().parent/'assets/audio';sr=24000;duration=72;t=np.arange(sr*duration)/sr;rng=np.random.default_rng(41707)
configs={'school':([146.83,220],[0,17,39,57],[440,523.25,392,440]),'water':([49,73.416],[7,29,48,64],[98,110,82.407,98]),'archive':([65.406,98],[3,22,42,61],[261.626,246.942,196,220]),'dawn':([130.813,196,261.626],[1,15,32,49,62],[329.628,293.665,261.626,293.665,329.628])}
report=[]
for name,(drone,times,notes) in configs.items():
 slow=np.interp(t,np.arange(0,duration+.1,.1),rng.normal(0,1,int(duration/.1)+1));slow/=max(abs(slow));x=np.zeros_like(t)
 for i,f in enumerate(drone):x+=.025*np.sin(2*np.pi*f*t+.13*i)*(.65+.25*np.sin(2*np.pi*t/(19+i*7)))
 if name=='water':x+=.06*slow*(.45+.45*np.sin(2*np.pi*t/11));x+=.02*np.sin(2*np.pi*36.7*t)*(np.sin(2*np.pi*t/8)**4)
 if name=='archive':x+=.009*rng.normal(0,1,len(t))+.015*slow
 if name=='school':x+=.018*slow
 if name=='dawn':x+=.009*slow
 for at,f in zip(times,notes):
  u=t-at;mask=(u>=0)&(u<9);v=u[mask];env=(1-np.exp(-v/(.15 if name=='school' else 1.5)))*np.exp(-v/(3.1 if name=='school' else 3.8));tone=np.sin(2*np.pi*f*v)+.16*np.sin(2*np.pi*f*2.003*v)
  if name=='archive':env=(1-np.exp(-(9-v)/.5))*np.exp(-(9-v)/3.5)
  x[mask]+=.05*env*tone
 fade=np.minimum(np.minimum(t/2.5,(duration-t)/3.5),1).clip(0,1);x*=fade;peak=float(max(abs(x)));x*=.30/max(peak,.00001)
 stereo=np.stack([x,x*.96+np.roll(x,17)*.04],axis=1);raw=(stereo.clip(-1,1)*32767).astype('<i2');wav=p/(name+'.wav')
 with wave.open(str(wav),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes(raw.tobytes())
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','96k',str(p/(name+'.mp3'))],check=True);wav.unlink();report.append({'track':name,'seconds':duration,'peak_before_encode':float(max(abs(stereo.ravel()))),'bytes':(p/(name+'.mp3')).stat().st_size})
(p.parent.parent/'experience-audio.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
