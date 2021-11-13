import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Tab, Typography, Tabs, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

import TabPanel from '../../components/tab_panel/TabPanel';
import SignUpPersonForm from '../../components/sign_in_up/PersonDataForm';
import SignUpCompanyForm from '../../components/sign_in_up/CompanyDataForm';
import { AppState } from '../../../reducers/rootReducer';
import { History } from 'history';

type signUpProps = {
    history: History;
};

const SignUp: React.FC<signUpProps> = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage);
        }
    }, [enqueueSnackbar, errorMessage]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Paper>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ bgcolor: 'secondary.main', marginTop: 2 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant='h4' sx={{ marginBottom: 4, marginTop: 1 }}>
                        Sign up
                    </Typography>
                    <Box
                        sx={{
                            background: 'white',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                                <Tab label='Person' />
                                <Tab label='Company' />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <SignUpPersonForm />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <SignUpCompanyForm />
                        </TabPanel>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;
