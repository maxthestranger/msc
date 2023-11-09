import { useState, useEffect } from "react";
import useApiRequest from "./useApiRequest";

const BASE_URL = "http://localhost:8000/api/users";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { execute } = useApiRequest();

  // Fetch all users from REST API
  const fetchUsers = async () => {
    await execute(BASE_URL, "GET");
  };

  // Fetch a specific user by ID from REST API
  const fetchUserById = async (id) => {
    await execute(`${BASE_URL}/${id}`, "GET");
  };

  // Create a new user using REST API
  const createUser = async (userData) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        await fetchUsers();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  }


  // Delete a user using REST API
  const deleteUser = async (id) => {
    await execute(`${BASE_URL}/${id}`, "DELETE");
    await fetchUsers(); // Refresh the list of users after deletion
  };

  useEffect(() => {
    // Initialize users state
    const initFetch = async () => {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
        });

      if (response?.status === "success") {
        setUsers(response?.data);
      }

      throw new Error(response?.message);
    };
    initFetch();
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
