
function Qcs(props: { latestQcs: LatestQc[] }) {
    let latestQcs = props.latestQcs
    const onQcClick = (selectedId: number) => {
        latestQcs = updateSelectedQc(latestQcs, selectedId)
        console.log(latestQcs)
    }
    return (
        <>
            <QcTypes latestQcs={latestQcs} onQcClick={onQcClick} />
            <QcRuns />
            <CheckResults />
            <CheckDetails />
        </>
    )
}

enum Status {
    Error = "Error",
    Warn = "Warn",
    Success = "Success"
}

type LatestQc = {
    checkSuiteDescription: string,
    overallStatus: Status,
    timestamp: Date,
    isSelected: boolean,
    id: number
}

const updateSelectedQc = (latestQcs: LatestQc[], selectedId: number) => {
    latestQcs.forEach(qc => {
        if (qc.id === selectedId) {
            console.log(`UPDATING SHIZZLE, selected is ${selectedId}`)
            qc.isSelected = true
        } else {
            qc.isSelected = false
        }
    })
    return latestQcs
}

function Qc(props: { qc: LatestQc, onClick: (id: number) => void }) {
    const qc = props.qc
    const selectedClass = qc.isSelected ? "selected" : "unselected"
    let statusClass: string
    switch (qc.overallStatus) {
        case Status.Success: { statusClass = "success"; break; }
        case Status.Error: { statusClass = "failure"; break; }
        case Status.Warn: { statusClass = "warn"; break; }
    }
    return (
        <div className={`qc ${statusClass} ${selectedClass}`} onClick={event => props.onClick(qc.id)}>
            <span className="status">{qc.overallStatus}</span>
            <span className="date">{qc.timestamp.toLocaleDateString()}</span>
            <span className="qctype clickable">{qc.checkSuiteDescription}</span>
            { qc.isSelected &&
                <span className="sel">selected</span>
            }
        </div>
    )
}

function QcTypes(props: { latestQcs: LatestQc[], onQcClick: (id: number) => void }) {
    return (
        <div className="qcs">
            {props.latestQcs.map(qc => <Qc qc={qc} onClick={props.onQcClick} />)}
        </div>
    )
}

function QcRuns() {
    return (
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
    Qcs, Status
}

export type {
    LatestQc
}
