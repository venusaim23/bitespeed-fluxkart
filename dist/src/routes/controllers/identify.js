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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routeWrappers_1 = require("../routeWrappers");
const pathConstants_1 = require("../middleware/pathConstants");
const ContactManager_1 = __importDefault(require("../../businesslogic/managers/ContactManager"));
const router = express_1.default.Router({ mergeParams: true });
router.post("/", (0, routeWrappers_1.appWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { [pathConstants_1.PATHS["/identify"].POST.BODY.FIELDS.email.KEY]: email, [pathConstants_1.PATHS["/identify"].POST.BODY.FIELDS.phoneNumber.KEY]: phoneNumber } = req.body;
    const contact = yield ContactManager_1.default.identifyContact(email, phoneNumber);
    res.json({
        [pathConstants_1.PATHS["/identify"].POST.RESPONSE.FIELDS.contact.KEY]: contact
    });
})));
exports.default = router;
