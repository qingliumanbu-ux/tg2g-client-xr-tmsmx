<template>
  <div style="height: 100%">
    <xr-ef-form @ready="efFormReady" :f2-do="f2Do" :haveAuthButton="false">
      <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="'LayoutGroupFilter'"
        :show-query-button="true" @query-click="f2Do"></er-layout>

      <!-- 下方整体:splitter滚动条 -->
      <v-splitter horizontal style="height: 100%" class="default-theme">
        <!-- 上边grid -->
        <!-- 判定、分级、班组 -->
        <v-splitter-pane style="height: 65%;">
          <xr-ef-panel title="查询" padding="0" style="height:100%">
            <template #contentSlot>
              <div style="height: 100%; padding: 0">
                <er-grid v-if="initializeFlag" :er-form-helper-prop="erFormHelper" :config-id="'gridView1'"
                  @erGridReady="erGrid1Ready"></er-grid>
              </div>
            </template>
          </xr-ef-panel>
        </v-splitter-pane>

        <v-splitter-pane style="height: 35%;">

          <v-splitter vertical style="height: 100%" class="default-theme">

            <v-splitter-pane style="width: 80%;">
              <xr-ef-panel title="数据导入" padding="0" style="height:100%">
                <!-- <template #customButtonSlot>
                  <a-button type="primary" @click="rflashClick">刷新</a-button>
                  <a-button @click="inputClick">导入</a-button>
                </template> -->
                <template #contentSlot>
                  <div style="height: 100%; padding: 0">
                    <er-grid v-if="initializeFlag" :er-form-helper-prop="erFormHelper" :config-id="'gridView2'"
                      @erGridReady="erGrid2Ready"></er-grid>
                  </div>
                </template>
              </xr-ef-panel>
            </v-splitter-pane>
            <v-splitter-pane style="width: 20%;">
              <xr-ef-panel title="确认保存" padding="0" style="height:100% ">
                <template #contentSlot>

                  <a-date-picker style="width: 100%;margin-top: 30px;" :size="size" v-model:value="value3"/>
                  <a-button style="width: 100%; margin-top: 30px;" type="primary" @click="rflashClick"
                    :size="size">清空</a-button>
                  <a-button style="width: 100%; margin-top: 20px;" type="primary" @click="inputClick"
                    :size="size">保存</a-button>


                </template>
              </xr-ef-panel>
            </v-splitter-pane>
          </v-splitter>
          <!-- 下边grid -->


        </v-splitter-pane>
      </v-splitter>
    </xr-ef-form>
  </div>
</template>

<script lang="ts" src="./TMSMQXDRS2N.ts"></script>

<style lang="scss">
@import './TMSMQXDRS2N.scss';
</style>