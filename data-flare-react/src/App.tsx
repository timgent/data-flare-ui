import React from 'react';
import { isPropertySignature } from 'typescript';
import logo from './logo.svg';
import './main.css';
import { Qcs } from './qcs/qcs';
import { QcRunT } from './qcs/qcs_model';
import './qcs/qcs.css';

function App(props: {getLatestQcs: () => QcRunT[], getQcRuns: (checkSuiteDescription: string) => QcRunT[] }) {
  return (
    <>
      <header>
        <img className="icon" src="favicon.ico" />
        <h1 className="page-title">Data-Flare</h1>
      </header>
      <Qcs latestQcs={props.getLatestQcs()} getQcRuns={props.getQcRuns} />
    </>
  );
}

export default App;
