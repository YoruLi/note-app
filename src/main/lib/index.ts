import { dialog } from 'electron'

import { ensureDir, readdir, stat, readFile, writeFile } from 'fs-extra'
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

export const createNote = async () => {
  const cwd = getDir()

  await ensureDir(cwd)
  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: `${cwd}/untitled.md`,
    buttonLabel: 'Create a new note',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    return false
  }

  const { name, dir } = path.parse(filePath)
  if (path.normalize(dir) !== path.normalize(cwd)) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Note creation failed',
      message: `All notes must be saved under ${cwd}.`
    })
    return false
  }

  await writeFile(filePath, '')

  return name
}

export const writeNote = async (filename: string, content: string) => {
  await writeFile(`${getDir()}/${filename}.md`, content, { encoding: 'utf8' })
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
