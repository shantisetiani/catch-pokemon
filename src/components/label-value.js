import React from 'react'

function LabelValue({ span, label, value }) {
    return (
        <div span={ span } className="" style={{ marginBottom: 5 }}>
            <h5 style={{ textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>{ label }</h5>
            <p style={{ textTransform: 'capitalize' }}>{ value }</p>
        </div>
    )
}

export default LabelValue
