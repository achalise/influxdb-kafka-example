# Why Time Series Database

The kind of data we are collecting as  part of network pulse, for e.g. speed test results and node statuses etc, is different from traditional relational data. We are collecting performance and status metrics over time, which is mostly append only with no updates. 

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
