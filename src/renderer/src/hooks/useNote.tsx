/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { notesAtom, selectedNoteIndexAtom } from '@renderer/sotre'
import { useAtom, useAtomValue } from 'jotai'

export const useNote = () => {
  const notes = useAtomValue(notesAtom)
  const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndexAtom)

  const handleSelectNote = (index: number) => {
    setSelectedNoteIndex(index)
  }
  return { notes, selectedNoteIndex, handleSelectNote }
}
