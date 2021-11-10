import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {signUpCompany} from "../../../actions/users/SignUp";
import {CompanySignUpDetails} from "../../../types/SignUpDetails";
import {UserRole} from "../../../types/UserRole";


type companyDataForm = {};

const CompanyDataForm: React.FC<companyDataForm> = () => {
    const dispatch = useDispatch();

    const formValues = {
        email: '',
        password: '',
        passwordRetype: '',
        companyName: '',
        foundationDate: null,
    };
    const formErrorsText = {
        email: '',
        password: '',
        passwordRetype: '',
        companyName: '',
        foundationDate: '',
    };
    const formErrors = {
        email: false,
        password: false,
        passwordRetype: false,
        companyName: false,
        foundationDate: false,
    }

    const [values, setValues] = useState(formValues);
    const [errorsText, setErrorsText] = useState(formErrorsText);
    const [errors, setErrors] = useState(formErrors);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        validate( name, value)
    }

    const validate = (name: string, value: string) => {
        let tempErrorsText = { ...errorsText }
        let tempErrors = { ...errors }
        let wasSuccess = true
        if (name === 'email'){
            tempErrors.email = !(value.length > 0)
            tempErrorsText.email = !tempErrors.email ? "" : "This field is required."
            wasSuccess = !tempErrors.email
        }
        if (name === 'email') {
            if(tempErrorsText.email.length === 0) {
                tempErrors.email = !(/$^|.+@.+..+/).test(value)
                tempErrorsText.email = !tempErrors.email ? "" : "Email is not valid."
            }
            wasSuccess = !tempErrors.email
        }
        if (name === 'password') {
            tempErrors.password = !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value)
            tempErrorsText.password = !tempErrors.password ? "" : "Not meet requirements."
            wasSuccess = !tempErrors.password
        }
        if (name === 'passwordRetype') {
            tempErrors.passwordRetype = values.password !== value
            tempErrorsText.passwordRetype = !tempErrors.passwordRetype ? "" : "Passwords dont match."
            wasSuccess = !tempErrors.passwordRetype
        }
        if(name === 'companyName'){
            tempErrors.companyName =  !(value.length > 0)
            tempErrorsText.companyName = !tempErrors.companyName ? "" : "This field is required."
            wasSuccess = !tempErrors.companyName
        }

        setErrorsText({
            ...tempErrorsText
        })
        setErrors({
            ...tempErrors
        })

        return wasSuccess
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let isValidated = true;

        isValidated = isValidated && validate('email', data.get('email') as string)
        isValidated = isValidated && validate('password', data.get('password') as string)
        isValidated = isValidated && validate('passwordRetype', data.get('passwordRetype') as string)
        isValidated = isValidated && validate('companyName', data.get('companyName') as string)

        if(isValidated) {
            const signUpDetails : CompanySignUpDetails = {
                email: data.get('email') as string,
                companyName: data.get('companyName') as string,
                foundationDate: data.get('foundationDate') === '' ? null : new Date(data.get('foundationDate') as string),
                password: data.get('password') as string,
                roles: data.get('supplier') === null ? [UserRole.CUSTOMER] : [UserRole.CUSTOMER, UserRole.SUPPLIER]
            }

            dispatch(signUpCompany(signUpDetails))
        }
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <TextField id="email" name="email" label="E-mail" variant="outlined" fullWidth required autoFocus
                       autoComplete="email" margin="normal"
                       value={values.email}
                       onChange={handleInputChange}
                       helperText={errorsText.email}
                       error={errors.email}/>
            <TextField id="password" name="password" label="Password" variant="outlined" type="password" fullWidth required
                       margin="normal"
                       value={values.password}
                       onChange={handleInputChange}
                       helperText={errorsText.password}
                       error={errors.password}/>
            <TextField id="passwordRetype" name="passwordRetype" label="Re-enter password" variant="outlined" type="password"
                       fullWidth required margin="normal"
                       value={values.passwordRetype}
                       onChange={handleInputChange}
                       helperText={errorsText.passwordRetype}
                       error={errors.passwordRetype}/>
            <TextField id="companyName" name="companyName" label="Company name" variant="outlined" fullWidth required
                       margin="normal"
                       value={values.companyName}
                       onChange={handleInputChange}
                       helperText={errorsText.companyName}
                       error={errors.companyName}/>
            <TextField id="foundationDate" name="foundationDate" label="Birthday" type="date" fullWidth margin="normal"
                       value={values.foundationDate}
                       onChange={handleInputChange}/>
            <FormControlLabel
                control={
                    <Checkbox color="primary" id="supplier" name="supplier"/>
                }
                label="Become supplier"
            />

            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign Up
            </Button>
        </Box>
    );
};

export default CompanyDataForm;