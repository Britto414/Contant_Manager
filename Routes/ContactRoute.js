const exp = require('express');

const {
    UpdateContact,
    DeleteContact,
    CreateContact,
    getContacts

} = require("../Controllers/ContactControl");

const router = exp.Router();
const validToken =require('../Middleware/ValidateToken')

router.use(validToken)

router.route("/").get(getContacts)

router.route("/").post(CreateContact)

router.route("/:id").delete(DeleteContact)

router.route("/:id").put(UpdateContact)

module.exports = router;