export const validatePasswordsEquality = (password: string, passwordRetype: string) => {
    let isValid: boolean = true;
    let errorText: string = '';

    if (password !== passwordRetype) {
        isValid = false;
        errorText = "Passwords must be equal"
    }
    return {isValid, errorText};
}

export const validateFormData = (formData: FormData) => {
    const fieldNames = ['password', 'companyName', 'email', 'nickName', 'firstName', 'lastName', 'birthday']
    let validatorErrorsText = {}
    let validatorErrors = {}
    let isValidated = true;

    for (let i = 0; i < fieldNames.length; i++) {
        let name = fieldNames[i]
        if (formData.has(name)) {
            let validatorVerdict = validateField(name, formData.get(name) as string)
            isValidated = isValidated && validatorVerdict.isValid

            validatorErrorsText = {...validatorErrorsText, [name]: validatorVerdict.errorText}
            validatorErrors = {...validatorErrors, [name]: !validatorVerdict.isValid}
        }
    }

    let validatorVerdict = validatePasswordsEquality(formData.get('password') as string, formData.get('passwordRetype') as string)
    validatorErrorsText = {...validatorErrorsText, 'passwordRetype': validatorVerdict.errorText}
    validatorErrors = {...validatorErrors, 'passwordRetype': !validatorVerdict.isValid}

    isValidated = isValidated && validatorVerdict.isValid

    return {validatorErrorsText, validatorErrors, isValidated};
}

export const validateField = (name: string, value: string) => {
    let isValid: boolean;
    let errorText: string;

    isValid = true
    errorText = ''

    if (name === 'email') {
        isValid = value.length > 0
        errorText = isValid ? "" : "This field is required."

        if (isValid) {
            //regex to validate email
            isValid = isValid && (/$^|.+@.+..+/).test(value)
            errorText = isValid ? "" : "Email is not valid."
        }
    }
    if (name === 'password') {
        //regex to validate password: minimum 8 symbols, 1 digit, 1 upper case, 1 lower case
        isValid = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).test(value)
        errorText = isValid ? "" : "Not meet requirements."
    }
    if (name === 'companyName') {
        isValid = value.length > 0
        errorText = isValid ? "" : "This field is required."
    }
    if (name === 'nickName') {
        isValid = value.length > 0
        errorText = isValid ? "" : "This field is required."
    }
    if (name === 'firstName') {
        isValid = value.length > 0
        errorText = isValid ? "" : "This field is required."
    }
    if (name === 'lastName') {
        isValid = value.length > 0
        errorText = isValid ? "" : "This field is required."
    }
    if (name === 'birthday') {
        isValid = value.length > 0
        errorText = isValid ? "" : "This field is required."
    }

    return {isValid, errorText};
}