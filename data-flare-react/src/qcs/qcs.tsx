import { render } from "@testing-library/react"
import React from "react";
import { QcRunT, Status } from "./qcs_model";

class Qcs extends React.Component<{ latestQcs: QcRunT[], getQcRuns: (checkSuiteDescription: string) => QcRunT[] }, { latestQcs: QcRunT[], qcRuns: QcRunT[] }> {
    constructor(props: { latestQcs: QcRunT[], getQcRuns: (checkSuiteDescription: string) => QcRunT[] }) {
        super(props);
        const latestQcs = props.latestQcs
        this.state = {
            latestQcs: latestQcs,
            qcRuns: []
        }
    }

    render() {
        const onQcClick = (selectedId: number, checkSuiteDescription: string) => {
            const updatedQcs = updateSelectedQc(this.state.latestQcs, selectedId)
            this.setState({ latestQcs: updatedQcs, qcRuns: this.props.getQcRuns(checkSuiteDescription) })
            console.log(this.state.latestQcs)
        }
        return (
            <>
                <QcTypes latestQcs={this.state.latestQcs} onQcClick={onQcClick} />
                <QcRuns qcRuns={this.state.qcRuns} />
                <CheckResults />
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

function QcRun(props: { qcRun: QcRunT }) {
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
        <div className={`${selectedClass} ${statusClass}`}>
            <span className="status">{qcRun.overallStatus}</span>
            <span className="run-date clickable">{qcRun.timestamp.toLocaleDateString()}</span>
        </div>
    )
}

function QcRuns(props: { qcRuns: QcRunT[] }) {
    return (
        <div className="qcruns">
            {props.qcRuns.map(qcRun => <QcRun qcRun={qcRun} />)}
        </div>
    )
}

function CheckResults() {
    return (
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
