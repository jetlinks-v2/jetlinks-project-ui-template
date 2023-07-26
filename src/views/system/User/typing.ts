
export interface DictType {
    id: string
    name: string
    children?: DictType
}

// 下拉框选项格式
export interface OptionType { 
    value: string
    label: string
}

// 按钮类型
export type ModalType = '' | 'add' | 'edit' | 'reset'

