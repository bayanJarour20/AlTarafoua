<template>
  <li
    v-if="canViewHorizontalNavMenuHeaderGroup(item)"
    class="dropdown nav-item"
    :class="{
      'sidebar-group-active active open': isActive,
      'show': isOpen,
    }"
    @mouseenter="() => updateGroupOpen(true)"
    @mouseleave="() => updateGroupOpen(false)"
  >
    <b-link class="nav-link dropdown-toggle d-flex align-items-center">
      <feather-icon
        size="14"
        :icon="item.icon"
      />
      <span>{{ item.header }}</span>
    </b-link>
    <ul class="dropdown-menu">
      <component
        :is="resolveHorizontalNavMenuItemComponent(child)"
        v-for="child in item.children"
        :key="child.title"
        :item="child"
      />
    </ul>
  </li>
</template>

<script>
import { BLink } from 'bootstrap-vue'
import { resolveHorizontalNavMenuItemComponent } from '@core/layouts/utils'
import { useUtils as useAclUtils } from '@core/libs/acl'
import useHorizontalNavMenuHeaderGroup from './useHorizontalNavMenuHeaderGroup'
import mixinHorizontalNavMenuHeaderGroup from './mixinHorizontalNavMenuHeaderGroup'

import HorizontalNavMenuGroup from '../horizontal-nav-menu-group/HorizontalNavMenuGroup.vue'
import HorizontalNavMenuLink from '../horizontal-nav-menu-link/HorizontalNavMenuLink.vue'

export default {
  components: {
    BLink,
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink,
  },
  mixins: [mixinHorizontalNavMenuHeaderGroup],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      isActive,
      updateIsActive,
      isOpen,
      updateGroupOpen,
    } = useHorizontalNavMenuHeaderGroup(props.item)

    const { canViewHorizontalNavMenuHeaderGroup } = useAclUtils()

    return {
      isOpen,
      isActive,
      updateGroupOpen,
      updateIsActive,
      resolveHorizontalNavMenuItemComponent,

      // ACL
      canViewHorizontalNavMenuHeaderGroup,
    }
  },
}
</script>
