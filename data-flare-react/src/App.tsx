import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <header>
        <img className="icon" src="favicon.ico" />
        <h1 className="page-title">Data-Flare</h1>
      </header>
      <div className="qcs">
        <div className="qc selected failure">
          <span className="status">Failure</span>
          <span className="date">15/01/2020</span>
          <span className="qctype clickable">Patient Aggregation QC</span>
          <span className="sel">selected</span>
        </div>
        <div className="qc unselected success">
          <span className="status">Success</span>
          <span className="date">15/01/2020</span>
          <span className="qctype clickable">Provider QC</span>
        </div>
        <div className="qc unselected failure">
          <span className="status">Failure</span>
          <span className="date">15/01/2020</span>
          <span className="qctype clickable">Claim QC</span>
        </div>
      </div>
      <div className="qcruns">
        <div className="unselected failure">
          <span className="status">Failure</span>
          <span className="run-date clickable">15/1/2020</span>
        </div>
        <div className="selected failure">
          <span className="status">Failure</span>
          <span className="run-date clickable">8/1/2020</span>
          <span className="sel">selected</span>
        </div>
        <div className="unselected success">
          <span className="status">Success</span>
          <span className="run-date clickable">1/1/2020</span>
        </div>
      </div>
      <div className="checkresults">
        <div className="checkresult success clickable">
          <span className="check">Size within bounds</span>
          <span className="mark">&#x2713;</span>
        </div>
        <div className="checkresult success clickable">
          <span className="check">Matched overall expected</span>
          <span className="mark">&#x2713;</span>
        </div>
        <div className="checkresult failure selected clickable">
          <span className="check">Min age greater than 18 check</span>
          <span className="mark">&#x2717;</span>
        </div>
        <div className="checkresult success clickable">
          <span className="check">Max age check</span>
          <span className="mark">&#x2713;</span>
        </div>
        <div className="checkresult failure clickable">
          <span className="check">Some other check</span>
          <span className="mark">&#x2717;</span>
        </div>
        <div className="checkresult success clickable">
          <span className="check">Yet another check</span>
          <span className="mark">&#x2713;</span>
        </div>
      </div>
      <div className="checkdetails">
        <h2>Minimum age greater than 18 check</h2>
        <p>Status: QC Failed</p>
        <p>Result: Minimum age found was 14, which was less than the threshold of 18</p>
        <p>Datasource: medicare.patients</p>
      </div>
    </>
  );
}

export default App;
