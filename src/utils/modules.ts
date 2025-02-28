export const modules = () => {
    let modulesMap = {}
    const modulesFiles = [
import.meta.glob('../modules/**/index.ts', { eager: true })
    ]
  return Object.assign(modulesMap, ...modulesFiles)
}