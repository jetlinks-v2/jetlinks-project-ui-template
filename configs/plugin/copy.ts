import fs from 'fs';

export function copyFile(modulesName: string) {
  return {
    name: 'copy-module-files',
    closeBundle() {
      if (modulesName) {
        const src = `src/modules/${modulesName}/baseMenu.json`;
        const dest = `src/modules/${modulesName}/dist/baseMenu.json`;

        if (fs.existsSync(src)) {
          console.log(`Copying ${src} to ${dest}`);
          fs.copyFileSync(src, dest);
        } else {
          console.error(`Source file not found: ${src}`);
        }
      }
    },
  };
}
