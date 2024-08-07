import type { Knex } from "knex";
import { PUBLIC_SCHEMA, DB_TABLE } from "../libs/dbConstants";
import { addDefaultColumns } from "../utilities/MigrationUtilities";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.withSchema(PUBLIC_SCHEMA)
        .createTable(DB_TABLE.CONTACT.TABLE_NAME, function (table) {
            table.increments(DB_TABLE.CONTACT.COLUMNS.ID.KEY);
            table.string(DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY);
            table.string(DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY);

            table.integer(DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY);
            table.foreign(DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY)
                .references(`${DB_TABLE.CONTACT.TABLE_NAME}.${DB_TABLE.CONTACT.COLUMNS.ID.KEY}`);

            table.enum(DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY, DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS).notNullable();

            addDefaultColumns(table);
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.withSchema(PUBLIC_SCHEMA)
        // .dropTableIfExists(DB_TABLE.CONTACT.TABLE_NAME);
    .renameTable(DB_TABLE.CONTACT.TABLE_NAME, `old_${Math.floor(Date.now() / 1000)}_${DB_TABLE.CONTACT.TABLE_NAME}`);
}
