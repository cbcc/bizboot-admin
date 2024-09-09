<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { usePublicHooks } from "@/views/system/hooks";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null,
    name: "",
    code: "",
    enabled: true,
    remark: ""
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="角色名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入角色名称"
      />
    </el-form-item>
    <el-form-item label="角色标识" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入角色标识"
      />
    </el-form-item>
    <el-form-item label="状态" prop="enabled">
      <el-switch
        v-model="newFormInline.enabled"
        inline-prompt
        :active-value="true"
        :inactive-value="false"
        active-text="启用"
        inactive-text="停用"
        :style="switchStyle"
      />
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
