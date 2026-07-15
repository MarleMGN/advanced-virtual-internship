import React from "react";
import "./page.css"
import Sidebar from "@/components/sidebar";
import Searchbar from "@/components/searchbar";
import AudioPlayer from "@/components/AudioPlayer";
import BookSummary from "@/components/BookSummary";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const book__url = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
  const res = await fetch(book__url);
  const book = await res.json();
  return (
    <>
    <Sidebar />
    <Searchbar />
      <div className="summary">
        <div className="audio__book--summary" style={{ fontSize: "16px" }}>
          <BookSummary book={book} />
        </div>
        <AudioPlayer book={book} />
      </div>
    </>
  );
};

export default page;
