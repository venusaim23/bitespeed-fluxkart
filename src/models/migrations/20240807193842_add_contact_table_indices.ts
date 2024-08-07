import type { Knex } from "knex";
import { DB_TABLE, PUBLIC_SCHEMA } from "../libs/dbConstants";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.withSchema(PUBLIC_SCHEMA)
        .alterTable(DB_TABLE.CONTACT.TABLE_NAME, function (table) {
            table.index(DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY);
            table.index(DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY);
            table.index(DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY);

            table.unique([
                DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY,
                DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY,
                DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY
            ]);
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema(PUBLIC_SCHEMA)
        .alterTable(DB_TABLE.CONTACT.TABLE_NAME, function (table) {
            table.dropIndex(DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY);
            table.dropIndex(DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY);
            table.dropIndex(DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY);

            table.dropIndex([
                DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY,
                DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY,
                DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY
            ]);
        });
}

