<template>
    <div style="height: 100%">
        <xr-ef-form @ready="efFormReady" :f2-do="F2_DO" :f3-do="F3_DO" :f3-pre-do="F3_PRE_DO" :f3-cancel="F3_CANCEL"
            :f4-do="F4_DO" :f4-pre-do="F4_PRE_DO" :f4-cancel="F4_CANCEL">
            <er-layout v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                :config-id="'LayoutGroupQuery'"></er-layout>
            <v-splitter style="height: 100%" class="default-theme">
                <v-splitter-pane size="33">
                    <div style="display: flex; flex-direction: column; height: 100%">
                        <xr-ef-panel :title="`${tabcname1}`" padding="5px">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    @erGridReady="erGrid1Ready" :config-id="'GridView1'"
                                    @focus-changed="GridView1FocusChanged" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>
                    </div>
                </v-splitter-pane>
                <v-splitter-pane size="33">
                    <div style="display: flex; flex-direction: column; height: 100%">
                        <xr-ef-panel :title="`${tabcname2}`" padding="5px">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    @erGridReady="erGrid2Ready" :config-id="'GridView2'"
                                    @focus-changed="GridView1FocusChanged" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>
                    </div>
                </v-splitter-pane>
                <v-splitter-pane size="34">
                    <div style="display: flex; flex-direction: column; height: 100%">
                        <xr-ef-panel :title="`${tabcname3}`" padding="5px">
                            <template #customButtonSlot> </template>
                            <template #contentSlot>
                                <er-grid v-if="initializeFlag === 1" :er-form-helper-prop="erFormHelper"
                                    @erGridReady="erGrid3Ready" :config-id="'GridView3'"
                                    @focus-changed="GridView1FocusChanged" :toolbar-style="'both'">
                                </er-grid>
                            </template>
                        </xr-ef-panel>
                    </div>
                </v-splitter-pane>
            </v-splitter>
        </xr-ef-form>
    </div>
</template>

<script lang="ts" src="./TMSM13AV"></script>

<style lang="scss">
@import "./TMSM13AV.scss";
</style>
