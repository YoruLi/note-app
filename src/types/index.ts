type NoteInfo = {
  title: string
  lastEdit: number
  content: string
}

type GetNote = () => Promise<NoteInfo[]>
type ReadNote = (title: NoteInfo['title']) => Promise<NoteInfo>
