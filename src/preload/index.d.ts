export interface IElectronAPI {
  locale: string
  getNotes: GetNote
  readNote: ReadNote
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
