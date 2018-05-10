
export default function TranslatedMarkdownPlugin (Vue, options = {}) {
  Object.defineProperty(Vue.prototype, '$md', {
    get () {
      return function (path) {
        // ...
      }
    }
  })
}
