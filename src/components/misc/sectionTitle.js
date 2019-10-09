import React from 'react';

function subtitle(subtitle) {
  if (subtitle) {
    return (<span className="subtitle">{subtitle}</span>);
  } 
}

function SectionTitle(props) {
    return (
        <div>
          <div className="section-title d-flex">
            <div className={`icon icon-${props.icon}`}></div>
            <div>
              <span className="title">{props.title}</span>
              {subtitle(props.subtitle)}
            </div>
          </div>
        </div>
    );
}

export default SectionTitle;