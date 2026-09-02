<template>
  <xr-ef-form
  @ready="efFormReady"
    :f2-do="F2_DO"
    :f3-do="F3_DO"
    :f4-do="F4_DO"
    :f5-do="F5_DO"
    :f6-do="F6_DO"
    :f7-do="F7_DO"
    :f8-do="F8_DO"
    :f9-do="F9_DO"
    :f10-do="F10_DO"
    :f11-do="F11_DO"
    :f12-do="F12_DO"
  >
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroupFilter'"
    ></er-layout>
    <xr-ef-panel title="查询信息" padding="5px">
      <template #customButtonSlot></template>
      <template #contentSlot>
        <er-grid
          v-if="initializeFlag === 1"
          :er-form-helper-prop="erFormHelper"
          :config-id="'GridView1'"
          @focus-changed="GridView1FocusChanged"
          :toolbar-style="'both'"
        ></er-grid>
      </template>
    </xr-ef-panel>
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroup1'"
    ></er-layout>
  </xr-ef-form>
</template>

<script lang="ts"
  src="./TMSM97AV">
</script>

<style lang="scss"
  scoped>
@import './TMSM97AV.scss';
</style>
