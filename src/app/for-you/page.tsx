import React from "react";
import "./page.css";
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";

const recommended_api =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended";

const suggested_api =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested";

const fetchRecommendedBooks = async () => {
  const res = await fetch(recommended_api);
  const data = await res.json();
  console.log(data);
  return data;
};

const fetchSuggestedBooks = async () => {
  const res = await fetch(suggested_api);
  const data = await res.json();
  return data;
};

const page = async () => {
  const recommendedBooks = await fetchRecommendedBooks();
  const suggestedBooks = await fetchSuggestedBooks();
  const recommendedDurations = [
    "03:23",
    "04:52",
    "04:40",
    "03:24",
    "03:22",
    "03:01",
    "02:48",
    "02:20",
  ];

  const suggestedDurations = [
    "03:24",
    "05:38",
    "03:18",
    "02:50",
    "02:45",
    "03:36",
    "02:24",
  ];

  const updatedRecommendedBooks = recommendedBooks.map(
    (book: any, index: number) => {
      return {
        ...book,
        duration: recommendedDurations[index],
      };
    },
  );

  const updatedSuggestedBooks = suggestedBooks.map(
    (book: any, index: number) => {
      return {
        ...book,
        duration: suggestedDurations[index],
      };
    },
  );

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <Searchbar />
        <div className="container">
          <div className="row">
            <div className="for-you__wrapper">
              <div className="for-you__title">Selected just for you</div>
              <audio></audio>
              <a href="/book/f9gy1gpai8" className="selected__book">
                <div className="selected__book--sub-title">
                  How Constant Innovation Creates Radically Successful
                  Businesses
                </div>
                <div className="selected__book--line"></div>
                <div className="selected__book--content">
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "140px",
                      width: "140px",
                      minWidth: "140px",
                    }}
                  >
                    <img
                      className="book__image"
                      src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                      alt="The Lean Startup"
                    />
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">
                      The Lean Startup
                    </div>
                    <div className="selected__book--author">Eric Ries</div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 16 16"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                        </svg>
                      </div>
                      <div className="selected__book--duration">
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <div>
                <div className="for-you__title">Recommended For You</div>
                <div className="for-you__sub-title">
                  We think you'll like these
                </div>
                <div className="for-you__recommended--books">
                  {updatedRecommendedBooks.map((book: any) => (
                    <a
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="for-you__recommended--books-link"
                    >
                      <figure
                        className="book__image--wrapper"
                        style={{ marginBottom: "8px" }}
                      >
                        <img
                          src={book.imageLink}
                          alt={book.title}
                          style={{ display: "block" }}
                        />
                      </figure>
                      <div className="recommended__book--title">
                        {book.title}
                      </div>
                      <div className="recommended__book--author">
                        {book.author}
                      </div>
                      <div className="recommended__book--sub-title">
                        {book.subTitle}
                      </div>
                      <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                              <path d="M13 7h-2v6h6v-2h-4z"></path>
                            </svg>
                          </div>
                          <div className="recommended__book--details-text">
                            {book.duration}
                          </div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 1024 1024"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                            </svg>
                          </div>
                          <div className="recommended__book--details-text">
                            {book.averageRating}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="for-you__title">Suggested Books</div>
                <div className="for-you__sub-title">Browse these books</div>
                <div className="for-you__recommended--books">
                  {updatedSuggestedBooks.map((book: any) => (
                    <a
                      key={book.id}
                      href={`/book/${book.id}`}
                      className="for-you__recommended--books-link"
                    >
                      <figure
                        className="book__image--wrapper"
                        style={{ marginBottom: "8px" }}
                      >
                        <img
                          src={book.imageLink}
                          alt={book.title}
                          style={{ display: "block" }}
                        />
                      </figure>
                      <div className="recommended__book--title">
                        {book.title}
                      </div>
                      <div className="recommended__book--author">
                        {book.author}
                      </div>
                      <div className="recommended__book--sub-title">
                        {book.subTitle}
                      </div>
                      <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                              <path d="M13 7h-2v6h6v-2h-4z"></path>
                            </svg>
                          </div>
                          <div className="recommended__book--details-text">
                            {book.duration}
                          </div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 1024 1024"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                            </svg>
                          </div>
                          <div className="recommended__book--details-text">
                            {book.averageRating}
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
