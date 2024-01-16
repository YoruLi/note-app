import {
  MDXEditor as MarkdownEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'

import { useAtomValue } from 'jotai'
import { selectedNoteAtom } from '@renderer/store'
import { useMarkdown } from '@renderer/hooks/use-Markdown'

export default function MDXEditor() {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const { autoSaving } = useMarkdown({ selectedNote })

  if (!selectedNote) return null

  return (
    <MarkdownEditor
      key={selectedNote?.title}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      markdown={selectedNote?.content}
      onChange={autoSaving}
      contentEditableClassName="outline-none text-mdx min-h-screen max-w-none text-lg px-8 py-5 caret-primary prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
