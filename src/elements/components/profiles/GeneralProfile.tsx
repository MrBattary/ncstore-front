import React from 'react';
import {History} from 'history';

import BusinessIcon from '@mui/icons-material/Business';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Avatar, Box, Container, List, ListItem, ListItemText, Paper, Stack, Typography} from '@mui/material';

import {PersonProfile} from '../../../types/PersonProfile';
import {CompanyProfile} from '../../../types/CompanyProfile';
import {UserRole} from '../../../types/UserRole';

type profileProps = {
    history: History;
    profile: PersonProfile | CompanyProfile;
};

const Profile: React.FC<profileProps> = ({history, profile}) => {
    const renderTypographyInProfile = (data: any) => (
        <Typography align="center" component='h1' variant='h5'>
            {data}
        </Typography>
    );

    const renderHeaderTypographyInProfile = (data: any) => (
        <Typography align="center" variant='h4'>
            {data}
        </Typography>
    );

    const renderPersonNickname = () => {
        if ((profile as PersonProfile).nickName) {
            return (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{bgcolor: 'secondary.main', marginTop: 2, width: 140, height: 140}}>
                        <AccountCircle sx={{width: 120, height: 120}}/>
                    </Avatar>
                    <Typography align="center" variant='h3'>
                        {(profile as PersonProfile).nickName}
                    </Typography>
                </Box>
            );
        }
    };

    const renderCompanyName = () => {
        if ((profile as CompanyProfile).companyName) {
            return (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{bgcolor: 'secondary.main', marginTop: 2, marginBottom: 4, width: 140, height: 140}}>
                        <BusinessIcon sx={{width: 120, height: 120}}/>
                    </Avatar>
                    <Typography align="center" variant='h3'>
                        {(profile as CompanyProfile).companyName}
                    </Typography>
                </Box>
            );
        }
    };

    const renderCompanyDescription = () => {
        if ((profile as CompanyProfile).description) {
            return (
                <div>
                    {renderHeaderTypographyInProfile("About company")}
                    {renderTypographyInProfile((profile as CompanyProfile).description)}
                </div>
            );
        }
    };

    const renderPersonNames = () => {
        if ((profile as PersonProfile).firstName && (profile as PersonProfile).lastName) {
            return renderTypographyInProfile(
                <>
                    {renderHeaderTypographyInProfile("First name")}
                    {renderTypographyInProfile((profile as PersonProfile).firstName)}
                    {renderHeaderTypographyInProfile("Last name")}
                    {renderTypographyInProfile((profile as PersonProfile).lastName)}
                </>
            );
        }
        if ((profile as PersonProfile).firstName) {
            return renderTypographyInProfile(
                <>
                    {renderHeaderTypographyInProfile("First name")}
                    {renderTypographyInProfile((profile as PersonProfile).firstName)}
                </>
            );
        }
        if ((profile as PersonProfile).lastName) {
            return renderTypographyInProfile(
                <>
                    {renderHeaderTypographyInProfile("Last name")}
                    {renderTypographyInProfile((profile as PersonProfile).lastName)}
                </>
            );
        }
    };

    const renderPersonBirthday = () => {
        if ((profile as PersonProfile).birthday) {
            return renderTypographyInProfile(
                <>
                    {renderHeaderTypographyInProfile("Birthday")}
                    {renderTypographyInProfile((profile as PersonProfile).birthday)}
                </>
            );
        }
    };

    const renderCompanyFoundationDate = () => {
        if ((profile as CompanyProfile).foundationDate) {
            return renderTypographyInProfile(
                <>
                    {renderHeaderTypographyInProfile("Foundation date")}
                    {renderTypographyInProfile((profile as CompanyProfile).foundationDate)}
                </>
            );
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

    return (
        <Container>
            <Paper elevation={10}>
                <Box sx={{
                    marginTop: 8,
                    paddingTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Stack spacing={5}>
                        {renderPersonNickname()}
                        {renderCompanyName()}
                        {renderCompanyDescription()}
                        {renderPersonNames()}
                        {renderPersonBirthday()}
                        {renderCompanyFoundationDate()}
                        <List>{renderRolesList()}</List>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;
