import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolated must be enabled.')
}

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNote>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args)
    // writeNote: (...args: Parameters<any>) => ipcRenderer.invoke('writeNote', ...args),
    // createNote: (...args: Parameters<any>) => ipcRenderer.invoke('createNote', ...args),
    // deleteNote: (...args: Parameters<any>) => ipcRenderer.invoke('deleteNote', ...args)
  })
} catch (error) {
  console.error(error)
}
