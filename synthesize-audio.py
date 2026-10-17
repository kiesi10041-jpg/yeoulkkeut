import numpy as np, subprocess, wave
from pathlib import Path
r=Path(__file__).resolve().parent;a=r/'assets/audio';a.mkdir(exist_ok=True)
sr=24000;duration=32;t=np.arange(sr*duration)/sr;rng=np.random.default_rng(417)
# Authored procedural cues, no sampled recordings or voices.
for name in ['room','coast','signal','threat']:
 noise=rng.normal(0,1,len(t));smooth=np.convolve(noise,np.ones(300)/300,mode='same');smooth/=max(abs(smooth));x=np.zeros_like(t)
 if name=='room':
  x=.025*smooth+.018*np.sin(2*np.pi*55*t)*(.65+.3*np.sin(2*np.pi*t/16))
  notes=[(1,220),(10,261.63),(19,196),(26,174.61)]
 elif name=='coast':
  x=.065*smooth*(.5+.5*np.sin(2*np.pi*t/8))+.009*np.sin(2*np.pi*73.416*t)
  notes=[(3,293.66),(13,220),(24,261.63)]
 elif name=='signal':
  x=.018*smooth+.014*np.sin(2*np.pi*110*t)+.009*np.sin(2*np.pi*111*t)
  notes=[(2,329.63),(9,311.13),(18,220),(27,207.65)]
 else:
  x=.032*smooth+.025*np.sin(2*np.pi*46.25*t)*(.5+.5*np.sin(2*np.pi*t/4))
  notes=[(2,138.59),(11,146.83),(20,138.59),(27,130.81)]
 for start,f in notes:
  dt=t-start;valid=(dt>=0)&(dt<5);env=np.zeros_like(t);env[valid]=(1-np.exp(-dt[valid]*5))*np.exp(-dt[valid]/1.6)
  x+=.035*env*(np.sin(2*np.pi*f*dt)+.2*np.sin(2*np.pi*f*2.006*dt))
 fade=np.minimum(1,np.minimum(t/1.5,(duration-t)/1.5));x*=fade
 stereo=6*np.stack([x,np.roll(x,120)],axis=1);stereo=np.clip(stereo,-.7,.7)
 wav=Path('/tmp')/(name+'600.wav')
 with wave.open(str(wav),'wb') as out:out.setnchannels(2);out.setsampwidth(2);out.setframerate(sr);out.writeframes((stereo*32767).astype('<i2').tobytes())
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(wav),'-codec:a','libmp3lame','-b:a','80k',str(a/(name+'.mp3'))],check=True)
 print(name,'peak',round(float(abs(stereo).max()),4))
