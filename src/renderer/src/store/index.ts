import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

export const getLoaderNotes = async () => {
  const notes = await window.electronAPI.getNotes()

  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
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

export const saveNoteAtom = atom(null, async (get, set, newContent: string) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  await window.electronAPI.saveNote(selectedNote.title, newContent)

  set(notesAtom, async (prevNotes) =>
    (await prevNotes).map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }
      return note
    })
  )
})
export const createNewNote = atom(null, async (get, set) => {
  //  get alll notes to order
  const notes = get(notesAtom)

  if (!notes) return

  const titleNote = await window.electronAPI.createNote()
  if (!titleNote) return
  const newNote = {
    title: titleNote,
    lastEditTime: Date.now()
  }
  const updatedNotes = [newNote, ...notes.filter((note) => note.title !== newNote.title)]
  set(notesAtom, Promise.resolve(updatedNotes))

  set(selectedNoteIndexAtom, 0)
})

export const deleteAtomNote = atom(null, async (get, set, filename: string) => {
  const notes = get(notesAtom)

  if (!notes) return

  const isDeleted = await window.electronAPI.deleteNote(filename)

  if (!isDeleted) return
  set(notesAtom, async (prevNotes) => {
    return (await prevNotes).filter((note) => note.title !== filename)
  })

  set(selectedNoteIndexAtom, null)
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
  (prev) =>
    prev ?? {
      title: '',
      content: '',
      lastEditTime: Date.now()
    }
)
