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
        contentEditable="true"
        className="flex gap-2 text-sm font-mono items-center justify-between hover:bg-[#4a4e585a] px-2 py-1 rounded-sm w-full"
      >
        New Note
        <AddNote />
      </button>
    </div>
  )
}
