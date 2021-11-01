function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.statusText);
}

export const getHTTP = <T>(url: string) =>
    fetch(url, {
        method: 'GET',
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });

export const postHTTP = <T>(url: string, data: any) =>
    fetch(url, {
        method: 'POST',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });

export const putHTTP = <T>(url: string, data: any) =>
    fetch(url, {
        method: 'PUT',
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });

export const deleteHTTP = <T>(url: string) =>
    fetch(url, {
        method: 'DELETE',
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });
