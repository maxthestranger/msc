import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create a context
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is already logged in by fetching from local storage.
        const user = localStorage.getItem('currentUser');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // POST request to the REST API for user login.
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            // Set the currentUser state and store in local storage.
            setCurrentUser(data.user);
            localStorage.setItem('currentUser', JSON.stringify(data.user));

            return data.user;
        } catch (error) {
            console.error('There was an error logging in!', error.message);
            throw error;
        }
    };

    const changePassword = async (email, newPassword) => {
        try {
            // POST request to the REST API to change the password.
            const response = await fetch('http://localhost:8000/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Password change failed');
            }

            // Handle the password change response as needed.
            // No specific action required unless you want to update the local storage or state.

            return await response.json();
        } catch (error) {
            console.error('There was an error changing the password!', error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Clear the user from local storage to log them out.
            localStorage.removeItem('currentUser');
            setCurrentUser(null);
        } catch (error) {
            console.error('Error during logout!', error.message);
        }
    };

    const value = {
        currentUser,
        login,
        changePassword,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
