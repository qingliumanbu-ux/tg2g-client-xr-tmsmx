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
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
import { SiUtils } from "ERX/SiUtils";
import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";

import { useRoute } from "vue-router";
import { Console } from "console";
import TMSMADDAV from '../TMSMADDAV/TMSMADDAV.vue'
import xrEfDialog from "EFX/xrEfDialog";

export default defineComponent({
  name: 'TM0097',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid, TMSMADDAV, xrEfDialog
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    const initializeService = 'tmsm_form_get';

    // 变量定义
    const formName = 'TM0097AV';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    const gridToolbar: Ref<any[]> = ref([]);
    const gridToolbar1: Ref<any[]> = ref([]);
    const gridToolbar3: Ref<any[]> = ref([]);
    let gridView1!: any;
    let gridView2!: any;
    const v_col_name = ref('');

    const i_form_ename = '';
    let v_factory_div: any;
    let cs_OkClick = '';
    let i_windowsNumber: any;
    let popFreeEdit: string;

    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区


      initializePage();
    };
    const erGrid1Ready = (e: any) => {
      gridView1 = erFormHelper.getGrid("GridView1");

      erFormHelper.setGridEditable("GridView1", false);
    };
    const erGrid2Ready = (e: any) => {
      gridView2 = erFormHelper.getGrid("GridView2");

      erFormHelper.setGridEditable("GridView2", false);
    };
    const erGrid3Ready = (e: any) => {

    };
    // 画面相关数据初始化
    const initializePage = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition,
        formName,
        '',
        initializeService
      );

      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;

        // 回调函数获取控件信息及设置定义事件等操作

        InitialToolbar();
        nextTick(() => {
          // 获取画面上的主要控件信息

          erFormHelper.setGridEditable('GridView1', false);
          erFormHelper.setGridEditable('GridView2', false);
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };
    const InitialToolbar = () => {
      // gridToolbar.value = erFormHelper.getGridToolbar([
      //   { name: 'excel', visible: true },
      //   { name: 'addrow', visible: false },
      //   { name: 'copyrow', visible: false },
      //   { name: 'delete', visible: false }
      // ]);
      // gridToolbar1.value = erFormHelper.getGridToolbar([
      //   { name: 'excel', visible: true },
      //   {
      //     name: 'addrow',
      //     visible: false,
      //     event: () => {
      //       erFormHelper.addRowToGrid('GridView1', false);
      //     }
      //   },
      //   { name: 'copyrow', visible: false },
      //   { name: 'delete', visible: false }
      // ]);
      // gridToolbar3.value = erFormHelper.getGridToolbar([
      //   { name: 'checkall', visible: false },
      //   { name: 'uncheckall', visible: false }
      // ]);
    };
    //自定义工具栏是否可用
    const setToolbarVisible_ = (configId: string, visible: boolean) => {
      erFormHelper.setGridToolbarVisible(configId, { 'copyrow': visible });
      erFormHelper.setGridToolbarVisible(configId, { 'addrow': visible });
      erFormHelper.setGridToolbarVisible(configId, { 'delete': visible });
    };

    onMounted(() => {

    });
    const queryMat = async () => {

      erFormHelper.clearGridData('GridView1');

      const inInfo = new EI.EIInfo();
      inInfo.blocks.clear;
      inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupQuery'), 'Table1');


      const outInfo = await erFormHelper.callService('tm0097_inq', inInfo, true, true, true);
      if (outInfo.sys.status >= 0) {
        const resultData = outInfo.getBlock(0).data; //后台返回的当页的数据
        erFormHelper.mergeDataToGrid(outInfo.getBlock(0).data, 'GridView1');
      }
      // erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView1');
      // options.success(result);
    };
    const F2_DO = async (e: any) => {
      queryMat();
    };
    const F6_PRE_DO = async (e: any) => {
      setToolbarVisible_('GridView1', true);
      setToolbarVisible_('GridView2', true);
      //设置编辑状态为可编辑
      erFormHelper.setGridEditable('GridView1', true);
      erFormHelper.setGridEditable('GridView2', true);
      erFormHelper.setGridColumnEditable('GridView2', false, ...['STATION_ID', 'EVENT_ID']);
    };
    const F6_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      //获取增删改行的数据
      const Block_add = erFormHelper.getGridRowsAsBlock(gridView1, 'add', {}, true);
      const Block_upd = erFormHelper.getGridRowsAsBlock(gridView1, 'modify', {}, true);
      const Block_del = erFormHelper.getGridRowsAsBlock(gridView1, 'delete', {}, true);

      const Block_add_detail = erFormHelper.getGridRowsAsBlock(gridView2, 'add', {}, true);
      const Block_upd_detail = erFormHelper.getGridRowsAsBlock(gridView2, 'modify', {}, true);
      const Block_del_detail = erFormHelper.getGridRowsAsBlock(gridView2, 'delete', {}, true);

      eiInfo.addBlock(Block_add, 'ADD');
      eiInfo.addBlock(Block_upd, 'UPD');
      eiInfo.addBlock(Block_del, 'DEL');
      eiInfo.addBlock(Block_add_detail, 'ADD_DETAIL');
      eiInfo.addBlock(Block_upd_detail, 'UPD_DETAIL');
      eiInfo.addBlock(Block_del_detail, 'DEL_DETAIL');
      console.log(eiInfo);
      if (
        eiInfo.getBlock('ADD').data.length !== 0 ||
        eiInfo.getBlock('UPD').data.length !== 0 ||
        eiInfo.getBlock('DEL').data.length !== 0 ||
        eiInfo.getBlock('ADD_DETAIL').data.length !== 0 ||
        eiInfo.getBlock('UPD_DETAIL').data.length !== 0 ||
        eiInfo.getBlock('DEL_DETAIL').data.length !== 0
      ) {
        console.log(eiInfo);
        outInfo = await erFormHelper.callService('tm0097_pro', eiInfo, false, false, true);
      }

      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('保存错误:' + outInfo.sys.msg);
        return false;
      } else {
        // 隐藏工具栏按钮
        erFormHelper.messageSuccess('处理成功');
        setToolbarVisible_('GridView1', false);
        setToolbarVisible_('GridView2', false);
        erFormHelper.setGridEditable('GridView1', false);
        erFormHelper.setGridEditable('GridView2', false);
        F2_DO(e);
      }
    };
    const F6_CANCEL = async (e: any) => {
      //设置编辑状态为可编辑
      erFormHelper.setGridEditable('GridView1', false);
      erFormHelper.setGridEditable('GridView2', false);
      setToolbarVisible_('GridView1', false);
      setToolbarVisible_('GridView2', false);
      F2_DO(e);
    };

    const dialogVisible = ref<boolean>(false);
    const dialogFormName = ref(''); // 弹出画面的画面名
    const parentInfo = ref({}); // 给弹出画面传入数据
    // 打开弹框事件
    const openXrEfDialog = () => {
      dialogVisible.value = true;
      console.log('sdfghjk');
    };
    // 获取弹窗画面传递过来的数据
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);


      dialogVisible.value = false; // 关闭弹框
      closeXrEfDialog();
      queryMat();

    };
    // 关闭弹窗事件
    const closeXrEfDialog = () => {

    };
    const F7_DO = async (e: any) => {
      if (erFormHelper.getGridCheckedRows('GridView1').length !== 1) {
        erFormHelper.messageWarning('请选择单个事件!');
      } else {

        const data = {
          LayoutName: 'LayoutGroupCopy',
          callService: 'tm0097_copy',
          mainData: erFormHelper.getGridCheckedRowsAsBlock('GridView1')
        };
        dialogFormName.value = 'TM0097A2'; // 读配置表获取画面名
        parentInfo.value = data;
        console.log('xdfgtyuhbvnjk', data.mainData)
        openXrEfDialog();
      }
    };
    const gridFocusChanged = async (e: any) => {
      if (e) {
        if (e.rowChanged && e.data && e.data.get('EVENT_ID') !== '') {
          const eiInfo = new EI.EIInfo();
          const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
          eiBlock.pushData(
            {
              STATION_ID: e.data.get('STATION_ID'),
              EVENT_ID: e.data.get('EVENT_ID')
            },
            true
          );
          const outInfo = await erFormHelper.callService('tm0099_inq', eiInfo, true, true, true);

          if (outInfo?.sys.status >= 0) {
            erFormHelper.mergeDataToGrid(outInfo, 'GridView2', true);
          }
        }
      }
    };
    const refresh = async (e: any) => {
      const data = erFormHelper.getGridCurrentRow('GridView1');
      if (!data) {
        erFormHelper.messageWarning('请选择需操作的事件！');
      } else {
        const eiInfo = new EI.EIInfo();
        const eiBlock = eiInfo.addBlock(new EI.EiBlock(), 'Table0');
        eiBlock.pushData(
          {
            STATION_ID: data.get('STATION_ID'),
            COLUMN_NAME: v_col_name.value
          },
          true
        );
        const outInfo = await erFormHelper.callService('tm009a_inq', eiInfo, true, true, true);

        if (outInfo?.sys.status >= 0) {
          erFormHelper.mergeDataToGrid(outInfo, 'GridView3', true);
        }
      }
    };
    const transfer = async (e: any) => {
      const Event = erFormHelper.getGridCurrentRow('GridView1', true, true);
      const Event_item = erFormHelper.getGridCheckedRowsAsBlock('GridView3', {}, true);

      if (Event_item.data.length === 0) {
        erFormHelper.messageWarning('请选择待选参数！');
      } else {
        erFormHelper.stopGridEditing('GridView2', () => {
          for (const s of Event_item.data) {

            const sdf = erFormHelper.addRowToGrid('GridView2', true);
            erFormHelper.setGridRowData('GridView2', sdf, { EVENT_ID: Event['EVENT_ID'] });
            erFormHelper.setGridRowData('GridView2', sdf, { STATION_ID: Event['STATION_ID'] });
            erFormHelper.setGridRowData('GridView2', sdf, { ITEM_ENAME: s['COLUMN_NAME'] });
            erFormHelper.setGridRowData('GridView2', sdf, { ITEM_CNAME: s['COMMENTS'] });
            erFormHelper.setGridRowData('GridView2', sdf, { ITEM_TYPE: s['DATA_TYPE'] === 'VARCHAR2' ? 'S' : 'D' });
            erFormHelper.setGridRowData('GridView2', sdf, { ITEM_LEN: s['DATA_LENGTH']?.toString() });
            erFormHelper.setGridRowData('GridView2', sdf, { ITEM_PARA_ALLOW_NULL: 'N' });



          }
        })


      }
    };


    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F6_DO,
      F6_PRE_DO,
      F6_CANCEL,
      F7_DO,
      gridFocusChanged,
      gridToolbar,
      gridToolbar1,
      gridToolbar3,
      refresh,
      v_col_name,
      transfer,
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      erGrid3Ready,
      dialogVisible,
      dialogFormName,
      closeXrEfDialog,
      parentInfo,
      getChildInfo
    };
  }
});
