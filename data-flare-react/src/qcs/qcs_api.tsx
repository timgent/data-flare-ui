import {CheckResultT, CheckSuiteResultT, QcRunT as QcRunT, Status} from "./qcs_model"
import axios from "axios";
import {api_url} from "../conf";

function getLatestQcs(): Promise<QcRunT[]> {
    return axios.get(api_url + "/qcresults/latest").then(promise => {
            return promise.data.map((r: QcRunT) => {
                    r.timestamp = new Date(r.timestamp)
                    return r
                }
            )
        }
    )
}

function getRunsForQc(checkSuiteDescription: string | null | undefined): Promise<QcRunT[]> {
    return axios.get(api_url + "/qcresults?checkSuiteDescription=" + checkSuiteDescription).then(promise => {
        return promise.data.map((r: QcRunT) => {
                r.timestamp = new Date(r.timestamp)
                r.isSelected = false
                return r
            }
        )
    }
)}

function getCheckResults(qcId: string | null | undefined): Promise<CheckResultT[]> {
    return axios.get(api_url + "/qcresult/" + qcId).then(promise => {
        const checkResults: CheckResultT[] = promise.data.checkResults
        for(let i=0; i < checkResults.length; i++){
            checkResults[i].id = i
            if (checkResults[i].errors == null) {
                checkResults[i].errors = []
            }
            checkResults[i].status = Status[checkResults[i].status]
        }
        return promise.data.checkResults
    }
)}

export { getLatestQcs, getRunsForQc, getCheckResults }