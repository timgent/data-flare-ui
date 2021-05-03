import {CheckResultT, QcRunT as QcRunT, Status} from "./qcs_model"
import axios from "axios";

function getLatestQcs(): Promise<QcRunT[]> {
    // TODO: Don't hardcode the API URL!
    return axios.get("http://localhost:8080/qcresults/latest").then(promise => {
            return promise.data.map((r: QcRunT) => {
                    r.timestamp = new Date(r.timestamp)
                    return r
                }
            )
        }
    )
}

// TODO: Implement with real API
function getRunsForQc(checkSuiteDescription: string | null | undefined): Promise<QcRunT[]> {
    return new Promise<QcRunT[]>((resolve, reject) => {
        let qcRuns: QcRunT[] = []
        switch (checkSuiteDescription) {
            case "checkSuiteA": qcRuns = [
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
            case "checkSuiteB":
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
            default:
                qcRuns = []
        }
        resolve(qcRuns)
    })
}

function getCheckResults(qcId: number | null | undefined): CheckResultT[] {
    let checkResults: CheckResultT[]
    switch (qcId) {
        case 1:
            checkResults = [
                {
                    id: 1,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 2,
                    qcType: "ArbSingleDsCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Providers matched expected result",
                    checkDescription: { desc: "Check providers match expected", type: "SimpleCheckDescription" },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 3,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "All values were distinct",
                    checkDescription: {
                        desc: "All provider IDs should be distinct",
                        dsMetric: "Distinctness(provider_id)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 4,
                    qcType: "DualMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Metrics were equal",
                    checkDescription: {
                        desc: "Size of providers dataset should equal number of distinct providers in orders dataset",
                        dsMetric: "Size",
                        dsToCompareMetric: "Distinctness(provider_id)",
                        metricComparator: "Metrics are equal",
                        type: "DualMetricCheckDescription"
                    },
                    datasourceDescription: { datasourceA: "Providers", datasourceB: "Orders", type: "DualDsDescription" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        case 11:
            checkResults = [
                {
                    id: 1,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 2,
                    qcType: "ArbSingleDsCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Providers did not match expected result",
                    checkDescription: { desc: "Check providers match expected", type: "SimpleCheckDescription" },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 3,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Warn,
                    resultDescription: "All values were distinct",
                    checkDescription: {
                        desc: "All provider IDs should be distinct",
                        dsMetric: "Distinctness(provider_id)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        case 111:
            checkResults = [
                {
                    id: 1,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Error,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 2,
                    qcType: "ArbSingleDsCheck",
                    checkStatus: Status.Error,
                    resultDescription: "Providers did not match expected result",
                    checkDescription: { desc: "Check providers match expected", type: "SimpleCheckDescription" },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 3,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Error,
                    resultDescription: "All values were distinct",
                    checkDescription: {
                        desc: "All provider IDs should be distinct",
                        dsMetric: "Distinctness(provider_id)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 4,
                    qcType: "DualMetricCheck",
                    checkStatus: Status.Success,
                    resultDescription: "Metrics were equal",
                    checkDescription: {
                        desc: "Size of providers dataset should equal number of distinct providers in orders dataset",
                        dsMetric: "Size",
                        dsToCompareMetric: "Distinctness(provider_id)",
                        metricComparator: "Metrics are equal",
                        type: "DualMetricCheckDescription"
                    },
                    datasourceDescription: { datasourceA: "Providers", datasourceB: "Orders", type: "DualDsDescription" },
                    errors: [],
                    isSelected: false
                },
                {
                    id: 5,
                    qcType: "DualMetricCheck",
                    checkStatus: Status.Error,
                    resultDescription: "An error occured",
                    checkDescription: {
                        desc: "Size of providers dataset should equal number of distinct providers in orders dataset",
                        dsMetric: "Size",
                        dsToCompareMetric: "Distinctness(provider_id)",
                        metricComparator: "Metrics are equal",
                        type: "DualMetricCheckDescription"
                    },
                    datasourceDescription: { datasourceA: "Providers", datasourceB: "Orders", type: "DualDsDescription" },
                    errors: ["Column provider_id not found in table orders", "Providers table not found"],
                    isSelected: false
                }
            ]
            break;
        case 2:
            checkResults = [
                {
                    id: 1,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Warn,
                    resultDescription: "Max age was 85, which is on the boundary of being acceptable",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        case 3:
            checkResults = [
                {
                    id: 1,
                    qcType: "SingleMetricCheck",
                    checkStatus: Status.Error,
                    resultDescription: "Max age was <85",
                    checkDescription: {
                        desc: "Age should be <85",
                        dsMetric: "Max(age)",
                        type: "SingleMetricCheckDescription"
                    },
                    datasourceDescription: { datasource: "Providers", type: "SingleDsDescription" },
                    errors: [],
                    isSelected: false
                }
            ]
            break;
        default:
            checkResults = []
    }
    return checkResults
}

export { getLatestQcs, getRunsForQc, getCheckResults }