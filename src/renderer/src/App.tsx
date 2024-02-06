import CreateNewNote from './components/create-new-note'
import DraggableBar from './components/draggable-bar'
import MDXEditor from './components/mdx-editor'
import { NoteList } from './components/note-list'
import { Sidebar } from './components/sidebar'

function App(): JSX.Element {
  return (
    <>
      <DraggableBar />
      <main className="flex flex-row h-screen">
        <Sidebar className="space-y-1">
          <CreateNewNote />
          <NoteList />
        </Sidebar>
        <section className="flex-1 p-4 border-l border-white/10 overflow-y-auto overflow-hidden scrollbar">
          <MDXEditor />
        </section>
      </main>
    </>
  )
}

export default App
