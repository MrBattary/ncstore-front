import React, { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

import { AppState } from '../../../reducers/rootReducer';
import { restoreDefaultUserReducer } from '../../../actions/users/RestoreDefaultUserReducer';
import { getPersonProfile } from '../../../actions/users/GetPersonProfile';
import { getCompanyProfile } from '../../../actions/users/GetCompanyProfile';
import { UserType } from '../../../types/UserType';
import { PersonProfile } from '../../../types/PersonProfile';
import { CompanyProfile } from '../../../types/CompanyProfile';
import { UserRole } from '../../../types/UserRole';

type profileProps = {
    history: History;
};

const Profile: React.FC<profileProps> = ({ history }) => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { token, userType, profile, loading, errorMessage } = useSelector((state: AppState) => state.userReducer);

    useEffect(() => {
        if (errorMessage) {
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
            dispatch(restoreDefaultUserReducer());
        }
    }, [enqueueSnackbar, errorMessage, dispatch]);

    useEffect(() => {
        if (token) {
            switch (userType) {
                case UserType.PERSON: {
                    dispatch(getPersonProfile(token));
                    break;
                }
                case UserType.COMPANY: {
                    dispatch(getCompanyProfile(token));
                    break;
                }
            }
        }
    }, [token, userType, dispatch]);

    useEffect(() => {
        if (!token) {
            history.push('/signin');
        }
    }, [token, history]);

    const renderTypographyInProfile = (data: any) => (
        <Typography component='h1' variant='h4'>
            {data}
        </Typography>
    );

    const renderPersonNickname = () => {
        if ((profile as PersonProfile).nickName) {
            return renderTypographyInProfile((profile as PersonProfile).nickName);
        }
    };

    const renderCompanyName = () => {
        if ((profile as CompanyProfile).companyName) {
            return renderTypographyInProfile((profile as CompanyProfile).companyName);
        }
    };

    const renderCompanyDescription = () => {
        if ((profile as CompanyProfile).description) {
            return renderTypographyInProfile((profile as CompanyProfile).description);
        }
    };

    const renderPersonNames = () => {
        if ((profile as PersonProfile).firstName && (profile as PersonProfile).lastName) {
            return renderTypographyInProfile(
                (profile as PersonProfile).firstName.concat((profile as PersonProfile).lastName)
            );
        }
        if ((profile as PersonProfile).firstName) {
            return renderTypographyInProfile((profile as PersonProfile).firstName);
        }
        if ((profile as PersonProfile).lastName) {
            return renderTypographyInProfile((profile as PersonProfile).lastName);
        }
    };

    const renderPersonBirthday = () => {
        if ((profile as PersonProfile).birthday) {
            return renderTypographyInProfile((profile as PersonProfile).birthday);
        }
    };

    const renderCompanyFoundationDate = () => {
        if ((profile as CompanyProfile).foundationDate) {
            return renderTypographyInProfile((profile as CompanyProfile).foundationDate);
        }
    };

    const renderRolesList = () => {
        if (profile) {
            return profile.roles
                ? profile.roles.map((role: UserRole) => (
                      <ListItem>
                          <ListItemText
                              primary={(role: UserRole) => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                          />
                      </ListItem>
                  ))
                : null;
        }
    };

    return loading || !profile ? null : (
        <Container>
            <Paper>
                <Avatar sx={{ bgcolor: 'secondary.main', marginTop: 2 }}>
                    <LockOutlinedIcon />
                </Avatar>
                {renderPersonNickname()}
                {renderCompanyName()}
                {renderTypographyInProfile(profile.balance ? profile.balance : null)}
                {renderCompanyDescription()}
                {renderPersonNames()}
                {renderPersonBirthday()}
                {renderCompanyFoundationDate()}
                <List>{renderRolesList()}</List>
            </Paper>
        </Container>
    );
};

export default Profile;
