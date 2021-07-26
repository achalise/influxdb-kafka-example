# Why Time Series Database

 Some kinds of data, for e.g. speed test results and node statuses etc, are different from traditional relational data. Time series data such as these events and metrics (performance and status metrics) are mostly append only with no updates. 

Databases specifically designed to take advantage of the time series nature of the data have better performance. 

Time series databases:
- InfluxDB
- TimescaleDB
- Prometheus
- Graphite
- Apache Druid
...

For the purpose of analysis focused on InfluxDB and TimescaleDB.

# InfluxDB

Query language InfluxQL (sql like) and Flux (completely new)
Data types supported: numeric and strings
Schema free and no secondary index
No transactional support
Partitionaling across timestamp
columnar data storage and compression to save space

# TimescaleDB

Query language SQL.
Data types supported: numerics, strings, booleans, arrays, JSON blobs, geospatial dimensions, currencies, binary data, other complex data types
Schema defined and supports multiple indices
Transaction and Immediate consistency
hybrid row and columnar data storage with compression to save space

# Aggregation examples with InfluxDB and TimescaleDB

InfluxQL to calculate moving average:
```from(bucket: "example-bucket"):
  |> range(start: -12h)
  |> movingAverage(n: 5)
  ```

TimescaleDB SQL to calculate moving avergate:

``` 
SELECT time, AVG(temperature) OVER(ORDER BY time
      ROWS BETWEEN 9 PRECEDING AND CURRENT ROW)
    AS smooth_temp
  FROM conditions
  WHERE location = 'garage' and time > NOW() - INTERVAL '1 day'
  ORDER BY time DESC;
  ```

# Performance 

https://www.timescale.com/compare

For high cardinality, TimescaleDB seems to perform better in order of magnitudes, ingestion rate in millions of records per second compared to close to million records for InfluxDB and query performance  ~7000 times better than InfluxDB for higher cardinality data.


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