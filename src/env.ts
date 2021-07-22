/** InfluxDB v2 URL */
const url = process.env['INFLUX_URL'] || 'http://localhost:8086'
/** InfluxDB authorization token */
const token = process.env['INFLUX_TOKEN'] || 'V2bskbk0sDSKCAHF-hw7fW_Mp--4grt-blSIWar3AOHbeFsx9ktHzg_GyEKhM-7bRzo6E3AD8Q8qnxLGwszRVg=='
/** Organization within InfluxDB  */
const org = process.env['INFLUX_ORG'] || 'org'
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
