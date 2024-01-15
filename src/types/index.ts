export type GetNote = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteInfo>
export type CreateNote = () => Promise<NoteInfo['title']>
export type SaveNote = (filename: string, content: string) => void

type NoteInfo = {
  title: string
  lastEdit: number
  content: string
}

export type NoteInfoType = string
