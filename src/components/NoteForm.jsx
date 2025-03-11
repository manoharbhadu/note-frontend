import { useState, useEffect } from "react";

const NoteForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title and content are required!");

    setLoading(true); // Show loader before API call
    await onSubmit({ title, content });
    setLoading(false); // Hide loader after API call

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded focus:outline-0 border-gray-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="w-full p-2 mb-2 border rounded focus:outline-0 border-gray-400"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit" className="bg-black font-semibold cursor-pointer text-white p-2 rounded w-full" disabled={loading}>
        {loading ? "Processing..." : initialData ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;
