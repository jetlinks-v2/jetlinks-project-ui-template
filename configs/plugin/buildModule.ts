import fs from 'fs'
const backupFilePath = 'src/utils/modules.backup.ts';

export function backupModulesFile() {
    if (fs.existsSync('src/utils/modules.ts')) {
        fs.copyFileSync('src/utils/modules.ts', backupFilePath);
    }
}

export function restoreModulesFile() {
    let called = false
    return {
        name: 'vite-plugin-post-build',
        buildEnd() {
            if (!called) {
                console.log('Attempting to restore modules.ts from backup.');
                if (fs.existsSync(backupFilePath)) {
                    console.log('Backup file exists. Restoring...');
                    fs.copyFileSync(backupFilePath, 'src/utils/modules.ts');
                    fs.unlinkSync(backupFilePath);
                    console.log('Restore complete. Backup file deleted.');
                } else {
                    console.log('No backup file found. Nothing to restore.');
                }
            }
        }
    }
}

export function updateModulesFile(modules='**') {
    const modulesArray = modules === 'no-modules' ? [] : modules.split(',')
    const importStatements = modulesArray.map(module => `import.meta.glob('../modules/${module}/index.ts', { eager: true })`).join(',\n')
    const importMenus = modulesArray.map(module => `import.meta.glob('../modules/${module}/baseMenu.ts', {eager: true})`).join(',\n')
    const content = `export const modules = () => {
        let modulesMap = {}
        const modulesFiles = [
            ${importStatements}
        ]
        return Object.assign(modulesMap, ...modulesFiles)
     }
     export const getModulesMenu = () => {
       const modulesFiles = [
            ${importMenus}
       ]
       const menus: any[] = []
       modulesFiles.forEach(item => {
         const modules = Object.values(item)
         menus.push(...modules.map((m:any) => m.default?.()))
       })
       return menus
     }
     `
    fs.writeFileSync('src/utils/modules.ts', content)
}
