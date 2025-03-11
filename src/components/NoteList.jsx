'use client'
import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../api/api";
import NoteForm from "./NoteForm";
import { useRouter } from "next/navigation";

const NoteList = () => {
  const router = useRouter()
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // Track which note is being deleted

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const data = await getNotes();
    setNotes(data);
    setLoading(false);
  };

  const handleAddNote = async (note) => {
    setLoading(true);
    await createNote(note);
    fetchNotes();
  };

  const handleUpdateNote = async (updatedNote) => {
    setLoading(true);
    await updateNote(editingNote._id, updatedNote);
    setEditingNote(null);
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    setDeletingId(id); // Show loader for this note
    await deleteNote(id);
    setDeletingId(null);
    fetchNotes();
  };

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>
        <button className="bg-black font-semibold cursor-pointer text-white px-2 p-1 rounded" onClick={handleLogout}>logout</button>
      </div>

      {/* Note Form */}
      <NoteForm
        onSubmit={editingNote ? handleUpdateNote : handleAddNote}
        initialData={editingNote}
      />

      {/* Notes List */}
      <ul className="mt-4">
        {notes.map((note) => (
          <li key={note._id} className="border border-stone-300 bg-white p-4 rounded flex max-sm:flex-col justify-between max-sm:items-start items-center gap-2 mt-2">
            <div>
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingNote(note)}
                className="cursor-pointer font-semibold border border-gray-300 bg-gray-100 px-3 rounded"
                disabled={loading}
              >
                {editingNote && editingNote._id === note._id ? "Editing..." : "Edit"}
              </button>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="cursor-pointer font-semibold border border-gray-300 text-red-500 bg-gray-100 px-3 rounded"
                disabled={deletingId === note._id} // Disable button when deleting
              >
                {deletingId === note._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
