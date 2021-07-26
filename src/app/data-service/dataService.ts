import { pgClient } from "../../db/postgres/pgClient";
import { INFLUXDB_ENABLED, PS_ENABLED } from "../../env";
import { influxdb } from "./influxdb";


const storeDataPoints = async (metrics: Array<Metric>) => {
    if (PS_ENABLED) {
        storeInPostGress(metrics);
    }
    if (INFLUXDB_ENABLED) {
        console.log(`storing metrics into influx db`);
        storeInInfluxDb(metrics);
    }
}

export interface Metric {
    timestamp?: number;
    upload: number;
    download: number;
    experience: string;
}

function storeInPostGress(metrics: Metric[]) {
    pgClient.writeRecords(metrics);
}
function storeInInfluxDb(metrics: Metric[]) {
    influxdb.writeRecords(metrics);
}

export const dataService = {
    storeDataPoints
};
