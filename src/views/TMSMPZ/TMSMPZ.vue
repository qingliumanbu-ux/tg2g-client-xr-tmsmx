<template>
    <div style="height: 100%">
        <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
            :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL">
           
            <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="50">
                    <div style="display: flex; flex-direction: column; height: 100%">
                        <xr-ef-panel title="分页" padding="5px">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    :config-id="'GridView1'" @focus-changed="GridView1FocusChanged" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>
                    </div>
                </v-splitter-pane>
                <v-splitter-pane size="50">
                    <div style="display: flex; flex-direction: column; height: 100%">
                        <xr-ef-panel title="详细信息" padding="5px">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    :config-id="'GridView2'"   @erGridReady="erGrid2Ready" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>
                    </div>
                </v-splitter-pane>
               
            </v-splitter>
        </xr-ef-form>
    </div>
</template>

<script lang="ts" src="./TMSMPZ"></script>

<style lang="scss">
@import "./TMSMPZ.scss";
</style>
