import React from 'react'

function Box4 (props) {

    const baseURL = 'http://NavBuild-env.jc2sppyffu.us-east-1.elasticbeanstalk.com/';

    return (
        
<div className={'box4'}>
<figure className={'modalFigure'}>
    <img 
        src={`${baseURL}${props.data}`}
        className={'modalImage'}
    />
    <figcaption>Professor's Picks <br/> 
        <span className={'profPick'}>{props.caption}</span>
    </figcaption>
</figure>  
</div>
    )
}

export default Box4;