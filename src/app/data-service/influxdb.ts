import { Point } from "@influxdata/influxdb-client";
import { writeApi } from "../../env";
import { Metric } from "./dataService";

const writeRecords = async (metrics: Array<Metric>) => {

    let api = writeApi("test_bucket"); 
    const write = async () => {
        let points = [];
        metrics.map(c => {
            let {upload, download, experience} = c;
            let point = new Point("networkpulse")
            .floatField("upload", upload)
            .floatField("download", download)
            .stringField("experience", experience);
            points.push(point);

        });
        api.writePoints(points);
        let res = await api.close();
        console.log(`completed writing to the datbase`, res);
    }

    write().then(() => {
             console.log(`Wrote ${metrics.length} reords into influxdb`);
    }).catch((error) => console.log(`Error when writing to the influx db `, error));
}

export const influxdb = {
    writeRecords
}