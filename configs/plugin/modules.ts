import fs from 'fs'
import * as path from 'path'

const rootPath = path.resolve(__dirname, '../../')
const modulesBasePath = 'src/modules'

function registerModulesAlias(type: 'object' | 'array' =  'object') : {} | [] {
  const modulesAlias = {}
  const modulesArray = []
  const pattern = path.resolve(rootPath, modulesBasePath)
  try {
    const folders = fs.readdirSync(pattern)
    folders?.map((name) => {
      try {
        if (fs.existsSync(path.resolve(rootPath, modulesBasePath, `${name}/config.json`))) {
          const result = fs.readFileSync(path.resolve(rootPath, modulesBasePath, `${name}/config.json`), 'utf-8')
          const content = JSON.parse(result)
          if (content.aliasName) {
            if (type === 'array') {
              modulesArray.push({
                find: content.aliasName,
                replacement: path.resolve(modulesBasePath, name)
              })
            } else {
              modulesAlias[content.aliasName] = path.resolve(modulesBasePath, name)
            }
          }
        }
      } catch (error) {
        console.warn(`Failed to load ${modulesBasePath} configuration file!`)
      }
    })
  } catch (error) {
    console.warn(`Failed to load ${modulesBasePath} Folder`)
  }

  return type === 'array' ? modulesArray : modulesAlias
}

function registerModulesLessVariable() {
  const pattern = path.resolve(rootPath, modulesBasePath)
  try {
    const folders = fs.readdirSync(pattern)
    return folders
      ?.filter((module) => fs.existsSync(path.resolve(`${pattern}/${module}/style/variable.less`)))
      .map((module) => `@import (reference) "${path.resolve(`${pattern}/${module}/style/variable.less`)}";`)
      .join('\n')
  } catch (error) {
    console.warn(`Failed to load ${modulesBasePath} style/variable.less`)
  }
}

export { registerModulesAlias, registerModulesLessVariable }
