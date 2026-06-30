"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

interface SaveButtonProps {
  bookId: string;
  title: string;
  author: string;
  imageLink: string;
  subTitle: string;
  duration: string;
}

const SaveButton = ({ bookId, title, author, imageLink, subTitle, duration }: SaveButtonProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setSaved(false);
      return;
    }
    const checkSaved = async () => {
      const ref = doc(db, "users", user.uid, "library", bookId);
      const snap = await getDoc(ref);
      setSaved(snap.exists());
    };
    checkSaved();
  }, [user, bookId]);

  async function handleToggleSave() {
  if (!user) {
    return;
  }
  try {
    const ref = doc(db, "users", user.uid, "library", bookId);
    console.log("ref path:", ref.path);
    if (saved) {
        await deleteDoc(ref);
        setSaved(false);
    } else {
        await setDoc(ref, { title, author, imageLink, bookId, subTitle, duration });
        setSaved(true);
    }
  } catch (err) {
    console.error("FIRESTORE ERROR:", err);
  }
}

  return (
    <>
      <div className="inner-book__bookmark" onClick={handleToggleSave}>
        <div className="inner-book__bookmark--icon">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
          </svg>
        </div>
        {saved ? "Saved in My Library" : "Add title to My Library" }
      </div>
    </>
  );
};

export default SaveButton;
