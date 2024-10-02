import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "../utils/types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { h, onMounted, reactive, type Ref, ref, toRaw } from "vue";
import type { Notification } from "@/data/entity";
import { filterNotEmpty } from "@/utils";
import {
  createNotification,
  deleteNotification,
  findNotifications,
  updateNotification
} from "@/api/system";

export function useNotification() {
  const form = reactive({
    title: "",
    type: null,
    active: null
  });
  const curRow: Ref<Notification> = ref();
  const formRef = ref();
  const dataList: Ref<Array<Notification>> = ref([]);
  const loading = ref(true);
  const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const typeOptions = [
    {
      value: 0,
      label: "公告"
    },
    {
      value: 1,
      label: "消息"
    }
  ];

  const getType = (type, text = false) => {
    switch (type) {
      case 0:
        return text ? "公告" : "primary";
      case 1:
        return text ? "消息" : "warning";
    }
  };
  const columns: TableColumnList = [
    {
      label: "编号",
      prop: "id"
    },
    {
      label: "类型",
      prop: "type",
      width: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} type={getType(row.type)} effect="plain">
          {getType(row.type, true)}
        </el-tag>
      )
    },
    {
      label: "标题",
      prop: "title"
    },
    {
      label: "内容",
      prop: "context"
    },
    {
      label: "状态",
      prop: "active",
      minWidth: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.active ? 1 : 0)}>
          {row.active ? "生效" : "失效"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      prop: "createdTime",
      minWidth: 160,
      formatter: ({ createdTime }) =>
        dayjs(createdTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      width: 140,
      slot: "operation"
    }
  ];

  async function handleDelete(id: number) {
    await deleteNotification(id);
    message("删除成功", { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;

    const params = {
      ...filterNotEmpty(toRaw(form)),
      size: pagination.pageSize,
      page: pagination.currentPage - 1
    };
    const { content, page } = await findNotifications(params);
    dataList.value = content;
    pagination.pageSize = page.size;
    pagination.currentPage = page.number + 1;
    pagination.total = page.totalElements;

    loading.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}通知`,
      props: {
        formInline: {
          title: row?.title ?? "",
          context: row?.context ?? "",
          type: row?.type ?? null,
          active: row?.active ?? true
        }
      },
      width: "46%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;

        function chores() {
          message(`${title}成功`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }

        FormRef.validate(async valid => {
          if (valid) {
            try {
              if (title === "新增") {
                await createNotification(curData);
              } else {
                await updateNotification(row.id, curData);
              }
              chores();
            } catch (error) {
              message(error.message, { type: "error" });
            }
          }
        });
      }
    });
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    curRow,
    loading,
    columns,
    dataList,
    pagination,
    typeOptions,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
