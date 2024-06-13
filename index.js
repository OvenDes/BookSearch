import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js"; //'../../dao/reviewsDAO.js'"./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://avanidesai:Cilantro@cluster1.t8zjbom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const port = 8000;

MongoClient.connect(uri, {
  maxPoolSize: 50, //options
  wtimeoutMS: 2500,
  useNewUrlParser: true,
}) // connect to database
  .catch((err) => {
    //catch errors
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    //we get client from connect
    await ReviewsDAO.injectDB(client); //inject database
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
