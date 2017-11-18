import axios from 'axios';

axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION_HEADER;

const baseUrl = 'http://localhost:3001';

export const fetchCategories = () => axios.get(`${baseUrl}/categories`);
export const fetchAllPosts = () => axios.get(`${baseUrl}/posts`);
export const fetchCategoryPosts = category => axios.get(`${baseUrl}/${category}/posts`);
