import axios from 'axios';

const baseUrl = 'http://localhost:3001';
const fetchCategoriesUrl = `${baseUrl}/categories`;

// TODO add authentication header
export const fetchCategories = () =>	axios.get(fetchCategoriesUrl);
