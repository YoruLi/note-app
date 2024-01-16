import { useSetAtom } from 'jotai'
import { DeleteNoteIcon } from './svgs'
import { deleteAtomNote } from '@renderer/store'

export default function DeleteNote({ filename }: { filename: string }) {
  const deleteNote = useSetAtom(deleteAtomNote)
  const handleDeleteNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    await deleteNote(filename)
  }
  return (
    <button onClick={(e) => handleDeleteNote(e)}>
      <DeleteNoteIcon />
    </button>
  )
}
