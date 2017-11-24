import axios from 'axios';

axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION_HEADER;

const baseUrl = 'http://localhost:3001';

export const fetchCategories = () => axios.get(`${baseUrl}/categories`);
export const fetchPost = postId => axios.get(`${baseUrl}/posts/${postId}`);
export const fetchAllPosts = () => axios.get(`${baseUrl}/posts`);
export const fetchCategoryPosts = category => axios.get(`${baseUrl}/${category}/posts`);
export const fetchComments = postId => axios.get(`${baseUrl}/posts/${postId}/comments`);
export const addPost = post => axios.post(`${baseUrl}/posts`, post);
export const editPost = post => axios.put(`${baseUrl}/posts/${post.id}`, post);
export const deletePost = postId => axios.delete(`${baseUrl}/posts/${postId}`);
export const addComment = post => axios.post(`${baseUrl}/comments`, post);
export const editComment = comment => axios.put(`${baseUrl}/comments/${comment.id}`, comment);
export const deleteComment = commentId => axios.delete(`${baseUrl}/comments/${commentId}`);

const placeVote = (type, id, option) => axios.post(`${baseUrl}/${type}/${id}`, {option});
export const upvotePost = postId => placeVote('posts', postId, 'upVote');
export const downvotePost = postId => placeVote('posts', postId, 'downVote');
export const upvoteComment = commentId => placeVote('comments', commentId, 'upVote');
export const downvoteComment = commentId => placeVote('comments', commentId, 'downVote');
