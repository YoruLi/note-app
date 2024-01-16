import { dialog } from 'electron'

import { ensureDir, readdir, stat, readFile, writeFile, remove, rename } from 'fs-extra'
import path from 'path'
import welcomeFile from '../../../resources/welcome.md?asset'
import { NoteInfoType } from '../../shared/types'
import { homedir } from 'os'

const getDir = () => {
  return `${homedir}/notes`
}

export const getNotes = async () => {
  const rootDirectory = getDir()

  await ensureDir(rootDirectory)
  const notesFileNames = await readdir(rootDirectory, {
    encoding: 'utf8',
    withFileTypes: false
  })

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
  if (notes.length === 0) {
    const content = await readFile(welcomeFile, { encoding: 'utf8' })
    await writeFile(`${rootDirectory}/welcome.md`, content, { encoding: 'utf8' })

    notes.push('welcome.md')
  }
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

export const editNote = async (oldFilname: string, newFilename: string) => {
  const cwd = getDir()
  await rename(`${cwd}/${oldFilname}.md`, `${cwd}/${newFilename}.md`)

  return newFilename
}
export const deleteNote = async (filename: string) => {
  const cwd = getDir()

  await ensureDir(cwd)

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: 'Are you sure to delete this note?',
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })
  if (response === 1) {
    return false
  }

  await remove(`${cwd}/${filename}.md`)
  return filename
}
export const writeNote = async (filename: string, content: string) => {
  await writeFile(`${getDir()}/${filename}.md`, content, { encoding: 'utf8' })
}

export const readNote = async (filename: string) => {
  const cwd = getDir()

  return readFile(`${cwd}/${filename}.md`, { encoding: 'utf8' })
}

const getInfoNotesFiles = async (filename: string): Promise<NoteInfoType> => {
  const contentFiles = await stat(`${getDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: contentFiles.mtimeMs
  }
}
