import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    const handleResize = useCallback(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        const debouncedSetSize = useDebounce(handleResize, 100);
        
        window.addEventListener("resize", debouncedSetSize);
        return () => window.removeEventListener("resize", debouncedSetSize);
    }, []);

    return size;
};