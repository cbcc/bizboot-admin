<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import NoticeItem from "./components/NoticeItem.vue";
import BellIcon from "@iconify-icons/ep/bell";
import { getNotifications, getUnReadNotificationCount } from "@/api/user";

const noticesNum = computed(
  () =>
    notices.value["notice"].unreadCount + notices.value["message"].unreadCount
);
const notices = ref({
  notice: {
    key: "0",
    name: "公告",
    list: [],
    unreadCount: 0,
    emptyText: "暂无公告"
  },
  message: {
    key: "1",
    name: "消息",
    list: [],
    unreadCount: 0,
    emptyText: "暂无消息"
  }
});

const activeKey = ref(0);

const getLabel = computed(
  () => item =>
    item.name + (item.unreadCount > 0 ? `(${item.unreadCount})` : "")
);

onMounted(() => {
  getUnReadCount();
  fetchNotification();
  fetchMessage();
});

const pages = ref({
  notice: {
    number: -1,
    totalPages: -1
  },
  message: {
    number: -1,
    totalPages: -1
  }
});

function getUnReadCount() {
  getUnReadNotificationCount({ type: 0 }).then(data => {
    notices.value["notice"].unreadCount = data;
  });
  getUnReadNotificationCount({ type: 1 }).then(data => {
    notices.value["message"].unreadCount = data;
  });
}

function fetchNotification() {
  loading.value = true;
  getNotifications({
    type: 0,
    page: ++pages.value.notice.number,
    size: 4
  }).then(data => {
    notices.value["notice"].list.push(...data.content);
    pages.value.notice.number = data.page.number;
    pages.value.notice.totalPages = data.page.totalPages;
    loading.value = false;
  });
}

function fetchMessage() {
  loading.value = true;
  getNotifications({
    type: 1,
    page: ++pages.value.message.number,
    size: 4
  }).then(data => {
    notices.value["message"].list.push(...data.content);
    pages.value.message.number = data.page.number;
    pages.value.message.totalPages = data.page.totalPages;
    loading.value = false;
  });
}

const loading = ref(false);

const noMoreNotice = computed(
  () =>
    pages.value.notice.totalPages >= 0 &&
    pages.value.notice.number >= pages.value.notice.totalPages
);
const disabledNotice = computed(() => loading.value || noMoreNotice.value);

const noMoreMessage = computed(
  () =>
    pages.value.message.totalPages >= 0 &&
    pages.value.message.number >= pages.value.message.totalPages
);
const disabledMessage = computed(() => loading.value || noMoreMessage.value);
</script>

<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <span
      :class="[
        'dropdown-badge',
        'navbar-bg-hover',
        'select-none',
        Number(noticesNum) !== 0 && 'mr-[10px]'
      ]"
    >
      <el-badge :value="Number(noticesNum) === 0 ? '' : noticesNum" :max="99">
        <span class="header-notice-icon">
          <IconifyIconOffline :icon="BellIcon" />
        </span>
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs
          v-model="activeKey"
          :stretch="true"
          class="dropdown-tabs"
          :style="{ width: '330px' }"
        >
          <el-tab-pane
            v-infinite-scroll="fetchNotification"
            class="noticeList-container"
            :infinite-scroll-disabled="disabledNotice"
            :infinite-scroll-distance="1"
            :infinite-scroll-immediate="false"
            :label="getLabel(notices.notice)"
            :name="0"
          >
            <NoticeItem
              v-for="(item, index) in notices.notice.list"
              :key="index"
              :noticeItem="item"
            />
            <el-empty
              v-if="pages.notice.totalPages === 0"
              :description="notices.notice.emptyText"
            />
            <p v-else-if="noMoreNotice">No more</p>
          </el-tab-pane>
          <el-tab-pane
            v-infinite-scroll="fetchNotification"
            class="noticeList-container"
            :infinite-scroll-disabled="disabledMessage"
            :infinite-scroll-distance="1"
            :infinite-scroll-immediate="false"
            :label="getLabel(notices.message)"
            :name="1"
          >
            <NoticeItem
              v-for="(item, index) in notices.message.list"
              :key="index"
              :noticeItem="item"
            />
            <el-empty
              v-if="pages.message.totalPages === 0"
              :description="notices.message.emptyText"
            />
            <p v-else-if="noMoreNotice">No more</p>
          </el-tab-pane>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 不知道为什么，没有这个注释会导致无限滚动 bug -->
</template>

<style lang="scss" scoped>
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 48px;
  cursor: pointer;

  .header-notice-icon {
    font-size: 18px;
  }
}

.dropdown-tabs {
  .noticeList-container {
    padding: 15px 24px 0;
    height: 300px;
    overflow: auto;
    p {
      text-align: center;
    }
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px;
  }
}
</style>
