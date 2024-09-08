interface FormItemProps {
  higherDeptOptions: Record<string, unknown>[];
  id: number;
  parentId: number;
  name: string;
  type: number;
  sort: number;
  enabled: boolean;
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
