export const buildQueryFromObject = (object: any) => {
    let query = '';
    for (const [key, value] of Object.entries(object)) {
        // @ts-ignore
        query += `${key.toString()}=${value.toString()}&`;
    }
    query = query.slice(0, -1);
    return query;
};

export const combineUrls = (urls: string[]) => {
    return urls.join();
};
