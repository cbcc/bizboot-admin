import editForm from "../form.vue";
import { handleTree } from "@/utils/tree";
import { message } from "@/utils/message";
import { findMenus, createMenu, updateMenu, deleteMenu } from "@/api/system";
import { addDialog } from "@/components/ReDialog";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import type { FormItemProps } from "../utils/types";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { cloneDeep, isAllEmpty, deviceDetection } from "@pureadmin/utils";
import { filterNotEmpty } from "@/utils";
import type { Menu } from "@/data/entity";

export function useMenu() {
  const form = reactive({
    title: ""
  });

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);

  const getMenuType = (type, text = false) => {
    switch (type) {
      case 0:
        return text ? "菜单" : "primary";
      case 1:
        return text ? "iframe" : "warning";
      case 2:
        return text ? "外链" : "danger";
      case 3:
        return text ? "按钮" : "info";
    }
  };

  const columns: TableColumnList = [
    {
      label: "菜单名称",
      prop: "title",
      align: "left",
      cellRenderer: ({ row }) => (
        <>
          <span class="inline-block mr-1">
            {h(useRenderIcon(row.icon), {
              style: { paddingTop: "1px" }
            })}
          </span>
          <span>{row.title}</span>
          <span class="inline-block mr-1">
            {h(useRenderIcon(row.extraIcon), {
              style: { paddingTop: "1px" }
            })}
          </span>
        </>
      )
    },
    {
      label: "菜单类型",
      prop: "type",
      width: 100,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} type={getMenuType(row.type)} effect="plain">
          {getMenuType(row.type, true)}
        </el-tag>
      )
    },
    {
      label: "路由路径",
      prop: "path"
    },
    {
      label: "组件路径",
      prop: "component",
      formatter: ({ path, component }) =>
        isAllEmpty(component) ? path : component
    },
    {
      label: "权限标识",
      prop: "auths"
    },
    {
      label: "排序",
      prop: "sort",
      width: 100
    },
    {
      label: "隐藏",
      prop: "showLink",
      formatter: ({ showLink }) => (showLink ? "否" : "是"),
      width: 100
    },
    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  async function onSearch() {
    loading.value = true;
    const data = await findMenus(filterNotEmpty(toRaw(form))); // 这里是返回一维数组结构，前端自行处理成树结构
    let newData = data;
    dataList.value = handleTree(newData); // 处理成树结构
    loading.value = false;
  }

  function formatHigherMenuOptions(treeList) {
    if (!treeList || !treeList.length) return;
    const newTreeList = [];
    for (let i = 0; i < treeList.length; i++) {
      treeList[i].title = treeList[i].title;
      formatHigherMenuOptions(treeList[i].children);
      newTreeList.push(treeList[i]);
    }
    return newTreeList;
  }

  function openDialog(title = "新增", row?: Menu) {
    addDialog({
      title: `${title}菜单`,
      props: {
        formInline: {
          type: row?.type ?? 0,
          higherMenuOptions: formatHigherMenuOptions(cloneDeep(dataList.value)),
          parentId: row?.parentId ?? 0,
          title: row?.title ?? "",
          name: row?.name ?? "",
          path: row?.path ?? "",
          component: row?.component ?? "",
          sort: row?.sort ?? 99,
          redirect: row?.redirect ?? "",
          icon: row?.icon ?? "",
          extraIcon: row?.extraIcon ?? "",
          enterTransition: row?.enterTransition ?? "",
          leaveTransition: row?.leaveTransition ?? "",
          activePath: row?.activePath ?? "",
          auths: row?.auths ?? "",
          frameSrc: row?.frameSrc ?? "",
          frameLoading: row?.frameLoading ?? true,
          keepAlive: row?.keepAlive ?? false,
          hiddenTag: row?.hiddenTag ?? false,
          fixedTag: row?.fixedTag ?? false,
          showLink: row?.showLink ?? true,
          showParent: row?.showParent ?? false
        } as FormItemProps
      },
      width: "45%",
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
            // 表单规则校验通过
            const menuModel = {
              type: curData.type,
              parentId: curData.parentId,
              title: curData.title,
              name: curData.name,
              path: curData.path,
              component: curData.component,
              icon: curData.icon,
              extraIcon: curData.extraIcon,
              enterTransition: curData.enterTransition,
              leaveTransition: curData.leaveTransition,
              activePath: curData.activePath,
              redirect: curData.redirect,
              auths: curData.auths,
              frameSrc: curData.frameSrc,
              frameLoading: curData.frameLoading,
              keepAlive: curData.keepAlive,
              hiddenTag: curData.hiddenTag,
              fixedTag: curData.fixedTag,
              showLink: curData.showLink,
              showParent: curData.showParent,
              sort: curData.sort
            };
            try {
              if (title === "新增") {
                await createMenu(menuModel);
              } else {
                await updateMenu(row.id, menuModel);
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

  async function handleDelete(id: number) {
    await deleteMenu(id);
    message("删除成功", { type: "success" });
    onSearch();
  }

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    /** 搜索 */
    onSearch,
    /** 重置 */
    resetForm,
    /** 新增、修改菜单 */
    openDialog,
    /** 删除菜单 */
    handleDelete,
    handleSelectionChange
  };
}
