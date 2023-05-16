//firebase, firestore imports
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

//account key
const serviceAccount = require('../marketplace-f5119-22762f894698.json');

//initialize application with the private project key
initializeApp({
  credential: cert(serviceAccount)
});

//get the firestore database
const db = getFirestore();

//express setup
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//====== FUNCTIONS =======

//insert into items collection
async function addItem(){
  
  const data = {
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  };
  
  // Add a new document in collection "cities" with ID 'LA'
  const res = await db.collection('items').doc('LA').set(data);

}

//====== ENDPOINTS =======

//insert a dummy document into the items collection in firebase
app.get("/addItem", (req, res) => {
  addItem();
  res.json({ message: "Item has been added" });
});

//login endpoint



//create account endpoint

//upload product endpoint

//listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

