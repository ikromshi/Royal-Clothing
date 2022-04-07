import "./form-input.styles.scss";


const FormInput = ({ label, ...otherProps}) => {
    return (
        <div className="group">
            {label && 
                <><input className="form-input" {...otherProps} />
                <label className={`${otherProps.value.length ? "shrink" : null} form-input-label`}>{label}</label></>
            }
        </div>
    )
}

export { FormInput as default };

{/* label if the user entered smth, give it the className of "shrink", or set it to null */}
