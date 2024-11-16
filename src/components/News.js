import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  captialFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.captialFirstLetter(this.props.category)} - InformedNow`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=04f11e2d06d34b5d8cae650d1e16a2d6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=04f11e2d06d34b5d8cae650d1e16a2d6&page=${nextPage}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: nextPage,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center my-3">
          InformedNow - Top {this.captialFirstLetter(this.props.category)} Headlines
        </h1>

        {this.state.loading && <Loader />}

        <InfiniteScroll
          dataLength={this.state.articles.length} // Current length of articles
          next={this.fetchMoreData} // Function to fetch more data
          hasMore={this.state.articles.length < this.state.totalResults} // Checks if more data is available
          loader={<Loader />} // Show loader during data fetch
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : "Title Not available"}
                  description={
                    element.description ? element.description.slice(0, 60) : "Description Not available"
                  }
                  newsurl={element.url ? element.url : "News Not available"}
                  imgurl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg"
                  }
                  publishedAt={element.publishedAt ? element.publishedAt : "Publish time not available"}
                  author={element.author ? element.author : "Unknown"}
                  source={element.source.name ? element.source.name : "Unknown"}
                />
              </div>
            ))}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

News.defaultProps = {
  country: "us",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
