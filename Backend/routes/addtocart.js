const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Addtocart = require("../models/Addtocart");
const { body, validationResult } = require('express-validator');


//Fetching all the carts of a particular user who login to the webiste using [(GET: /api/addtocart/fetchallcart :::::login required)]
router.get('/fetchallcart', fetchuser, async (req, res) => {
    try {
        const cart = await Addtocart.find({ user: req.user.id });
        res.json([cart]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some internal issue is there");
    }
})


// used to all the cart of a logged in user using ({POST: '/api/addtocart/addcart'}) ::::login required
router.post('/addcart', fetchuser, [

    body('product', 'Product name is required').isLength({ min: 3 }),
    body('quantity', 'Enter the Quantity').isInt({ min: 1 }),
    body('price', 'Enter the Price').isFloat({ min: 0 }),
    body('imageUrl', 'it cannot be empty').isURL()
], async (req, res) => {
    try {
        const { product, quantity, price,imageUrl } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const carts = new Addtocart({ product, quantity, price,imageUrl, user: req.user.id })
        const savedcart = await carts.save();
        res.json(savedcart);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error has been occured");
    }
})

//Updating the Quantity using PUT: /api/addtocart/editquantity ::::: login required

router.put('/editquantity/:id', fetchuser, async (req, res) => {
    try {
        const { quantity } = req.body;
        const newcart = {};
        if (quantity) { newcart.quantity = quantity };

        let cart = await Addtocart.findById(req.params.id);

        if (!cart) {
            return res.status(404).send("Not Found");
        }
        if (cart.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");
        }
        cart = await Addtocart.findByIdAndUpdate(req.params.id, { $set: newcart }, { new: true })
        res.json(cart);
    } catch (error) {
        onsole.error(error.message);
        res.status(500).send("some error has been occured")
    }
})

//Deleting an existing cart using ({DELETE: '/api/addtocart/deletecart'}) :::: Login required
router.delete('/deletecart/:id', fetchuser, async (req, res) => {
    try {
        let cart = await Addtocart.findById(req.params.id);
        if (!cart) {
            return res.status(404).send("The Cart is not present");
        }
        if (cart.user.toString() !== req.user.id) {
            return res.status(401).send("You are not allowed");
        }

        cart = await Addtocart.findByIdAndDelete(req.params.id);
        res.json({ "Success": "The cart has been deleted", cart: cart });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error has been occured");
    }
})

module.exports = router;