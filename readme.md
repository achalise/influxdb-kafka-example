/tmp/influxdb

Running influxdb locally using docker.
docker run -p 8086:8086 -v /tmp/influxdb:/var/lib/influxdb2 influxdb:2.0
