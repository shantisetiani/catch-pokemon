import React from 'react'
import styled from "@emotion/styled";

function Break(props) {
    const Break = styled.div`
        height: ${props.height}px;
        width: 100%;
    `;

    return (
        <Break></Break>
    )
}

export default Break
