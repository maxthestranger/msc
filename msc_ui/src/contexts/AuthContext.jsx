import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Create a context
const AuthContext = createContext();

const BASE_URL = "https://api.uta.cloud/api";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in by fetching from local storage.
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // If the HTTP status code is not ok, throw an error.
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      // Check if the PHP backend returned an error status.
      if (data.status === "error") {
        throw new Error(data.message);
      }

      // If we have a successful login
      if (data.status === "success") {
        // Set the currentUser state and store in local storage.
        setCurrentUser(data.user);
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        // Store the token in local storage or a cookie
        localStorage.setItem("token", data.token);
        // You may also want to configure this token in your subsequent API calls' headers

        // Return the user and the token for further processing if needed
        return { user: data.user, token: data.token };
      }
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email, password) => {
    console.log("resetPassword", email, password);
    try {
      // POST request to the REST API to change the password.
      const response = await fetch(
        `${BASE_URL}/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Password change failed");
      }

      // Handle the password change response as needed.
      // No specific action required unless you want to update the local storage or state.

      return await response.json();
    } catch (error) {
      console.error("There was an error changing the password!", error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear the user from local storage to log them out.
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error during logout!", error.message);
    }
  };

  const value = {
    currentUser,
    login,
    resetPassword,
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
