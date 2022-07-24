import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { selectCurrentUser  } from "../../store/user/user.selector";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const Navigation = () => {
    const dispatch = useDispatch();

    const signOutUser = () => dispatch(signOutStart());
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <CrwnLogo className="logo"/>
            </LogoContainer>
            <NavLinks>
                <NavLink to="/shop">
                    SHOP
                </NavLink>
                {currentUser ? (
                        <NavLink as="span" onClick={signOutUser}>SIGN-OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">
                             SIGN-IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            { isCartOpen && <CartDropdown /> }
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;