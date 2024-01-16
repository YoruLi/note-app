import { useNote } from '@renderer/hooks/useNote'
import { formateDate } from '../../../utils/index'
import DeleteNote from './delete-note'
import { useState } from 'react'
export const NoteList = () => {
  const { notes, handleSelectNote, selectedNoteIndex } = useNote()
  const [isHovered, setIsHovered] = useState<number | null>(null)

  if (!notes) return null

  return (
    <>
      {notes.length === 0 ? (
        <span>No notes found</span>
      ) : (
        <ul className="overflow-hidden overflow-y-auto scrollbar h-[calc(100dvh-30px)]">
          {notes?.map((note, index) => (
            <li
              onMouseOver={() => {
                setIsHovered(index)
              }}
              onMouseLeave={() => {
                setIsHovered(null)
              }}
              key={note.title}
              className={`flex relative flex-col px-4 py-2 rounded-lg mt-1  transition-all cursor-pointer ${selectedNoteIndex === index ? 'bg-[#4a4e58]' : 'hover:bg-[#4a4e585a]'} `}
              onClick={() => handleSelectNote(index)}
            >
              <span className="first-letter:uppercase font-mono">{note.title}</span>
              <code>{formateDate(note.lastEditTime)}</code>

              {(selectedNoteIndex === index ||
                (selectedNoteIndex !== index && isHovered === index)) && (
                <div className="absolute right-2 top-2">
                  <DeleteNote filename={note.title} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
