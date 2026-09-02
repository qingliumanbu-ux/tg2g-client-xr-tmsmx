<template>
    <div style="height: 100%">
        <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
            :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL" :f5-do="F5_DO" :f5-pre-do="F5_PRE_DO"
            :f5-cancel="F5_CANCEL" :f6-do="F6_DO" :f6-pre-do="F6_PRE_DO" :f6-cancel="F6_CANCEL">
            <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                :config-id="'Layout1'"></er-layout>

            <div style="display: flex; flex-direction: column; height: 100%">
                <a-tabs v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange" style="height: 100%;">
                    <a-tab-pane key="tab1" tab="钢包当前信息" style="height: 100%;">

                        <xr-ef-panel :title="`当前钢包使用情况：周转${n_zhouzhaun}个，烘烤${n_hongkao}个，停用${n_tingyong}个`" style="height: 100%;">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    config-id="GridView1" @erGridReady="erGrid1Ready" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>

                    </a-tab-pane>
                    <a-tab-pane key="tab2" tab="钢包历史记录">
                        <xr-ef-panel title="钢包历史记录" style="height: 100%;">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    config-id="GridView2" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>
                    </a-tab-pane>

                </a-tabs>
            </div>

        </xr-ef-form>
    </div>
</template>

<script lang="ts" src="./TMSM111S2N"></script>

<style lang="scss"></style>
