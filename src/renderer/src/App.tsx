import ActionBtn from './components/action-btn'
import DraggableBar from './components/draggable-bar'
import MDXEditor from './components/mdx-editor'
import { NoteList } from './components/note-list'

import { Sidebar } from './components/sidebar'

function App(): JSX.Element {
  return (
    <>
      <DraggableBar />
      <main className="flex flex-row h-screen">
        <Sidebar className="p-4">
          <ActionBtn />

          <NoteList />
        </Sidebar>
        <section className="flex-1 p-4 border-l border-white/20  overflow-y-auto overflow-hidden scrollbar">
          <MDXEditor />
        </section>
      </main>
    </>
  )
}

export default App
