<template>
  <xr-ef-form  @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO">
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="`${layout}`"
    ></er-layout>
    <xr-ef-panel title="标题" padding="5px">
      <template #customButtonSlot> </template>
      <template #contentSlot>
        <er-grid
          v-if="initializeFlag === 1"
          :er-form-helper-prop="erFormHelper"
          :config-id="`${gridview}`"
          :toolbar-style="'both'"
        >
        </er-grid>
      </template>
    </xr-ef-panel>
  </xr-ef-form>
</template>

<script lang="ts" src="./TMSMGT_SHOW"></script>

<style lang="scss" scoped>
@import "./TMSMGT_SHOW.scss";
</style>
