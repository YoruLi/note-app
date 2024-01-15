import { ensureDir, readdir, stat, readFile } from 'fs-extra'
import path from 'path'
const getDir = () => {
  return `${path.resolve(process.cwd())}/notes`
}

export const getNotes = async () => {
  const rootDirectory = getDir()

  await ensureDir(rootDirectory)
  const notesFileNames = await readdir(rootDirectory, {
    encoding: 'utf8',
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(
    notes.map((data) => {
      return getInfoNotesFiles(data)
    })
  )
}

export const readNote = async (filename: string) => {
  const cwd = getDir()

  return readFile(`${cwd}/${filename}.md`, { encoding: 'utf8' })
}

const getInfoNotesFiles = async (filename: string) => {
  const contentFiles = await stat(`${getDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEdit: contentFiles.mtimeMs
  }
}
