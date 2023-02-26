import styled from "styled-components";
import Image from 'next/image'

export const IconWrapper = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-height: 4rem;
`

export const IconImage = styled(Image)`
    max-width: 4rem;
    max-height: 4rem;
    transition: 0.1s ease-in-out;
    transition-property: transform;

    &:hover {
    transform: scale(1.1);
  }
`

export const IconDescritpion = styled.p`
font-size: 1.6rem;
padding-top: 5px;
color: ${({theme}) => theme.palette.black};
`