import * as path from 'path'
const BASE_PATH = path.join(__dirname)

import config from "../config"

const knexConfig = {
    db: {
        client: 'pg',
        connection: config.database.connection,
        migrations: {
          directory: path.join(BASE_PATH, 'migrations'), 
        },
        seeds: {
         directory: path.join(BASE_PATH, 'seeds'),
        },
        pool: {
          min: 0,
          max: 5,
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://root:root@127.0.0.1:5432/addressbook_dev',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'),
        },
        seeds: {
           directory: path.join(BASE_PATH, 'seeds'),
        },
    },
    staging: {
        client: 'pg',
        connection: 'postgres://root:root@addressbook-postgres:5432/addressbook',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'), 
        },
        seeds: {
           directory: path.join(BASE_PATH, 'seeds'),
        },
    },
    test: {
        client: 'pg',
        connection: 'postgres://root:root@127.0.0.1:5432/addressbook_test',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations'), 
        },
        seeds: {
           directory: path.join(BASE_PATH, 'seeds'),
        },
    }
}

export default knexConfig