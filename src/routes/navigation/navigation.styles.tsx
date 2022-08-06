import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.div`
  padding: 5px;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    heigh: 60px;
    margin-bottom: 20px;
    padding: 10px   
  }
`
// Styling over an existing component
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
`
export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`
export const NavLink = styled(Link)`  
  padding: 10px 15px;
  cursor: pointer;
`