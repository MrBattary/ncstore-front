import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {PersonSignUpDetails} from "../../../types/SignUpDetails";
import {UserRole} from "../../../types/UserRole";
import {signUpPerson} from "../../../actions/users/SignUp";

type personDataForm = {};

const PersonDataForm: React.FC<personDataForm> = () => {
    const dispatch = useDispatch();

    const formValues = {
        email: '',
        password: '',
        passwordRetype: '',
        nickName: '',
        firstName: '',
        lastName: '',
        birthday: null,
    };
    const formErrorsText = {
        email: '',
        password: '',
        passwordRetype: '',
        nickName: '',
        firstName: '',
        lastName: '',
        birthday: '',
    };
    const formErrors = {
        email: false,
        password: false,
        passwordRetype: false,
        nickName: false,
        firstName: false,
        lastName: false,
        birthday: false,
    }

    const [values, setValues] = useState(formValues);
    const [errorsText, setErrorsText] = useState(formErrorsText);
    const [errors, setErrors] = useState(formErrors);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        validate(name, value)
    }

    const validate = (name: string, value: string) => {
        let tempErrorsText = {...errorsText}
        let tempErrors = {...errors}
        let wasSuccess = true
        if (name === 'email') {
            tempErrors.email = !(value.length > 0)
            tempErrorsText.email = !tempErrors.email ? "" : "This field is required."
            wasSuccess = !tempErrors.email
        }
        if (name === 'email') {
            if (tempErrorsText.email.length === 0) {
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
        if (name === 'nickName') {
            tempErrors.nickName = !(value.length > 0)
            tempErrorsText.nickName = !tempErrors.nickName ? "" : "This field is required."
            wasSuccess = !tempErrors.nickName
        }
        if (name === 'firstName') {
            tempErrors.firstName = !(value.length > 0)
            tempErrorsText.firstName = !tempErrors.firstName ? "" : "This field is required."
            wasSuccess = !tempErrors.firstName
        }
        if (name === 'lastName') {
            tempErrors.lastName = !(value.length > 0)
            tempErrorsText.lastName = !tempErrors.lastName ? "" : "This field is required."
            wasSuccess = !tempErrors.lastName
        }
        if (name === 'birthday') {
            tempErrors.birthday = !(value.length > 0)
            tempErrorsText.birthday = !tempErrors.birthday ? "" : "This field is required."
            wasSuccess = !tempErrors.birthday
        }

        setErrorsText({
            ...tempErrorsText
        })
        setErrors({
            ...tempErrors
        })

        return wasSuccess
    }

    const [viewSupplierField, setViewSupplierField] = useState(false);

    const addSupplierDependentFields = (newState: boolean) => {
        setViewSupplierField(newState);
    }

    const renderAdditional = () => {
        if (viewSupplierField) {
            return (
                <>
                    <TextField id="firstName" name='firstName' label="First name" variant="outlined" fullWidth
                               margin="normal" required
                               value={values.firstName}
                               onChange={handleInputChange}
                               helperText={errorsText.firstName}
                               error={errors.firstName}/>
                    <TextField id="lastName" name='lastName' label="Last name"
                               variant="outlined" fullWidth
                               margin="normal" required
                               value={values.lastName}
                               onChange={handleInputChange}
                               helperText={errorsText.lastName}
                               error={errors.lastName}/>
                    <TextField id="birthday" name="birthday"
                               label="Birthday" type="date"
                               fullWidth margin="normal" required
                               value={values.birthday}
                               onChange={handleInputChange}
                               helperText={errorsText.birthday}
                               error={errors.birthday}/>
                </>
            );
        } else {
            return (<></>);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        let isValidated = true;

        isValidated = isValidated && validate('email', data.get('email') as string)
        isValidated = isValidated && validate('password', data.get('password') as string)
        isValidated = isValidated && validate('passwordRetype', data.get('passwordRetype') as string)
        isValidated = isValidated && validate('nickName', data.get('nickName') as string)
        if (data.get('supplier') !== null) {
            isValidated = isValidated && validate('firstName', data.get('firstName') as string)
            isValidated = isValidated && validate('lastName', data.get('lastName') as string)
            isValidated = isValidated && validate('birthday', data.get('birthday') as string)
        }

        console.log(data.get('birthday'))

        if (isValidated) {
            const signUpDetails: PersonSignUpDetails = {
                email: data.get('email') as string,
                password: data.get('password') as string,
                nickname: data.get('nickName') as string,
                firstName: data.get('firstName') as string,
                lastName: data.get('lastName') as string,
                birthday: data.get('birthday') === null ? null : new Date(data.get('birthday') as string),
                roles: data.get('supplier') === null ? [UserRole.CUSTOMER] : [UserRole.CUSTOMER, UserRole.SUPPLIER]
            }

            dispatch(signUpPerson(signUpDetails))
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
            <TextField id="email" name='email' label="E-mail" variant="outlined" fullWidth required autoFocus
                       autoComplete="email" margin="normal"
                       value={values.email}
                       onChange={handleInputChange}
                       helperText={errorsText.email}
                       error={errors.email}/>
            <TextField id="password" name='password' label="Password" variant="outlined" type="password" fullWidth
                       required margin="normal"
                       value={values.password}
                       onChange={handleInputChange}
                       helperText={errorsText.password}
                       error={errors.password}/>
            <TextField id="passwordRetype" name='passwordRetype' label="Re-enter password" variant="outlined"
                       type="password" fullWidth required margin="normal"
                       value={values.passwordRetype}
                       onChange={handleInputChange}
                       helperText={errorsText.passwordRetype}
                       error={errors.passwordRetype}/>
            <TextField id="nickName" name='nickName' label="Nickname" variant="outlined" fullWidth required
                       margin="normal"
                       value={values.nickName}
                       onChange={handleInputChange}
                       helperText={errorsText.nickName}
                       error={errors.nickName}/>
            <FormControlLabel
                control={<Checkbox color="primary" id="supplier" name="supplier" onChange={e => {
                    addSupplierDependentFields(e.target.checked)
                }}/>}
                label="Become supplier"
            />
            {renderAdditional()}

            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Sign Up
            </Button>
        </Box>
    );
};

export default PersonDataForm;