//import { getByTitle } from '@testing-library/react'
import React, { Component } from 'react'

export class NewsItem extends Component {
   
  
   
   
    render() {

        let {title , description,imageUrl, newsUrl , author , date }=  this.props;


        return (
            <div className="my-3">
                                
                <div className="card" >

                <div  style={{display: 'flex',
                justifyContent:'flex-end',
                position:'absolute',
                right:'0'
                            }} >

                <span className="badge rounded-pill bg-danger" > </span>
               

                </div>

                <img src={!imageUrl?"https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/13AF9/production/_121833608_gettyimages-1344060699.jpg":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title"> {title}  </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small class="text-muted">BY {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a  rel="noreferrer" href={newsUrl}  target="blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
                </div>
  
            </div>
        )
    }
}

export default NewsItem
