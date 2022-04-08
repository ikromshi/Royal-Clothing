import "./navigation.styles.scss";

import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react"; // Wrapping elements with Fragment eqv of <> </>
import { ReactComponent as CrownLogo} from "../../assets/crown.svg"; {/** React allows SVG's to be imported as components */}

const Navigation = () => {
    return (
      <Fragment>
        <div className="navigation">
          <Link className="logo-container" to="/">
            <CrownLogo /> {/** Using the logo as a component */}
          </Link>
          <div className="nav-links-container">
            <Link className="nav-links" to="/shop">SHOP</Link>
            <Link className="nav-links" to="/auth">SIGN IN</Link>
          </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export { Navigation as default };