import { CreateNote, DeleteNote, GetNote, ReadNote, SaveNote } from '../shared/types'

export interface IElectronAPI {
  locale: string
  getNotes: GetNote
  readNote: ReadNote
  createNote: CreateNote
  saveNote: SaveNote
  deleteNote: DeleteNote
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
