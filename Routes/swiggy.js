const router = require("express").Router();


/*----------------Swiggy GET stats----------------*/
router.get("/restaurants",(req,res) => {
    res.render("./swiggy/restaurants");
});

router.get("/menu",(req,res) => {
    res.render("./swiggy/menu");
})

/*------------------Swiggy GET ends--------------*/


module.exports = router;