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

// hashing library 
const bcrypt = require('bcrypt');

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

async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

async function getUserByUsername(dbName, collectionName, username) {
  //connect to the client
  const client = await MongoClient.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });
  
  //Select the database
  try {
    const database = client.db(dbName);
    const users = database.collection(collectionName);
    return await users.findOne({ username: username });
  } 
  finally {
    await client.close();
  }

}


async function authenticateUser(dbName, collectionName, username, password){

  //connect to the client
  const client = await MongoClient.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  });
  
  //Select the database
  try {
    const database = client.db(dbName);
    const users = database.collection(collectionName);
    const myUser = await users.findOne({ username: username });

    if ( username == '' || password == '' ){ // blank inputs 
      return 'One or more fields are blank';
    }
    if (myUser == null) { // user does not exist
      return 'Username does not exist';
    }
    else if (myUser && myUser.password !== password){ // incorrect password
      return 'Incorrect password';
    }
    else if (myUser && myUser.password === password) { // successful 
      return 'Login Success';
    }
  
  } finally {
      await client.close();
    }
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
app.post("/signup", async (req, res) => {
  var userData = req.body;

  // Check if the username already exists in the database
  const existingUser = await getUserByUsername("marketplace", "users", userData.username);
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  var hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  console.log("hashed password: ", hashedPassword);

  //add document to the mongoDB "marketplace" db into the "users" collection
  addDocument("marketplace", "users", userData);

  res.json({message: "User inserted to database!"});

  // res.json(req.body);
});

// Login endpoint
app.post ("/login", async (req, res)  => {
  const {username, password } = req.body;

  console.log('username: ', username);
  console.log('password: ', password);
  
  var loginResponse = await authenticateUser("marketplace", "users", username, password);

  res.json({message: loginResponse});


});

//create account endpoint

//upload product endpoint

//listening
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

