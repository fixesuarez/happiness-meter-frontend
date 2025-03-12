import { NavLink as BaseNavLink } from "react-router";

import styled from "styled-components"

const Toolbar = styled.div`
    width: 100%;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
const NavLink = styled(BaseNavLink)`
    color: #fff;
    &:active, &:hover {
        color: #fff;
    }
`
const Title = styled.h1`
    padding: 8px 0;
`

export default function AppToolbar() {
    return (
        <Toolbar>
            <NavLink to="/profile">
                <Title>Bonheuromètre</Title>
            </NavLink>
        </Toolbar>
    )
}