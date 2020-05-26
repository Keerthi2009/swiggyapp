const router = require("express").Router();


/*----------------Swiggy GET stats----------------*/
router.get("/restaurants",(req,res) => {
    res.render("./swiggy/restaurants");
})

/*------------------Swiggy GET ends--------------*/


module.exports = router;