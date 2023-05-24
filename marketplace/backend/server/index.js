//generate unique ids
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

//express setup
const express = require("express");
const multer = require('multer');
var cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
const upload = multer();

//cors set up? for All?
app.use(cors());

//aws setup
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

//enable json parsing?
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//===== mongoDB START ======

const { MongoClient, ServerApiVersion } = require('mongodb');
//need to hide this...
const uri = "mongodb+srv://nykooi60866:rU8q2U3E1BM62HTq@mpcluster.kbflrom.mongodb.net/?retryWrites=true&w=majority";

//===== mongoDB END ======

//====== FUNCTIONS =======

async function uploadImageToS3(imageData) {
  
  const imageKey = `${Date.now()}-image.jpg`;
 
  //specify bucket, unique image key and the image data
  const params = {
    Bucket: "mkp-images",
    Key: imageKey,
    Body: imageData,
    ContentType: "image/jpg",
    ACL: 'public-read', // Make the uploaded image publicly accessible
  };

  //upload the image to the s3 bucket and get the location (url) as a response
  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }

}

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
app.post("/addItem", upload.array("images[]"), async (req, res) => {

  console.log(req.body);
  console.log(req.files);

  var urls = [];

  for(var i = 0; i < req.files.length; i++){
    urls.push(await uploadImageToS3(req.files[i].buffer));
  }

  console.log(urls);
  
  //get the body (JSON)
  const itemData = req.body;

  //append the image urls
  itemData.url = urls;

  //add document to the mongoDB "marketplace" db into the "items" collection
  addDocument("marketplace", "items", itemData);

  //send success message
  res.status(200).json({ message: 'Files uploaded successfully' });

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

