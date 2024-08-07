import knex, { Knex } from "knex";
import knexFileObject from "../../../knexfile";

const environment: "development" | "production" = process.env.NODE_ENV as "development" | "production" || "development";

class Db {
    private readonly queryBuilder: Knex;

    constructor() {
        this.queryBuilder = this._initQueryBuilder();
    }

    private _initQueryBuilder(): Knex {
        return knex(knexFileObject[environment]);
    }

    public getQueryBuilder(): Knex {
        return this.queryBuilder;
    }
}

export default new Db();
