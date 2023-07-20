const express = require('express')
const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        console.log(global.food_items)
        res.send([global.food_items , global.foodCategory])
    }catch (e) {
        //console.log(e.message)
        res.send(e.message)
    }
})

module.exports = router ;