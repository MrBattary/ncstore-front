import React, {useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, TextField} from "@mui/material";

type personDataForm = {};

const PersonDataForm: React.FC<personDataForm> = () => {
    const [viewSupplierField, setViewSupplierField] = useState(false);

    const addSupplierDependentFields = (newState: boolean) => {
        setViewSupplierField(newState);
    }

    const renderAdditional = () => {
        if (viewSupplierField) {
            return (
                <>
                    <TextField id="first-name" name='first-name' label="First name" variant="outlined" fullWidth
                               margin="normal" required/>
                    <TextField id="last-name" name='last-name' label="Last name"
                               variant="outlined" fullWidth
                               margin="normal" required/>
                    <TextField id="birthday" name="birthday"
                               label="Birthday" type="date"
                               fullWidth margin="normal" required/>
                </>
            );
        } else {
            return (<></>);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            birthday: data.get('birthday'),
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
            <TextField id="email" name='email' label="E-mail" variant="outlined" fullWidth required autoFocus
                       autoComplete="email" margin="normal"/>
            <TextField id="password" name='password' label="Password" variant="outlined" type="password" fullWidth
                       required margin="normal"/>
            <TextField id="password-retype" name='password-retype' label="Re-enter password" variant="outlined"
                       type="password" fullWidth required margin="normal"/>
            <TextField id="nickname" name='nickname' label="Nickname" variant="outlined" fullWidth required
                       margin="normal"/>
            <FormControlLabel
                control={<Checkbox color="primary" id="supplier" name="supplier" onChange={e => {addSupplierDependentFields(e.target.checked)}} />}
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