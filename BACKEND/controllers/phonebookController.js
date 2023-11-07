const phonebookModel = require('../models/phonebookModel');


exports.crear = async( req, res) => {
    try {
        const newPhonebook = new phonebookModel(req.body);
        await newPhonebook.save();
        res.status(201).json({id: newPhonebook._id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getPhonebookByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await phonebookModel.find({'userId': userId });
        const token = req.header('Authorization');

        console.log(token)

  

        res.status(200).json( tasks );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}