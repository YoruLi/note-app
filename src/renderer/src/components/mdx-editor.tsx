import React from 'react'
import {
  MDXEditor as MarkdownEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'
import { useNote } from '@renderer/hooks/useNote'
import { useAtomValue } from 'jotai'

export default function MDXEditor() {
  const selectedNote = useAtomValue(selectedAtomNote)
  const {} = useMarkDownEditor()
  return (
    <MarkdownEditor
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      markdown=""
      contentEditableClassName="outline-none text-mdx min-h-screen max-w-none text-lg px-8 py-5 caret-primary prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
    />
  )
}
