import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SignInDetails } from '../../../types/SignInDetails';
import { signIn } from '../../../actions/users/SignIn';

type companyDataForm = {};

const CompanyDataForm: React.FC<companyDataForm> = () => {
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const signInDetails: SignInDetails = {
            email: data.get('email') as string,
            password: data.get('password') as string,
        };

        dispatch(signIn(signInDetails));
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
            />
            <FormControlLabel
                control={<Checkbox color='primary' id='remember' name='remember' />}
                label='Remember me'
            />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign In
            </Button>
        </Box>
    );
};

export default CompanyDataForm;
