import { CreateNote, DeleteNote, EditNote, GetNote, ReadNote, SaveNote } from '../shared/types'

export interface IElectronAPI {
  locale: string
  getNotes: GetNote
  readNote: ReadNote
  createNote: CreateNote
  saveNote: SaveNote
  deleteNote: DeleteNote
  editNote: EditNote
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
