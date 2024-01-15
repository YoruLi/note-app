import { ElectronAPI } from '@electron-toolkit/preload'
import { NoteInfo } from '../types/index'
declare global {
  interface Window {
    electron: ElectronAPI
    getNote: NoteInfo[]
  }
}
