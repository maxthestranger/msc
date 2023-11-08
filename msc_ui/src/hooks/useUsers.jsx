import { useState, useEffect } from 'react';
import useApiRequest from './useApiRequest';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const { execute } = useApiRequest();

    // Fetch all users from REST API
    const fetchUsers = async () => {
        await execute('http://localhost:8000/api/users', 'GET');
    };

    // Fetch a specific user by ID from REST API
    const fetchUserById = async (id) => {
        await execute(`http://localhost:8000/api/users/${id}`, 'GET');
    };

    // Create a new user using REST API
    const createUser = async (userData) => {
        const response = await fetch('http://localhost:8000/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            await fetchUsers();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    };


    // Update a user using REST API
    const updateUser = async (id, updatedData) => {
        await execute(`http://localhost:8000/api/users/${id}`, 'PUT', updatedData);
        await fetchUsers(); // Refresh the list of users after update
    };

    // Delete a user using REST API
    const deleteUser = async (id) => {
        await execute(`http://localhost:8000/api/users/${id}`, 'DELETE');
        await fetchUsers(); // Refresh the list of users after deletion
    };

    useEffect(() => {
        // Initialize users state
        const initFetch = async () => {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json()
            ).catch((error) => {
                console.error('Error:', error);
            });

            if(response?.status === 'success') {
                setUsers(response?.data);
            }

            throw new Error(response?.message);
        };
        initFetch()
    }, [execute]);

    return {
        users,
        createUser,
        updateUser,
        deleteUser,
        fetchUserById,
    };
};

export default useUsers;
