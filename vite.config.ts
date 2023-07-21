import { createViteConfig } from '@jetlinks/vite'
import { defineConfig, UserConfig } from 'vite'

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
              'primary-color': '#1DA57A',
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  )
})
