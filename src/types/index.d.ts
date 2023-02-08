import MonacoEditor from 'monaco-editor'

declare global {
  interface Window {
    monaco: MonacoEditor
  }
}
