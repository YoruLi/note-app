import { EditIconNote } from './svgs'
import { useSetAtom } from 'jotai'
import { editAtomNote } from '@renderer/store'
export default function EditNote({ oldFileName }: { oldFileName: string }) {
  const editNote = useSetAtom(editAtomNote)
  return <EditIconNote onClick={() => editNote(oldFileName)} />
}
