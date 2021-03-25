import styled from "@emotion/styled"
import {
    colorPrimary,
    colorPrimaryDark,
    black,
    white,
    borderColor,
    boxShadowColor
} from './constants'

export const Tabs = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${borderColor};
    background-color: ${white};
    
    @media (max-width: 992px) {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        box-shadow: 0 0 5px 1px ${boxShadowColor};
    }

    .tabpane {
        padding: 12px 0;
        width: 50%;
        text-align: center;

        a {
            color: ${colorPrimary};

            &:focus, &:active {
                font-weight: bold;
                text-decoration: underline;
            }
        }

        &.active {
            a {
                font-weight: bold;
                text-decoration: underline;
            }
        }
    }

    .tabpane-divider {
        border-right: 1px solid ${borderColor};
    }
`;

export const PokemonName = styled.h3`
    text-transform: capitalize;
    color: ${colorPrimary};
    &:hover {
        color: ${colorPrimaryDark};
    }
`;

export const LinkText = styled.span`
    cursor: pointer;
    &:hover {
        color: ${black}
    }
`;