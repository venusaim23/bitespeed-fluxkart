import express from "express";
import { appWrapper } from "../routeWrappers";
import { PATHS } from "../middleware/pathConstants";
import ContactManager from "../../businesslogic/managers/ContactManager";

const router = express.Router({ mergeParams: true });

router.post("/", appWrapper(async (req, res) => {
    const {
        [PATHS["/identify"].POST.BODY.FIELDS.email.KEY]: email,
        [PATHS["/identify"].POST.BODY.FIELDS.phoneNumber.KEY]: phoneNumber
    } = req.body;

    const contact = await ContactManager.identifyContact(email, phoneNumber);
    res.json({
        [PATHS["/identify"].POST.RESPONSE.FIELDS.contact.KEY]: contact
    });
}));

export default router;
