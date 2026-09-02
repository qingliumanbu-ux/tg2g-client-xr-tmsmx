<!--
 * @Description:
 * @Author: Edward
 * @Date: 2022-04-28 11:04:08
 * @LastEditors: zhangTing
 * @LastEditTime: 2023-07-19 14:43:52
-->
<template>
  <div style="height: 100%">
    <xr-ef-form
      :in-dialog-form-name="openInDialog ? dialogFormName : 'null'"
      @ready="efFormReady"
      @closeDialog="closeEfDialog"
       :f2-do="F2_DO"
    >
      <er-layout
        v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id=" LayoutName "
        :allow-collapse="false"
      ></er-layout>
    
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./TMSMADDAV"></script>

<style lang="scss" scoped>
@import "./TMSMADDAV.scss";
</style>
