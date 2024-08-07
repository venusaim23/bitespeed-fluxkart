import ContactModel from "../../models/ContactModel";
import UnexpectedLogicalError from "../../errorhandlers/UnexpectedLogicalError";
import { ERROR_MESSAGES } from "../../errorhandlers/errorConstants";
import { DB_TABLE } from "../../models/libs/dbConstants";
import { DatabaseContact, GeneralObject, LinkPrecedenceType } from "../../globalconstants/interfaces";
import { RequestContact } from "../../globalconstants/interfaces";

const PRIMARY_LINK_PRECEDENCE = DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS[0];
const SECONDARY_LINK_PRECEDENCE = DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS[1];

class ContactManager {
    static _getContactModel() {
        return new ContactModel();
    }

    static createNewContact = async (linkPrecedence: LinkPrecedenceType, email?: string, phoneNumber?: string, linkedId?: number) => {
        const contactModel = this._getContactModel();
        const result = await contactModel.createNewContact(linkPrecedence, email, phoneNumber, linkedId);
        return (result.length > 0) ? result[0][DB_TABLE.CONTACT.COLUMNS.ID.KEY] : undefined;
    };

    static getContactById = async (id: number) => {
        const contactModel = this._getContactModel();
        const result = await contactModel.getContactById(id);
        return (result.length > 0) ? result[0] : undefined;
    };

    static updateBulkContacts = async (ids: number[], updateObj: GeneralObject) => {
        const contactModel = this._getContactModel();
        await contactModel.updateBulkContacts(ids, updateObj);
    };

    static getLinkedContacts = async (email?: string, phoneNumber?: string) => {
        const contactModel = this._getContactModel();
        let result;
        if (!email && !phoneNumber) {
            throw new UnexpectedLogicalError(ERROR_MESSAGES.UNEXPECTED_ERROR("Both Email and Phone number are null"));
        } else {
            result = await contactModel.getContactsByEmailOrPhoneNumber(email, phoneNumber);
        }

        return (result.length > 0) ? result : undefined;
    };

    static getFormattedResponse = (primaryContactId: number, emails: string[], phoneNumbers: string[], secondaryContactIds: number[]): RequestContact => {
        return { primaryContactId, emails, phoneNumbers, secondaryContactIds };
    };

    static getAllLinkedIds = (contacts: DatabaseContact[]): number[] => {
        const linkedIds: number[] = [];
        for (const contact of contacts) {
            const linkedId = contact.linkedId;
            if (!!linkedId) {
                linkedIds.push(linkedId);
            }
        }
        return Array.from(new Set(linkedIds));
    };

    static identifyContact = async (email?: string, phoneNumber?: string) => {
        let linkedContacts = await this.getLinkedContacts(email, phoneNumber);

        if (!linkedContacts) {
            const newContactId = await this.createNewContact(PRIMARY_LINK_PRECEDENCE, email, phoneNumber);

            const newContact = await this.getContactById(newContactId);
            return this.getFormattedResponse(
                newContact[DB_TABLE.CONTACT.COLUMNS.ID.KEY],
                [newContact[DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]],
                [newContact[DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]],
                []
            );
        } else {
            // get all missing primary contacts
            const allLinkedIds = this.getAllLinkedIds(linkedContacts);
            if (allLinkedIds.length > 0) {
                const missingPrimaryContactIds = allLinkedIds.filter(id => !!linkedContacts && !linkedContacts.some(contact => contact.id === id));

                for (const id of missingPrimaryContactIds) {
                    const contact = await this.getContactById(id);
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
                if (contact[DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY] == phoneNumber) {
                    phoneFound = true;
                }
                if (contact[DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY] === email) {
                    emailFound = true
                }
            }
            const matchFound = (!email && phoneFound) || (!phoneFound && emailFound) || (emailFound && phoneFound);

            let primaryContacts = linkedContacts.filter(contact => contact[DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY] === PRIMARY_LINK_PRECEDENCE);
            const secondaryContacts = linkedContacts.filter(contact => contact[DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY] === SECONDARY_LINK_PRECEDENCE);

            let primaryUpdated = false;
            if (primaryContacts.length > 1) {
                primaryContacts = primaryContacts.sort((a, b) => new Date(a[DB_TABLE.CONTACT.COLUMNS.CREATED_AT.KEY]).getTime() - new Date(b[DB_TABLE.CONTACT.COLUMNS.CREATED_AT.KEY]).getTime());
                const oldestPrimary = primaryContacts[0];
                const otherPrimaryIds = primaryContacts.slice(1).map(contact => contact[DB_TABLE.CONTACT.COLUMNS.ID.KEY]);

                await this.updateBulkContacts(otherPrimaryIds, {
                    [DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.KEY]: SECONDARY_LINK_PRECEDENCE,
                    [DB_TABLE.CONTACT.COLUMNS.LINKED_ID.KEY]: oldestPrimary[DB_TABLE.CONTACT.COLUMNS.ID.KEY]
                });

                primaryContacts.slice(1).forEach(contact => secondaryContacts.push(contact));
                primaryUpdated = true;
            }

            const primaryContact = primaryContacts[0];
            let newContact;
            if (!primaryUpdated && !matchFound) {
                const newContactId = await this.createNewContact(SECONDARY_LINK_PRECEDENCE, email, phoneNumber, primaryContact[DB_TABLE.CONTACT.COLUMNS.ID.KEY]);
                newContact = await this.getContactById(newContactId);
            }

            const emails = Array.from(new Set([primaryContact[DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY], ...secondaryContacts.map(contact => contact[DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]), newContact?.[DB_TABLE.CONTACT.COLUMNS.EMAIL.KEY]].filter(Boolean)));
            const phoneNumbers = Array.from(new Set([primaryContact[DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY], ...secondaryContacts.map(contact => contact[DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]), newContact?.[DB_TABLE.CONTACT.COLUMNS.PHONE_NUMBER.KEY]].filter(Boolean)));
            const secondaryContactIds = Array.from(new Set([...secondaryContacts.map(contact => contact[DB_TABLE.CONTACT.COLUMNS.ID.KEY]), newContact?.[DB_TABLE.CONTACT.COLUMNS.ID.KEY]].filter(Boolean)));

            return this.getFormattedResponse(primaryContact[DB_TABLE.CONTACT.COLUMNS.ID.KEY], emails, phoneNumbers, secondaryContactIds);
        }
    };
}

export default ContactManager;
