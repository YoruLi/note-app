export type GetNote = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteInfo['title']>
export type CreateNote = () => Promise<NoteInfo['title']>
export type SaveNote = (filename: string, content: string) => void
export type DeleteNote = (filename: string) => boolean

type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteInfoType = NoteInfo
