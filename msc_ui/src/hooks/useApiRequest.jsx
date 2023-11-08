import { useState, useCallback } from 'react';
import axios from 'axios';

const useApiRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    // Memoize the execute function so it's not recreated on every render
    const execute = useCallback(async (url, method, body = null, headers = {}) => {
        try {
            const response = await axios({
                method,
                url,
                data: body,
                headers,
            });
            setData(response.data);
            setError('');  // Clear any previous errors on successful request
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        }
    }, []); // Empty dependency array means this is created once and never recreated

    return { execute, data, error };
};

export default useApiRequest;
