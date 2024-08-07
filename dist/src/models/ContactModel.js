"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModel_1 = __importDefault(require("./libs/BaseModel"));
const dbConstants_1 = require("./libs/dbConstants");
class ContactModel extends BaseModel_1.default {
    constructor() {
        super();
    }
    createNewContact(linkPrecedence, email, phoneNumber, linkedId) {
        return this.queryBuilder
            .insert(this.getDefinedObject({
            [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]: email,
            [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]: phoneNumber,
            [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY]: linkedId,
            [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY]: linkPrecedence
        }), [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY])
            .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME);
    }
    getContactById(id) {
        return this.queryBuilder
            .select("*")
            .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME)
            .whereNull(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
            .where(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY, id);
    }
    getContactsByEmailOrPhoneNumber(email, phoneNumber) {
        const queryBuilder = this.queryBuilder;
        const primaryContactsQuery = queryBuilder
            .select("*")
            .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME)
            .whereNull(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
            .andWhere(builder => {
            if (email) {
                builder.orWhere(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY, email);
            }
            if (phoneNumber) {
                builder.orWhere(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY, phoneNumber);
            }
        });
        const secondaryContactsQuery = queryBuilder
            .select("*")
            .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME)
            .whereNull(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
            .andWhere(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY, "IN", (subqueryBuilder) => {
            subqueryBuilder.select(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY)
                .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME)
                .whereNull(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.DELETED_AT.KEY)
                .andWhere((builder) => {
                if (email) {
                    builder.orWhere(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY, email);
                }
                if (phoneNumber) {
                    builder.orWhere(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY, phoneNumber);
                }
            });
        });
        return primaryContactsQuery.unionAll([secondaryContactsQuery]);
    }
    updateContactById(id, updateObj) {
        return this.queryBuilder
            .update(this.updateStatement(this.getDefinedObject(updateObj)), [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY])
            .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME)
            .where(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY, id);
    }
    updateBulkContacts(ids, updateObj) {
        return this.queryBuilder
            .update(this.updateStatement(this.getDefinedObject(updateObj)))
            .table(dbConstants_1.DB_TABLE.CONTACT.TABLE_NAME)
            .whereIn(dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY, ids);
    }
}
exports.default = ContactModel;
