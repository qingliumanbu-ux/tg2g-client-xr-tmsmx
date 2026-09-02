<template>
  <div
    class="context-menu"
    :name="menu_place"
    :id="id"
    :style="{ top: `${top_real}px`, left: `${left_real}px` }"
    @click="hideMenu"
  >
    <ul>
      <li
        v-for="item in filteredItems"
        :key="item.id"
        @click="handleClick(id, item)"
        @mouseenter="showSubMenu($event, item.label, item.id)"
        @mouseleave="hideSubMenu(item.label, item.id)"
      >
        {{ item.label }}
        <ul
          v-if="item.children"
          class="sub-menu"
          v-show="isSubMenuVisible[item.label]"
          :style="{ top: subMenuTop + 'px', left: subMenuLeft + 'px' }"
        >
          <li
            class="sub-menu-item"
            v-for="childItem in item.children"
            :key="childItem.label"
            @click="handleClick(childItem.id, childItem)"
          >
            {{ childItem.label }}
          </li>
        </ul>
      </li>
    </ul>

    <xr-ef-dialog
      v-model:visible="if_tmsmadd"
      :title="`${popshow_form}`"
      height="100%"
      width="80%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <TMSMGT_ADD
        :openInDialog="true"
        :parentInfo="`${popshow_form}`"
        :parentMsg="id"
        @getChildInfo="getChildInfo"
      ></TMSMGT_ADD>
    </xr-ef-dialog>
    <xr-ef-dialog
      v-model:visible="if_tmsmhk"
      :title="`${popshow_form}`"
      height="60%"
      width="40%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <TMSMGT_HK
        :openInDialog="true"
        :parentInfo="`${popshow_form}`"
        :parentMsg="id"
        @getChildInfo="getChildInfo"
      ></TMSMGT_HK>
    </xr-ef-dialog>
    <xr-ef-dialog
      v-model:visible="if_tmsmwx"
      :title="`${popshow_form}`"
      height="85%"
      width="40%"
      @click-close-icon="xrEfDialogClose"
      :default-footer="false"
    >
      <TMSMGT_WX
        :openInDialog="true"
        :parentInfo="`${popshow_form}`"
        :parentMsg="id"
        @getChildInfo="getChildInfo"
      ></TMSMGT_WX>
    </xr-ef-dialog>
  </div>
</template>

<script lang="ts" src="./TMSMGT_MENU"></script>

<style scoped>
.context-menu {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  width: 180px;
  height: 280px;
}

.context-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.context-menu li {
  cursor: pointer;
  padding: 4px;
}

.context-menu li:hover {
  background-color: #ccc;
}
.sub-menu {
  position: absolute;
}
.sub-menu-item {
  height: 20px;
  width: 150px;
  padding: 5px;
  z-index: 9999;
  background-color: #fff;
}
</style>
