import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"  // Updated base URL
});

// Get all properties (connected to /residencies endpoint)
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residencies", {
      timeout: 10 * 1000
    });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while fetching properties!");
    throw error;
  }
};

// Get a single property
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residencies/${id}`, {
      timeout: 30 * 1000
    });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while fetching property!");
    throw error;
  }
};



export const createResidency = async (residencyData, token) => {
  try {
    const response = await api.post("/residencies", residencyData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Optional: log detailed error for debugging
    console.error("Axios createResidency error:", error?.response?.data || error.message);
    throw new Error(
      error?.response?.data?.message || "Failed to create residency"
    );
  }
};


// Update property
export const updateProperty = async (id, data, token) => {
  try {
    const response = await api.put(`/residencies/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while updating property!");
    throw error;
  }
};

// Delete property
export const deleteProperty = async (id, token) => {
  try {
    const response = await api.delete(`/residencies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while deleting property!");
    throw error;
  }
};

