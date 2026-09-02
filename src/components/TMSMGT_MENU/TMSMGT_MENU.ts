
import mittBus from '@/hooks/mittBus';
import TMSMGT_ADD from '../../views/TMSMGT_ADD/TMSMGT_ADD.vue';
import TMSMGT_HK from '../../views/TMSMGT_HK/TMSMGT_HK.vue';
import TMSMGT_WX from '../../views/TMSMGT_WX/TMSMGT_WX.vue';
/* eslint-disable no-use-before-define */
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  nextTick,
  toRaw,
  Ref,
  onUnmounted,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import xrEfDialog from "EFX/xrEfDialog";
export default defineComponent({
  name: '',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid, TMSMGT_ADD, TMSMGT_HK, TMSMGT_WX, xrEfDialog
  },
  props: {
    top: {
      type: Number,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    menuItems: {
      type: Array,
      required: true
    },

    id: {
      type: String,
      required: true
    },
    menu_place: {
      type: String,
      required: true
    }
  }, computed: {
    filteredItems(props: any) {
      return props.menuItems;
    },
  },
  setup(props, { emit }) {
    //console.log('props.showMenu', props.menuItems);
    const top_real = ref(0);
    const left_real = ref(0);

    const menuitems = props.menuItems;
    const doc = document;
    const if_tmsmadd = ref<Boolean>(false);
    const if_tmsmhk = ref<Boolean>(false);
    const if_tmsmwx = ref<Boolean>(false);
    // 弹框ref vbhng
    const xrEfDialogRef = ref<any>(null);
    const popshow_form = ref('');
    const isSubMenuVisible: { [key: string]: any } = {};
    const subMenuTop = ref(0);
    const subMenuLeft = ref(0);
    const mouseX = props.left;
    const mouseY = props.top;
    const screenWidth =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const screenHeight =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const efFormInfo = ref<{ [key: string]: any }>({});
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    //const formParams = EFFormInfo.getFormParams();
    let formPartition: string;


    // 打开弹框事件
    const openXrEfDialog = async () => {
      nextTick(() => {
        xrEfDialogRef.value.open();
      });
    };
    const getChildInfo = () => {
      // 关闭弹框
      console.log('弹窗关闭');
      if_tmsmadd.value = false;
      if_tmsmwx.value = false;
      if_tmsmhk.value = false;
      popshow_form.value = '';
      emit('close');
    };
    // 关闭弹框监听
    const xrEfDialogClose = () => {
      getChildInfo();
    };

    const showMenuHandler = (event: any) => {
      event.preventDefault();
      console.log('绑定', props.menu_place);
      // 获取鼠标点击位置

      // 计算右键菜单的宽度和高度
      const contextMenuWidth = 180; // 右键菜单的宽度
      const contextMenuHeight = 250; // 右键菜单的高度

      // 判断右键菜单是否超出屏幕边界
      const isOverBoundaryX = mouseX + contextMenuWidth > screenWidth;
      const isOverBoundaryY = mouseY + contextMenuHeight > screenHeight;
      // 如果超出了屏幕边界，则在镜像位置加载
      if (isOverBoundaryX) {
        left_real.value = mouseX - contextMenuWidth;
        top_real.value = mouseY;
      }
      if (isOverBoundaryY) {
        left_real.value = mouseX;
        top_real.value = mouseY - contextMenuHeight;
        // eslint-disable-next-line no-dupe-else-if
      }
      if (isOverBoundaryX && isOverBoundaryY) {
        left_real.value = mouseX - contextMenuWidth;
        top_real.value = mouseY - contextMenuHeight;
      }
      if (!isOverBoundaryX && !isOverBoundaryY) {
        // 否则，在鼠标点击位置加载
        left_real.value = mouseX;
        top_real.value = mouseY;
      }
      console.log('真实坐标', top_real, left_real);
    };
    const dialogFormName = ref('');
    const handleClick = async (label: any, item: any) => {
      // e.stopPropagation();
      // 根据需要执行相应的操作
      // console.log('Clicked on ', label, item);
      if (item.id === 5) {
        popshow_form.value = 'TMSMGT_UPD';
        if_tmsmadd.value = true;

        //openXrEfDialog();
      }
      if (item.id === 4) {
        popshow_form.value = 'TMSMGT_CHECK';
        if_tmsmadd.value = true;
        //openXrEfDialog();
      }
      if (item.id === 3) {
        popshow_form.value = 'TMSMGT_HK';
        if_tmsmhk.value = true;
        //openXrEfDialog();
      }
      if (item.id === 2) {
        popshow_form.value = 'TMSMGT_WX';
        if_tmsmwx.value = true;
        //openXrEfDialog();
      }
      if (item.id === 9 || item.id === 10 || item.id === 11) {
        const my_confirm = await erFormHelper.messageConfirm(
          `是否将罐${props.id}进行[${item.label}]操作？`
        );
        if (my_confirm) {
          reset_Tank(props.id, item.id);
        }
      }
      if (item.id === 6) {
        //console.log(props.id);
        const my_confirm = await erFormHelper.messageConfirm(`是否将罐${props.id}删除？`);
        if (my_confirm) {
          delete_Tank(props.id);
        }
      }
      if (item.id === 8) {
        console.log(props.menu_place);
        if (String(props.menu_place).substring(0, 3) !== 'BOF') {
          erFormHelper.messageWarning('当前位置不能离开');
          return false;
        }
        const my_confirm = await erFormHelper.messageConfirm(
          `是否将罐${props.id}离开${props.menu_place}位置？`
        );
        if (my_confirm) {
          leave_Tank(props.id);
        }
      }
    };
    const delete_Tank = async (tank: string) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
      eiBlock.pushData(
        {
          LADLE_NO: tank
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        'tmsmgt_del',
        eiInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        mittBus.emit('all_query', tank);
        return true;
      } else {
        return false;
      }
    };

    const reset_Tank = async (tank: string, tar: number) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
      eiBlock.pushData(
        {
          LADLE_NO: tank,
          FN_NO: tar
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        'tmsmgt_reset',
        eiInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        mittBus.emit('all_query', tank);
        return true;
      } else {
        return false;
      }
    };

    const leave_Tank = async (tank: string) => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
      eiBlock.pushData(
        {
          LADLE_NO: tank
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        'tmsmgt_left',
        eiInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        mittBus.emit('all_query', tank);
        return true;
      } else {
        return false;
      }
    };

    const hideMenuHandler = () => {
      //console.log('hideMenuHandler');
      const lightMenuList = doc.querySelector('.context-menu');
      const lightMenuItemList = doc.querySelectorAll('.context-menu li');
      if (!popshow_form.value) emit('close');
    };

    onMounted(() => {
      //console.log('onmounted');
      document.addEventListener('contextmenu', showMenuHandler);
      document.addEventListener('click', hideMenuHandler);
    });

    onUnmounted(() => {
      //console.log('onUnmounted');
      document.removeEventListener('contextmenu', showMenuHandler);
      document.removeEventListener('click', hideMenuHandler);
    });

    const showSubMenu = (event: any, label: any, item: any) => {
      if (item === 7) {
        isSubMenuVisible[label] = true;
        subMenuTop.value = event.target.offsetTop;
        subMenuLeft.value = event.target.offsetWidth;
        const totalWidth = subMenuTop.value + subMenuLeft.value;
        if (mouseX + 290 > screenWidth) {
          subMenuLeft.value = subMenuLeft.value - 310;
        } else {
          subMenuLeft.value = subMenuLeft.value;
        }
      }
    };

    const hideSubMenu = (label: any, item: any) => {
      if (item === 7) {
        isSubMenuVisible[label] = false;
        console.log('扫描出');
      }
    };
    const hideMenu = (e: any) => {
      console.log('fgyhbnjkm', e);
    }

    return {
      hideMenuHandler, hideMenu,
      left_real,
      top_real,
      menuitems,
      handleClick,
      openXrEfDialog,
      getChildInfo,
      xrEfDialogClose,
      xrEfDialogRef,
      popshow_form,
      showSubMenu,
      hideSubMenu,
      isSubMenuVisible,
      subMenuLeft,
      subMenuTop,
      if_tmsmadd,
      if_tmsmhk,
      if_tmsmwx
    };
  }
});
