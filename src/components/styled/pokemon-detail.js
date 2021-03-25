import styled from "@emotion/styled"
import {
    totalFontSize,
    black,
    red,
    borderColor,
    boxShadowColor
} from './constants'


export const PokemonImageSection = styled.span`
    display: block;
    text-align: center;
`;

export const PokemonImage = styled.img`
    width: 100%;
    max-width: 300px;
`;

export const DetailContent = styled.section`
    padding: 25px 30px 30px;
    border-bottom: 1px solid ${borderColor};
`;

export const DetailListItem = styled.span`
    display: list-item;
    list-style-type: disc;
    list-style-position: inside;
    text-transform: capitalize;
`;

export const ButtonContainer = styled.div`
    position: fixed;
    bottom: 0;
    background-color: #FFF;
    width: 100%;
    box-shadow: 0 0 5px 1px ${boxShadowColor};
    padding: 20px 10px;

    @media (min-width: 993px) {
        width: 30%;
        right: 15px;
        bottom: 15%;
    }

    button {
        width: 100%;
        height: 40px;
        border-radius: 20px;
    }
`;

export const TotalSection = styled.div`
    width: 100%;
    color: ${black};

    @media (min-width: 993px) {
        margin-bottom: 30px;
    }
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