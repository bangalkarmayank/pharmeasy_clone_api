 const express = require("express");
 const bodyParser = require("body-parser");
 const mongoose = require("mongoose");

 // Models
 const Product = require("./src/Models/medicine_product");
 // Define app
 const app = express();

 // Use the body parser
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

 // Establish DB connection
 const db = mongoose.connect("mongodb://localhost:27017/pharmeasy-clone")
 // Define routes/pages
 app.get('/', function(request, response) {
     response.send({ping: 'Pong'})
 })

 // Define routes to Create, Read, Update & Delete (CRUD) Products
app.post('/products', function(request, response) {
    var product = new Product()
    product.medicine_name = request.body.medicine_name
    product.medicine_description = request.body.medicine_description
    product.mrpPrice = request.body.mrpPrice
    product.sellPrice = request.body.sellPrice
    product.currentStock = request.body.currentStock
    product.save(function(error, savedProduct) {
        if(error) {
            response.status(500).send({ error: "Unable to save product"})
        } else {
          response.status(200).send(savedProduct)
        }    
    })
})

 app.get('/products', function(request, response){
    Product.find({}, function(error, products) {
        if(error) {
            response.status(500).send({ error: "Unable to save product"});
        } else {
            response.status(200).send(products);
        }    
    })
 })  

 // Start server
 app.listen(3000, function() {
     console.log("Pharmeasy clone server running at port 3000.")
 })