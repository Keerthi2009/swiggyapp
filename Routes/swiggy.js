const router = require("express").Router();
const mongoose = require("mongoose");

require("../Model/Order");
const Order = mongoose.model("order");

/*----------------Swiggy GET stats----------------*/
router.get("/restaurants",(req,res) => {
    res.render("./swiggy/restaurants");
});

router.get("/menu",(req,res) => {
    res.render("./swiggy/menu");
});

//add orders
router.get("/add-order", (req,res) => {
    res.render('./swiggy/add-orders');
});

//order
router.get("/order", (req, res) => {
    Order.find({})
      .lean()
      .then((orders) => {
        res.render("./swiggy/order", {
          orders: orders,
        });
      })
      .catch((err) => console.log(err));
  });

/*------------------Swiggy GET ends--------------*/

/*---------------Swiggy Post starts ---------------*/
router.post('/add-order',(req,res) => {
let {restaraunt_name,
    restaraunt_photo = req.file,
    restaraunt_dish1,
    restaraunt_dish2,}=req.body;

    let newOrder = {
        restaraunt_name,
        restaraunt_photo,
        restaraunt_dish1,
        restaraunt_dish2, };

    new Order(newOrder).save().then((order) => {
        req.flash("success_msg", "Order successfully added");
        res.redirect("/swiggy/order",304,{order: order,});
    })
    .catch(err => console.log(err));
});
/*---------------Swiggy Post ends ---------------*/

module.exports = router;