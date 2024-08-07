"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const ContactModel_1 = __importDefault(require("../../models/ContactModel"));
const UnexpectedLogicalError_1 = __importDefault(require("../../errorhandlers/UnexpectedLogicalError"));
const errorConstants_1 = require("../../errorhandlers/errorConstants");
const dbConstants_1 = require("../../models/libs/dbConstants");
const PRIMARY_LINK_PRECEDENCE = dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS[0];
const SECONDARY_LINK_PRECEDENCE = dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS[1];
class ContactManager {
    static _getContactModel() {
        return new ContactModel_1.default();
    }
}
_a = ContactManager;
ContactManager.createNewContact = (linkPrecedence, email, phoneNumber, linkedId) => __awaiter(void 0, void 0, void 0, function* () {
    const contactModel = _a._getContactModel();
    const result = yield contactModel.createNewContact(linkPrecedence, email, phoneNumber, linkedId);
    return (result.length > 0) ? result[0][dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY] : undefined;
});
ContactManager.getContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contactModel = _a._getContactModel();
    const result = yield contactModel.getContactById(id);
    return (result.length > 0) ? result[0] : undefined;
});
ContactManager.updateBulkContacts = (ids, updateObj) => __awaiter(void 0, void 0, void 0, function* () {
    const contactModel = _a._getContactModel();
    yield contactModel.updateBulkContacts(ids, updateObj);
});
ContactManager.getLinkedContacts = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const contactModel = _a._getContactModel();
    let result;
    if (!email && !phoneNumber) {
        throw new UnexpectedLogicalError_1.default(errorConstants_1.ERROR_MESSAGES.UNEXPECTED_ERROR("Both Email and Phone number are null"));
    }
    else {
        result = yield contactModel.getContactsByEmailOrPhoneNumber(email, phoneNumber);
    }
    return (result.length > 0) ? result : undefined;
});
ContactManager.getFormattedResponse = (primaryContactId, emails, phoneNumbers, secondaryContactIds) => {
    return { primaryContactId, emails, phoneNumbers, secondaryContactIds };
};
ContactManager.getAllLinkedIds = (contacts) => {
    const linkedIds = [];
    for (const contact of contacts) {
        const linkedId = contact.linkedId;
        if (!!linkedId) {
            linkedIds.push(linkedId);
        }
    }
    return Array.from(new Set(linkedIds));
};
ContactManager.identifyContact = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    let linkedContacts = yield _a.getLinkedContacts(email, phoneNumber);
    if (!linkedContacts) {
        const newContactId = yield _a.createNewContact(PRIMARY_LINK_PRECEDENCE, email, phoneNumber);
        const newContact = yield _a.getContactById(newContactId);
        return _a.getFormattedResponse(newContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY], [newContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]], [newContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]], []);
    }
    else {
        // get all missing primary contacts
        const allLinkedIds = _a.getAllLinkedIds(linkedContacts);
        if (allLinkedIds.length > 0) {
            const missingPrimaryContactIds = allLinkedIds.filter(id => !!linkedContacts && !linkedContacts.some(contact => contact.id === id));
            for (const id of missingPrimaryContactIds) {
                const contact = yield _a.getContactById(id);
                if (!!contact) {
                    linkedContacts.unshift(contact);
                }
            }
            linkedContacts = Array.from(new Set(linkedContacts));
        }
        // console.log(`Contacts: ${JSON.stringify(linkedContacts)}`);
        let emailFound = false;
        let phoneFound = false;
        for (const contact of linkedContacts) {
            if (contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY] == phoneNumber) {
                phoneFound = true;
            }
            if (contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY] === email) {
                emailFound = true;
            }
        }
        const matchFound = (!email && phoneFound) || (!phoneFound && emailFound) || (emailFound && phoneFound);
        let primaryContacts = linkedContacts.filter(contact => contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY] === PRIMARY_LINK_PRECEDENCE);
        const secondaryContacts = linkedContacts.filter(contact => contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY] === SECONDARY_LINK_PRECEDENCE);
        let primaryUpdated = false;
        if (primaryContacts.length > 1) {
            primaryContacts = primaryContacts.sort((a, b) => new Date(a[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.CREATED_AT.KEY]).getTime() - new Date(b[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.CREATED_AT.KEY]).getTime());
            const oldestPrimary = primaryContacts[0];
            const otherPrimaryIds = primaryContacts.slice(1).map(contact => contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY]);
            yield _a.updateBulkContacts(otherPrimaryIds, {
                [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY]: SECONDARY_LINK_PRECEDENCE,
                [dbConstants_1.DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY]: oldestPrimary[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY]
            });
            primaryContacts.slice(1).forEach(contact => secondaryContacts.push(contact));
            primaryUpdated = true;
        }
        const primaryContact = primaryContacts[0];
        let newContact;
        if (!primaryUpdated && !matchFound) {
            const newContactId = yield _a.createNewContact(SECONDARY_LINK_PRECEDENCE, email, phoneNumber, primaryContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY]);
            newContact = yield _a.getContactById(newContactId);
        }
        const emails = Array.from(new Set([primaryContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY], ...secondaryContacts.map(contact => contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]), newContact === null || newContact === void 0 ? void 0 : newContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]].filter(Boolean)));
        const phoneNumbers = Array.from(new Set([primaryContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY], ...secondaryContacts.map(contact => contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]), newContact === null || newContact === void 0 ? void 0 : newContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]].filter(Boolean)));
        const secondaryContactIds = Array.from(new Set([...secondaryContacts.map(contact => contact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY]), newContact === null || newContact === void 0 ? void 0 : newContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY]].filter(Boolean)));
        return _a.getFormattedResponse(primaryContact[dbConstants_1.DB_TABLE.CONTACT.COLUMNS.ID.KEY], emails, phoneNumbers, secondaryContactIds);
    }
});
exports.default = ContactManager;
