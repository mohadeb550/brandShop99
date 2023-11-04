
import { useContext, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { AuthContext } from '../AuthProvider/AuthProvider';

function Timer() {

  const { darkMode } = useContext(AuthContext); 

    const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  const {
    seconds,
    minutes,
    hours,
    days,
    restart,
  } = useTimer({ time, onExpire: () => console.warn('onExpire called') });

  const autoStart = () => {
    // Restarts to 5 minutes timer
    const time = new Date();
    time.setSeconds(time.getSeconds() + 240000);
    restart(time)
  }
 useEffect(()=>{
    autoStart();
 },[])


  return (

      <div className="grid grid-flow-col gap-3 text-center auto-cols-max">
  <div className={`flex flex-col p-2 border text-black/80 ${darkMode && 'text-slate-400 border-slate-500'}`}>
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":days}}></span>
    </span>
    <small>Days</small>
  </div> 
  <div className={`flex flex-col p-2 border text-black/80 ${darkMode && 'text-slate-400 border-slate-500'}`}>
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":hours}}></span>
    </span>
    <small>Hours</small>
  </div> 
  <div className={`flex flex-col p-2 border text-black/80 ${darkMode && 'text-slate-400 border-slate-500'}`}>
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":minutes}}></span>
    </span>
    <small>Minutes</small>
  </div> 
  <div className={`flex flex-col p-2 border text-black/80 ${darkMode && 'text-slate-400 border-slate-500'}`}>
    <span className="countdown font-mono text-2xl">
      <span style={{"--value":seconds}}></span>
    </span>
    <small>Seconds</small>
  </div>
</div>

  );
}

export default Timer;