import React, { useState, useEffect } from 'react';

interface UseDebounceProps {
    value: any;
    delay?: number;
}

function useDebounce({ value, delay }: UseDebounceProps) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;