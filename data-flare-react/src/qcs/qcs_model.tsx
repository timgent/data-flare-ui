enum Status {
    Error = "Error",
    Warn = "Warn",
    Success = "Success"
}

type CheckSuiteResultT = {
    checkSuiteDescription: string,
    checkResults: CheckResultT[],
    overallStatus: Status,
    timestamp: Date,
    isSelected: boolean,
    id: string
}

type QcRunT = {
    checkSuiteDescription: string,
    overallStatus: Status,
    timestamp: Date,
    isSelected: boolean,
    id: string
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

type MetricDescT = {
    metricName: string
    filterDescription: string | undefined
    complianceDescription: string | undefined
    onColumns: string | undefined
    onColumn: string | undefined
}
type SimpleCheckDescription = { desc: string, type: "SimpleCheckDescription" }
type DualMetricCheckDescription = {
    desc: string, dsMetric: MetricDescT, dsToCompareMetric: MetricDescT, metricComparator: string, type: "DualMetricCheckDescription"
}
type SingleMetricCheckDescription = { desc: string, dsMetric: MetricDescT, type: "SingleMetricCheckDescription" }
type CheckDescriptionT = SimpleCheckDescription | DualMetricCheckDescription | SingleMetricCheckDescription

type QcType = "ArbSingleDsCheck" | "ArbDualDsCheck" | "ArbitraryCheck" | "SingleMetricCheck" | "DualMetricCheck"

type CheckResultT = {
    id: number,
    qcType: QcType,
    status: Status,
    resultDescription: string,
    checkDescription: CheckDescriptionT,
    datasourceDescription: DatasourceDescription,
    errors: string[],
    isSelected: boolean
}

export { Status }
export type {
    QcRunT, CheckResultT, QcType, CheckDescriptionT, SingleMetricCheckDescription, DualMetricCheckDescription,
    SimpleCheckDescription, DatasourceDescription, DualDsDescription, SingleDsDescription, CheckSuiteResultT
}