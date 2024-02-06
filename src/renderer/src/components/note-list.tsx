import { useNote } from '@renderer/hooks/useNote'
import DeleteNote from './delete-note'
import { useState } from 'react'
import { formateDate } from '@shared/utils'
import EditNote from './edit-note'

export const NoteList = () => {
  const { notes, handleSelectNote, selectedNoteIndex } = useNote()
  const [isHovered, setIsHovered] = useState<number | null>(null)

  if (!notes) return null

  return (
    <>
      {notes.length === 0 ? (
        <code className="text-center mx-auto mt-4 grid place-content-center animate-pulse ">
          No notes found...
        </code>
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
              className={`flex relative flex-col px-2 py-2 rounded-sm mt-1  transition-all cursor-pointer ${selectedNoteIndex === index ? 'bg-[#383b415a]' : 'hover:bg-[#2f31365a]'} `}
              onClick={() => handleSelectNote(index)}
            >
              <div className="flex justify-between gap-1 truncate">
                <span
                  // onDoubleClick={async () => {
                  //   await editNote(note.title)
                  // }}
                  className="font-mono text-nowrap outline-none overflow-hidden select-none"
                >
                  {note.title}
                </span>
                {(selectedNoteIndex === index ||
                  (selectedNoteIndex !== index && isHovered === index)) && (
                  <div className="flex gap-2 items-center">
                    <EditNote oldFileName={note.title} />
                    <DeleteNote filename={note.title} />
                  </div>
                )}
              </div>
              <code>{formateDate(note.lastEditTime)}</code>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
