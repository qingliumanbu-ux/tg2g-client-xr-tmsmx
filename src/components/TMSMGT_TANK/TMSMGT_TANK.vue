<template>
  <ContextMenu
    class="contextMenu"
    v-if="showMenu"
    :id="labelNo"
    :menu_place="weizhi"
    :top="menuTop"
    :left="menuLeft"
    :menuItems="menuItems"
    @close="closeContextMenu"
  />

  <span
    placement="top-start"
    :title="tip_menu"
    :width="200"
    trigger="hover"
    :content="tip_menu"
    effect="dark"
  >
    <div
      class="tank_Overall"
      :id="labelNo"
      @contextmenu.prevent="showContextMenu"
      draggable="true"
      @dragstart="startDrag"
      @dragend="handleDragEnd"
      @mouseover="mouseOver"
      @mouseleave="mouseleave"
      @mouseenter="mouseenter"
      :style="{ transform: `scale(${v_Scale})` }"
    >
      <div class="label_No">{{ labelNo }}</div>
      <div class="myTank">
        <div
          id="reXunHuan"
          :class="[
            { ok_Status: reXunHuan == '0' },
            { warn_Status: reXunHuan == '1' },
          ]"
        ></div>
        <div
          id="shangShuiKou"
          :class="[
            { ok_Status: shangShuiKou == '0' },
            { warn_Status: shangShuiKou == '1' },
          ]"
        ></div>
        <div
          id="huanBan"
          :class="[
            { ok_Status: huanBan == '0' },
            { warn_Status: huanBan == '1' },
          ]"
        ></div>
        <div
          id="diChui"
          :class="[
            { ok_Status: diChui == '0' },
            { warn_Status: diChui == '1' },
          ]"
        ></div>
        <div
          id="shuiKou"
          :class="[
            { ok_Status: shuiKou == '0' },
            { warn_Status: shuiKou == '1' },
          ]"
        ></div>
        <div
          id="xiaoXiu"
          :class="[
            { ok_Status: xiaoXiu == '0' },
            { warn_Status: xiaoXiu == '1' },
          ]"
        ></div>
        <div
          id="zhongXiu"
          :class="[
            { ok_Status: zhongXiu == '0' },
            { warn_Status: zhongXiu == '1' },
          ]"
        ></div>
        <div
          id="daXiu"
          :class="[{ ok_Status: daXiu == '0' }, { warn_Status: daXiu == '1' }]"
        ></div>
      </div>
    </div>
  </span>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import ContextMenu from "../TMSMGT_MENU/TMSMGT_MENU.vue";
import mittBus from "@/hooks/mittBus";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    ContextMenu,
  },

  //  热循环完成
  //  上水口使用次数超限
  //  滑板使用次数超限
  //  底吹座砖使用次数超限（任何一个底吹座砖超限都会报警）
  //  水口座砖使用次数超限
  //  需要小修
  //  需要中修
  //  需要大修
  props: {
    labelNo: { type: String, default: "0" },
    backColor: String,
    reXunHuan: { type: String, default: "0" },
    shangShuiKou: { type: String, default: "0" },
    huanBan: { type: String, default: "0" },
    diChui: { type: String, default: "0" },
    shuiKou: { type: String, default: "0" },
    xiaoXiu: { type: String, default: "0" },
    zhongXiu: { type: String, default: "0" },
    daXiu: { type: String, default: "0" },
    weizhi: { type: String, default: " " },
    heat_no: { type: String, default: " " },
    pono: { type: String, default: " " },
    st_no: { type: String, default: " " },
    v_Scale: { type: Number, default: 1 },
    labelType: String,
  },
  methods: {},
  setup(props, { emit }) {
    const showMenu = ref(false);
    const menuTop = ref(0);
    const menuLeft = ref(0);
    const pian_x = ref(0);
    const pian_y = ref(0);
    const scale = ref(0);
    let pian;
    const if_tooltip = ref(false);
    const doc = document;
    const menuItems = reactive([
      { id: 1, label: "罐号" + props.labelNo, click_able: "none" },
      { id: "separator" },
      { id: 2, label: "罐维修" },
      { id: 3, label: "罐烘烤" },
      { id: "separator" },
      { id: 4, label: "查看罐信息" },
      { id: 5, label: "修改罐信息" },
      { id: 6, label: "删除罐" },
      { id: "separator" },
      {
        id: 7,
        label: "复位",
        children: [
          { id: 9, label: "热循环完成报警复位" },
          { id: 10, label: "上水口使用次数复位" },
          { id: 11, label: "滑板使用次数复位" },
        ],
      },
      { id: 8, label: "离开" },
    ]);
    const tip_menu = ref(
      `罐号：${props.labelNo}\n熔炼号：${props.heat_no}\n制造命令号：${props.pono}\n钢种：${props.st_no}`
    );

    mittBus.on("handleMouseMove", (client) => {
      pian = client as number[];
      pian_x.value = pian?.[0];
      pian_y.value = pian?.[1];
    });
    mittBus.on("handleZoom", (salse) => {
      scale.value = salse as number;
    });
    const showContextMenu = (event: any) => {
      event.preventDefault();

      //查询当前是否已经有打开的弹窗

      const lightMenuList = doc.querySelector(".context-menu");
      if (lightMenuList) {
        const lightMenuList_name = doc
          .querySelector(".context-menu")
          ?.getAttribute("name");
        const lightMenuList_id = doc.querySelector(".context-menu")?.id;

        const menu_message = [lightMenuList_name, lightMenuList_id];
        mittBus.emit("Upload-found-pop-up-event", lightMenuList_id);
      }

      showMenu.value = true;
      if (props.weizhi === "YSQ") {
        menuTop.value = event.clientY;
        menuLeft.value = event.clientX;
      } else {
        menuTop.value = event.clientY;
        menuLeft.value = event.clientX;
      }
      console.log("qwsedfdsqwsdc", menuTop.value, menuLeft.value);
      console.log("qwsedfdsqwsdc", event.clientY, event.clientX);
      console.log("qwsedfdsqwsdc", event.offsetY, event.offsetX);
      console.log("qwsedfdsqwsdc", event.layerY, event.layerX);
      console.log("qwsedfdsqwsdc", event);
    };
    mittBus.on("Upload-found-pop-up-event", (lightMenuList_id) => {
      if (lightMenuList_id === props.labelNo) {
        closeContextMenu();
      }
    });
    mittBus.on("find-tooltip", (lightMenuList_id) => {
      if (lightMenuList_id === props.labelNo) {
        console.log(
          "销毁tip",
          lightMenuList_id,
          props.labelNo,
          if_tooltip,
          doc.querySelector(".myToolTip")?.id
        );
        if_tooltip.value = false;
      }
    });
    const handleClick = (event: any) => {
      console.log("Left-clicked");
      // 清空事件信息
    };
    // 关闭弹窗
    function closeContextMenu() {
      console.log('推出')
      showMenu.value = false;
    }

    //拖动开始
    function startDrag(event: any) {
      var tar = event.target;
      tar.style.opacity = ".6";
      console.log("拖拽开始");
      emit("handleDragStart", props.weizhi, props.labelNo);
    }
    //拖动结束
    function handleDragEnd(event: any) {
      var tar = event.target;
      tar.style.opacity = "1";

      emit("handleDragEnd1", tar);
    }
    const mouseenter = (e: any) => {
      //console.log(e.target);
    };

    function mouseOver(e: any) {
      e.preventDefault();
      //console.log(e.target);
      e.target.style.cursor = "grab";
      mittBus.emit("find-tooltip", doc.querySelector(".myToolTip")?.id);
      setTimeout(() => {
        if_tooltip.value = true;
        if (props.weizhi === "YSQ") {
          menuTop.value = e.clientY;
          menuLeft.value = e.clientX;
        } else {
          menuTop.value = e.clientY;
          menuLeft.value = e.clientX;
        }
      }, 500);
      // console.log('展示tooltip', if_tooltip);
    }
    const mouseleave = () => {
      if_tooltip.value = false;
      mittBus.emit("find-tooltip", doc.querySelector(".myToolTip")?.id);
      //console.log('销毁tip');
    };

    return {
      showMenu,
      menuTop,
      menuLeft,
      menuItems,
      showContextMenu,
      closeContextMenu,
      handleClick,
      startDrag,
      handleDragEnd,
      if_tooltip,
      mouseOver,
      mouseenter,
      mouseleave,
      tip_menu,
    };
  },
};
</script>

<style scoped>
.tank_Overall {
  width: 80px;
  height: 100px;
  z-index: 1;
  transform-origin: top left;
  display: flex;
  flex-direction: column;
  background-image: url("../tank.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.label_No {
  height: 25px;
  width: 80px;
  background-color: black;
  color: white;
  font-size: 18px;
  text-align: center;
}
.grabbing {
  cursor: grabbing !important;
}
.myTank {
  flex-grow: 1;
  width: 80px;
  position: relative;
}
.contextMenu {
  position: fixed;
  z-index: 999;
}
.myToolTip {
  position: fixed;
  z-index: 999;
}
#reXunHuan {
  width: 15px;
  height: 15px;
  left: 10px;
  top: 2px;
  position: absolute;
}
#shangShuiKou {
  width: 15px;
  height: 15px;
  left: 10px;
  top: 19px;
  position: absolute;
}
#huanBan {
  width: 15px;
  height: 15px;
  left: 10px;
  top: 36px;
  position: absolute;
}
#diChui {
  width: 15px;
  height: 15px;
  left: 15px;
  top: 51px;
  position: absolute;
}
#shuiKou {
  width: 15px;
  height: 15px;
  left: 40px;
  top: 51px;
  position: absolute;
}
#xiaoXiu {
  width: 15px;
  height: 15px;
  left: 45px;
  top: 36px;
  position: absolute;
}
#zhongXiu {
  width: 15px;
  height: 15px;
  left: 45px;
  top: 19px;
  position: absolute;
}
#daXiu {
  width: 15px;
  height: 15px;
  left: 45px;
  top: 2px;
  position: absolute;
}
.ok_Status {
  background-color: rgb(61, 61, 250);
}
.warn_Status {
  background-color: rgb(240, 240, 35);
  animation: warn_Status 1s infinite;
}
@keyframes warn_Status {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#separator {
  border: 1px solid black;
  margin: 8px 0;
}
</style>
