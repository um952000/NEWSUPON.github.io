import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export class news extends Component {

    static defaultProps={
        country: 'in',
        pageSize: 8,
        category: 'general'

    }

    static propTypes={

        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor(){
        super();
        console.log("Hello I am a constructor from news component.");
        this.state={
            articles: [],
            loading: true,
            page:1
        }
    }

   async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6bc221dd167b4e8abfca66e1f50f938b&page=1
            &pageSize=${this.props.pageSize}`;
            
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
                       totalResults: parsedData.totalResults,
                       loading:false
        });
    }

    handlePrevClick= async()=>{

    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6bc221dd167b4e8abfca66e1f50f938b&page=${this.state.page-1}
    &pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
       
        });
    }

    handleNextClick= async()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        

        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6bc221dd167b4e8abfca66e1f50f938b&page=${this.state.page+1}
        &pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
           
            });
        }
    }
  
  render() {
    return (

        <div className="container my-3">
        <h1 className='text-center' style={{margin: '35px 0px'}}>News Monkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}

    <div className='row'>
   
        {/* looping through an array */}

            {!this.state.loading && this.state.articles.map((element)=>{

            return <div className='col-md-4' key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl=
            {element.urlToImage} url={element.url}/>
            </div>
       
        })}
    </div>
    <div className="container d-flex justify-content-between">
    <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePrevClick}>&larr; prev</button>
    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-success" onClick={this.handleNextClick}>next &rarr;</button>
    </div>
    </div>
    
    )
  }
}

export default news