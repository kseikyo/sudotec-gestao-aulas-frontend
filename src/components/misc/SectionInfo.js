import React from 'react'

function SectionInfo({title, subtitle, hasBorder=false}){
        function border() {
            return (
                hasBorder ? {borderRight: "1px solid #ccc", paddingRight: '20px', marginRight: '10px'}
                 : {paddingRight: '20px', marginRight: '10px'}
            );
        }
        return (
            <div className="section-info d-flex" style={border()}>
                <div>
                    <span className="title">{title}</span>
                    <span className="subtitle">{subtitle}</span>
                </div>
            </div>
        )
}

export default SectionInfo;