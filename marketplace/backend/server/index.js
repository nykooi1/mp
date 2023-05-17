//generate unique ids
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

//express setup
const express = require("express");
var cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();

//cors set up? for All?
app.use(cors());

//enable json parsing?
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//===== mongoDB START ======

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nykooi60866:rU8q2U3E1BM62HTq@mpcluster.kbflrom.mongodb.net/?retryWrites=true&w=majority";

//===== mongoDB END ======

//====== FUNCTIONS =======

//adds a document into the dbName.collectionName (mongoDB)
async function addDocument(dbName, collectionName, document){

  //connect to the client
  const client = await MongoClient.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });
  
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  //Select the database
  const db = client.db(dbName);

  //Get the collection
  const collection = db.collection(collectionName);

  //add ID
  document.id = uuidv4();

  // Insert the document
  await collection.insertOne(document, (err, result) => {
    if (err) {
      console.error('Error inserting document:', err);
      return;
    } else {
      console.log('Document inserted successfully:', result.insertedId);
    }
  });

  //close the client
  client.close();

}

//====== ENDPOINTS =======

//insert a dummy document into the items collection in firebase
app.post("/addItem", (req, res) => {
  
  //get the body (JSON)
  const itemData = req.body;

  console.log(itemData);

  //add document to the mongoDB "marketplace" db into the "items" collection
  addDocument("marketplace", "items", itemData);

  //send success message
  res.json({message: "Item successfully inserted into the firestore database!"});

});

// Sign-up endpoint
app.post("/signUp", (req, res) => {
  console.log("sign up hit!");
  console.log(req.body);
  res.json(req.body);
  // res.json({ message: "signUp" });
});

//login endpoint

//create account endpoint

//upload product endpoint

//listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

