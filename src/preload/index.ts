import { contextBridge, ipcRenderer } from 'electron'
import { CreateNote, DeleteNote, GetNote, ReadNote, SaveNote } from '../shared/types'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be enabled.')
}

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNote>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),
    saveNote: (...args: Parameters<SaveNote>) => ipcRenderer.invoke('saveNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args)
  })
} catch (error) {
  console.error(error)
}
