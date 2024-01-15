import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { notesMock } from '../../../mocks/index'
import { NoteInfo } from '../../../types/index'

export const notesAtom = atom<NoteInfo[]>(notesMock)

export const selectedNoteIndexAtom = atom<number | null>(null)

export const seletecAtomValue = unwrap()
// TODO SelectNoteIndex and SelectedNoteItem
