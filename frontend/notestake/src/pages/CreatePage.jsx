import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ArrowLeftIcon, SaveIcon, XIcon, PenToolIcon } from 'lucide-react'

function CreatePage() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://localhost:8000/api/notes', { title, content })
      navigate('/')
    } catch (err) {
      console.error(err)
      // show a toast or error UI here
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-ghost btn-sm rounded-full bg-base-100 shadow-sm border border-base-content/5 hover:bg-base-200"
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </button>
        </div>

        <div className="flex-1 bg-base-100 rounded-3xl p-6 md:p-10 shadow-lg border border-base-content/5 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <PenToolIcon className="size-6" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Draft a masterpiece</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
            <div className="space-y-2">
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full bg-transparent text-3xl md:text-4xl font-bold placeholder:text-base-content/30 focus:outline-none border-b-2 border-transparent focus:border-primary/30 pb-2 transition-colors" 
                placeholder="Title your thought..." 
                autoFocus
                required
              />
            </div>
            
            <div className="flex-1 flex flex-col min-h-[300px]">
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                className="w-full h-full flex-1 bg-transparent text-lg md:text-xl placeholder:text-base-content/30 focus:outline-none resize-none leading-relaxed" 
                placeholder="Start typing your brilliance here..."
                required
              />
            </div>
            
            <div className="pt-6 border-t border-base-content/5 flex items-center justify-end gap-3">
              <button 
                type="button" 
                className="btn btn-ghost rounded-full font-semibold" 
                onClick={() => navigate(-1)}
              >
                <XIcon className="size-5 mr-1" />
                Discard
              </button>
              <button 
                type="submit" 
                className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30 font-semibold" 
                disabled={loading || !title.trim() || !content.trim()}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <SaveIcon className="size-5 mr-1" />
                )}
                Save Note
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default CreatePage
