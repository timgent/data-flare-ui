import React from 'react';
import { isPropertySignature } from 'typescript';
import logo from './logo.svg';
import './main.css';
import { LatestQc, Qcs } from './qcs/qcs';
import './qcs/qcs.css';

function App(props: {getLatestQcs: () => LatestQc[] }) {
  return (
    <>
      <header>
        <img className="icon" src="favicon.ico" />
        <h1 className="page-title">Data-Flare</h1>
      </header>
      <Qcs latestQcs={props.getLatestQcs()} />
    </>
  );
}

export default App;
