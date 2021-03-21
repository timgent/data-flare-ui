import React from 'react';
import { isPropertySignature } from 'typescript';
import logo from './logo.svg';
import './main.css';
import { Qcs } from './qcs/qcs';
import { CheckResultT, QcRunT } from './qcs/qcs_model';
import './qcs/qcs.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';

function DataFlareHeader() {
  return (<header>
    <img className="icon" src="favicon.ico" />
    <h1 className="page-title">Data-Flare</h1>
  </header>)
}

{/* <Qcs latestQcs={props.getLatestQcs()} getQcRuns={props.getQcRuns} getCheckResults={props.getCheckResults} /> */ }

function App(props: {
  getLatestQcs: () => QcRunT[],
  getQcRuns: (checkSuiteDescription: string | null | undefined) => QcRunT[],
  getCheckResults: (qcId: number | null | undefined) => CheckResultT[]
}) {
  return (
    <Router>
      <DataFlareHeader />
      <Switch>
        <Route path="/qcresults">
          <QueryParamProvider ReactRouterRoute={Route}>
            <Qcs latestQcs={props.getLatestQcs()} getQcRuns={props.getQcRuns} getCheckResults={props.getCheckResults} />
          </QueryParamProvider>
        </Route>
        <Route path="/">
          <Redirect to="/qcresults" />
        </Route>
      </Switch>
    </Router>
  );
}



export default App;
