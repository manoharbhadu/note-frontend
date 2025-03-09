'use client'
import { useState, useEffect } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../../api/api";
import NoteForm from "./NoteForm";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const handleAddNote = async (note) => {
    await createNote(note);
    fetchNotes();
  };

  const handleUpdateNote = async (updatedNote) => {
    await updateNote(editingNote._id, updatedNote);
    setEditingNote(null); // Reset after update
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Note Taking App</h1>

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
              <button onClick={() => setEditingNote(note)} className="cursor-pointer font-semibold border border-gray-300 bg-gray-100 px-3 rounded">
                Edit
              </button>
              <button onClick={() => handleDeleteNote(note._id)} className="cursor-pointer font-semibold border border-gray-300 text-red-500 bg-gray-100 px-3 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
