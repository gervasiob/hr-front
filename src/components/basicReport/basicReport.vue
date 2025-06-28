<template>
    <div class="report-editor">

        <EditorContent :editor="editor" class="tiptap" />
        <a-button type="primary" style="margin-top: 16px" @click="downloadDocx">
            Exportar a Word
        </a-button>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
// import * as htmlDocx from 'html-docx-js'

const props = defineProps({
    modelValue: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        Document,
        Paragraph,
        Text,
        Heading.configure({
            levels: [1, 2, 3],
        }),
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
})

onBeforeUnmount(() => {
    editor?.destroy()
})

function downloadDocx() {
    const contentHtml = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          h1, h2, h3 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          td, th { border: 1px solid #ccc; padding: 8px; }
        </style>
      </head>
      <body>
        ${editor.getHTML()}
      </body>
      </html>
    `

    // const blob = htmlDocx.asBlob(contentHtml)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'reporte.docx'
    link.click()
}
</script>

<style scoped>
.report-editor {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    min-height: 600px;
    background: #fff;
    max-width: 900px;
    margin: auto;
}

.tiptap {
    min-height: 500px;
    outline: 1px solid;
    padding: 24px;
    line-height: 1.6;
}
.toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}
</style>
  
