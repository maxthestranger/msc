import { useState } from 'react';
import axios from 'axios';

const useApiRequest = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const execute = async (url, method, body = null, headers = {}) => {
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
    };

    return { execute, data, error };
};

export default useApiRequest;
