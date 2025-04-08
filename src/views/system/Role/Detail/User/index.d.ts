type columnsType = {
  title: string;
  dataIndex: string;
  key: string;
  scopedSlots?: boolean;
};

export type queryType = {
  columns: columnsType[];
  params?: object;
};

export type tableType = {
  columns: columnsType[];
  tableData: any[];
  refresh: () => void;
  clickAdd: () => void;
  clickUnBind: () => void;
  unbind: () => void;
  _selectedRowKeys?: string[];
  onSelectChange?: () => void;
  cancelSelect?: () => void;
};
