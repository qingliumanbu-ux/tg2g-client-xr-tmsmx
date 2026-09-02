<template>
  <xr-ef-form
    :f2-do="F2_DO"
    @initialized="efFormInitialized"
       @closeDialog="closeEfDialog"

    :in-dialog-form-name="parentInfo"
     @ready="efFormReady"
  >
    <xr-ef-panel title="标题" :show-header="false" padding="5px">
      <template #customButtonSlot> </template>
      <template #contentSlot>
        <div style="margin: 10px">
          <el-input v-model="input1" disabled>
            <template #prepend>源位置:</template>
          </el-input>
        </div>
        <div style="margin: 10px">
          <el-input v-model="input2" disabled>
            <template #prepend>目的位置:</template>
          </el-input>
        </div>
        <div
          style="
             {
              width: 100%;
              height: auto;
            }
          "
        >
          <p style="margin: 10px">选择操作类型</p>
          <div style="border: 1px solid #000">
            <el-radio-group
              v-model="radio1"
              style="display: grid; flex-direction: column; padding: 5px"
            >
              <el-radio
                label="1"
                size="large"
                border
                style="width: 100%; margin: 5px 0"
              >
                仅修改罐位置
              </el-radio>
              <el-radio
                label="2"
                size="large"
                border
                style="width: 100%; margin: 5px 0"
              >
                罐分配
              </el-radio>
              <er-layout
                v-if="initializeFlag === 1"
                :er-form-helper-prop="erFormHelper"
                :config-id="'LayoutGroup1'"
                :show-group-border="false"
              ></er-layout>
              <el-radio
                label="3"
                size="large"
                border
                style="width: 100%; margin: 5px 0"
              >
                取消罐分配
              </el-radio>
              <el-radio
                label="4"
                size="large"
                border
                style="width: 100%; margin: 5px 0"
              >
                罐回收
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>
    </xr-ef-panel>
  </xr-ef-form>
</template>

<script lang="ts" src="./TMSMGT_HANDLE"></script>

<style lang="scss" scoped></style>
