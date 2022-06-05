import { useState, useContext } from "react";
import { signInWithGooglePopup, createUserDocFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

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
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();   
        } 
        catch(error) {
            switch(error.code){
                case "auth/wrong-password":
                    alert("Incorrect password or email address");
                    break;
                case "auth/user-not-found":
                    alert("User with this address doesn't exist");
                    break;
                default:
                    console.log(error);
            }
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
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign-in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;