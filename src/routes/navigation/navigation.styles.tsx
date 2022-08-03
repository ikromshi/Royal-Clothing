import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.div`
  padding: 5px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`
// Styling over an existing component
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`
export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const NavLink = styled(Link)`  
  padding: 10px 15px;
  cursor: pointer;
`