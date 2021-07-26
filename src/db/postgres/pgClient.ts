import dotenv from 'dotenv';
import {Pool} from 'pg';
import { Metric } from '../../app/data-service/dataService';

const dotEnvConfig = dotenv.config();

const pguser = process.env.PG_USER || '';
const pgpassword = process.env.PG_PASSWORD || '';
const pgdb = process.env.PG_DB || 'network_pulse';
const pghost = process.env.PG_HOST || 'localhost';


const pool = new Pool({
    user: pguser,
    host: pghost,
    database: pgdb,
    password: pgpassword,
    port: 5432,
  });

 const writeRecords = async (metrics: Metric[]) => {
     // todo find out how to do in a batch
     metrics.map(row => {
        pool.query(`insert into speedtest(time, download, upload, experience) values($1, $2, $3, $4) returning *`, 
        [new Date(), row.download, row.upload, row.experience]).then(r => console.log(r)).catch(e => console.log(`Error: `, e));
     });

 }

 export const pgClient = {
    writeRecords
}