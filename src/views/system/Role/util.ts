import { omit } from "lodash-es"

export const columns = [
    {
        title: '标识',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        fixed: 'left',
        search: {
            type: 'string',
            componentProps: {
                placeholder: '请输入页面地址',
            },
        },
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        search: {
            type: 'string',
            componentProps: {
                placeholder: '请输入名称',
            },
        },
    },
    {
        title: '说明',
        key: 'description',
        ellipsis: true,
        dataIndex: 'description',
        search: {
            type: 'string',
            componentProps: {
                placeholder: '请输入说明',
            },
        },
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 120,
        fixed: 'right',
        scopedSlots: true,
    },
]

export const permissionColumns = [
    {
        title: '菜单权限',
        dataIndex: 'menu',
        key: 'menu',
        width: '25%',
    },
    {
        title: '操作权限',
        dataIndex: 'action',
        key: 'action',
        width: '25%',
    },
    {
        title: '数据权限',
        dataIndex: 'data',
        key: 'data',
        width: '50%',
    },
]

export const userColumns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        search: {
            type: 'string',
            componentProps: {
                placeholder: '请输入'
            }
        },
    },
    {
        title: '用户名',
        dataIndex: 'username',
        ellipsis: true,
        key: 'username',
        search: {
            type: 'string',
            componentProps: {
                placeholder: '请输入'
            }
        },
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200,
        search: {
            type: 'date',
        },
        scopedSlots: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        search: {
            type: 'select',
            componentProps: {
                placeholder: '请选择'
            },
            options: [
                {
                    label: '正常',
                    value: 1,
                },
                {
                    label: '禁用',
                    value: 0,
                },
            ],
        },
        scopedSlots: true,
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 120,
        scopedSlots: true,
    },
]

// 扁平化数组
export const flattenArray = (_arr: any[]) => {
    let result: any[] = [];
    _arr.map((item: any) => {
        result.push(omit(item, 'children'))
        if (Array.isArray(item.children)) {
            result = result.concat(flattenArray(item.children))
        }
    })
    return result
}

