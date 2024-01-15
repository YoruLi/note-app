import React from 'react'
import { notesMock } from '../../../mocks/index'
import { useNote } from '@renderer/hooks/useNote'

export const NoteList = (): JSX.Element => {
  const { notes, handleSelectNote, selectedNoteIndex } = useNote()
  return (
    <>
      <ul>
        {notes.map((note, index) => (
          <li
            key={note.lastEdit}
            className={`flex flex-col px-4 py-2 rounded-lg mx-2 mt-1  transition-all cursor-pointer ${selectedNoteIndex === index ? 'bg-[#4a4e58]' : 'hover:bg-[#4a4e585a]'} `}
            onClick={() => handleSelectNote(index)}
          >
            <span>{note.title}</span>
            <code className="self-end">{new Date(note.lastEdit).getUTCFullYear()}</code>
          </li>
        ))}
      </ul>
    </>
  )
}
