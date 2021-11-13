import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { PersonSignUpDetails } from '../../../types/SignUpDetails';
import { UserRole } from '../../../types/UserRole';
import { signUpPerson } from '../../../actions/users/SignUp';
import { validateField, validateFormData, validatePasswordsEquality } from '../../../utils/SignUpValidator';

type personDataFormProps = {};

const PersonDataForm: React.FC<personDataFormProps> = () => {
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

    const [viewSupplierField, setViewSupplierField] = useState(false);

    const addSupplierDependentFields = (newState: boolean) => {
        setViewSupplierField(newState);
    };

    const renderAdditional = () => {
        if (viewSupplierField) {
            return (
                <>
                    <TextField
                        id='firstName'
                        name='firstName'
                        label='First name'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        required
                        value={values.firstName}
                        onChange={handleInputChange}
                        helperText={errorsText.firstName}
                        error={errors.firstName}
                    />
                    <TextField
                        id='lastName'
                        name='lastName'
                        label='Last name'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        required
                        value={values.lastName}
                        onChange={handleInputChange}
                        helperText={errorsText.lastName}
                        error={errors.lastName}
                    />
                    <TextField
                        id='birthday'
                        name='birthday'
                        label='Birthday'
                        type='date'
                        fullWidth
                        margin='normal'
                        InputLabelProps={{ shrink: true }}
                        value={values.birthday ? values.birthday : ''}
                        onChange={handleInputChange}
                        helperText={errorsText.birthday}
                        error={errors.birthday}
                    />
                </>
            );
        } else {
            return <></>;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        let validatorVerdict = validateFormData(data);

        if (validatorVerdict.isValidated) {
            const signUpDetails: PersonSignUpDetails = {
                email: data.get('email') as string,
                password: data.get('password') as string,
                nickName: data.get('nickName') as string,
                firstName: data.get('firstName') as string,
                lastName: data.get('lastName') as string,
                birthday: data.get('birthday') === null ? null : new Date(data.get('birthday') as string),
                roles: data.get('supplier') === null ? [UserRole.CUSTOMER] : [UserRole.CUSTOMER, UserRole.SUPPLIER],
            };

            dispatch(signUpPerson(signUpDetails));
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
                id='nickName'
                name='nickName'
                label='Nickname'
                variant='outlined'
                fullWidth
                required
                margin='normal'
                value={values.nickName}
                onChange={handleInputChange}
                helperText={errorsText.nickName}
                error={errors.nickName}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        color='primary'
                        id='supplier'
                        name='supplier'
                        onChange={e => {
                            addSupplierDependentFields(e.target.checked);
                        }}
                    />
                }
                label='Become supplier'
            />
            {renderAdditional()}

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign Up
            </Button>
        </Box>
    );
};

export default PersonDataForm;
