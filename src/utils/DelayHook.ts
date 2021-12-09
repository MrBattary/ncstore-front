import { useCallback, useEffect, useState } from 'react';

const useDelay = <T>(defaultValue: T, func: (value: T) => void, delay: number): [(value: T) => void] => {
    const [prevValue, setPrevValue] = useState<T>(defaultValue);
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (prevValue !== value) {
                setPrevValue(value);
                func(value);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [func, prevValue, value]);

    const setDelayedValue = useCallback((newValue: T) => {
        setValue(newValue);
    }, []);

    return [setDelayedValue];
};

export default useDelay;
