export const buildQueryFromObject = (object: object) => {
    let query = '';
    for (const [key, value] of Object.entries(object)) {
        query += `${key.toString()}=${value || value === 0 ? value.toString() : ''}&`;
    }
    query = query.slice(0, -1);
    return query;
};

export const combineUrls = (urls: string[]) => {
    return urls.join('');
};
