import { saveNoteAtom } from '@renderer/store'
import { NoteInfoType } from '@shared/types'

import { useSetAtom } from 'jotai'

export const useMarkdown = ({ selectedNote }: { selectedNote: NoteInfoType | null }) => {
  const saveNote = useSetAtom(saveNoteAtom)

  const autoSaving = async (content: string) => {
    if (!selectedNote) return
    await saveNote(content)
  }

  return { autoSaving }
}
