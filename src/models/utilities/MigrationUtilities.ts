import { Knex } from "knex";

import { TABLE_DEFAULTS } from "../libs/dbConstants";

const addDefaultColumns = (table: Knex.CreateTableBuilder) => {
    table.timestamps(true, true, true);
    table.datetime(TABLE_DEFAULTS.COLUMNS.DELETED_AT.KEY);
};

export { addDefaultColumns };
