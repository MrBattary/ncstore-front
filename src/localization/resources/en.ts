const en = {
    navBar: {
        search: 'Search...',
        unauthorized: {
            signIn: 'Sign in',
            signUp: 'Sign up',
        },
        authorized: {
            profile: 'Profile',
            signOut: 'Sign out',
            balance: 'Balance',
        },
    },
    homePage: {
        best: 'Best discount',
        new: 'New in the store',
        free: 'Free',
        forYou: 'For You',
    },
    signIn: {
        pageName: 'Sign In',
        form: {
            email: {
                label: 'Email',
                required: 'Please enter your email!',
                error: 'Please enter the correct email!',
            },
            password: {
                label: 'Password',
                required: 'Please enter password!',
            },
            submit: {
                label: 'Sign in',
            },
            register: {
                text: 'Don`t have an account yet?',
                link: 'Register instead',
            },
        },
    },
    signUp: {
        pageName: 'Sign Up',
        success: 'Successfully registered!',
        tabs: {
            common: {
                email: {
                    label: 'Email',
                    required: 'Please enter your email!',
                    error: 'Please enter the correct email!',
                },
                password: {
                    label: 'Password',
                    required: 'Please enter password!',
                    error: 'Password must be minimum 8 characters!',
                },
                passwordConfirm: {
                    label: 'Confirm Password',
                    required: 'Please confirm password!',
                    error: 'The two passwords that you entered do not match!',
                },
                roles: {
                    label: 'Roles',
                    error: 'Please choose at least one role!',
                    customer: 'Customer',
                    supplier: 'Supplier',
                    help: {
                        first: 'Customer - can purchase software',
                        second: 'Supplier - can sell software, but additional information may be required',
                    },
                },
                submit: {
                    label: 'Sign up',
                },
                register: {
                    text: 'Already have an account?',
                    link: 'Sign in instead',
                },
            },
            person: {
                tabName: 'Person',
                nickname: {
                    label: 'Nickname',
                    required: 'Please enter your nickname!',
                },
                firstname: {
                    label: 'Firstname',
                    required: 'Please enter your firstname!',
                },
                lastname: {
                    label: 'Lastname',
                    required: 'Please enter your lastname!',
                },
                birthday: {
                    label: 'Birthday',
                    required: 'Please select date!',
                },
            },
            company: {
                tabName: 'Company',
                companyName: {},
            },
        },
    },
};

export default en;
