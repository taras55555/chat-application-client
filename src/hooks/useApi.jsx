import { useState } from 'react';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async (url, method = 'GET', body = null, headers = {}, credentials = 'include') => {
        setLoading(true);
        setError(null);
    
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body ? JSON.stringify(body) : null,
                credentials,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'API error');
            }

            return data;
        } catch (err) {
            setError(err.message || 'Unknown error');
            console.error('API error:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error };
};
