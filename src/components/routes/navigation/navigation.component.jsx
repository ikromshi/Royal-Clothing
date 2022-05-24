import { Fragment } from "react";
import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from "../../../assets/crown.svg";
import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const signOutHandler = async() => {
        const response = await signOutUser();
        setCurrentUser(null);
        console.log(response);
    }
    return (
      <Fragment>
        <div className="navigation">
            <Link className="navigation" to="/">
                <CrwnLogo className="logo"/>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                {currentUser ? (
                        <span className="nav-link" onClick={signOutHandler}>SIGN-OUT</span>
                    ) : (
                        <Link className="nav-link" to="/auth">
                             SIGN-IN
                        </Link>
                    )
                }
                
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;