<!--
 * @Description: {{ moduleName }}/{{ menuName1 }}/{{ pascalCase menuName2 }}增加 or 编辑弹窗
 * @Author: fengyinchao@zonst.cn
 * @Date: 2023-04-19 15:06:06
 * @LastEditTime: 2023-09-06 11:52:20
-->
<template>
  <div class="system-role-dialog-container">
    <el-dialog
      v-model="state.dialog.isShowDialog"
      :title="state.dialog.title"
      width="769px"
      :before-close="closeDialog"
    >
      <el-form
        ref="roleDialogFormRef"
        :model="state.formData"
        :size="themeConfig.isMobile ? 'small' : 'default'"
        label-width="90px"
        :rules="rules"
        :disabled="disableForm"
      >
        <el-row :gutter="35">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="state.formData.roleName" placeholder="请输入角色名称" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button :size="themeConfig.isMobile ? 'small' : 'default'" @click="onCancel">取 消</el-button>
          <el-button type="primary" :size="themeConfig.isMobile ? 'small' : 'default'" @click="onSubmit"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { reactive, ref, nextTick } from 'vue'
import { useThemeConfig } from '@/stores/ThemeConfig'
import { storeToRefs } from 'pinia'
import { useUserInfo } from '@/stores/UserInfo'
import { FormRules, ElMessage } from 'element-plus'

// 定义变量内容
const userInfo = useUserInfo()
const { userInfos } = storeToRefs(userInfo)
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const disableForm = ref(false)
// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh'])

const rules = reactive<FormRules>({
  roleName: [{ required: true, message: 'Please input roleName', trigger: 'blur' }],
})
// 定义变量内容
const roleDialogFormRef = ref()
const state = reactive({
  formData: {
    roleName: '', // 角色名称
  },
  dialog: {
    isShowDialog: false,
    type: '',
    title: '',
  },
})

// 打开弹窗
const openDialog = async (item: TableOperateType, row: TableDemoRowType) => {
  state.dialog.title = item.text
  state.dialog.type = item.type
  if (item.type === 'edit' || item.type === 'view') {
    console.log(row)
    nextTick(() => {
      const { id, roleName } = row
      state.formData = { id, roleName }
    })
  }
  disableForm.value = item.type === 'view'
  state.dialog.isShowDialog = true
}
// 关闭弹窗
const closeDialog = () => {
  roleDialogFormRef.value.resetFields()
  state.dialog.isShowDialog = false
}
// 取消
const onCancel = () => {
  closeDialog()
}
// 提交
const onSubmit = () => {
  roleDialogFormRef.value.validate(async (isValid: boolean) => {
    if (isValid) {
      const api = state.dialog.type === 'add' ? props.addApi : props.editApi
      await api(state.formData)
      closeDialog()
      emit('refresh')
    }
  })
}

// 暴露变量
defineExpose({
  openDialog,
})
</script>

<style scoped lang="scss">
.system-role-dialog-container {
  .menu-data-tree {
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    padding: 5px;
  }
}
</style>
