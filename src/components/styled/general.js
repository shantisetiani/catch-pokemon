import styled from "@emotion/styled"

const colorPrimary = '#f65e2f'
const colorPrimaryDark = '#e74615'
const black = '#000000'

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