import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: PropTypes.string,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: "general",
  };

   capitalizeFirstLetter =(string)=>{

    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0

      };
      document.title = `${this.capitalizeFirstLetter(this.props.category)}- Chatter News`;
    
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
  //  console.log(parsedData.totalResults);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    //we use this function to make code consice by declaring one function with common code
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handlePrevClick = async () => {
   

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };


   fetchMoreData =  async() => {
   
        this.setState({ page: this.state.page+1  })
            const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category=${this.props.category}&apikey=6832e30240cd446383847aa50e791a54&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData.totalResults);
            this.setState({
              articles: this.state.articles.concat(parsedData.articles),
              totalResults: parsedData.totalResults,
              
              
            })

  };

  render() {
    return (
      <>
        <h1 className="text-center">Chatter Nesw - Top  {this.capitalizeFirstLetter(this.props.category)} category</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          
          <div className="container">

        <div className="row">
          { this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}

        </div>
        </div> 
        </InfiniteScroll> 



          {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              {" "}
              &larr;Previous{" "}
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div> */}
       </>
      
    );
  }
}
