<template>
  <xr-ef-form    @ready="efFormReady">
    <er-layout
      v-if="initializeFlag === 1"
      :er-form-helper-prop="erFormHelper"
      :config-id="'LayoutGroup1'"
        @button-click="click_get_time"
        
    ></er-layout>

    <div style="display: flex">
      <div style="display: flex; flex-direction: column; width: 50%">
        <button @click="confirm_done">确定</button>
      </div>
      <div style="display: flex; flex-direction: column; width: 50%">
        <button @click="cancel_done">取消</button>
      </div>
    </div>
  </xr-ef-form>
</template>

<script lang="ts"
  src="./TMSMGT_HK">
</script>

<style lang="scss"
  scoped>
</style>
