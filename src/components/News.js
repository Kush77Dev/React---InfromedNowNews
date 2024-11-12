import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=04f11e2d06d34b5d8cae650d1e16a2d6";
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles });
  }
  render() {
    return (
      <div className="container my-3">
        <h2>informedNow - top Headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0, 45):"Title Not available"}
                  description={element.description?element.description.slice(0, 60):"Description Not available"}
                  newsurl={element.url?element.url:"News Not available"}
                  imgurl={element.urlToImage?element.urlToImage:"Image Not available"}
                />
              </div>
          })}
        </div>
      </div>
    )
  }
}

export default News;
