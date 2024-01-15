import { homedir } from 'os'

const getDir = () => {
  return `${homedir()}/electron-app`
}

export const getNotes = () => {
  const dir = getDir()
  console.log(dir)
}
