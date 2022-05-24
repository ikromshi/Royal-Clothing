import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
    password: "",
    email: ""
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log("Response: ", response);
            resetFormFields();   
        } 
        catch(error) {

        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };
    
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign-in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className="buttons-container">
                    <Button type="submit">Sign-in</Button>
                    <Button buttonType="google" onClick={signInWithGoogle}>Google Sign-in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;