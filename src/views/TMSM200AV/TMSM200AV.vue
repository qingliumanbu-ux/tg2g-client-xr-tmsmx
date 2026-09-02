<template>

  <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
    :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL" :f5-do="F5_DO" :f5-pre-do="F5_PRE_DO"
    :f5-cancel="F5_CANCEL" :f6-do="F6_DO" :f7-do="F7_DO" :f7-pre-do="F7_PRE_DO" :f7-cancel="F7_CANCEL">
    <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="`${layout}`"></er-layout>

    <div style="display: flex; flex-direction: row; width: 100%; height: 100%">
      <div style="width: 100%; height: 100%">
        <xr-ef-panel :title="`${c_name} ${c_colornote}`" padding="5px" style="height: 100%">
          <template #customButtonSlot>
          </template>
          <template #contentSlot>
            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="`${gridview}`"
              :toolbar-style="'both'" :toolbar-options="gridToolbar" @erGridReady="erGrid1Ready"
              @focus-changed="gridFocusChanged"   :options="{ viewType: 'BandView' }"></er-grid>
          </template>
        </xr-ef-panel>
      </div>
    </div>
  </xr-ef-form>
  <xr-ef-dialog v-model:visible="dialogFormVisible" :title="dialogFormName_title" height="80%" width="80%"
    @click-close-icon="handleClose" :default-footer="false">
    <TMSMSCS2N :openInDialog="true" :dialogFormName="dialogFormName" :parentInfo="parentInfo"
      @getChildInfo="getChildInfo">
    </TMSMSCS2N>
  </xr-ef-dialog>
</template>

<script lang="ts" src="./TMSM200AV"></script>

<style lang="scss" scoped>
@import "./TMSM200AV.scss";
</style>
