import fs from 'fs'
import * as path from 'path'

const rootPath = path.resolve(__dirname, '../../')
const modulesBasePath = 'src/modules'

function registerModulesAlias() {
  const modulesAlias = {}
  const pattern = path.resolve(rootPath, modulesBasePath)
  try {
    const folders = fs.readdirSync(pattern)
    folders?.map((name) => {
      try {
        const result = fs.readFileSync(path.resolve(rootPath, modulesBasePath, `${name}/config.json`), 'utf-8')
        const content = JSON.parse(result)
        if (content.aliasName) {
          modulesAlias[content.aliasName] = path.resolve(modulesBasePath, name)
        }
      } catch (error) {
        console.warn(`Failed to load ${modulesBasePath} configuration file!`)
      }
    })
  } catch (error) {
    console.warn(`Failed to load ${modulesBasePath} Folder`)
  }

  console.log(modulesAlias)
  return modulesAlias
}
export { registerModulesAlias }
