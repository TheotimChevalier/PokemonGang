import { QueryOptions, createConnection } from 'mysql';
import { database, user, host, password } from '../../config.json';
import { promisify } from 'util';

const pool = createConnection({
  host,
  user,
  password,
  database
});

export const db = {
  query: promisify(pool.query).bind(pool) as (arg1: string| QueryOptions, arg2?:(string | number | null | (string | number)[])[]) => Promise<unknown>,
};