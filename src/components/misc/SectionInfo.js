import React from 'react'

function SectionInfo({title, subtitle}){
        return (
            <div className="section-info d-flex">
                <div>
                    <span className="title">{title}</span>
                    <span className="subtitle">{subtitle}</span>
                </div>
            </div>
        )
}

export default SectionInfo;