import { render } from "@testing-library/react"
import React, { useState } from "react";
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import { CheckDescriptionT, CheckResultT, DatasourceDescription, SingleDsDescription, DualDsDescription, QcRunT, Status } from "./qcs_model";

type QcsProps = {
    latestQcs: QcRunT[],
    getQcRuns: (checkSuiteDescription: string | undefined | null) => QcRunT[],
    getCheckResults: (qcId: number | null | undefined) => CheckResultT[]
}

type QcsState = {
    latestQcs: QcRunT[],
    qcRuns: QcRunT[],
    checkResults: CheckResultT[],
    checkResult?: CheckResultT
}

const Qcs = (props: QcsProps) => {
    const [paramCheckSuiteDescription, setParamCheckSuiteDescription] = useQueryParam('checkSuiteDescription', StringParam);
    const [paramSelectedQcRunId, setParamSelectedQcRunId] = useQueryParam('qcRunId', NumberParam);
    const [latestQcs, setLatestQcs] = useState(updateSelectedQc(props.latestQcs, paramCheckSuiteDescription))
    const [qcRuns, setQcRuns] = useState<QcRunT[]>(updateSelectedQcRun(props.getQcRuns(paramCheckSuiteDescription), paramSelectedQcRunId))
    const [checkResults, setCheckResults] = useState<CheckResultT[]>(props.getCheckResults(paramSelectedQcRunId))
    const [checkResult, setCheckResult] = useState<CheckResultT>()

    const onQcClick = (checkSuiteDescription: string) => {
        setParamCheckSuiteDescription(checkSuiteDescription)
        setParamSelectedQcRunId(undefined)
        const updatedQcs = updateSelectedQc(latestQcs, checkSuiteDescription)
        setLatestQcs(updatedQcs)
        setQcRuns(props.getQcRuns(checkSuiteDescription))
        setCheckResults([])
        setCheckResult(undefined)
    }
    const onQcRunClick = (selectedId: number) => {
        setParamSelectedQcRunId(selectedId)
        const updatedQcRuns = updateSelectedQcRun(qcRuns, selectedId)
        setCheckResults(props.getCheckResults(selectedId))
        setCheckResult(undefined)
        setQcRuns(updatedQcRuns)
    }
    const onCheckResultClick = (checkDescription: CheckDescriptionT, datasourceDescription: DatasourceDescription) => {
        const updatedCheckResults = updatedSelectedCheckResult(checkResults, checkDescription, datasourceDescription)
        setCheckResults(updatedCheckResults)
        setCheckResult(updatedCheckResults.find(checkResult => checkResult.isSelected))
    }

    return (
        <>
            <QcTypes latestQcs={latestQcs} onQcClick={onQcClick} />
            <QcRuns qcRuns={qcRuns} onQcRunClick={onQcRunClick} />
            <CheckResults checkResults={checkResults} onCheckResultClick={onCheckResultClick} />
            <CheckDetails checkResult={checkResult} />
        </>
    )
}

const updatedSelectedCheckResult = (checkResults: CheckResultT[], checkDescription: CheckDescriptionT,
    datasourceDescription: DatasourceDescription) => {
    checkResults.forEach(checkResult => {
        if (checkResult.checkDescription === checkDescription && checkResult.datasourceDescription === datasourceDescription) {
            checkResult.isSelected = true
        } else {
            checkResult.isSelected = false
        }
    })
    return checkResults
}

const updateSelectedQcRun = (latestQcs: QcRunT[], selectedId: number | null | undefined) => {
    latestQcs.forEach(qc => {
        if (typeof(qc.id) === 'number' && qc.id === selectedId) {
            qc.isSelected = true
        } else {
            qc.isSelected = false
        }
    })
    return latestQcs
}

const updateSelectedQc = (latestQcs: QcRunT[], checkSuiteDescription: string | null | undefined) => {
    latestQcs.forEach(qc => {
        if (qc.checkSuiteDescription === checkSuiteDescription) {
            qc.isSelected = true
        } else {
            qc.isSelected = false
        }
    })
    return latestQcs
}

function Qc(props: { qc: QcRunT, onClick: (checkSuiteDescription: string) => void }) {
    const qc = props.qc
    const selectedClass = qc.isSelected ? "selected" : "unselected"
    let statusClass: string
    switch (qc.overallStatus) {
        case Status.Success: { statusClass = "success"; break; }
        case Status.Error: { statusClass = "failure"; break; }
        case Status.Warn: { statusClass = "warn"; break; }
    }
    return (
        <div className={`qc ${statusClass} ${selectedClass}`} onClick={event => props.onClick(qc.checkSuiteDescription)}>
            <span className="status">{qc.overallStatus}</span>
            <span className="date">{qc.timestamp.toLocaleDateString()}</span>
            <span className="qctype clickable">{qc.checkSuiteDescription}</span>
            { qc.isSelected &&
                <span className="sel">selected</span>
            }
        </div>
    )
}

function QcTypes(props: { latestQcs: QcRunT[], onQcClick: (checkSuiteDescription: string) => void }) {
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

function CheckResult(props: {
    checkResult: CheckResultT,
    onClick: (checkDescription: CheckDescriptionT, datasourceDescription: DatasourceDescription) => void
}) {
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
            checkMark = <span className="mark">&#33;</span>
            break;
        }
    }
    return (
        <div className={`checkresult clickable ${selectedClass} ${statusClass}`}
            onClick={event => props.onClick(checkResult.checkDescription, checkResult.datasourceDescription)}>
            <span className="check">{checkResult.checkDescription.desc} </span>
            {checkMark}
        </div>
    )
}

function CheckResults(props: {
    checkResults: CheckResultT[],
    onCheckResultClick: (checkDescription: CheckDescriptionT, datasourceDescription: DatasourceDescription) => void
}) {
    return (
        <div className="checkresults">
            {props.checkResults.map(checkResult => <CheckResult checkResult={checkResult} onClick={props.onCheckResultClick} />)}
        </div>
    )
}

function CheckDetails(props: { checkResult?: CheckResultT }) {
    const checkResult = props.checkResult

    if (checkResult === undefined) {
        return (
            <div></div>
        )
    } else {
        let checkDescriptionJsx
        switch (checkResult.checkDescription.type) {
            case "SimpleCheckDescription":
                checkDescriptionJsx = <h2>{checkResult.checkDescription.desc}</h2>
                break;
            case "SingleMetricCheckDescription": {
                const datasourceDescription = (checkResult.datasourceDescription as SingleDsDescription) // Must be SingleDsDescription
                checkDescriptionJsx = <>
                    <h2>{checkResult.checkDescription.desc}</h2>
                    <p>Metric is: {checkResult.checkDescription.dsMetric} for {datasourceDescription.datasource} dataset</p>
                </>
                break;
            }
            case "DualMetricCheckDescription": {
                const datasourceDescription = (checkResult.datasourceDescription as DualDsDescription) // Must be DualDsDescription
                checkDescriptionJsx = <>
                    <h2>{checkResult.checkDescription.desc}</h2>
                    <p>Metric is: {checkResult.checkDescription.dsMetric} for {datasourceDescription.datasourceA} dataset</p>
                    <p>Metric to compare against is: {checkResult.checkDescription.dsToCompareMetric} for {datasourceDescription.datasourceB} dataset</p>
                    <p>Metrics were compared with: {checkResult.checkDescription.metricComparator}</p>
                </>
                break;
            }
        }
        let errorsJsx
        if (checkResult.errors.length > 0) {
            const errorsList = checkResult.errors.map(error => <li>{error}</li>)
            errorsJsx = <>
                Errors occured while running this check:
                <ol>
                    {errorsList}
                </ol>
            </>
        } else { <></> }
        return (
            <div className="checkdetails">
                {checkDescriptionJsx}
                <p>Status: {checkResult.checkStatus}</p>
                <p>Result: {checkResult.resultDescription}</p>
                {errorsJsx}
            </div>
        )
    }
}

export {
    Qcs
}
