const fs = require('fs')
const path = require('path')

/**
 * @returns {String}
 */
const getVueVersion = () => {
  try {
    const vuePackageJson = require('vue/package.json')

    return vuePackageJson.version
  } catch (e) {
    throw Error(`[cypress error] you have to install vue to use @cypress/vue`)
  }
}

const replaceVueVersion = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8')

  content = content.replace(/'vue-2'/g, 'vue-3')
  fs.writeFileSync(filePath, content, 'utf-8')
}

(function setupVue3WhenInstalled () {
  const vueVersion = getVueVersion()

  if (vueVersion.startsWith('3.')) {
    replaceVueVersion(path.resolve(__dirname, '..', 'index.js'))
    replaceVueVersion(path.resolve(__dirname, '..', 'index.d.ts'))
  }
})()
