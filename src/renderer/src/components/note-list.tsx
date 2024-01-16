import { useNote } from '@renderer/hooks/useNote'
import DeleteNote from './delete-note'
import { useState } from 'react'
import { formateDate } from '@shared/utils'
import { useSetAtom } from 'jotai'
import { editAtomNote } from '@renderer/store'

export const NoteList = () => {
  const { notes, handleSelectNote, selectedNoteIndex } = useNote()
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const editNote = useSetAtom(editAtomNote)
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
              className={`flex relative flex-col px-2 py-2 rounded-sm mt-1  transition-all cursor-pointer ${selectedNoteIndex === index ? 'bg-[#4a4e585a]' : 'hover:bg-[#4a4e585a]'} `}
              onClick={() => handleSelectNote(index)}
            >
              <div className="flex justify-between gap-1 truncate ">
                <span
                  onBlur={async (e) => {
                    const text = e.currentTarget.textContent
                    await editNote(note.title, text as string)
                  }}
                  className="first-letter:uppercase font-mono text-nowrap outline-none overflow-hidden text-ellipsis "
                  contentEditable
                >
                  {note.title}
                </span>
                {(selectedNoteIndex === index ||
                  (selectedNoteIndex !== index && isHovered === index)) && (
                  <DeleteNote filename={note.title} />
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
