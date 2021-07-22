Create a storage location for e.g.
`/tmp/influxdb`

Run influxdb locally using docker using above location for storage.
docker run -p 8086:8086 -v /tmp/influxdb:/var/lib/influxdb2 influxdb:2.0
