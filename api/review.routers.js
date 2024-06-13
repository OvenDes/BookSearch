import express from "express";
//when people come to our website this router will route to different parts of the website
import ReviewCtrl from "./review.controller.js";

const router = express.Router();
//router.route("/").get((req, res) => res.send("hello world"))

router.route("/book/:id").get(ReviewCtrl.apiGetReviews); //get book review based on book ID
router.route("/new").post(ReviewCtrl.apiPostReview); //post new review
router
  .route("/:id")
  .get(ReviewCtrl.apiGetReview) //get specific review based on review id
  .put(ReviewCtrl.apiUpdateReview)
  //update specific review based on review id
  .delete(ReviewCtrl.apiDeleteReview);
//delete specific review based on review id

export default router;
