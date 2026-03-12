import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetch(url, { signal: controller.signal });
                const d = await res.json();
                setData(d);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                setIsPending(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, isPending, error };
};