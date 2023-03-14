import React, { Component } from 'react'

export class Newsitem extends Component {



  render() {


    //declaring class based props variable.........
    let {title, description,imageUrl,url} = this.props;


    return (
    <div className='my-3'>
    <div className="card">
    <img src={imageUrl?imageUrl:"https://techcrunch.com/wp-content/uploads/2022/09/GettyImages-1331215115.jpg?w=1200imageUrl"} className="card-img-top" alt="..."/>
    <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}...</p>
    <a href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
    </div>
    </div>
    </div>
    )
  }
}

export default Newsitem