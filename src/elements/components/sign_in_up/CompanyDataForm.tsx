import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";


type companyDataForm = {};

const CompanyDataForm: React.FC<companyDataForm> = () => {
    const formValues = {
        email: '',
        password: '',
        passwordRetype: '',
        companyName: '',
        foundationDate: null,
        supplier: false,
    };
    const formErrorsText = {
        email: '',
        password: '',
        passwordRetype: '',
        companyName: '',
        foundationDate: '',
        supplier: '',
    };
    const formErrors = {
        email: false,
        password: false,
        passwordRetype: false,
        companyName: false,
        foundationDate: false,
        supplier: false,
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
            tempErrorsText.email = value.length > 0 ? "" : "This field is required."
            tempErrors.email = !(value.length > 0)
            wasSuccess = tempErrors.email
        }
        if (name === 'email') {
            if(tempErrorsText.email.length === 0) {
                tempErrorsText.email = (/$^|.+@.+..+/).test(value) ? "" : "Email is not valid."
                tempErrors.email = !(/$^|.+@.+..+/).test(value)
            }
            wasSuccess = tempErrors.email
        }
        if (name === 'password') {
            tempErrorsText.password = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value) ? "" : "Not meet requirements."
            tempErrors.password = !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value)
            wasSuccess = tempErrors.password
        }
        if (name === 'passwordRetype') {
            tempErrorsText.passwordRetype = values.password === value ? "" : "Passwords dont match."
            tempErrors.passwordRetype = values.password !== value
            wasSuccess = tempErrors.passwordRetype
        }
        if(name === 'companyName'){
            tempErrorsText.companyName = value.length > 0 ? "" : "This field is required."
            tempErrors.companyName =  !(value.length > 0)
            wasSuccess = tempErrors.companyName
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
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            supplier: data.get('supplier')
        });
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
                    <Checkbox color="primary" id="supplier" name="supplier"
                                   value={values.supplier}/>
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