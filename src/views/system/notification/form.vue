<script setup lang="ts">
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { usePublicHooks } from "@/views/system/hooks";
import { useNotification } from "./utils/hook";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null,
    title: "",
    context: "",
    type: null,
    active: true
  })
});

const ruleFormRef = ref();
const { switchStyle } = usePublicHooks();
const newFormInline = ref(props.formInline);

const { typeOptions } = useNotification();

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
    <el-row :gutter="30">
      <re-col>
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="newFormInline.title"
            clearable
            placeholder="请输入标题"
            maxlength="50"
          />
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="内容" prop="context">
          <el-input
            v-model="newFormInline.context"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入内容"
            type="textarea"
            maxlength="2000"
            show-word-limit
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="类型" prop="type">
          <el-select v-model="newFormInline.type" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态" prop="active">
          <el-switch
            v-model="newFormInline.active"
            inline-prompt
            :active-value="true"
            :inactive-value="false"
            active-text="生效"
            inactive-text="失效"
            :style="switchStyle"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
