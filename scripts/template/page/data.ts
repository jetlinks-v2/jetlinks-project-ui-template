import { provide, ref } from 'vue';

export const getColumns = () => {
  return [
    {
      dataIndex: 'id',
      title: 'ID',
      search: {
        type: 'string',
      },
    },
    {
      dataIndex: 'action',
      title: '操作',
      width: 200,
    },
  ];
};

export const useSearch = () => {
  const params = ref();
  const columns = getColumns();
  const type = 'advanced';

  const config: any = {
    columns,
    onSearch: (p: any) => {
      params.value = p;
    },
  };

  if (type === 'advanced') {
    config.target = '';
  }

  provide('pro-search-config', config);

  return {
    params,
  };
};
