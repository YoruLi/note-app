import { saveNoteAtom } from '@renderer/store'
import type { NoteInfoType } from '../../../types/index'
import { useSetAtom } from 'jotai'

export const useMarkdown = ({ selectedNote }: { selectedNote: NoteInfoType }) => {
  const saveNote = useSetAtom(saveNoteAtom)

  const autoSaving = async (content: NoteInfoType) => {
    if (!selectedNote) return
    await saveNote(content)
  }

  return { autoSaving }
}
