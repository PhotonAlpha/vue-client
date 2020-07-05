<template>
  <div :id="id" />
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import Editor from '@toast-ui/editor'
import defaultOptions from './defaultOptions'
import '@toast-ui/editor/dist/i18n/zh-cn'

export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    options: {
      type: Object,
      default() {
        return defaultOptions
      }
    },
    mode: {
      type: String,
      default: 'markdown'
    },
    height: {
      type: String,
      required: false,
      default: 'auto'
    },
    language: {
      type: String,
      required: false,
      default: 'en' // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, defaultOptions, this.options)
      options.initialEditType = this.mode
      options.height = this.height
      options.language = this.language
      return options
    }
  },
  watch: {
    value(newValue, preValue) {
      // console.log('value', this.editor.getMarkdown())
      if (newValue !== preValue && newValue !== this.editor.getMarkdown()) {
        // console.log('set value', newValue)
        this.editor.setValue(newValue)
      }
    },
    language(val) {
      this.destroyEditor()
      this.initEditor()
    },
    height(newValue) {
      this.editor.height(newValue)
    },
    mode(newValue) {
      this.editor.changeMode(newValue)
    }
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        initialValue: this.value,
        ...this.editorOptions
      })
    },
    destroyEditor() {
      if (!this.editor) return
      this.editor.remove()
    },
    getValue() {
      return this.editor.getMarkdown()
    },
    resetValue(val) {
      this.editor.reset()
    }
  }
}
</script>
