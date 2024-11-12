import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title,description,imgurl,newsurl} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src={!imgurl?"https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg":imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsurl} target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
