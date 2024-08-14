import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stopwatch.css'
import stopwatch from '../assests/stopwatch.png'

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const lapStopwatch = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = (`0${(time % 1000) / 10}`).slice(-2);
    const seconds = (`0${Math.floor((time / 1000) % 60)}`).slice(-2);
    const minutes = (`0${Math.floor((time / 60000) % 60)}`).slice(-2);
    const hours = (`0${Math.floor(time / 3600000)}`).slice(-2);
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">
        <h3>
          <img
            src={stopwatch}
            alt="Stopwatch Icon"
            style={{ width: '30px', marginRight: '10px' }}
          />
          Stopwatch
        </h3>
        </div>
        <div className="card-body">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              height: '100px',
              fontFamily: 'monospace',
              fontSize: '2.5rem',
              letterSpacing: '0.1rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '300px',
              margin: '0 auto'
            }}
          >
            {formatTime(time)}
          </div>
          <div className="btn-group mt-3">
            <button
              onClick={startStopwatch}
              className="btn btn-success btn-lg mx-2"
              disabled={isRunning}
            >
              Start
            </button>
            <button
              onClick={stopStopwatch}
              className="btn btn-danger btn-lg mx-2"
              disabled={!isRunning}
            >
              Stop
            </button>
            <button
              onClick={lapStopwatch}
              className="btn btn-warning btn-lg mx-2"
              disabled={!isRunning}
            >
              Lap
            </button>
            <button
              onClick={resetStopwatch}
              className="btn btn-secondary btn-lg mx-2"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="card-footer text-muted">
          <h4>Laps</h4>
          <ul className="list-group list-group-flush">
            {laps.map((lap, index) => (
              <li key={index} className="list-group-item">
                Lap {index + 1}: {formatTime(lap)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
