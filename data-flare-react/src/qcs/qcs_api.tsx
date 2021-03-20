import { CheckResultT, QcRunT as QcRunT, Status } from "./qcs_model"

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
                id: 11
            },
            {
                checkSuiteDescription: "Provider QCs",
                overallStatus: Status.Error,
                timestamp: new Date("2021-01-05"),
                isSelected: false,
                id: 111
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

function getCheckResults(qcId: number): CheckResultT[] {
    let checkResults: CheckResultT[]
    switch (qcId) {
        case 1:
            checkResults = [
                {
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)"
                    },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                },
                {
                    qcType: "ArbSingleDsCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Providers matched expected result",
                    checkDescription: { desc: "Check providers match expected" },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                },
                {
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "All values were distinct",
                    checkDescription: {
                        desc: "All provider IDs should be distinct",
                        dsMetric: "Distinctness(provider_id)"
                    },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        case 11:
            checkResults = [
                {
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)"
                    },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                },
                {
                    qcType: "ArbSingleDsCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Providers did not match expected result",
                    checkDescription: { desc: "Check providers match expected" },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                },
                {
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Warn,
                    resultDescription: "All values were distinct",
                    checkDescription: {
                        desc: "All provider IDs should be distinct",
                        dsMetric: "Distinctness(provider_id)"
                    },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        case 111:
            checkResults = [
                {
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Error,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)"
                    },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                },
                {
                    qcType: "ArbSingleDsCheck",
                    checkStatus: Status.Error,
                    resultDescription: "Providers did not match expected result",
                    checkDescription: { desc: "Check providers match expected" },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                },
                {
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Error,
                    resultDescription: "All values were distinct",
                    checkDescription: {
                        desc: "All provider IDs should be distinct",
                        dsMetric: "Distinctness(provider_id)"
                    },
                    datasourceDescription: { datasource: "Providers" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        case 2:
            checkResults = []
            break;
        case 3:
            checkResults = []
            break;
        default:
            checkResults = []
    }
    return checkResults
}

export { getLatestQcs, getRunsForQc, getCheckResults }