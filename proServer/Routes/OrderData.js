const express = require('express');
const router = express.Router();
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data
  // Insert the order date at the beginning of the data array
  await data.splice(0, 0, { Order_date: req.body.order_date })
  // Insert the order date at the beginning of the data array
  let eId = await Order.findOne({ 'email': req.body.email })
  console.log(eId)
  if (eId === null) {
    // If the email does not exist, create a new order with the data
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message);
    }
  } else {
    // If the email already exists, append the data to the existing order
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: ", error.message);
    }
  }
})
router.post('/myOrderData', async (req, res) => {
  try {
      // Find the order data for the specified email in the 'Order' collection
   
    let myData = await Order.findOne({ 'email': req.body.email })
    res.json({ orderData: myData })

  } catch (error) {
    // Send the order data as a JSON response
    res.send("Server error", error.message)
  }
})


module.exports = router;