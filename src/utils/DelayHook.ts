import { useCallback, useEffect, useState } from 'react';

/**
 * useDelaySet hook helps to set last value from multiple calls of set-function
 *
 * @param defaultValue - Initial value of hook
 * @param func - A function that triggers when value is set
 * @param delayAsMs - Delay before value will be set
 * @return A function of stateful value to update it.
 */
const useDelaySet = <T>(defaultValue: T, func: (value: T) => void, delayAsMs: number): [(value: T) => void] => {
    const [prevValue, setPrevValue] = useState<T>(defaultValue);
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (prevValue !== value) {
                setPrevValue(value);
                func(value);
            }
        }, delayAsMs);

        return () => clearTimeout(delayDebounceFn);
    }, [delayAsMs, func, prevValue, value]);

    const setDelayedValue = useCallback((newValue: T) => {
        setValue(newValue);
    }, []);

    return [setDelayedValue];
};

export default useDelaySet;
