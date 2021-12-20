export const buildHeaderContentJson = () =>
    new Headers({
        'Content-Type': 'application/json',
    });

export const buildHeaderAcceptJson = () =>
    new Headers({
        Accept: 'application/json',
    });

export const buildHeaderToken = (token: string) =>
    new Headers({
        Authorization: `Bearer ${token}`,
    });

export const buildHeaderContentJsonAcceptJson = () =>
    new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
    });

export const buildHeaderTokenContentJson = (token: string) =>
    new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    });

export const buildHeaderTokenAcceptJson = (token: string) =>
    new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    });

export const buildHeaderTokenContentJsonAcceptJson = (token: string) =>
    new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    });

const headers = {
    buildHeaderAcceptJson,
    buildHeaderContentJson,
    buildHeaderToken,
    buildHeaderContentJsonAcceptJson,
    buildHeaderTokenContentJson,
    buildHeaderTokenAcceptJson,
    buildHeaderTokenContentJsonAcceptJson,
};

export default headers;
