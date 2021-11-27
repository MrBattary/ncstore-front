const until = (conditionFunction: any, ms: number) => {
    const poll = (resolve: any) => {
        if (conditionFunction()) {
            resolve();
        } else {
            setTimeout(_ => poll(resolve), ms);
        }
    };
    return new Promise(poll);
};

export const threads = {
    until,
};
