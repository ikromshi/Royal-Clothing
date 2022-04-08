/**
 * default (sign-up, check out)
 * inverted (buy items)
 * google sign-in (sign-in with google)
 */

import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted"
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export { Button as default };