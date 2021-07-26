import { InfluxDB } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';
const dotEnvConfig = dotenv.config();

/** InfluxDB v2 URL */
const url = process.env['INFLUX_URL'] || 'http://localhost:8086'
/** InfluxDB authorization token */
const token = process.env['INFLUX_TOKEN']
/** Organization within InfluxDB  */
const org = process.env['INFLUX_ORG'] || 'test'
/**InfluxDB bucket used in examples  */
const bucket = 'test'
// ONLY onboarding example
/**InfluxDB user  */
const username = 'admin'
/**InfluxDB password  */
const password = 'admin1234'

export default {
  url,
  token,
  org,
  bucket,
  username,
  password,
}

const influxDB = new InfluxDB({url, token});
export const writeApi = (bucket) => influxDB.getWriteApi(org, bucket);


export const PS_ENABLED = true;
export const INFLUXDB_ENABLED = true;