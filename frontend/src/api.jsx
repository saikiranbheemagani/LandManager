/* eslint-disable no-useless-catch */
import axios from 'axios';
const baseURL= 'https://landmanager-backend-fdks.onrender.com';
//const baseURL= 'http://localhost:3000';

const api = axios.create({
  baseURL: `${baseURL}`,    
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the JWT token from cookies
const getAuthToken = () => {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('='); 
    acc[name] = value;
    return acc;
  }, {});

  return cookies.accessToken || '';
};

// Function to clear all cookies
const clearAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    // Corrected the removal of the cookie by setting expiration to the past
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None;`;
  }
};

// Set up interceptors to include JWT token in headers
api.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();
    
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Set up interceptor to handle 401 and 403 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;

    if (status === 401 || status === 403) {
      // Clear all cookies
    clearAllCookies();

      // Navigate to the registration page
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await api.post('/auth/user/sendOTP', { phoneno: phoneNumber });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (phoneNumber, otp,hash) => {
  try {
    const response = await api.post('/auth/user/verifyOTP', { phoneno: phoneNumber, otp, hash   });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API functions for different endpoints as needed
export const getAssets = async (assetId) => {
  try {
    const response = await api.get('/assets',{params:{asset_id:assetId}});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAsset = async (assetData) => {
  try {
    const response = await api.post('/assets', assetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API functions for different asset-related endpoints as needed

export const updateAsset = async (assetData) => {
  try {
    const response = await api.put(`/assets`, assetData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// api.jsx
export const removeAsset = async (assetId) => {
  try {
    const response = await api.delete(`/assets`, { params: { id: assetId } });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProfile = async () => {
  try {
    const response = await api.get('/profile'); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/profile', userData); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await api.get('/projects/notifs'); // Replace with the actual endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
  };

export const getProjectRequests = async (projectId) => {
  try {
    const response = await api.get('/projects/', {params:{project_id:projectId}});
    // console.log(response.data)

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProjectRequest = async (projectrequestData) => {
  try {
    const response = await api.post('/projects/requests', projectrequestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more API functions for different project-related endpoints as needed

export const updateProjectRequest = async (projectrequestData) => {
  try {
    const response = await api.put(`/projects/requests`, projectrequestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// api.jsx

export const updateProjectDetails = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/?projectId=${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project details:', error);
    throw error;
  }
};


// api.jsx
export const removeProjectRequest = async (projectrequestId) => {
  try {
    const response = await api.delete(`/projects/requests`, { params: { projectID: projectrequestId } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (projectId) =>{
  try {
    const response = await api.get(`/comments`, { params: { project_id: projectId } });
    return response.data.comments;
  } catch (error) {
    throw error;
  }
}
// api.jsx
export const postComment = async ({ proj_id, proj_title, content, sender, notifToken }) => {
  try {
    const response = await api.post(`/comments`, {
      proj_id: proj_id,
      proj_title: proj_title,
      content: content, // Ensure content is included in the request body
      sender: sender,
      notifToken: notifToken,
    });
    return response.data.comments;
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (email, password) =>{
  try {
    const response = await api.post(`/auth/user/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getLandmanagers = async () =>{
  try {
    const response = await api.get(`/profile/lm`);
    // console.log(response.data)
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
export const assignLM = async (proj_id, lm_id, lm_name, lm_phno) =>{
  try {
    console.log(lm_id)
    const response = await api.put(`/projects/assign-lm`, { proj_id, lm_id, lm_name, lm_phno });
    return response.data;
  } catch (error) {
    throw error;
  }
}
