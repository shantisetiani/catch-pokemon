import styled from "@emotion/styled"

const totalFontSize = '18px'
const black = '#000000'
const red = '#e21212'

export const TotalSection = styled.div`
    width: 100%;
    color: ${black};
`;

export const TotalLabel = styled.div`
    float: left;
    font-weight: bold;
    font-size: ${totalFontSize};
`;

export const TotalValue = styled.div`
    float: right;
    font-weight: bold;
    font-size: ${totalFontSize};
`;

export const ErrorMessage = styled.div`
    color: ${red};
    font-size: 12px;
`;