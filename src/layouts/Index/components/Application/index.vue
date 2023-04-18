<template>
  <div class="application-wrapper">
    <!-- 弹出菜单 -->
    <PopMenu v-if="props.type === 'popMenu'" :position="position" />
    <!-- 应用程序列表 -->
    <ApplicationList v-else :position="position" />
  </div>
</template>

<script setup lang="ts">
import PopMenu from './popMenu.vue'
import ApplicationList from './applicationList.vue'
interface Props {
  type?: 'applicationList' | 'popMenu'
  position?: 'header' | 'side'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'applicationList',
  position: 'side'
})
</script>

<style lang="scss" scoped>
// @import '@/styles/sidebar';
@import '../../styles/index';

.application-wrapper {
  width: 100%;
  height: 100%;
  background: $applicationListBg;

  :deep() {
    .sidebar-menu-wrapper {
      .el-menu {
        width: $applicationItemWidth;

        .el-menu-item,
        .el-sub-menu .el-sub-menu__title {
          padding: 0;
          line-height: unset;
        }

        &.el-menu--horizontal {
          overflow: hidden;
          width: 100%;
          height: 68px;
          background-color: #20233a;

          .el-sub-menu {
            width: var(--el-menu-item-height);
          }
        }

        .el-sub-menu {
          padding: $applicationItemPadding;
          height: var(--el-menu-item-height);
          background-color: #20233a;

          .el-tooltip__trigger {
            border: none;
          }

          .common-menu-item {
            .common-menu-item-icon {
              span {
                font-size: 24px;
              }

              margin: 0 0 6px;
            }

            .common-menu-item-text {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
// popover menu active
.el-popper {
  .el-menu {
    .el-sub-menu.is-active > .el-tooltip__trigger {
      border: none;

      .common-menu-item {
        &-icon {
          color: #2c82fd;
        }

        &-text {
          color: #2c82fd;
        }
      }

      .el-icon {
        color: #2c82fd;
      }
    }
  }
}
</style>
