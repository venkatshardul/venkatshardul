import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import { ArrowLeftIcon, PenSquareIcon, TrashIcon, ClockIcon, SaveIcon, XIcon, StarIcon } from 'lucide-react'

function NotesDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')
  const [editedTags, setEditedTags] = useState('')
  const [editedIsImportant, setEditedIsImportant] = useState(false)

  useEffect(() => {
    fetchNote()
  }, [id])

  const fetchNote = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/notes/${id}`)
      setNote(res.data)
      setEditedTitle(res.data.title)
      setEditedContent(res.data.content)
      setEditedTags(res.data.tags?.join(', ') || '')
      setEditedIsImportant(res.data.isImportant)
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch note')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return
    
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}`)
      toast.success('Note deleted successfully', { icon: '🗑️' })
      navigate('/')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete note')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editedTitle || !editedContent) {
      toast.error('Title and content are required')
      return
    }

    try {
      const res = await axios.put(`http://localhost:8000/api/notes/${id}`, {
        title: editedTitle,
        content: editedContent,
        tags: editedTags ? editedTags.split(',').map(t => t.trim()) : [],
        isImportant: editedIsImportant
      })
      setNote(res.data)
      setIsEditing(false)
      toast.success('Note updated brilliantly!', { icon: '✨' })
    } catch (error) {
      console.error(error)
      toast.error('Failed to update note')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24 space-y-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60 font-medium animate-pulse">Loading your knowledge...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-6">
            <XIcon className="size-12 text-error" />
          </div>
          <h2 className="text-3xl font-extrabold mb-3">Note not found</h2>
          <p className="text-base-content/60 max-w-md mx-auto mb-8">
            The note you're looking for doesn't exist or has been deleted.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">
            <ArrowLeftIcon className="size-5 mr-2" /> Return Home
          </button>
        </div>
      </div>
    )
  }

  const readingTime = Math.max(1, Math.ceil((note.content?.length || 0) / 200));

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-ghost btn-sm rounded-full bg-base-100 shadow-sm border border-base-content/5 hover:bg-base-200"
          >
            <ArrowLeftIcon className="size-4" />
            Back to notes
          </button>

          {!isEditing && (
             <div className="flex items-center gap-2">
             <button onClick={() => setIsEditing(true)} className="btn btn-ghost btn-circle shadow-sm border border-base-content/5 bg-base-100">
               <PenSquareIcon className="size-5 text-primary" />
             </button>
             <button onClick={handleDelete} className="btn btn-ghost btn-circle shadow-sm border border-error/20 bg-error/10 text-error hover:bg-error hover:text-error-content transition-colors">
               <TrashIcon className="size-5" />
             </button>
           </div>
          )}
        </div>

        <div className="flex-1 bg-base-100 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-base-content/5 border border-base-content/5 flex flex-col relative overflow-hidden">
          
          {/* Decorative background element overlay */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <PenSquareIcon className="size-64 transform rotate-12" />
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="flex-1 flex flex-col space-y-6 relative z-10">
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Note Title"
                className="w-full bg-transparent text-4xl font-extrabold placeholder:text-base-content/30 focus:outline-none border-b-2 border-transparent focus:border-primary/30 pb-2 transition-colors"
                autoFocus
              />
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Content..."
                className="w-full h-full flex-1 bg-transparent text-lg md:text-xl placeholder:text-base-content/30 focus:outline-none resize-none leading-relaxed"
              />
              
              <div className="bg-base-200/50 p-4 rounded-2xl border border-base-content/5 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-2 block">Tags (comma separated)</label>
                  <input
                    value={editedTags}
                    onChange={(e) => setEditedTags(e.target.value)}
                    placeholder="e.g. ideas, work, personal"
                    className="input input-bordered input-sm w-full bg-base-100/50"
                  />
                </div>
                <div className="flex items-center self-end pb-1 md:pb-0 h-8">
                  <label className="label cursor-pointer gap-3 bg-base-100/50 px-3 py-1 rounded-xl border border-base-content/5">
                    <span className="label-text font-semibold flex items-center gap-1">
                      <StarIcon className={`size-4 ${editedIsImportant ? 'text-warning fill-warning' : 'text-base-content/30'}`} />
                      Mark Important
                    </span> 
                    <input
                      type="checkbox"
                      checked={editedIsImportant}
                      onChange={(e) => setEditedIsImportant(e.target.checked)}
                      className="checkbox checkbox-sm checkbox-warning"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-ghost rounded-full font-semibold px-6">
                  Discard changes
                </button>
                <button type="submit" className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30">
                  <SaveIcon className="size-5 mr-1" />
                  Save Note
                </button>
              </div>
            </form>
          ) : (
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {note.isImportant && (
                    <span className="badge badge-warning gap-1 font-bold py-3 shadow-md">
                      <StarIcon className="size-3.5 fill-current" /> Important
                    </span>
                  )}
                  {note.tags && note.tags.length > 0 && note.tags.map((tag, index) => (
                    <span key={index} className="badge badge-primary badge-outline font-semibold gap-1 py-3 px-3 border-opacity-30 bg-primary/5">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-base-content leading-tight">
                  {note.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm font-medium text-base-content/50">
                   <div className="flex items-center gap-1.5">
                      <ClockIcon className="size-4" />
                      <span>{readingTime} min read</span>
                   </div>
                   <div className="w-1 h-1 rounded-full bg-base-content/20"></div>
                   <div>Updated {new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none mb-10 text-base-content flex-1 text-lg leading-relaxed">
                {/* Treat plain text but preserve line breaks beautifully */}
                {note.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 min-h-[1.5rem]">{paragraph}</p>
                ))}
              </div>
              
              <div className="border-t border-base-content/5 pt-6 mt-auto text-xs text-base-content/40 flex justify-between">
                <span>Created {new Date(note.createdAt).toLocaleString()}</span>
                <span className="font-mono">ID: {note._id || note.id}</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default NotesDetails
