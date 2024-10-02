import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  title: [{ required: true, message: "标题为必填项", trigger: "blur" }],
  context: [{ required: true, message: "内容为必填项", trigger: "blur" }],
  type: [{ required: true, message: "类型为必填项", trigger: "blur" }]
});
