enum Status {
    Error = "Error",
    Warn = "Warn",
    Success = "Success"
}

type QcRunT = {
    checkSuiteDescription: string,
    overallStatus: Status,
    timestamp: Date,
    isSelected: boolean,
    id: number
}

type SingleDsDescription = {
    datasource: string,
    type: "SingleDsDescription"
}

type DualDsDescription = {
    datasourceA: string,
    datasourceB: string,
    type: "DualDsDescription"
}

type DatasourceDescription = SingleDsDescription | DualDsDescription

type SimpleCheckDescription = { desc: string, type: "SimpleCheckDescription" }
type DualMetricCheckDescription = {
    desc: string, dsMetric: string, dsToCompareMetric: string, metricComparator: string, type: "DualMetricCheckDescription"
}
type SingleMetricCheckDescription = { desc: string, dsMetric: string, type: "SingleMetricCheckDescription" }
type CheckDescriptionT = SimpleCheckDescription | DualMetricCheckDescription | SingleMetricCheckDescription

type QcType = "ArbSingleDsCheck" | "ArbDualDsCheck" | "ArbitraryCheck" | "SingleMetricCheck" | "DualMetricCheck"

type CheckResultT = {
    id: number,
    qcType: QcType,
    checkStatus: Status,
    resultDescription: string,
    checkDescription: CheckDescriptionT,
    datasourceDescription: DatasourceDescription,
    errors: string[],
    isSelected: boolean
}

export { Status }
export type {
    QcRunT, CheckResultT, QcType, CheckDescriptionT, SingleMetricCheckDescription, DualMetricCheckDescription,
    SimpleCheckDescription, DatasourceDescription, DualDsDescription, SingleDsDescription
}