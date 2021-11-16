function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    throw new Error(response.statusText);
}

export const getHTTP = <T>(url: string, header: Headers) =>
    fetch(url, {
        method: 'GET',
        headers: header,
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });

export const postHTTP = <T>(url: string, header: Headers, data: any) =>
    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data),
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });

export const putHTTP = <T>(url: string, header: Headers, data: any) =>
    fetch(url, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(data),
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });

export const deleteHTTP = <T>(url: string, header: Headers) =>
    fetch(url, {
        method: 'DELETE',
        headers: header,
    })
        .then(response => checkStatus(response))
        .then(response => response.json() as T)
        .catch(error => {
            throw error;
        });
