import { modules } from '@/utils/modules';
import i18n from '@/locales';

export const getExtraRouters = () => {
  const extraMenu = {
    'system/Role': [
      {
        // 角色管理
        code: 'Detail',
        url: '/Detail/:id',
        name: i18n.global.t('router.extraMenu.260658-0'),
      },
    ],
    'system/Menu': [
      {
        code: 'Detail',
        url: '/Detail/:id',
        name: i18n.global.t('router.extraMenu.260658-2'),
      },
    ],
    'system/Positions': [
      {
        code: 'Detail',
        url: '/Detail/:id',
        name: i18n.global.t('router.extraMenu.260658-3'),
      },
    ],
  };

  const modulesFile = modules();
  Object.keys(modulesFile).forEach(key => {
    const routes = (modulesFile[key] as any).default.getExtraRoutesMap();
    Object.assign(extraMenu, routes);
  });

  return extraMenu;
};
