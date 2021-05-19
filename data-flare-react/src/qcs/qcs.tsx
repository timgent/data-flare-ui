import React, {useEffect, useState} from "react";
import {NumberParam, StringParam, useQueryParam} from "use-query-params";
import {CheckResultT, DualDsDescription, QcRunT, SingleDsDescription, Status} from "./qcs_model";

type QcsProps = {
    latestQcs: Promise<QcRunT[]>,
    getQcRuns: (checkSuiteDescription: string | undefined | null) => Promise<QcRunT[]>,
    getCheckResults: (qcId: number | null | undefined) => Promise<CheckResultT[]>
}

const Qcs = (props: QcsProps) => {
    props.latestQcs.then(qcs => setLatestQcs(updateSelectedQc(qcs, paramCheckSuiteDescription)))

    // Query params
    const [paramCheckSuiteDescription, setParamCheckSuiteDescription] = useQueryParam('checkSuiteDescription', StringParam);
    const [paramSelectedQcRunId, setParamSelectedQcRunId] = useQueryParam('qcRunId', NumberParam);
    const [paramCheckResultId, setParamCheckResultId] = useQueryParam('checkResultId', NumberParam);

    // State management
    const [latestQcs, setLatestQcs] = useState<QcRunT[]>([])
    const [qcRuns, setQcRuns] = useState<QcRunT[]>([])
    const [checkResults, setCheckResults] = useState<CheckResultT[]>([])
    const [checkResult, setCheckResult] = useState<CheckResultT | undefined>(undefined)

    // On click handlers
    const onQcClick = (checkSuiteDescription: string) => {
        setParamCheckSuiteDescription(checkSuiteDescription)
        setParamSelectedQcRunId(undefined)
        setParamCheckResultId(undefined)
    }
    const onQcRunClick = (selectedId: number) => {
        setParamSelectedQcRunId(selectedId)
        setParamCheckResultId(undefined)
    }
    const onCheckResultClick = (checkResultId: number) => {
        setParamCheckResultId(checkResultId)
    }
    // Update qcRuns when selected latestQc is changed (paramCheckSuiteDescription)
    useEffect(() => {
        props.getQcRuns(paramCheckSuiteDescription).then(qcRuns => setQcRuns(updateSelectedQcRun(qcRuns, paramSelectedQcRunId)))
        setLatestQcs(updateSelectedQc(latestQcs, paramCheckSuiteDescription))
    }, [paramCheckSuiteDescription])

    // Update qcResults when selected qcRun is changed (paramSelectedQcRunId)
    useEffect(() => {
        const checkResultsPromise = props.getCheckResults(paramSelectedQcRunId)
        checkResultsPromise.then(checkResults => setCheckResults(updatedSelectedCheckResult(checkResults, paramCheckResultId)))
        checkResultsPromise.then(checkResults => setCheckResult(checkResults.find(checkResult => checkResult.isSelected)))
        setQcRuns(updateSelectedQcRun(qcRuns, paramSelectedQcRunId))
    }, [paramSelectedQcRunId])

    // Update when selected check result is updated (paramCheckResultId)
    useEffect(() => {
        const updatedCheckResults = updatedSelectedCheckResult(checkResults, paramCheckResultId)
        setCheckResults(updatedCheckResults)
        setCheckResult(updatedCheckResults.find(checkResult => checkResult.isSelected))
    }, [paramCheckResultId])

    return (
        <>
            <QcTypes latestQcs={latestQcs} onQcClick={onQcClick}/>
            <QcRuns qcRuns={qcRuns} onQcRunClick={onQcRunClick}/>
            <CheckResults checkResults={checkResults} onCheckResultClick={onCheckResultClick}/>
            <CheckDetails checkResult={checkResult}/>
        </>
    )
}

const updatedSelectedCheckResult = (checkResults: CheckResultT[], selectedCheckResultId: number | null | undefined) => {
    checkResults.forEach(checkResult => {
        if (typeof (checkResult.id) === 'number' && checkResult.id === selectedCheckResultId) {
            checkResult.isSelected = true
        } else {
            checkResult.isSelected = false
        }
    })
    return checkResults
}

const updateSelectedQcRun = (latestQcs: QcRunT[], selectedId: number | null | undefined) => {
    latestQcs.forEach(qc => {
        if (typeof (qc.id) === 'number' && qc.id === selectedId) {
            qc.isSelected = true
        } else {
            qc.isSelected = false
        }
    })
    return latestQcs
}

const updateSelectedQc = (latestQcs: QcRunT[], checkSuiteDescription: string | null | undefined): QcRunT[] => {
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
    const selectedClass = props.qc.isSelected ? "selected" : "unselected"
    let statusClass: string
    switch (props.qc.overallStatus) {
        case Status.Success: {
            statusClass = "success";
            break;
        }
        case Status.Error: {
            statusClass = "failure";
            break;
        }
        case Status.Warn: {
            statusClass = "warn";
            break;
        }
    }
    return (
        <div className={`qc ${statusClass} ${selectedClass}`}
             onClick={event => props.onClick(props.qc.checkSuiteDescription)}>
            <span className="status">{props.qc.overallStatus}</span>
            <span className="date">{props.qc.timestamp.toLocaleDateString()}</span>
            <span className="qctype clickable">{props.qc.checkSuiteDescription}</span>
            {props.qc.isSelected &&
            <span className="sel">selected</span>
            }
        </div>
    )
}

function QcTypes(props: { latestQcs: QcRunT[], onQcClick: (checkSuiteDescription: string) => void }) {
    return (
        <div className="qcs">
            {props.latestQcs.map(qc => <Qc qc={qc} onClick={props.onQcClick}/>)}
        </div>
    )
}

function QcRun(props: { qcRun: QcRunT, onClick: (selectedId: number) => void }) {
    // TODO: Factor out the duplication picking class names here
    const qcRun = props.qcRun
    const selectedClass = qcRun.isSelected ? "selected" : "unselected"
    let statusClass: string
    switch (qcRun.overallStatus) {
        case Status.Success: {
            statusClass = "success";
            break;
        }
        case Status.Error: {
            statusClass = "failure";
            break;
        }
        case Status.Warn: {
            statusClass = "warn";
            break;
        }
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
            {props.qcRuns.map(qcRun => <QcRun qcRun={qcRun} onClick={props.onQcRunClick}/>)}
        </div>
    )
}

function CheckResult(props: {
    checkResult: CheckResultT,
    onClick: (checkResultId: number) => void
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
             onClick={event => props.onClick(checkResult.id)}>
            <span className="check">{checkResult.checkDescription.desc} </span>
            {checkMark}
        </div>
    )
}

function CheckResults(props: {
    checkResults: CheckResultT[],
    onCheckResultClick: (checkResultId: number) => void
}) {
    return (
        <div className="checkresults">
            {props.checkResults.map(checkResult => <CheckResult checkResult={checkResult}
                                                                onClick={props.onCheckResultClick}/>)}
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
                    <p>Metric
                        is: {checkResult.checkDescription.dsMetric} for {datasourceDescription.datasource} dataset</p>
                </>
                break;
            }
            case "DualMetricCheckDescription": {
                const datasourceDescription = (checkResult.datasourceDescription as DualDsDescription) // Must be DualDsDescription
                checkDescriptionJsx = <>
                    <h2>{checkResult.checkDescription.desc}</h2>
                    <p>Metric
                        is: {checkResult.checkDescription.dsMetric} for {datasourceDescription.datasourceA} dataset</p>
                    <p>Metric to compare against
                        is: {checkResult.checkDescription.dsToCompareMetric} for {datasourceDescription.datasourceB} dataset</p>
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
        } else {
            <></>
        }
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
