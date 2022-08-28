import { SignUpContainer, HasAccount, ButtonsContainer } from "./sign-in-form.styles";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthError } from "firebase/auth";

const defaultFormFields = {
    password: "",
    email: ""
};

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();   
        } 
        catch(error) {
            switch((error as AuthError).code){
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    };
    
    return (
        <SignUpContainer>
            <HasAccount>Already have an account?</HasAccount>
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
                <ButtonsContainer>
                    <Button type="submit">Sign-in</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign-in</Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignInForm;