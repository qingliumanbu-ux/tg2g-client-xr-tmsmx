<template>
  <xr-ef-form @ready="efFormReady">
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroup1'"
    ></er-layout>
    <div style="display: flex; height: 50%">
      <div style="display: flex; flex-direction: column; width: 35%">
        <div style="margin: 0 10px">维修人员</div>
        <div
          style="
            margin: 5px 10px;
            padding: 5px;
            border: 1px solid #000;
            height: 100%;
            overflow: hidden;
          "
        >
          <el-checkbox-group
            v-model="default_check_p"
            style="display: flex; flex-direction: column"
          >
            <el-checkbox
              v-for="repair_person in repair_persons"
              :key="repair_person"
              :label="repair_person"
            >
              {{ repair_person }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; width: 5%"></div>
      <div style="display: flex; flex-direction: column; width: 60%">
        <div style="margin: 0 10px">维修项目</div>
        <div
          style="
            margin: 5px 10px;
            padding: 5px;
            border: 1px solid #000;
            height: 100%;
            overflow: auto;
          "
        >
          <el-checkbox-group
            v-model="default_check_t"
            style="display: flex; flex-direction: column"
          >
            <el-checkbox
              v-for="repair_type in repair_types"
              :key="repair_type"
              :label="repair_type"
            >
              {{ repair_type }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroup2'"
      :show-group-border="false"
      @click="click_get_time"
    ></er-layout>
    <div style="display: flex">
      <div style="display: flex; flex-direction: column; width: 50%"></div>
      <div style="display: flex; flex-direction: column; width: 25%">
        <button @click="confirm_done">确认</button>
      </div>
      <div style="display: flex; flex-direction: column; width: 25%">
        <button @click="cancel_done">取消</button>
      </div>
    </div>
  </xr-ef-form>
</template>

<script lang="ts"
  src="./TMSMGT_WX">
</script>

<style lang="scss"
  scoped>
</style>
