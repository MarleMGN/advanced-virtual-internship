"use client";
import React, { useEffect, useState } from "react";
import "./page.css";
import Image from "next/image";
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useModal } from "@/context/ModalContext";

interface SavedBook {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subTitle: string;
  duration: string;
  averageRating: string;
}

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const { modalOpen, setModalOpen } = useModal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSavedBooks([]);
      return;
    }
    const fetchSavedBooks = async () => {
      const ref = collection(db, "users", user.uid, "library");
      const snap = await getDocs(ref);
      const books = snap.docs.map((doc) => doc.data() as SavedBook);
      setSavedBooks(books);
      setLoading(false);
    };
    fetchSavedBooks();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <Searchbar />
        {user ? (
          <div className="container">
            <div className="row">
              <div className="for-you__title">Saved Books</div>
              {loading ? (
                <>
                  <div
                    className="skeleton for-you__sub-title"
                    style={{ height: "15px", width: "80px" }}
                  ></div>
                  <div className="for-you__recommended--books">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="for-you__recommended--books-link"
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          className="skeleton"
                          style={{ width: "180px", height: "250px" }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            width: "80%",
                            height: "16px",
                            marginTop: "12px",
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            width: "60%",
                            height: "14px",
                            marginTop: "8px",
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            width: "90%",
                            height: "14px",
                            marginTop: "8px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : savedBooks.length > 0 ? (
                <>
                  <div className="for-you__sub--title">
                    {savedBooks.length} item{savedBooks.length !== 1 ? "s" : ""}
                  </div>
                  <div className="for-you__recommended--books">
                    {savedBooks.map((book) => (
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
                </>
              ) : (
                <div className="finished__books--block-wrapper">
                  <div className="finished__books--title">
                    Save your favorite books!
                  </div>
                  <div className="finished__books--sub-title">
                    When you save a book, it will appear here.
                  </div>
                </div>
              )}
              <div className="for-you__title">Finished</div>
              {loading ? (
                <>
                  <div
                    className="skeleton for-you__sub-title"
                    style={{ height: "15px", width: "80px" }}
                  ></div>
                  <div className="for-you__recommended--books">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="for-you__recommended--books-link"
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          className="skeleton"
                          style={{ width: "180px", height: "250px" }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            width: "80%",
                            height: "16px",
                            marginTop: "12px",
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            width: "60%",
                            height: "14px",
                            marginTop: "8px",
                          }}
                        />
                        <div
                          className="skeleton"
                          style={{
                            width: "90%",
                            height: "14px",
                            marginTop: "8px",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="for-you__sub--title">0 items</div>
                  <div className="finished__books--block-wrapper">
                    <div className="finished__books--title">
                      Done and dusted!
                    </div>
                    <div className="finished__books--sub-title">
                      When you finish a book, you can find it here later.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="settings__login--wrapper">
                <Image
                  alt="login"
                  src="/login.png"
                  width={1033}
                  height={712}
                  className="nav__img"
                  style={{ color: "transparent" }}
                />
                <div className="settings__login--text">
                  Log in to your account to see your library.
                </div>
                <div
                  className="btn settings__login--btn"
                  onClick={() => setModalOpen(true)}
                >
                  Login
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default page;
