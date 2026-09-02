import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  nextTick,
  toRaw,
  Ref,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";
import EFCallForm from 'EFX/EFCallForm';

import xrEfDialog from "EFX/xrEfDialog";
import TMSMGT_QYVue from '../../components/TMSMGT_QY/TMSMGT_QY.vue';
import TMSMGT_ADD from '../TMSMGT_ADD/TMSMGT_ADD.vue';
import TMSMGT_HANDLE from '../TMSMGT_HANDLE/TMSMGT_HANDLE.vue';

import mittBus from '@/hooks/mittBus';


export default defineComponent({
  name: 'TMSMGT',
  components: {
    TMSMGT_QYVue,
    TMSMGT_ADD,
    TMSMGT_HANDLE, xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid, xrEfDialog
  },
  methods: {},
  setup() {
    /** 画面显示的罐总数*/
    const efFormInfo = ref<{ [key: string]: any }>({});
    const label_count = ref(0);
    const erFormHelper: ER.FormHelper = new ER.FormHelper();

    //console.log(ErSysInfo.UserId);
    // console.log('erSysInfo', erSysInfo);

    let formPartition: string;
    const mainData = reactive(new EI.EIInfo());
    /**罐移动的当前位置*/
    const targetCell_Now = ref(null);
    /**罐移动时的初始位置 */
    const targetCell_Start = ref(null);
    /**当前区域是否允许放置 */
    const if_allow_place = ref(Boolean);
    /**罐号 */
    const LADLE_NO = ref(null);
    /**罐开始加载 */
    const loaded = ref(false);
    const addMenuShow = ref(false);
    const root = ref(null);
    const if_tmsmadd = ref<Boolean>(false);
    const if_tmsmhandle = ref<Boolean>(false);
    const svgTransform = reactive({
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      scale: 1,
      dragging: false
    });

    /**源位置 */
    const old_posi = ref();
    /**目的位置 */
    const new_posi = ref();
    // 弹框ref xrEfDialogRef_H
    const xrEfDialogRef = ref<any>(null);
    const xrEfDialogRef_H = ref<any>(null);
    const dialogVisible = ref<boolean>(false);
    const dialogVisible_H = ref<boolean>(false);
    const dialogFormName = ref(''); // 弹出画面的画面名
    // 关闭弹窗事件
    const closeXrEfDialog = () => {

    };
    // 打开弹框事件
    const openXrEfDialog = async () => {
      console.log('ghjkjvgyhgbvghuj');
      dialogFormName.value = 'TMSMGT_ADD'; // 读配置表获取画面名
      dialogVisible.value = true;
    };
    const openXrEfDialog_H = async () => {
      dialogFormName.value = 'TMSMGT_HANDLE'; // 读配置表获取画面名
      dialogVisible_H.value = true;
    };
    const getChildInfo = () => {
      // 关闭弹框
      dialogVisible.value = false;
      svgTransform.dragging = false;
    };
    const getChildInfo_H = () => {
      // 关闭弹框
      dialogVisible_H.value = false;
      svgTransform.dragging = false;
    };
    const getChildprocess = async (info: any) => {
      console.log('收到弹窗传出的数据', info);

      if (info.OPERATOR_TYPE === '1') {
        const confirm = await erFormHelper.messageConfirm(
          `是否将罐${LADLE_NO.value}移动到${targetCell_Now.value}位置？`
        );
        if (confirm) {
          upDateData();
        }
      }

      xrEfDialogRef_H.value.close();
      svgTransform.dragging = false;
    };
    // 关闭弹框监听
    const xrEfDialogClose = () => {
      svgTransform.dragging = false;

      queryData(); // 关闭弹框后查询主表
    };
    const xrEfDialogClose_H = () => {
      svgTransform.dragging = false;
      queryData(); // 关闭弹框后查询主表
    };

    //子组件dragenter事件
    const handleMouseEnter = (targetCell: any, allow_Place: any) => {
      targetCell_Now.value = targetCell;
      if_allow_place.value = allow_Place;
      //console.log(targetCell_Now.value);
    };
    //子组件dragleave事件
    const handleMouseLeave = (targetCell: any) => {
      targetCell_Now.value = targetCell;
      //console.log(targetCell_Now.value);
    };
    mittBus.on('all_query', (tank: any) => {
      queryData();
    });

    //TMSMGT_TANK组件DragEnd事件
    const DragEnd = async (event: any) => {
      if (
        targetCell_Now.value &&
        targetCell_Start.value &&
        targetCell_Now.value !== targetCell_Start.value
      ) {
        if (!if_allow_place.value) {
          alert('该位置不允许放置!');
          svgTransform.dragging = false;
        } else {
          if_tmsmhandle.value = true;
          openXrEfDialog_H();

          old_posi.value = document
            .getElementById(targetCell_Start.value)
            ?.querySelector('.label')?.innerHTML;
          new_posi.value = document
            .getElementById(targetCell_Now.value)
            ?.querySelector('.label')?.innerHTML;
        }
      } else {
        alert('你未完成一次有效的拖动');
        svgTransform.dragging = false;
      }
    };
    //TMSMGT_TANK组件DragStart事件
    const DragStart = (weizhi_start: any, ladle_no: any) => {
      targetCell_Start.value = weizhi_start;
      LADLE_NO.value = ladle_no;
      //console.log('weizhi_start', targetCell_Start.value);
    };
    //主表查询
    const queryData = async () => {
      const eiInfo = new EI.EIInfo();

      await erFormHelper
        .callService('tmsmgt_init', eiInfo, true, true, true, formPartition)
        .then((res) => {
          nextTick(() => {
            if (mainData.contains('Table0')) {
              mainData.remove('Table0');
            }
            mainData.addBlock(res.getBlock(0), 'Table0');
          });
        });

      label_count.value = mainData.getBlock('Table0').data.length;
      console.log('mainData.getBlock(Table0).data', mainData.blocks['Table0']);
      console.log('mainData.getBlock(Table0).data.length', mainData.getBlock('Table0').data.length);

      loaded.value = true;
    };
    //主表更新
    const upDateData = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
      eiBlock.pushData(
        {
          LADLE_NO: LADLE_NO.value,
          NEW_PLACE: targetCell_Now.value
        },
        true
      );

      const outInfo = await erFormHelper.callService(
        'tmsmgt_yd_upd',
        eiInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        queryData();
        return true;
      } else {
        return false;
      }
    };
    const click_add = () => {
      if_tmsmadd.value = true;
      addMenuShow.value = true;

      openXrEfDialog();
      console.log('点击', if_tmsmadd.value, if_tmsmhandle.value);
    };
    const click_refresh = () => {
      console.log('刷新');
      queryData();
    };
    const click_skip = () => {
      console.log('跳转');
      EFCallForm('TMSMGT_SHOW', {});
    };
    const click_skip1 = () => {
      console.log('跳转');
      EFCallForm('TMSMGT_REPAIR', {});

    };
    const click_skip2 = () => {
      console.log('跳转');
      EFCallForm('TMSMGT_BAKE', {});

    };
    const click_con_plan = () => {
      EFCallForm('TMSM01A3AV', {});

    };
    const boxStyle = () => {
      return {
        transform: `translate(${svgTransform.startX}px, ${svgTransform.startY}px) scale(${svgTransform.scale})`
      };
    };
    const handleZoom = (event: any) => {
      const delta = event.deltaY > 0 ? 0.1 : -0.1;

      // eslint-disable-next-line no-empty
      if (svgTransform.scale + delta < 0.8 || svgTransform.scale + delta > 2) {
      } else {
        svgTransform.scale += delta;
      }
      mittBus.emit('handleZoom', svgTransform.scale);
    };
    const handleMouseDown = (event: any) => {
      const { clientX, clientY } = event;
      svgTransform.dragging = true;
      svgTransform.startX = clientX;
      svgTransform.startY = clientY;
    };
    const handleMouseMove = (event: any) => {
      if (svgTransform.dragging) {
        const { clientX, clientY } = event;
        const deltaX = clientX - svgTransform.startX;
        const deltaY = clientY - svgTransform.startY;
        svgTransform.x += deltaX;
        svgTransform.y += deltaY;
        svgTransform.startX = clientX;
        svgTransform.startY = clientY;
        mittBus.emit('handleMouseMove', [svgTransform.x, svgTransform.y]);
      }
    };
    const handleMouseUp = () => {
      svgTransform.dragging = false;
    };


    onMounted(() => {
      queryData();

      console.log('DOM完成挂载');
    });

    return {
      label_count,
      root,
      boxStyle,
      queryData,
      click_skip,
      click_skip1,
      click_skip2,
      mainData,
      loaded,
      click_add,
      click_refresh,
      addMenuShow,
      xrEfDialogRef,
      xrEfDialogRef_H,
      getChildInfo,
      getChildInfo_H,
      getChildprocess,
      openXrEfDialog,
      openXrEfDialog_H,
      xrEfDialogClose,
      xrEfDialogClose_H,
      handleMouseEnter,
      handleMouseLeave,
      DragEnd,
      DragStart,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleZoom,
      svgTransform,
      if_tmsmadd,
      if_tmsmhandle,
      new_posi,
      old_posi,
      click_con_plan,
      targetCell_Now, dialogVisible, closeXrEfDialog, dialogFormName, dialogVisible_H
    };
  }
});
