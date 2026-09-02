<template>
  <xr-ef-form
    @ready="efFormReady"
    :f2-do="F2_DO"
    :f6-do="F6_DO"
    :f6-pre-do="F6_PRE_DO"
    :f6-cancel="F6_CANCEL"
    :f7-do="F7_DO"
  >
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroupQuery'"
    ></er-layout>

    <v-splitter horizontal style="height: 100%" class="default-theme">
      <v-splitter-pane size="50">
        <div style="display: flex; flex-direction: column; height: 100%">
          <xr-ef-panel title="事件明细" padding="5px">
            <template #customButtonSlot></template>
            <template #contentSlot>
              <er-grid
                v-if="initializeFlag === 1"
                :er-form-helper-prop="erFormHelper"
                :config-id="'GridView1'"
                :toolbar-options="gridToolbar1"
                :toolbar-style="'both'"
                @focus-changed="gridFocusChanged"
                @erGridReady="erGrid1Ready"
              ></er-grid>
            </template>
          </xr-ef-panel>
        </div>
      </v-splitter-pane>
      <v-splitter-pane size="50">
        <v-splitter style="height: 100%" class="default-theme">
          <v-splitter-pane size="70">
            <div style="display: flex; flex-direction: column; height: 100%">
              <xr-ef-panel title="字段明细" padding="5px">
                <template #customButtonSlot></template>
                <template #contentSlot>
                  <er-grid
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'GridView2'"
                    :toolbar-options="gridToolbar"
                    :toolbar-style="'both'"
                    @erGridReady="erGrid2Ready"
                  ></er-grid>
                </template>
              </xr-ef-panel>
            </div>
          </v-splitter-pane>
          <v-splitter-pane size="30">
            <div style="display: flex; flex-direction: column; height: 100%">
              <xr-ef-panel title="配置项" padding="5px">
                <template #customButtonSlot></template>
                <template #contentSlot>
                  <div style="display: flex">
                    <div
                      style="display: flex; flex-direction: column; width: 15%"
                    >
                      <button @click="transfer">
                        <p>&lt;&lt;&lt;</p>
                      </button>
                    </div>
                    <span>
                      字段名 <input style="width: 70%" v-model="v_col_name" />
                    </span>

                    <div
                      style="display: flex; flex-direction: column; width: 15%"
                    >
                      <button @click="refresh">查询</button>
                    </div>
                  </div>
                  <er-grid
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'GridView3'"
                    :toolbar-style="'both'"
                    :toolbar-options="gridToolbar3"
                    style="height: 90%"
                    @erGridReady="erGrid3Ready"
                  ></er-grid>
                </template>
              </xr-ef-panel></div
          ></v-splitter-pane>
        </v-splitter>
      </v-splitter-pane>
    </v-splitter>
  </xr-ef-form>
  <!-- xr-ef-dialog组件 -->
  <xr-ef-dialog
    v-model:visible="dialogVisible"
    :title="dialogFormName"
    height="80%"
    width="80%"
    @click-close-icon="closeXrEfDialog"
    :default-footer="false"
  >
    <TMSMADDAV
      :openInDialog="true"
      :dialogFormName="dialogFormName"
      :parentInfo="parentInfo"
      @getChildInfo="getChildInfo"
    ></TMSMADDAV>
  </xr-ef-dialog>
</template>

<script lang="ts" src="./TM0097AV"></script>

<style lang="scss" scoped>
@import "./TM0097AV.scss";
</style>
