import { LatestQc, Status } from "./qcs"

// TODO: Implement with real API
function getLatestQcs(): LatestQc[] {
    return [
        {
            checkSuiteDescription: "Provider QCs",
            overallStatus: Status.Success,
            timestamp: new Date("2021-03-05"),
            isSelected: true,
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

export { getLatestQcs }