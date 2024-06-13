import express from "express"; //web framework
import cors from "cors";
import reviews from "./api/review.routers.js";

const app = express();
app.use(cors());
app.use(express.json()); // use to send and recieve json

app.use("/api/v1/reviews", reviews); //this is our route (our base url)

//need to create backup route now if they don't go to our route

app.use("*", (req, res) => res.status(404).json({ error: "not found" })); //req is request and res is result

export default app;
