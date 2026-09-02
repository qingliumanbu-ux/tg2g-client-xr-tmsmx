import { reactive } from 'vue';
<template>
  <div class="marg_quyu" :id="id_AA" :style="{ width: q_width, height: q_height }">
    <div class="text" v-if="title">{{ title }}</div>
    <div class="padd_quyu" :id="id_AA" :style="{ backgroundColor: back_color }" @dragover="handleMouseOver"
      @dragenter="handleMouseEnter" @dragleave="handleMouseLeave">
      <div :class="getClass1">
        <TMSMGT_TANK class="tank" v-for="item in filteredItems" :key="item.LOCA_NAME" :labelNo="item.LADLE_NO"
          :reXunHuan="item.REXUNHUAN" :shangShuiKou="item.SHANGSHUIKOU" :huanBan="item.HUANBAN" :diChui="item.DICHUI"
          :shuiKou="item.SHUIKOU" :xiaoXiu="item.XIAOXIU" :zhongXiu="item.ZHONGXIU" :daXiu="item.DAXIU"
          :weizhi="item.LOCA_NAME" :heat_no="item.HEAT_NO" :pono="item.PONO" :st_no="item.ST_NO" :v_Scale="getScale"
          @handleDragEnd1="handleDragEnd" @handleDragStart="handleDragStart" />
      </div>
      <div class="label">{{ title1 }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import TMSMGT_TANK from "../TMSMGT_TANK/TMSMGT_TANK.vue";
import { EI, EIManager, EP } from "EIX/ei";
import { computed, inject, reactive, ref, watch } from "vue";
import Color from "element-plus/es/components/color-picker/src/utils/color";

export default {
  props: {
    id_AA: String,
    title: String,
    title1: String,
    name_isvisable: String,
    back_color: String,
    q_width: Number,
    q_height: Number,
    allow_Place: Boolean,
    dataList: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    //console.log('dataList', props.dataList);
    const isDragging = ref(false);
    const startX = ref(0);
    const startY = ref(0);
    const targetCell = ref(null);
    const isDroppable = ref(false);

    function handleMouseEnter(e: any) {
      // 设置拖动的数据
      e.preventDefault();
      const tar = e.target;
      const tagClassName = tar.classList;
      targetCell.value = tagClassName.value !== "padd_quyu" ? null : tar;
      //console.log('targetCellaaaa',  props.id_AA,props.allow_Place);

      emit("handleMouseEnter", props.id_AA, props.allow_Place);
    }
    function handleMouseLeave(e: any) {
      // 设置拖动的数据
      e.preventDefault();

      const tar = e.target;
      const tagClassName = tar.classList;
      targetCell.value = tagClassName.value !== "padd_quyu" ? null : tar;

      //console.log('targetCellbbbb', props.id_AA);
      emit("handleMouseLeave1", null);
    }
    function handleMouseOver(e: any) {
      e.preventDefault();
      const tar = e.target;
      const tagClassName = tar.classList;
      targetCell.value = tagClassName.value !== "padd_quyu" ? null : tar;
      // if (targetCell.value) {
      //   e.target.style.cursor = 'pointer';
      // }
      e.target.style.cursor = "pointer";
    }
    function handleDragEnd(target: any) {
      // 设置拖动的数据
      console.log("放置", target);
      emit("DragEnd");
    }
    function handleDragStart(weizhi: any, LADLE_NO: any) {
      console.log("event", weizhi, LADLE_NO);
      emit("DragStart", weizhi, LADLE_NO);
    }

    watch(
      () => targetCell.value, // 监听响应式对象的变化
      (newValue, oldValue) => {
        //console.log(oldValue, '=>', newValue, props.id_AA); // 打印变化的值
      },
      { immediate: true, deep: true } // 设置选项
    );
    return {
      handleMouseEnter,
      handleMouseLeave,
      handleDragEnd,
      handleDragStart,
      handleMouseOver,
      isDragging,
      startX,
      startY,
      isDroppable,
    };
  },

  computed: {
    filteredItems(props: any) {
      return props.dataList.data.filter(
        (item: any) => item.LOCA_NAME === props.id_AA
      );
    },

    getClass1(props: any) {
      if (props.id_AA === "YSQ") {
        return "FleDirCol1";
      } else {
        return "FleDirRow1";
      }
    },
    getScale(props: any) {
      if (props.id_AA === "YSQ") {
        return 1;
      } else {
        return 0.53;
      }
    },
  },

  components: {
    // eslint-disable-next-line vue/no-unused-components
    TMSMGT_TANK,
  },
};
</script>

<style>
.marg_quyu {
  display: flex;
  flex-direction: column;
  position: relative;
}

.grabbing {
  cursor: copy !important;
}

.text {
  font-size: 15px;
  height: 15px;

  color: blue;
}

.padd_quyu {
  width: 100%;
  height: 100%;

  box-shadow: inset 2px 2px 0px black;
  overflow: auto;
  flex-direction: column;
}

.label {
  padding-left: 5px;
  bottom: 0;
  color: blue;
  font-size: 10px;
  height: 12px;
  position: absolute;
}

.FleDirCol1 {
  width: 100%;
  z-index: 5;
  height: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.FleDirRow1 {
  width: 100%;

  height: 53px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
}

.tank {}
</style>
