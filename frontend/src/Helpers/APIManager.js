import { user, categories, products, register } from "./tempMockData";

/**
 * Fetches all products depending on parameters.
 * @param {Object} parameters - The parameters for fetching products.
 * @param {string} parameters.query - The search query for products.
 * @param {string} parameters.category - The category of products.
 * @param {number} parameters.page - The page number for pagination.
 * @param {number} parameters.limit - The maximum number of products per page.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of products.
 */
export async function getProducts(parameters) {
  const { query = "", category = "", page = 1, limit = 10 } = parameters;
  return products;
}

/**
 * Registers a user with the provided payload.
 * @param {Object} payload - The user registration data.
 * @param {string} payload.email - The email of the user.
 * @param {string} payload.password - The password of the user.
 * @param {string} payload.username - The username of the user.
 * @param {string} payload.first_name - The first name of the user.
 * @param {string} payload.last_name - The last name of the user.
 * @returns {Promise<Object>} - A promise that resolves to the registered user data.
 */
export async function registerUser(payload) {
  if (payload.email === user.email) {
    throw new Error("User already exists");
  }

  return {
    status: 201,
    message: "User has been created",
  };
}

/**
 * Logs in a user with the provided payload.
 * @param {Object} payload - The user login data.
 * @param {string} payload.email - The email of the user.
 * @param {string} payload.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to the logged in user data.
 */
export async function login(payload) {
  if (payload.email === user.email && payload.password === user.password) {
    localStorage.setItem("token", register.token);
    localStorage.setItem("refreshToken", register.refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Invalid email or password");
  }
}

/**
 * Logs out a user.
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */
export async function getUser() {
  return user;
}

/**
 * Logs out a user.
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */
export async function logout() {}

export async function getCategories() {
  return categories;
}
