"use client";
import { useFontSize } from "@/context/FontSizeContext";

const BookSummary = ({ book }: { book: any }) => {
  const { fontSize } = useFontSize();

  const fontSizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px",
    xlarge: "20px",
  };

  return (
    <div className="audio__book--summary" style={{ fontSize: "16px" }}>
      <div className="audio__book--summary-title">{book.title}</div>
      <div
        className="audio__book--summary-text"
        style={{ fontSize: fontSizeMap[fontSize] }}
      >
        {book.summary}
      </div>
    </div>
  );
};

export default BookSummary;