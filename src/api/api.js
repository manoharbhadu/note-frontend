import axios from "axios";

const API_URL = process.env.BASE_API_URL

// Fetch all notes
export const getNotes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new note
export const createNote = async (note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

// Update a note
export const updateNote = async (id, note) => {
  const response = await axios.put(`${API_URL}/${id}`, note);
  return response.data;
};

// Delete a note
export const deleteNote = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
