import axios from "axios";

const BASE_URL = "http://localhost:5275";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    return getErrorMessage(error);
  }
);

/**
 * Interceptor for adding authorization headers to requests.
 * @param {Object} config - The request config object.
 * @returns {Object} - The modified request config object.
 * @throws {Error} - If there is an error in the request.
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers.RefreshToken = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Registers a user with the provided payload.
 * @param {Object} payload - The user registration data.
 * @param {string} payload.email - The email of the user.
 * @param {string} payload.password - The password of the user.
 * @param {string} payload.userName - The username of the user.
 * @param {string} payload.firstName - The first name of the user.
 * @param {string} payload.lastName - The last name of the user.
 * @returns {Promise<Object>} - A promise that resolves to the registered user data.
 */
export async function registerUser(payload) {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, payload);
    const data = response.data;
    const bug = await axios.post(`${BASE_URL}/register`, {
      email: payload.email,
      password: payload.password,
    }); //This is due to a bug of the API. Will be removed.
    return data;
  } catch (error) {
    return getErrorMessage(error);
  }
}

/**
 * Logs in a user with the provided payload.
 * @param {Object} payload - The user login data.
 * @param {string} payload.email - The email of the user.
 * @param {string} payload.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the logged in user data.
 */
export async function login(payload) {
  try {
    const temp = axios.create();
    const response = await temp.post(`${BASE_URL}/login`, payload, {});
    const data = response.data;
    if (data.accessToken && data.refreshToken) {
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      const user = await getUser();
      localStorage.setItem("user", JSON.stringify(user));
    }
    return response;
  } catch (error) {
    return getErrorMessage(error);
  }
}

/**
 * Retrieves user data from the server.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} If there is an error retrieving the user data.
 */
export async function getUser() {
  try {
    const response = await axios.get(`${BASE_URL}/user`);
    return response.data;
  } catch (error) {
    return getErrorMessage(error);
  }
}

export async function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export async function getCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    return getErrorMessage(error);
  }
}

/**
 * Retrieves posts from the API based on the provided parameters.
 * @param {Object} parameters - The parameters for the API request.
 * @param {string} parameters.search_query - The search query for filtering posts.
 * @param {number} parameters.categoryId - The category for filtering posts.
 * @param {number} parameters.page - The page number for pagination.
 * @param {number} parameters.limit - The maximum number of posts to retrieve.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
export async function getProducts(parameters) {
  try {
    const {
      search_query = "",
      categoryId = 0,
      page = 1,
      limit = 10,
    } = parameters;
    const response = await axios.get(
      `${BASE_URL}/products?query=${search_query}&categoryId=${categoryId}&page=${page}&limit=${limit}`
    );
    return response;
  } catch (error) {
    return getErrorMessage(error);
  }
}

/**
 * Returns an error message object based on the provided error response.
 * @param {Error} error - The error response object.
 * @returns {Object} - An error message object with a status and message.
 */
function getErrorMessage(error) {
  if (error.response) {
    const statusCode = error.response.status;
    switch (statusCode) {
      case 401:
        if (localStorage.getItem("refreshToken")) {
          console.error("Refresh token failed:", error);
          return {
            status: "UNAUTHORIZED_REFRESH_FAILED",
            message:
              "Unable to refresh your access token. Please log in again.",
          };
        } else {
          console.error("Missing refresh token");
          return {
            status: "UNAUTHORIZED_EXPIRED",
            message: "Invalid username or password.",
          };
        }
      case 400:
        return {
          status: "BAD_REQUEST",
          message: "Invalid request. Please check your input and try again.",
        };
      case 404:
        return {
          status: "NOT_FOUND",
          message: "The requested resource was not found.",
        };
      case 500:
        return {
          status: "INTERNAL_SERVER_ERROR",
          message: "Internal server error. Please try again later.",
        };
      default:
        return {
          status: "UNKNOWN_ERROR",
          message: "An error occurred. Please try again later.",
        };
    }
  } else {
    return {
      status: "UNKNOWN_ERROR",
      message: "An error occurred. Please try again later.",
    };
  }
}
