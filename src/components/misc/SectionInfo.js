import React from 'react'

function SectionInfo({title, subtitle, hasBorder=false}){
        function border() {
            return (
                hasBorder ? {borderRight: "1px solid #A4A4A4", paddingRight: '50px', marginRight: '50px'}
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