import { useState } from "react";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    console.log(formFields);
    const handleChange = (event) => {
        const { name } = event.target;
        setFormFields({...formFields, [name]: event.target.value});
    };
    
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form action="" onSubmit={() => {}}>
                <label htmlFor="">Display Name</label>
                <input type="text" required name="displayName" onChange={handleChange}/>

                <label htmlFor="">Email</label>
                <input type="email" required name="email" onChange={handleChange}/>

                <label htmlFor="">Password</label>
                <input type="password" required name="password" onChange={handleChange}/>

                <label htmlFor="">Confirm Password</label>
                <input type="password" required name="confirmPassword" onChange={handleChange}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;