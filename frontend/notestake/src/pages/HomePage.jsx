import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import RateLimitedUI from '../components/RateLimitedUI';  
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast';
import { SparklesIcon, FileTextIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/notes");
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        setIsRateLimited(true);
        toast.error("Rate limit exceeded. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                My Knowledge
              </span>
            </h1>
            <p className="text-base-content/60 font-medium">
              Capture your ideas, thoughts, and everything in between.
            </p>
          </div>
        </div>

        {isRateLimited && <RateLimitedUI />}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content/60 font-medium animate-pulse">Syncing your notes...</p>
          </div>
        ) : notes.length === 0 && !isRateLimited ? (
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-base-100 rounded-3xl border border-base-content/5 shadow-sm">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <SparklesIcon className="size-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Your workspace is empty</h2>
            <p className="text-base-content/60 max-w-md mx-auto mb-8">
              Start capturing your brilliant ideas today. Notes will automatically sync across all your devices.
            </p>
            <Link to="/create" className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">
              <FileTextIcon className="size-5 mr-2" />
              Create First Note
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {notes.map((note) => (
              <NoteCard
                key={note._id || note.id}
                id={note._id || note.id}
                title={note.title}
                content={note.content}
                readingTime={Math.max(1, Math.ceil((note.content?.length || 0) / 200))}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage;
