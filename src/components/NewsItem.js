import React from "react";
import "./card.css";

function Card({ imgurl, author, title, description, newsurl, publishedAt, source }) {
  // Get current date and the published date
  const currentDate = new Date();
  const publishedDate = new Date(publishedAt);

  // Calculate the difference in hours
  const timeDifference = (currentDate - publishedDate) / (1000 * 60 * 60); // Difference in hours

  // Check if the news is within 24 hours
  const isNew = timeDifference <= 30;

  return (
    <a
      href={newsurl}
      rel="noreferrer"
      target="_blank"
      className="card-link-wrapper"
      style={{textDecoration:"none"}}
    >
      <div className="card card-wrapper">
        {/* Show NEW badge if the article was published within the last 24 hours */}
        {isNew && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            NEW
            <span className="visually-hidden">unread messages</span>
          </span>
        )}
        <p className="card-header">From: {source}</p>
        <div className="image-wrapper">
          <img
            src={
              !imgurl
                ? "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
                : imgurl
            }
            alt="..."
            className="card-image"
          />
          <div className="overlay-content">By {author}</div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={newsurl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-danger btn-sm"
          >
            Read More
          </a>
          <p className="card-text mt-3">
            <small className="text-muted">
              Published on: {new Date(publishedAt).toGMTString()}
            </small>
          </p>
        </div>
      </div>
    </a>
  );
}

export default Card;
