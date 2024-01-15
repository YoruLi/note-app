import { CreateNote, GetNote, ReadNote, SaveNote } from '../types/index'

export interface IElectronAPI {
  locale: string
  getNotes: GetNote
  readNote: ReadNote
  createNote: CreateNote
  saveNote: SaveNote
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
