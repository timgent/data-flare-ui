import { QcRunT as QcRunT, Status } from "./qcs_model"

// TODO: Implement with real API
function getLatestQcs(): QcRunT[] {
    return [
        {
            checkSuiteDescription: "Provider QCs",
            overallStatus: Status.Success,
            timestamp: new Date("2021-03-05"),
            isSelected: false,
            id: 1
        },
        {
            checkSuiteDescription: "Patient QCs",
            overallStatus: Status.Error,
            timestamp: new Date("2021-03-01"),
            isSelected: false,
            id: 2
        },
        {
            checkSuiteDescription: "Disease QC",
            overallStatus: Status.Warn,
            timestamp: new Date("2021-02-20"),
            isSelected: false,
            id: 3
        },
    ];
}

function getRunsForQc(checkSuiteDescription: string): QcRunT[] {
    let qcRuns: QcRunT[] = []
    switch (checkSuiteDescription) {
        case "Provider QCs": qcRuns = [
            {
                checkSuiteDescription: "Provider QCs",
                overallStatus: Status.Success,
                timestamp: new Date("2021-03-05"),
                isSelected: false,
                id: 1
            },
            {
                checkSuiteDescription: "Provider QCs",
                overallStatus: Status.Warn,
                timestamp: new Date("2021-02-05"),
                isSelected: false,
                id: 1
            },
            {
                checkSuiteDescription: "Provider QCs",
                overallStatus: Status.Error,
                timestamp: new Date("2021-01-05"),
                isSelected: false,
                id: 1
            }
        ]
            break;
        case "Patient QCs":
            qcRuns = [{
                checkSuiteDescription: "Patient QCs",
                overallStatus: Status.Error,
                timestamp: new Date("2021-03-01"),
                isSelected: false,
                id: 2
            }]
            break;
        case "Disease QC":
            qcRuns = [{
                checkSuiteDescription: "Disease QC",
                overallStatus: Status.Warn,
                timestamp: new Date("2021-02-20"),
                isSelected: false,
                id: 3
            }]
            break;
    }
    return qcRuns;
}

export { getLatestQcs, getRunsForQc }