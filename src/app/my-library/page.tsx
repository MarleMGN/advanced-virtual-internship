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
  bookId: string;
  title: string;
  author: string;
  imageLink: string;
  subTitle: string;
  duration: string;
}

const page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const { modalOpen, setModalOpen } = useModal();

  useEffect(() => {
    if (!user) {
      setSavedBooks([]);
      setLoading(false);
      return;
    }
    const fetchSavedBooks = async () => {
      setLoading(true);
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
              <div className="for-you__sub--title">
                {savedBooks.length} item{savedBooks.length !== 1 ? "s" : ""}
              </div>

              {savedBooks.length > 0 ? (
                <div className="for-you__recommended--books">
                  {savedBooks.map((book) => (
                    <a
                      key={book.bookId}
                      href={`/book/${book.bookId}`}
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
                      <div className="recommended__books--details-wrapper">
                        <div className="recommended__book--details">
                            <div className="recommended__book--details-icon">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4z"></path></svg>
                            </div>
                            <div className="recommended__book--details-text">
                                {book.duration}
                            </div>
                        </div>
                        <div className="recommended__book--details"></div>
                      </div>
                    </a>
                  ))}
                </div>
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
              <div className="for-you__sub--title">0 items</div>
              <div className="finished__books--block-wrapper">
                <div className="finished__books--title">Done and dusted!</div>
                <div className="finished__books--sub-title">
                  When you finish a book, you can find it here later.
                </div>
              </div>
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
