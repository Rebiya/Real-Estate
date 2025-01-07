import axios from "axios";
import { toast } from "react-toastify";
export const api = axios.create({
  baseURL: "https://localhost:8000/api"
});

//to get all properties for the home page and to get all elements with status pending so used in admin dashboard and properties and slider page
export const getAllProperties = async () => {
  try {
    const response = await api.get("/Property", {
      timeout: 30 * 1000
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("something went wrong, try again later!");
    throw error;
  }
};

//to get a single property for property detail page
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/Property/${id}`, {
      timeout: 30 * 1000
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error(
      "something went wrong while fetching Property, try again later!"
    );
    throw error;
  }
};

//for login authentication using jwt
export const createUser = async (username, password, token) => {
  try {
    await api.post(
      `/user/login`,
      { username, password },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    toast.error("Something went wrong while you login, Please try again");
    throw error;
  }
};

//to update the status of the property when a user book it
export const bookStatus = async (status, id, token) => {
  try {
    await api.put(
      `/Property/${id}/status`,
      {
        propertyid: id,
        status: status
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    toast.error("Something went wrong while updating status, Please try again");
    throw error;
  }
};

//used when admin needs to delete booked properties and users want to cancel the booked property
export const removeBooking = async (id, username, token) => {
  try {
    await api.delete(`/Property/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        username
      }
    });
  } catch (error) {
    toast.error(
      "Something went wrong while deleting property, Please try again"
    );

    throw error;
  }
};

//used in home page of the admin dashboard


//when admin wants to upload new property
export const createResidency = async (data, token) => {
  console.log(data);
  try {
    const res = await api.post(`/Property`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    toast.error("Something went wrong while uploading property");
    throw error;
  }
};
