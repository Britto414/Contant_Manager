const Contact = require('../models/ContactSchema')
// const User = require("../models/UserSchema")
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler')

const getContacts = asyncHandler(async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const contacts = await Contact.find({ user_id: req.user.id });

    if (contacts.length === 0) {
        return res.status(200).json({ message: "No contacts found", contacts: [] });
    }
    // console.log(contacts);
    
    res.status(200).json(contacts);
});

 
const CreateContact = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        res.status(404);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        user_id: req.user.id, 
        name, 
        phone
    });

    res.status(201).json({
        message: "Contact Created",
        contact
    });
});


const DeleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to access another user's contact" });
    }

    await contact.deleteOne(); 

    res.status(200).json({ message: "Contact Deleted" , contact });
});


const UpdateContact = async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
     
    if (contact && contact.user_id.toString() !== req.user.id) {
        res.status(403).json({ message: "Not authorized to access another user's contact" });
    }
    
    const updated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body ,
        {new :true}
    )
    res.status(200).json({message: "Contact Updated",updated});
}

module.exports = {
    UpdateContact,
    DeleteContact,
    CreateContact,
    getContacts
}