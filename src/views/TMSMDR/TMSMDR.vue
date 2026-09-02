<template>
    <div style="height: 100%">
        <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
            :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL">

            <a-tabs  v-model:activeKey="tabActiveKey" type="card" @change="handleTabChange">
                <a-tab-pane v-for=" s in  tabActiveKeys " :key="`tab`+s.SHOW_SEQ" :tab="s.ACTIVITY_CNAME">
                    <div style="height: 100vh;">
                        <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" :config-id="`GridView${s.SHOW_SEQ}`" :key="`GridView${s.SHOW_SEQ}`"
                            :toolbar-style="'both'" style="height: 90%;" @erGridReady="erGridReady" >
                        </er-grid>
                    </div>
                </a-tab-pane>

            </a-tabs>

        </xr-ef-form>
    </div>
</template>

<script lang="ts" src="./TMSMDR"></script>

<style lang="scss">
@import "./TMSMDR.scss";
</style>
