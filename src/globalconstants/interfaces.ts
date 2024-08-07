import { DB_TABLE } from "../models/libs/dbConstants";

type LinkPrecedenceType = typeof DB_TABLE.CONTACT.COLUMNS.LINK_PRECEDENCE.OPTIONS[number];

interface GeneralObject {
    [key: string]: any;
}

interface RequestContact {
    primaryContactId: number;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: number[];
}

interface DatabaseContact {
    id: number;
    phoneNumber: string | null;
    email: string | null;
    linkedId: number | null;
    linkPrecedence: "primary" | "secondary";
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export { LinkPrecedenceType, GeneralObject, RequestContact, DatabaseContact };
