// Conexión Knex
import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 8080,
    mongoRemote: {
        cliente: 'mongodb',
        cxnStr: process.env.MONGOOSE_CONNECT
    },
    mysql: {
        client: "mysql",
        connection: {
            host: "localhost",
            user: "root",
            password: "",
            database: "coderhouse",
        },
        pool: { min: 0, max: 10 }
    },
    sqlite3: {
        client: "sqlite3",
        connection: {
            filename: "./DB/mydb.sqlite"
        },
        useNullAsDefault: true
    }
}