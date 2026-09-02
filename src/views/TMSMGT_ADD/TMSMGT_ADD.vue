<template>
  <xr-ef-form
    :in-dialog-form-name="parentInfo"
    @initialized="efFormInitialized"
    @closeDialog="closeEfDialog"
   
    :f2-do="F2_DO"
    :f3-do="F3_DO"
    @click.stop
    @ready="efFormReady"
  >
  <template   v-if="initializeFlag === 1"><v-splitter horizontal style="height: 100%;" class="default-theme">
      <v-splitter-pane size="80" style="overflow: auto;">
        <div style="display: flex; flex-direction: column">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane>
              <div style="display: flex; flex-direction: column">
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup1'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup2'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup3'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup4'"
                  :show-group-border="false"
                ></er-layout>

                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup5'"
                  :show-group-border="false"
                  @click="click_tiaojie"
                >
                </er-layout>
              </div>
            </v-splitter-pane>
            <v-splitter-pane>
              <div style="display: flex; flex-direction: column">
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup6'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup7'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup8'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup9'"
                ></er-layout>
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup10'"
                ></er-layout>
              </div>
            </v-splitter-pane>
          </v-splitter>
        </div>
      </v-splitter-pane>
      <v-splitter-pane size="20" style="overflow: auto;">
        <div style="display: flex; flex-direction: column">
          <v-splitter style="height: 100%" class="default-theme">
            <v-splitter-pane size="70">
              <div style="display: flex; flex-direction: column">
                <div style="display: flex; height: 100%">
                  <div
                    style="display: flex; flex-direction: column; width: 40%"
                  >
                    <er-layout
                     
                      :er-form-helper-prop="erFormHelper"
                      :config-id="'LayoutGroup11'"
                    ></er-layout>
                  </div>
                  <div
                    style="display: flex; flex-direction: column; width: 60%"
                  >
                    <er-grid
                     
                      :er-form-helper-prop="erFormHelper"
                      :config-id="'gridview1'"
                    ></er-grid>
                  </div>
                </div>
              </div>
            </v-splitter-pane>
            <v-splitter-pane size="30">
              <div style="display: flex; flex-direction: column">
                <er-layout
                 
                  :er-form-helper-prop="erFormHelper"
                  :config-id="'LayoutGroup12'"
                ></er-layout>
              </div>
            </v-splitter-pane>
          </v-splitter>
        </div>
      </v-splitter-pane>
    </v-splitter></template>
    
  </xr-ef-form>
</template>

<script lang="ts" src="./TMSMGT_ADD"></script>

<style lang="scss">
@import "./TMSMGT_ADD.scss";
</style>
