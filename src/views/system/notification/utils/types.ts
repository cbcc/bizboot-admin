interface FormItemProps {
  id: number;
  title: string;
  type: number;
  context: string;
  active: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
