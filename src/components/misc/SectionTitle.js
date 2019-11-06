import React from 'react';

function sectionSubtitle(subtitle) {
  if (subtitle) {
    return (<span className="subtitle">{subtitle}</span>);
  }
}

function SectionTitle({icon, title, subtitle, iconPrefix = 'icon-', className, variant}) {
  return (
    <div className={`section-title d-flex ${className} variant-${variant}`}>
      <div className={`icon ${iconPrefix}${icon}`}></div>
      <div>
        <span className="title">{title}</span>
          {sectionSubtitle(subtitle)}
      </div>
    </div>
  );
}

export default SectionTitle;