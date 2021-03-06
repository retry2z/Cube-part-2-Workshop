const express = require('express');
const router = express.Router();
const accessoryController = require('../controllers/accessory-controller');


router.get('/create', async (req, res) => {
    await accessoryController.create.get(req, res);
});

router.post('/create', async (req, res) => {
    const status = await accessoryController.create.post(req, res);
    if (status) {
        res.redirect('/');
    }
});


router.get('/attach/:id', async (req, res) => {
    await accessoryController.attach.get(req, res);
});


router.post('/attach/:id', async (req, res) => {
    await accessoryController.attach.post(req, res);
    res.redirect(`/cubic/details/${req.params.id}`);
});

module.exports = router;

