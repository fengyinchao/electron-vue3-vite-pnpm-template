<!--
 * @Description: {{ moduleName }}/{{ menuName1 }}/{{ pascalCase menuName2 }}增删改查模版
 * @Author: fengyinchao@zonst.cn
 * @Date: 2023-04-19 15:06:06
 * @LastEditTime: 2023-09-06 10:32:51
-->
<template>
  <div class="table-demo-container layout-padding">
    <div class="table-demo-padding layout-padding-view layout-padding-auto">
      <TableSearch :search="state.search" :operates="state.operates" @search="onSearch" @operate="onOperate" />
      <Table
        ref="tableRef"
        v-bind="state"
        class="table-demo"
        @del-row="onTableDelRow"
        @operate-row="onTableOperateTypeRow"
        @page-change="onTablePageChange"
      />
      <TableDialog ref="AddViewEditDialogRef" @refresh="getTableData()" />
    </div>
  </div>
</template>

<script setup lang="ts" name="makeTableDemo">
import { defineAsyncComponent, reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useUserInfo } from '@/stores/UserInfo'
import $data from '@/common/data'
// 引入组件
const Table = defineAsyncComponent(() => import('@/components/zonst-table/ZonstTable.vue'))
const TableSearch = defineAsyncComponent(() => import('@/components/zonst-searchbar/ZonstSearchbar.vue'))
const TableDialog = defineAsyncComponent(() => import('./AddViewEditDialog.vue'))

// 定义变量内容
const tableRef = ref<RefType>()
const AddViewEditDialogRef = ref<RefType>()

const userInfo = useUserInfo()
const { userInfos } = storeToRefs(userInfo)
const tagColorConfig = ref<optionsFace[]>([
  { id: 1, label: 'tag-one' },
  { id: 2, label: 'tag-eight' },
]) // status 颜色标签枚举 因为不同后台定义status不同，所以改为传入形式
const state = reactive<TableState>({
  // 列表数据（必传）
  data: [],
  // 表头内容（必传，注意格式）
  header: [
    { key: 'name', colWidth: '', title: '应检尽检核酸采样点名称', type: 'text' },
    { key: 'address', colWidth: '', title: '详细地址', type: 'text' },
    { key: 'phone', colWidth: '', title: '采样点联系电话', type: 'text' },
    { key: 'time', colWidth: '', title: '开放时间', type: 'text' },
    { key: 'isSupport', colWidth: '', title: '是否支持24小时核酸检测', type: 'text' },
    { key: 'image', colWidth: '', width: '70', height: '40', title: '图片描述', type: 'image' },
  ],
  // 配置项（必传）
  config: {
    total: 0, // 列表总数
    loading: true, // loading 加载
    isSerialNo: true, // 是否显示表格序号
    isSelection: true, // 是否显示表格多选
    isOperate: true, // 是否显示表格操作栏
    pagination: true, // 是否显示分页操作栏
    // isRadio: true, // 是否单选 需先将多选置为false
  },
  // 搜索表单，动态生成（传空数组时，将不显示搜索，注意格式）
  search: [
    { label: '采样点名称', prop: 'name', placeholder: '请输入应检尽检核酸采样点名称', required: true, type: 'input' },
    { label: '详细地址', prop: 'address', placeholder: '请输入详细地址', required: false, type: 'input' },
    { label: '联系电话', prop: 'phone', placeholder: '请输入采样点联系电话', required: false, type: 'input' },
    { label: '开放时间', prop: 'time', placeholder: '请选择', required: false, type: 'date' },
    {
      key: 'status',
      colWidth: '',
      title: '状态',
      type: 'status_color_desc',
      tagColorConfig,
      options: $data.statusTypeList,
    },
    { label: '图片描述', prop: 'image', placeholder: '请输入图片描述', required: false, type: 'input' },
    { label: '核酸机构', prop: 'mechanism', placeholder: '请输入核酸机构', required: false, type: 'input' },
  ],
  // 搜索栏下方的操作按钮
  operates: [
    {
      type: 'add',
      text: '新增',
      code: 'add',
    },
    {
      type: 'export',
      text: '导出',
    },
    {
      type: 'print',
      text: '打印',
    },
  ],
  // 表格中的操作列
  operateColumns: [
    {
      type: 'view',
      text: '详情',
      code: 'detail',
    },
    {
      type: 'edit',
      text: '编辑',
      code: 'edit',
    },
    {
      type: 'delete',
      text: '禁用',
      code: 'forbidden',
    },
  ],
  // 搜索参数（不用传，用于分页、搜索时传给后台的值，`getTableData` 中使用）
  param: {
    page_id: 1,
    page_count: 10,
  },
  // 打印标题
  printName: '表格打印演示',
})

// 初始化列表数据
const getTableData = () => {
  state.config.loading = true
  state.data = []
  // TODO: 换成你的接口
  for (let i = 0; i < 20; i++) {
    state.data.push({
      id: `123456789${i + 1}`,
      name: `莲塘别墅广场${i + 1}`,
      address: `中沧公寓中庭榕树下${i + 1}`,
      phone: `0592-6081259${i + 1}`,
      time: `6:00 ~ 24:00`,
      isSupport: `${i % 2 === 0 ? '是' : '否'}`,
      image: '', // `https://img2.baidu.com/it/u=417454395,2713356475&fm=253&fmt=auto?w=200&h=200`,
    })
  }
  // 数据总数（模拟，真实从接口取）
  state.config.total = state.data.length
  setTimeout(() => {
    state.config.loading = false
  }, 500)
}

// 搜索点击时表单回调
const onSearch = (data: EmptyObjectType) => {
  state.param = {
    page_id: 1,
    page_count: state.param.page_count,
  }
  console.log(data)
  state.param = Object.assign({}, state.param, { ...data })
  getTableData()
}

// 顶部操作按钮回调
const onOperate = (item: TableOperateType) => {
  // 这里添加自己的逻辑
  if (item.type === 'print') {
    tableRef.value.onPrintTable()
  } else if (item.type === 'export') {
    tableRef.value.onImportTable()
  } else {
    AddViewEditDialogRef.value.openDialog(item)
  }
}

// 操作项回调
const onTableDelRow = async (row: EmptyObjectType, item: TableOperateType) => {
  console.log(row)
  console.log(item)
  let res: any = {}
  if (item.code === 'delete') {
    res = await editArea({ id: row.id, updated_by: userInfos.value.user_name, status: row.status === 1 ? 2 : 1 })
  }
  if (res.errno === 0) {
    ElMessage.success(`${item.text}成功！`)
    getTableData()
  } else {
    ElMessage.error(`${item.text}失败！`)
  }
}

// 操作当前项回调
const onTableOperateTypeRow = (item: any, row: EmptyObjectType) => {
  console.log(item)
  if (item.type === 'edit') {
    AddViewEditDialogRef.value.openDialog(item, row)
  }
}

// 分页改变时回调
const onTablePageChange = (page: TableDemoPageType) => {
  state.param.page_id = page.page_id
  state.param.page_count = page.page_count
  getTableData()
}
// 页面加载时
onMounted(() => {
  getTableData()
})
</script>

<style scoped lang="scss">
.table-demo-container {
  .table-demo-padding {
    padding: 15px;
    .table-demo {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
