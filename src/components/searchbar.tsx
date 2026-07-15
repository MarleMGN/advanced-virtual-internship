"use client";
import React, { useEffect, useState } from "react";
import "../components/searchbar.css";
import { useModal } from "@/context/ModalContext";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

const searchbar = () => {
  const { sidebarOpen, setSidebarOpen } = useModal();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [results, setResults] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data);
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/book/${id}`);
  };

  return (
    <>
      <div className="search__background">
        <div className="search__wrapper">
          <figure>
            <img src="logo" alt="" />
          </figure>
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  type="text"
                  placeholder="Search for books"
                  className="search__input"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <div className="search__icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <button
              className="sidebar__toggle--btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 15 15"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          {isOpen && results.length > 0 && (
            <div className="search__books--wrapper">
              {results.map((book) => (
                <a
                  key={book.id}
                  href={`/book/${book.id}`}
                  className="search__book--link"
                >
                  <figure
                    className="book__image--wrapper"
                    style={{ height: "80px", width: "80px", minWidth: "80px" }}
                  >
                    <img src={book.imageLink} alt="" className="book__image" />
                  </figure>
                  <div className="search__book--info">
                    <div className="search__book--title">{book.title}</div>
                    <div className="search__book--author">{book.author}</div>
                    <div className="search__book--duration">
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
                        <div className="recommended__book--details-text"></div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default searchbar;
