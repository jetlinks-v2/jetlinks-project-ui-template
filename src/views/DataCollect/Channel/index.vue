<template>
  <j-page-container>
    <div>
      <pro-search
        :columns="columns"
        target="search-datacollect-channel"
        @search="handleSearch"
      />
      <FullPage>
        <j-pro-table
          ref="tableRef"
          :columns="columns"
          :defaultParams="{
            sorts: [{ name: 'createTime', order: 'desc' }],
          }"
          :gridColumn="3"
          :params="params"
          :request="query"
          mode="CARD"
        >
          <template #headerTitle>
            <j-permission-button
              hasPermission="DataCollect/Channel:add"
              type="primary"
              @click="handleAdd"
            >
              <template #icon>
                <AIcon type="PlusOutlined" />
              </template>
              新增通道
            </j-permission-button>
          </template>
          <template #card="slotProps">
            <CardBox
              :actions="getActions(slotProps, 'card')"
              :showStatus="true"
              :status="getState(slotProps).value"
              :statusNames="StatusColorEnum"
              :statusText="getState(slotProps).text"
              :value="slotProps"
              v-bind="slotProps"
              @click="handleEye(slotProps.id)"
            >
              <template #img>
                <slot name="img">
                  <img :src="ImageMap.get(slotProps.provider)" />
                </slot>
              </template>
              <template #content>
                <div class="card-item-content">
                  <j-ellipsis style="width: calc(100% - 100px)">
                    <span
                      style="
                        font-size: 18px;
                        font-weight: 800;
                        line-height: 22px;
                      "
                    >
                      {{ slotProps.name }}
                    </span>
                  </j-ellipsis>
                  <a-row class="card-item-content-box">
                    <a-col :span="12">
                      <div class="card-item-content-text">协议</div>
                      <div class="card-item-content-text">
                        <a-tooltip>
                          <template #title>{{ slotProps.provider }}</template>
                          {{ slotProps.provider }}
                        </a-tooltip>
                      </div>
                    </a-col>
                    <!-- <a-col :span="12">
                        <div class="card-item-content-text">
                            地址
                        </div>
                        <div class="card-item-content-text">
                            <a-tooltip>
                                <template #title>{{
                                    slotProps.configuration
                                        .host ||
                                    slotProps.configuration
                                        .endpoint
                                }}</template>
                                <span
                                    class="details-text"
                                    >{{
                                        slotProps
                                            .configuration
                                            .host ||
                                        slotProps
                                            .configuration
                                            .endpoint
                                    }}</span
                                >
                            </a-tooltip>
                        </div>
                    </a-col> -->
                    <a-col :span="12">
                      <div class="card-item-content-text">说明</div>
                      <div class="card-item-content-text">
                        <j-ellipsis>{{ slotProps.description }}</j-ellipsis>
                      </div>
                    </a-col>
                  </a-row>
                </div>
              </template>
              <template #actions="item">
                <j-permission-button
                  :disabled="item.disabled"
                  :hasPermission="'DataCollect/Channel:' + item.key"
                  :popConfirm="item.popConfirm"
                  :tooltip="{
                    ...item.tooltip,
                  }"
                  @click="item.onClick"
                >
                  <AIcon v-if="item.key === 'delete'" type="DeleteOutlined" />
                  <template v-else>
                    <AIcon :type="item.icon" />
                    <span>{{ item?.text }}</span>
                  </template>
                </j-permission-button>
              </template>
            </CardBox>
          </template>
        </j-pro-table>
      </FullPage>
      <Save v-if="visible" :data="current" @change="saveChange" />
    </div>
  </j-page-container>
</template>
<script lang="ts" name="DataCollectPage" setup>
import { getImage, onlyMessage } from '@jetlinks-web/utils'
import { query, remove, update, getProviders } from '@/api/data-collect/channel'
import { StatusColorEnum, updateStatus } from './data'
import { useMenuStore } from '@/store/menu'
import Save from './Save/index.vue'
import { protocolList } from '../data'
import _ from 'lodash-es'

const menuStory = useMenuStore()
const tableRef = ref<Record<string, any>>({})
const params = ref<Record<string, any>>({})
const visible = ref(false)
const current = ref({})

const opcImage = getImage('/DataCollect/device-opcua.png')
const modbusImage = getImage('/DataCollect/device-modbus.png')
const s7Image = getImage('/DataCollect/s7.png')
const gatewayImage = getImage('/DataCollect/gateway.png')
const ImageMap = new Map()
ImageMap.set('OPC_UA', opcImage)
ImageMap.set('MODBUS_TCP', modbusImage)
ImageMap.set('snap7', s7Image)
ImageMap.set('COLLECTOR_GATEWAY', gatewayImage)

const columns = [
  {
    title: '通道名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    fixed: 'left',
    search: {
      type: 'string',
    },
  },
  {
    title: '通讯协议',
    dataIndex: 'provider',
    key: 'provider',
    ellipsis: true,
    search: {
      type: 'select',
      options: async () => {
        const resp: any = await getProviders()
        if (resp.status === 200) {
          const arr = resp.result
            .filter((item: any) =>
              ['GATEWAY', 'Modbus/TCP', 'opc-ua'].includes(item.name),
            )
            .map((it: any) => it.name)
          const providers: any = protocolList.filter((item: any) =>
            arr.includes(item.alias),
          )
          return providers
        }
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    ellipsis: true,
    scopedSlots: true,
    search: {
      type: 'select',
      options: [
        { label: '正常', value: 'enabled' },
        { label: '禁用', value: 'disabled' },
      ],
    },
  },
  {
    title: '运行状态',
    dataIndex: 'runningState',
    key: 'runningState',
    ellipsis: true,
    scopedSlots: true,
    search: {
      type: 'select',
      options: [
        { label: '运行中', value: 'running' },
        { label: '已停止', value: 'stopped' },
      ],
    },
  },
  {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    search: {
      type: 'string',
    },
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 200,
    scopedSlots: true,
  },
]

const getActions = (
  data: Partial<Record<string, any>>,
  type: 'card' | 'table',
): any[] => {
  if (!data) return []
  const state = data.state.value
  const stateText = state === 'enabled' ? '禁用' : '启用'
  const actions = [
    {
      key: 'update',
      text: '编辑',
      tooltip: {
        title: '编辑',
      },
      icon: 'EditOutlined',
      onClick: () => {
        handleEdit(data)
      },
    },
    {
      key: 'action',
      text: stateText,
      tooltip: {
        title: stateText,
      },
      icon: state === 'enabled' ? 'StopOutlined' : 'CheckCircleOutlined',
      popConfirm: {
        title: `确认${stateText}?`,
        onConfirm: async () => {
          const res = await update(data.id, updateStatus[state])
          if (res.success) {
            onlyMessage('操作成功', 'success')
            tableRef.value?.reload()
          }
        },
      },
    },
    {
      key: 'delete',
      text: '删除',
      disabled: state === 'enabled',
      tooltip: {
        title: state === 'enabled' ? '请先禁用该组件，再删除。' : '删除',
      },
      popConfirm: {
        placement: 'topRight',
        title: '该操作将会删除下属采集器与点位，确定删除?',
        onConfirm: async () => {
          const res = await remove(data.id)
          if (res.success) {
            onlyMessage('操作成功', 'success')
            tableRef.value.reload()
          }
        },
      },
      icon: 'DeleteOutlined',
    },
  ]
  return actions
}

const handleAdd = () => {
  current.value = {}
  visible.value = true
}

const handleEdit = (data: object) => {
  current.value = _.cloneDeep(data)
  visible.value = true
}
const handleEye = (id: string) => {
  menuStory.jumpPage(`DataCollect/Collector`, { query: { channelId: id } })
}
const saveChange = (value: object) => {
  visible.value = false
  current.value = {}
  if (value) {
    onlyMessage('操作成功', 'success')
    tableRef.value.reload()
  }
}
const getState = (record: Partial<Record<string, any>>) => {
  if (record) {
    if (record?.state?.value === 'enabled') {
      return { ...record?.runningState }
    } else {
      return {
        text: '禁用',
        value: 'disabled',
      }
    }
  } else {
    return {}
  }
}

/**
 * 搜索
 * @param params
 */
const handleSearch = (e: any) => {
  params.value = e
}
</script>
<style lang="less" scoped>
.card-item-content {
  min-height: 100px;

  .card-item-content-box {
    min-height: 50px;
  }

  .card-item-content-text {
    margin-top: 10px;
    color: rgba(0, 0, 0, 0.75);
    font-size: 12px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}

.details-text {
  font-weight: 700;
  font-size: 14px;
}
</style>
