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

export { Status }
export type { QcRunT }