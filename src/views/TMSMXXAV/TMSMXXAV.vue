<template>
  <div style="height: 100%">
    <xr-ef-form
      @ready="efFormReady"
      :f2-do="F2_DO"
      :f3-do="F3_DO"
      :f4-do="F4_DO"
      :f5-do="F5_DO"
      :f6-do="F6_DO"
      :f8-do="F8_DO"
      :f9-do="F9_DO"
      :f10-do="F10_DO"
      :f11-do="F11_DO"
    >
      <er-layout
        v-if="initializeFlag === 1"
        :er-form-helper-prop="erFormHelper"
        :config-id="'LayoutGroupFilter'"
      ></er-layout>
      <v-splitter horizontal style="height: 100%" class="default-theme">
        <v-splitter-pane size="60">
          <div style="display: flex; flex-direction: column; height: 100%">
            <xr-ef-panel title="详细信息" padding="5px">
              <template #customButtonSlot> </template>
              <template #contentSlot>
                <er-grid
                  v-if="initializeFlag === 1"
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'GridView1'"
                  @focus-changed="GridView1FocusChanged"
                  :toolbar-style="'both'"
                >
                </er-grid>
              </template>
            </xr-ef-panel>
          </div>
        </v-splitter-pane>
        <v-splitter-pane size="40">
          <div style="display: flex; flex-direction: column">
            <a-tabs
              v-model:activeKey="tabActiveKey"
              type="card"
              @change="handleTabChange"
            >
              <a-tab-pane key="tab1" :tab="tabcname1" v-if="tabable1">
                <div>
                  <er-layout
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroup1'"
                    :show-group-border="false"
                  ></er-layout>
                </div>
              </a-tab-pane>
              <a-tab-pane key="tab2" :tab="tabcname2" v-if="tabable2">
                <div>
                  <er-layout
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroup2'"
                    :show-group-border="false"
                  ></er-layout>
                </div>
              </a-tab-pane>
              <a-tab-pane key="tab3" :tab="tabcname3" v-if="tabable3">
                <div>
                  <er-layout
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroup3'"
                    :show-group-border="false"
                  ></er-layout>
                </div>
              </a-tab-pane>
              <a-tab-pane key="tab4" :tab="tabcname4" v-if="tabable4">
                <div>
                  <er-layout
                    v-if="initializeFlag === 1"
                    :er-form-helper-prop="erFormHelper"
                    :config-id="'LayoutGroup4'"
                    :show-group-border="false"
                  ></er-layout>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./TMSMXXAV"></script>

<style lang="scss">
@import "./TMSMXXAV.scss";
</style>
