import { createViteConfig } from '@jetlinks/vite'
import { defineConfig, UserConfig } from 'vite'
import path from "path";

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  return await createViteConfig(
    command,
    mode,
    process.cwd(),
    {
      css: {
        preprocessorOptions: {
          less: {
            modifyVars: {
              'root-entry-name': 'variable',
              'primary-color': '#1DA57A',
              hack: `true; @import (reference) "${path.resolve('src/style/variable.less')}";`,
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  )
})
