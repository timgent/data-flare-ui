import { render } from "@testing-library/react"
import React from "react";
import { CheckDescriptionT, CheckResultT, QcRunT, Status } from "./qcs_model";

type QcsProps = {
    latestQcs: QcRunT[],
    getQcRuns: (checkSuiteDescription: string) => QcRunT[],
    getCheckResults: (qcId: number) => CheckResultT[]
}

type QcsState = {
    latestQcs: QcRunT[],
    qcRuns: QcRunT[],
    checkResults: CheckResultT[]
}

const selectedCheckSuiteDescription: string = ""

class Qcs extends React.Component<QcsProps, QcsState> {
    constructor(props: QcsProps) {
        super(props);
        const latestQcs = props.latestQcs
        this.state = {
            latestQcs: latestQcs,
            qcRuns: [],
            checkResults: []
        }
    }

    setStateAndStorage(newState: Pick<QcsState, keyof QcsState>) {
        localStorage.setItem
        this.setState(newState)
    }

    render() {
        const onQcClick = (selectedId: number, checkSuiteDescription: string) => {
            const updatedQcs = updateSelectedQc(this.state.latestQcs, selectedId)
            this.setState({
                latestQcs: updatedQcs, 
                qcRuns: this.props.getQcRuns(checkSuiteDescription),
                checkResults: []
            })
        }
        const onQcRunClick = (selectedId: number) => {
            const updatedQcRuns = updateSelectedQc(this.state.qcRuns, selectedId)
            this.setState({
                checkResults: this.props.getCheckResults(selectedId),
                qcRuns: updatedQcRuns
            })
        }
        return (
            <>
                <QcTypes latestQcs={this.state.latestQcs} onQcClick={onQcClick} />
                <QcRuns qcRuns={this.state.qcRuns} onQcRunClick={onQcRunClick} />
                <CheckResults checkResults={this.state.checkResults} />
                <CheckDetails />
            </>
        )
    }
}

const updateSelectedQc = (latestQcs: QcRunT[], selectedId: number) => {
    latestQcs.forEach(qc => {
        if (qc.id === selectedId) {
            qc.isSelected = true
        } else {
            qc.isSelected = false
        }
    })
    return latestQcs
}

function Qc(props: { qc: QcRunT, onClick: (id: number, checkSuiteDescription: string) => void }) {
    const qc = props.qc
    const selectedClass = qc.isSelected ? "selected" : "unselected"
    let statusClass: string
    switch (qc.overallStatus) {
        case Status.Success: { statusClass = "success"; break; }
        case Status.Error: { statusClass = "failure"; break; }
        case Status.Warn: { statusClass = "warn"; break; }
    }
    return (
        <div className={`qc ${statusClass} ${selectedClass}`} onClick={event => props.onClick(qc.id, qc.checkSuiteDescription)}>
            <span className="status">{qc.overallStatus}</span>
            <span className="date">{qc.timestamp.toLocaleDateString()}</span>
            <span className="qctype clickable">{qc.checkSuiteDescription}</span>
            { qc.isSelected &&
                <span className="sel">selected</span>
            }
        </div>
    )
}

function QcTypes(props: { latestQcs: QcRunT[], onQcClick: (id: number, checkSuiteDescription: string) => void }) {
    return (
        <div className="qcs">
            {props.latestQcs.map(qc => <Qc qc={qc} onClick={props.onQcClick} />)}
        </div>
    )
}

function QcRun(props: { qcRun: QcRunT, onClick: (selectedId: number) => void }) {
    // TODO: Factor out the duplication picking class names here
    const qcRun = props.qcRun
    const selectedClass = qcRun.isSelected ? "selected" : "unselected"
    let statusClass: string
    switch (qcRun.overallStatus) {
        case Status.Success: { statusClass = "success"; break; }
        case Status.Error: { statusClass = "failure"; break; }
        case Status.Warn: { statusClass = "warn"; break; }
    }
    return (
        <div className={`${selectedClass} ${statusClass}`} onClick={event => props.onClick(qcRun.id)}>
            <span className="status">{qcRun.overallStatus}</span>
            <span className="run-date clickable">{qcRun.timestamp.toLocaleDateString()}</span>
        </div>
    )
}

function QcRuns(props: { qcRuns: QcRunT[], onQcRunClick: (selectedId: number) => void }) {
    return (
        <div className="qcruns">
            {props.qcRuns.map(qcRun => <QcRun qcRun={qcRun} onClick={props.onQcRunClick} />)}
        </div>
    )
}

// TODO: Use when doing detailed check result box or remove
// function CheckDescription(props: { checkDescription: CheckDescriptionT }) {
//     switch (props.checkDescription.tag) {
//         case "SimpleCheckDescription":
//             <{props.checkDescription.desc}/>
//             break;
//         case "DualMetricCheckDescription":
//             ""
//             break;
//         case "SingleMetricCheckDescription":
//             ""
//             break;
//     }
// }

function CheckResult(props: { checkResult: CheckResultT }) {
    const checkResult = props.checkResult
    // TODO: Factor out the duplication picking class names here
    const selectedClass = checkResult.isSelected ? "selected" : "unselected"
    let statusClass: string
    let checkMark
    switch (checkResult.checkStatus) {
        case Status.Success: {
            statusClass = "success"
            checkMark = <span className="mark">&#x2713;</span>
            break;
        }
        case Status.Error: {
            statusClass = "failure";
            checkMark = <span className="mark">&#x2717;</span>
            break;
        }
        case Status.Warn: {
            statusClass = "warn"
            checkMark = <span className="mark">&excl;</span>
            break;
        }
    }
    return (
        <div className={`checkresult clickable ${selectedClass} ${statusClass}`}>
            <span className="check">{checkResult.checkDescription.desc} </span>
            {checkMark}
        </div>
    )
}

function CheckResults(props: { checkResults: CheckResultT[] }) {
    return (
        <div className="checkresults">
            {props.checkResults.map(checkResult => <CheckResult checkResult={checkResult} />)}
        </div>
    )
}

function CheckDetails() {
    return (
        <div className="checkdetails">
            <h2>Minimum age greater than 18 check</h2>
            <p>Status: QC Failed</p>
            <p>Result: Minimum age found was 14, which was less than the threshold of 18</p>
            <p>Datasource: medicare.patients</p>
        </div>
    )
}

export {
    Qcs
}
