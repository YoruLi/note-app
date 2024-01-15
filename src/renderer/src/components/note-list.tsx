import { useNote } from '@renderer/hooks/useNote'
import { formateDate } from '../../../utils/index'
export const NoteList = (): JSX.Element => {
  const { notes, handleSelectNote, selectedNoteIndex } = useNote()

  if (!notes) {
    return
  }
  return (
    <>
      <ul>
        {notes.map((note, index) => (
          <li
            key={note.title + note.lastEdit}
            className={`flex flex-col px-4 py-2 rounded-lg mt-1  transition-all cursor-pointer ${selectedNoteIndex === index ? 'bg-[#4a4e58]' : 'hover:bg-[#4a4e585a]'} `}
            onClick={() => handleSelectNote(index)}
          >
            <span className="first-letter:uppercase font-mono">{note.title}</span>
            <code>
              {formateDate(note.lastEdit).getDateTime} - {formateDate(note.lastEdit).getTime}
            </code>
          </li>
        ))}
      </ul>
    </>
  )
}
