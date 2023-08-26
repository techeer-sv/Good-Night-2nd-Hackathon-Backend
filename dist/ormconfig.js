"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const movie_entity_1 = require("./src/movies/entities/movie.entity");
function ormConfig() {
    const commonConf = {
        SYNCRONIZE: true,
        ENTITIES: [movie_entity_1.Movie],
        MIGRATIONS: [__dirname + "/migrations/**/*{.ts,.js}"],
        MIGRATIONS_RUN: false,
    };
    return {
        name: "hackerton",
        type: "mysql",
        database: "nest",
        host: "localhost",
        port: Number(3307),
        username: "root",
        password: "1234",
        logging: true,
        synchronize: commonConf.SYNCRONIZE,
        entities: commonConf.ENTITIES,
        migrations: commonConf.MIGRATIONS,
        migrationsRun: commonConf.MIGRATIONS_RUN,
    };
}
exports.ormConfig = ormConfig;
//# sourceMappingURL=ormconfig.js.map