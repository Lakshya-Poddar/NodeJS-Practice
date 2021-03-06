const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url ='mongodb://localhost:27017/conFusion1'
const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("CONNECTED TO THE SERVER");

    Dishes.create({
        name:'lakshya',
        description:'test'
    })

    .then((dish)=>{
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:'updated test'}},{
                new:true
        }).exec();
        
    })
    .then((dish)=>{
        console.log(dish);

        dish.comments.push({
            rating:5,
            comment:'I AM GETTING GOOD FOOD',
            author:'lakshya'
        })
        return dish.save()
    })
    .then((dish)=>{
        console.log(dish);
        
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err);
        
    })
})