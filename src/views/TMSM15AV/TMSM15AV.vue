<template>

    <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
        :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL" :f5-do="F5_DO" :f5-pre-do="F5_PRE_DO"
        :f5-cancel="F5_CANCEL">
        <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="`${layout}`"></er-layout>

        <div style="display: flex; flex-direction: row; width: 100%; height: 100%">
            <div style="width: 100%; height: 100%">
                <a-tabs v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange">
                    <a-tab-pane key="tab1" tab="记录">
                        <div style="height: 100%;">
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="gridview1" :toolbar-options="gridToolbar" :toolbar-style="'both'"
                                @erGridReady="erGrid1Ready">
                            </er-grid>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="tab2" tab="历史记录">
                        <div style="height: 100%;">
                            <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                :config-id="gridview2" :toolbar-options="gridToolbar" :toolbar-style="'both'"
                                @erGridReady="erGrid2Ready">
                            </er-grid>
                        </div>
                    </a-tab-pane></a-tabs>
            </div>
        </div>
    </xr-ef-form>
</template>

<script lang="ts" src="./TMSM15AV"></script>

<style lang="scss" scoped>
@import "./TMSM15AV.scss";
</style>
