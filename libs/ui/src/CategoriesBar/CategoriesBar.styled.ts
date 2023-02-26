import styled from "styled-components";
import Link from "next/link";

export const CategoriesBarWrapper = styled.section`
    width: 100%;
    padding: 2rem 0;
    border-top:  dotted ${({theme}) => theme.palette.black};
    border-bottom:  dotted ${({theme}) => theme.palette.black};
`

export const ItemsList = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
`

export const ListElement = styled.li`

`

export const ListLink = styled(Link)`
    text-decoration: none;
`