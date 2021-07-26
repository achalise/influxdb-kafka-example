# Setup for InfluxDB

Create a storage location for e.g.
`/tmp/influxdb`

Run influxdb locally using docker using above location for storage.
docker run -p 8086:8086 -v /tmp/influxdb:/var/lib/influxdb2 influxdb:2.0

Open influxdb console at `localhost:8086` and create admin user, org = test and bucket = test_bucket. Generate access token 
and update the file `.env` with the new value. In the sample app, user `admin` has been hardcoded, see `env.ts`. Create a file `.env` in the root folder with following entries
```
PG_USER=postgres
PG_PASSWORD=password
PG_DB=network_pulse
INFLUX_TOKEN=the token string
``` 

# Setup for TimescaleDB

Run Postgres timescale db
`docker run -d --name timescaledb -p 5432:5432 -e POSTGRES_PASSWORD=password timescale/timescaledb:latest-pg12`
and to use the client from within the container
`docker exec -it timescaledb psql -U postgres`

Installed `SQLTools` vscode extension with `Postgres` driver to connect to the local instance above.

CREATE TABLE speedtest (
    time        TIMESTAMPTZ       NOT NULL,
    userid      TEXT              NOT NULL,
    experience  TEXT              NOT NULL,
    upload      NUMERIC           NOT NULL,
    download    NUMERIC           NOT NULL
);

And then create hypertable,

SELECT create_hypertable('speedtest', 'time');

# Running the application

Once InfluxDB and TimescaleDB have been running with set up as described above, start the app `npm start`, this will trigger event every second
with random values for speed test result and write them to influx db and timescale db.

# Visualising data in grafana

`docker run -d -p 3000:3000 grafana/grafana`