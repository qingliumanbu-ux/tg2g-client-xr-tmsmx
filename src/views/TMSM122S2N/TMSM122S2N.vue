<template>
    <div style="height: 100%">
        <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
            :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL" :f5-do="F5_DO" :f5-pre-do="F5_PRE_DO"
            :f5-cancel="F5_CANCEL">
            <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                :config-id="`${layout}`"></er-layout>

            <div style="display: flex; flex-direction: column; height: 100%">
                <xr-ef-panel title="0#炉" padding="5px">
                    <template #customButtonSlot> </template>
                    <template #contentSlot>
                        <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" config-id="GridView1"
                            @erGridReady="erGrid1Ready" @cell-value-changed="valueChanged"
                             :toolbar-style="'both'">
                        </er-grid>
                    </template>
                </xr-ef-panel>
                <xr-ef-panel title="1#炉" padding="5px">
                    <template #customButtonSlot> </template>
                    <template #contentSlot>
                        <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" config-id="GridView2"
                            @erGridReady="erGrid2Ready" @cell-value-changed="valueChanged"
                           :toolbar-style="'both'">
                        </er-grid>
                    </template>
                </xr-ef-panel>
                <xr-ef-panel title="2#炉" padding="5px">
                    <template #customButtonSlot> </template>
                    <template #contentSlot>
                        <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper" config-id="GridView3"
                            @erGridReady="erGrid3Ready" @cell-value-changed="valueChanged"
                             :toolbar-style="'both'">
                        </er-grid>
                    </template>
                </xr-ef-panel>
            </div>

        </xr-ef-form>
    </div>
</template>

<script lang="ts" src="./TMSM122S2N"></script>

<style lang="scss">
@import "./TMSM122S2N.scss";
</style>
