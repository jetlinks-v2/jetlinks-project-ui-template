import fs from 'fs';
import { NO_MODULE, DEFAULT_POINT } from '../contst';
const backupFilePath = 'src/utils/modules.backup.ts';

export function backupModulesFile() {
  if (fs.existsSync('src/utils/modules.ts')) {
    fs.copyFileSync('src/utils/modules.ts', backupFilePath);
  }
}

export function handleRestoreModulesFile() {
  if (fs.existsSync(backupFilePath)) {
    console.log('Backup file exists. Restoring...');
    fs.copyFileSync(backupFilePath, 'src/utils/modules.ts');
    fs.unlinkSync(backupFilePath);
    console.log('Restore complete. Backup file deleted.');
  } else {
    console.log('No backup file found. Nothing to restore.');
  }
}

export function restoreModulesFile() {
  const called = false;
  return {
    name: 'vite-plugin-post-build',
    buildEnd() {
      if (!called) {
        console.log('Attempting to restore modules.ts from backup.');
        handleRestoreModulesFile();
      }
    },
  };
}

export function updateModulesFile(modules = DEFAULT_POINT) {
  const modulesArray = modules === NO_MODULE ? [] : modules.split(',');
  const importStatements = modulesArray
    .map(module => `import.meta.glob('../modules/${module}/index.ts', { eager: true })`)
    .join(',\n');
  const importMenus = modulesArray
    .map(module => `import.meta.glob('../modules/${module}/baseMenu.ts', {eager: true})`)
    .join(',\n');
  const importLang = modulesArray
    .map(module => `import.meta.glob('../modules/${module}/locales/lang/*.json', {eager: true})`)
    .join(',\n');
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
     
     export const getLang = () => {
      const modulesMap = {}
      const modulesFiles = [
        ${importLang}
      ]
      return Object.assign(modulesMap, ...modulesFiles)
    }
     `;
  fs.writeFileSync('src/utils/modules.ts', content);
}
