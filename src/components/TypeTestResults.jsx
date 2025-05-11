import React from 'react';
import './analytics.css';
import TimeVsAccuracyChart from './TimeVsAccuracyChart';


const TypeTestResults = ({
  accuracy,
  raw,
  correct,
  incorrect,
  totalKeystrokes,
  duration,
  wpmHistory,
  typeAccuracyHistory
}) => {
  const wpm = Math.round((totalKeystrokes / 5) / (duration / 60));

  return (
    <div className="type-test-container">
      <div className="primary-stats">
        <div className="stat-group"><div className="stat-number">{wpm}</div><div className="stat-label">WPM</div></div>
        <div className="stat-group"><div className="stat-number">{accuracy.toFixed(1)}%</div><div className="stat-label">Accuracy</div></div>
        <div className="stat-group"><div className="stat-number">{raw.toFixed(1)}</div><div className="stat-label">Raw WPM</div></div>
        <div className="stat-group"><div className="stat-number">{correct + incorrect === 0 ? 0 : Math.round((correct * 100) / (correct + incorrect))}</div><div className="stat-label">Consistency</div></div>
      </div>
      <div className="details-box">
        <div className="details-title">Keystrokes</div>
        <div className="keystrokes">
          <div className="keystroke-row"><div className="keystroke-label">Characters</div><div className="keystroke-value">{totalKeystrokes}</div></div>
          <div className="keystroke-row"><div className="keystroke-label">Correct</div><div className="keystroke-value">{correct}</div></div>
          <div className="keystroke-row"><div className="keystroke-label">Incorrect</div><div className="keystroke-value">{incorrect}</div></div>
        </div>
      </div>
          <TimeVsAccuracyChart 
          typeAccuracyHistory={typeAccuracyHistory}
          />
    </div>

  );
};


export default TypeTestResults;