import mongodb from "mongodb";
//import { ObjectId } from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews-db").collection("reviews");
      console.log("Database connection established");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }
  static async addReview(bookId, user, review) {
    try {
      const reviewdoc = {
        BookId: bookId,
        User: user,
        Review: review,
      };
      console.log("review added");
      // if (bookId && user && review) {
      //console.log("review added");
      return await reviews.insertOne(reviewdoc);
      // }
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewID) {
    try {
      //const reviewdoc = await reviews.findOne({ _id: ObjectId(reviewID) });
      console.log("got reviewww");
      //return reviewdoc;
      return await reviews.findOne({ _id: new ObjectId(reviewID) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewID, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewID) },
        { $set: { User: user, Review: review } },
      );
      console.log(`${reviewID}`);
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }
  static async deleteReview(reviewID) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewID),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
  static async getReviewsbyBookID(bookId) {
    try {
      //console.log("here2");
      const array = await reviews.find({ BookId: parseInt(bookId) });
      return array.toArray(); //convert to an array
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`);
      return { error: e };
    }
  }
}
