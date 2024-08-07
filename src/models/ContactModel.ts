import BaseModel from "./libs/BaseModel";
import { DB_TABLE } from "./libs/dbConstants";
import { GeneralObject, LinkPrecedenceType } from "../globalconstants/interfaces";

class ContactModel extends BaseModel {
    constructor() {
        super();
    }

    createNewContact(linkPrecedence: LinkPrecedenceType, email?: string, phoneNumber?: string, linkedId?: number) {
        return this.queryBuilder
            .insert(
                this.getDefinedObject({
                    [DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]: email,
                    [DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]: phoneNumber,
                    [DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY]: linkedId,
                    [DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY]: linkPrecedence
                }),
                [DB_TABLE.CONTACT.COLUMNS.ID.KEY]
            )
            .table(DB_TABLE.CONTACT.TABLE_NAME);
    }

    getContactById(id: number) {
        return this.queryBuilder
            .select("*")
            .table(DB_TABLE.CONTACT.TABLE_NAME)
            .whereNull(DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
            .where(DB_TABLE.CONTACT.COLUMNS.ID.KEY, id);
    }

    getContactsByEmailOrPhoneNumber(email?: string, phoneNumber?: string) {
        const queryBuilder = this.queryBuilder;

        const primaryContactsQuery = queryBuilder
            .select("*")
            .table(DB_TABLE.CONTACT.TABLE_NAME)
            .whereNull(DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
            .andWhere(builder => {
                if (email) {
                    builder.orWhere(DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY, email);
                }
                if (phoneNumber) {
                    builder.orWhere(DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY, phoneNumber);
                }
            });

        const secondaryContactsQuery = queryBuilder
            .select("*")
            .table(DB_TABLE.CONTACT.TABLE_NAME)
            .whereNull(DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
            .andWhere(DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY, "IN", (subqueryBuilder: any) => {
                subqueryBuilder.select(DB_TABLE.CONTACT.COLUMNS.ID.KEY)
                    .table(DB_TABLE.CONTACT.TABLE_NAME)
                    .whereNull(DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
                    .andWhere((builder: any) => {
                        if (email) {
                            builder.orWhere(DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY, email);
                        }
                        if (phoneNumber) {
                            builder.orWhere(DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY, phoneNumber);
                        }
                    });
            });

        return primaryContactsQuery.unionAll([secondaryContactsQuery]);
    }

    updateContactById(id: number, updateObj: GeneralObject) {
        return this.queryBuilder
            .update(
                this.updateStatement(this.getDefinedObject(updateObj)),
                [DB_TABLE.CONTACT.COLUMNS.ID.KEY]
            )
            .table(DB_TABLE.CONTACT.TABLE_NAME)
            .where(DB_TABLE.CONTACT.COLUMNS.ID.KEY, id);
    }

    updateBulkContacts(ids: number[], updateObj: GeneralObject) {
        return this.queryBuilder
            .update(this.updateStatement(this.getDefinedObject(updateObj)))
            .table(DB_TABLE.CONTACT.TABLE_NAME)
            .whereIn(DB_TABLE.CONTACT.COLUMNS.ID.KEY, ids);
    }
}

export default ContactModel;
