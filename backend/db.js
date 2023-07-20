const mongoose = require('mongoose')
const url  = "mongodb+srv://sufiyan2207:sufiyan123@cluster0.gdvkwvq.mongodb.net/gofoodmern?retryWrites=true&w=majority"

const mongoDB = async() => {
    await mongoose.connect(url, {useNewUrlParser: true}, async (err, result) => {
        if (err) console.log('---', err)
        else {
            console.log('connected');
            const fetched_data = await mongoose.connection.db.collection("food_items");
             fetched_data.find({}).toArray(async function(err, data) {
                 const foodCategory = await mongoose.connection.db.collection("foodCategory")
                 foodCategory.find({}).toArray(function (err,catData){
                     if (err) console.log(err)
                     else {
                         global.foodCategory = catData;
                         global.food_items = data;
                     }
                 })
                //if (err) console.log(err)
                //else{
                  //  global.food_items = data;
                //}

            })

        }
    })
}
module.exports = mongoDB;