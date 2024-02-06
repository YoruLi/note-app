import { NotePadIcon } from './svgs'

export default function DraggableBar() {
  return (
    <header className="sticky top-0 flex items-center px-4 min-h-8 w-full bg-transparent border-b border-white/10 cursor-pointer overflow-hidden">
      <NotePadIcon />
    </header>
  )
}
