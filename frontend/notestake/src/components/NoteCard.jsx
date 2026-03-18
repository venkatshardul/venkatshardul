import { PenSquareIcon, TrashIcon, ClockIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function NoteCard({ id, title, content, readingTime }) {
  // Try to parse raw content to string if it's an object/array, though normally it's text
  const displayContent = typeof content === 'string' ? content : 'No content preview available';

  return (
    <Link
      to={`/notes/${id}`}
      className="group relative block p-[1px] rounded-2xl bg-gradient-to-br from-base-content/10 to-transparent hover:from-primary/50 hover:to-secondary/50 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full flex flex-col justify-between bg-base-100 rounded-[15px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div>
          <h2 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 line-clamp-1 mb-2">
            {title}
          </h2>
          <p className="text-base-content/60 text-sm leading-relaxed line-clamp-3 font-medium">
            {displayContent}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-base-content/5">
          <div className="flex items-center gap-1.5 text-xs text-base-content/50 font-medium bg-base-200 px-2 py-1 rounded-md">
            <ClockIcon className="size-3.5" />
            <span>{readingTime || 1} min read</span>
          </div>
          
          <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0'>
            <button className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10 transition-colors">
              <PenSquareIcon className='size-4' />
            </button>
            <button className="btn btn-ghost btn-circle btn-sm text-error hover:bg-error/10 transition-colors">
              <TrashIcon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link> 
  )
}

export default NoteCard
