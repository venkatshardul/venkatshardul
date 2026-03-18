import { PlugIcon, StickyNoteIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='sticky top-0 z-50 bg-base-100/70 backdrop-blur-lg border-b border-base-content/5 shadow-sm'>
        <div className='mx-auto max-w-6xl px-4 py-4'>
          <div className='flex items-center justify-between'>
            <Link to="/" className='flex items-center gap-2 group transition-all duration-300 hover:opacity-80'>
              <div className='p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors'>
                <StickyNoteIcon className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-sans tracking-tight'>
                TinkBoard
              </h1>
            </Link>
            
            <div className='flex items-center gap-4'>
              <Link to="/create" className='btn btn-primary rounded-full px-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5 border-none'>
                <PlugIcon className='size-5' />
                <span className='font-semibold'>New Note</span>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar

