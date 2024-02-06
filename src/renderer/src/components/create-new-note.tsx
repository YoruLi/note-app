import { AddNote } from '@/components/svgs'
import { createNewNote } from '@renderer/store'
import { useSetAtom } from 'jotai'
export default function CreateNewNote() {
  const createNewNoteEmpty = useSetAtom(createNewNote)

  const handleCreateNewNote = async () => {
    await createNewNoteEmpty()
  }
  return (
    <div>
      <button
        onClick={handleCreateNewNote}
        className="flex gap-2 text-sm font-mono capitalize items-center justify-between hover:bg-[#2f31365a] px-2 py-1 rounded-sm w-full"
      >
        new note
        <AddNote />
      </button>
    </div>
  )
}
