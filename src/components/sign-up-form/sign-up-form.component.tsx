import {SignUpContainer, NoAccount} from "./sign-up-form.styles";
import { signUpStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";
import { ChangeEvent, FormEvent, useState } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        };

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();   
        } 
        catch(error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("Email already in use")
            } else {
                console.log("user creation ecnountered an error: ", error);
            }
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };
    
    return (
        <SignUpContainer>
            <NoAccount>Don't have an account?</NoAccount>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput  
                    label="Display Name"
                    type="text" 
                    required name="displayName" 
                    onChange={handleChange} 
                    value={displayName}
                
                />
                <FormInput 
                    label="Email"
                    type="email" 
                    required name="email" 
                    onChange={handleChange} 
                    value={email}
                />
                <FormInput 
                    label="Password"
                    type="password" 
                    required name="password" 
                    onChange={handleChange} 
                    value={password}
                />
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required name="confirmPassword" 
                    onChange={handleChange} 
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;