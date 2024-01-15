import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

export const getLoaderNotes = async () => {
  const notes = await window.electronAPI.getNotes()

  return notes.sort((a, b) => b.lastEdit - a.lastEdit)
}

const notesAtomAsync = atom(getLoaderNotes())
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const selectedNoteIndex = get(selectedNoteIndexAtom)

  if (selectedNoteIndex == null || !notes) return null

  const selectedNote = notes[selectedNoteIndex]

  const noteContent = await window.electronAPI.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const saveNoteAtom = atom(null, async (get, set, newContent) => {
  const selectedNote = get(selectedNoteAtom)
  if (!selectedNote) return
  await window.electronAPI.saveNote(selectedNote.title, newContent)

  set(selectedNote, {
    ...selectedNote,
    content: newContent,
    lastEdit: new Date.now()
  })
})

export const createNewNote = atom(null, async (get, set) => {
  //  get alll notes to order
  const notes = get(notesAtom)

  if (!notes) return

  const titleNote = await window.electronAPI.createNote()

  const newNote = {
    title: titleNote,
    lastEdit: new Date.now()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0)
})
export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEdit: new Date()
    }
)
