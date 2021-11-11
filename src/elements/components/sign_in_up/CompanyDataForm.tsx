import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signUpCompany } from '../../../actions/users/SignUp';
import { CompanySignUpDetails } from '../../../types/SignUpDetails';
import { UserRole } from '../../../types/UserRole';
import { validateField, validateFormData, validatePasswordsEquality } from '../../../utils/SignUpValidator';

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
    };

    const [values, setValues] = useState(formValues);
    const [errorsText, setErrorsText] = useState(formErrorsText);
    const [errors, setErrors] = useState(formErrors);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        let validatorVerdict;

        if (name === 'passwordRetype') {
            validatorVerdict = validatePasswordsEquality(values.password, value);
        } else {
            validatorVerdict = validateField(name, value);
        }

        setErrorsText({
            ...errorsText,
            [name]: validatorVerdict.errorText,
        });
        setErrors({
            ...errors,
            [name]: !validatorVerdict.isValid,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        let validatorVerdict = validateFormData(data);

        if (validatorVerdict.isValidated) {
            const signUpDetails: CompanySignUpDetails = {
                email: data.get('email') as string,
                companyName: data.get('companyName') as string,
                foundationDate:
                    data.get('foundationDate') === '' ? null : new Date(data.get('foundationDate') as string),
                password: data.get('password') as string,
                roles: data.get('supplier') === null ? [UserRole.CUSTOMER] : [UserRole.CUSTOMER, UserRole.SUPPLIER],
            };

            dispatch(signUpCompany(signUpDetails));
        } else {
            setErrors({
                ...errors,
                ...validatorVerdict.validatorErrors,
            });
            setErrorsText({
                ...errorsText,
                ...validatorVerdict.validatorErrorsText,
            });
        }
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <TextField
                id='email'
                name='email'
                label='E-mail'
                variant='outlined'
                fullWidth
                required
                autoFocus
                autoComplete='email'
                margin='normal'
                value={values.email}
                onChange={handleInputChange}
                helperText={errorsText.email}
                error={errors.email}
            />
            <TextField
                id='password'
                name='password'
                label='Password'
                variant='outlined'
                type='password'
                fullWidth
                required
                margin='normal'
                value={values.password}
                onChange={handleInputChange}
                helperText={errorsText.password}
                error={errors.password}
            />
            <TextField
                id='passwordRetype'
                name='passwordRetype'
                label='Re-enter password'
                variant='outlined'
                type='password'
                fullWidth
                required
                margin='normal'
                value={values.passwordRetype}
                onChange={handleInputChange}
                helperText={errorsText.passwordRetype}
                error={errors.passwordRetype}
            />
            <TextField
                id='companyName'
                name='companyName'
                label='Company name'
                variant='outlined'
                fullWidth
                required
                margin='normal'
                value={values.companyName}
                onChange={handleInputChange}
                helperText={errorsText.companyName}
                error={errors.companyName}
            />
            <TextField
                id='foundationDate'
                name='foundationDate'
                label='Birthday'
                type='date'
                fullWidth
                margin='normal'
                InputLabelProps={{ shrink: true }}
                value={values.foundationDate ? values.foundationDate : ''}
                onChange={handleInputChange}
            />
            <FormControlLabel
                control={<Checkbox color='primary' id='supplier' name='supplier' />}
                label='Become supplier'
            />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign Up
            </Button>
        </Box>
    );
};

export default CompanyDataForm;
