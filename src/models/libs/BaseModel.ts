import Db from "./Db";
import { TABLE_DEFAULTS } from "./dbConstants";
import { Knex } from "knex";
import { GeneralObject } from "../../globalconstants/interfaces";

class BaseModel {
    protected queryBuilder: Knex;

    constructor() {
        this.queryBuilder = Db.getQueryBuilder();
    }

    updateStatement(updateObj: GeneralObject): GeneralObject {
        return {
            ...updateObj,
            [TABLE_DEFAULTS.COLUMNS.UPDATED_AT.KEY]: this.queryBuilder.fn.now()
        };
    }

    getDefinedObject(object: GeneralObject): GeneralObject {
        const definedObject: GeneralObject = {};
        for (const key in object) {
            if (object[key] !== undefined) {
                definedObject[key] = object[key];
            }
        }

        return definedObject;
    }
}

export default BaseModel;
