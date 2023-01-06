import React from 'react';
import chatIcon from '../../assets/icones/icon-chat.png';
import './FeatureItem.css'

const FeatureItem = (props) => {
    return (
        <div className="feature-item">
        <img src={props.icon} alt="Chat Icon" className="feature-icon"></img>
        <h3 className="feature-item-title">{props.title}</h3>
        <p>{props.content}</p>
    </div>
    );
};

export default FeatureItem;