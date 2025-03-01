import axios from "axios";
import { API_NOTIFICATION_MESSAGE, Service_Url } from "../constant/config";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

// Interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => processResponse(response),
  (error) => Promise.reject(processError(error))
);

// Function to process successful responses
const processResponse = (response) => {
  if (response?.status >= 200 && response?.status < 300) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isSuccess: false,
      status: response?.status,
      code: response?.code,
      message: response?.statusText || "Unknown error",
    };
  }
};

// Function to process errors
const processError = (error) => {
  if (error.response) {
    console.log("Error in response:", error.toJSON());
    return {
      msg: API_NOTIFICATION_MESSAGE.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    return {
      msg: API_NOTIFICATION_MESSAGE.requestFailure,
      code: "",
    };
  } else {
    return {
      msg: API_NOTIFICATION_MESSAGE.networkError,
      code: "",
    };
  }
};

// Function to handle GET requests with query parameters or path parameters
const getWithParams = (endpoint, params = {}) => {
  const token = localStorage.getItem("accessToken");

  // If the endpoint requires a path parameter (e.g., "/all/post/:id")
  if (params.id) {
    endpoint = `${endpoint}/${params.id}`;
    delete params.id; // Remove `id` from query parameters
  }

  return axiosInstance.get(endpoint, {
    params: params,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

// Create API methods based on Service_Url configuration
const API = {};

for (const [key, value] of Object.entries(Service_Url)) {
  if (value.method === "GET") {
    API[key] = (params) => getWithParams(value.url, params);
  } else {
    API[key] = (body) => {
      const token = localStorage.getItem("accessToken");
      console.log("Token:", token);

      return axiosInstance({
        method: value.method,
        url: value.url,
        data: body,
        headers: {
          ...value.headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    };
  }
}

// Ensure the `API` object correctly handles the `updateBlogPost` method
API.updateBlogPost = (id, body) => {
  const token = localStorage.getItem("accessToken");
  return axiosInstance.put(`/update/${id}`, body, { // Corrected to include body
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

API.deleteBlog = (id) => {
  const token = localStorage.getItem("accessToken");
  return axiosInstance.delete(`/delete/${id}`, { // Corrected URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
API.newComment= (id,body) => {
  const token = localStorage.getItem("accessToken");
  return axiosInstance.post(`/new/comment/${id}`,body ,{ // Corrected URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
API.getAllComments = (id) => {
  const token = localStorage.getItem("accessToken");
  return axiosInstance.get(`/new/allcomments/${id}`, { // Corrected URL
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
export { API };
