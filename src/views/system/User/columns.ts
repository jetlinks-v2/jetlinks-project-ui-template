import { DictType } from "./typing"
import { getUserType_api } from "@/api/user"
import { message } from 'jetlinks-ui-components'

// 获取用户类型
const userTypes = () =>
    new Promise((resolve) => {
        getUserType_api().then((resp: any) => { 
            if(resp.success) {
              resolve(
                  resp.result.map((item: DictType) => ({
                      label: item.name,
                      value: item.id,
                  })),
              )
            } else {
              message.error('获取用户类型失败')
            }
        })
    })

// 搜索框中的搜索项
const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      search: {
        type: 'string',
        componentProps: {
          placeholder: '请输入姓名',
        },
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      ellipsis: true,
      search: {
        type: 'string',
        componentProps: {
          placeholder: '请输入用户名',
        }
      },
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      key: 'type',
      ellipsis: true,
      search: {
        type: 'select',
        componentProps: {
          placeholder: '请选择用户类型',
        },
        options: userTypes
      },
      scopedSlots: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      search: {
        rename: 'status',
        type: 'select',
        componentProps: {
          placeholder: '请选择状态',
        },
        options: [
          {
            label: '启用',
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
      title: '手机号',
      dataIndex: 'telephone',
      key: 'telephone',
      ellipsis: true,
      search: {
        type: 'string',
        componentProps: {
          placeholder: '请输入手机号',
        }
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      search: {
        type: 'string',
        componentProps: {
          placeholder: '请输入邮箱',
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      scopedSlots: true,
    },
  ]

export default columns