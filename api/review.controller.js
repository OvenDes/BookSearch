import ReviewsDAO from "../dao/reviewsDAO.js"; //"../../dao/reviewsDAO.js"; //"./dao/reviewsDAO.js";

export default class ReviewsCtrl {
  static async apiPostReview(req, res, next) {
    try {
      const bookId = parseInt(req.body.bookId);
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.addReview(bookId, user, review);
      res.json({ status: "success1" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {};
      console.log("got review");
      let review = await ReviewsDAO.getReview(id);

      if (!review) {
        res.status(500).json({ error: "review not found" });
        return;
      }
      res.json(review);
    } catch (e) {
      console.log("no review");
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;

      const newReview = await ReviewsDAO.updateReview(reviewId, user, review);
      console.log("crying");
      if (newReview.modifiedCount == 0) {
        throw new Error("unable to update review");
      }
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewID = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewID);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      //console.log("here");
      let reviews = await ReviewsDAO.getReviewsbyBookID(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
