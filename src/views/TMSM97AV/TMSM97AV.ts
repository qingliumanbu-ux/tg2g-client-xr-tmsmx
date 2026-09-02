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

export default defineComponent({
  name: '',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  setup: () => {
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    const initializeService = 'tmsm_form_get';

    // 变量定义
    const formName = 'TMSM97AV';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    let GridView1!: any;
    let v_factory_div: any;
    const editable = ref(false);

    let i_windowsNumber: any;
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区


      initializePage();
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
        nextTick(() => {
          // 获取画面上的主要控件信息
          GridView1 = erFormHelper.getGrid('GridView1');
          erFormHelper.setGridEditable('GridView1', false);
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };
    //#region 分页查询信息 grid1pagingQuery start
    const grid1pagingQuery = async () => {

      const Query = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(Query, 'Table1');

      inInfo.addBlock(erFormHelper.getAllControlValueAsFilter('LayoutGroupFilter'), 'QUERY_FILTER');

      console.log('htvuhg tkyu');
      const outInfo = await erFormHelper.callService(
        'tmsm97bf2_inq',
        inInfo,
        false,
        true,
        true,
        formPartition
      );

      if (outInfo.sys.status >= 0) {
        const resultData = outInfo.getBlock(0)?.data; //后台返回的当页的数据

        erFormHelper.mergeDataToGrid(resultData, GridView1);


        if (outInfo.getBlock(0).data.length === 0) {
          erFormHelper.messageInfo('未查询到材料信息');
        }
      }
    };
    //焦点行数据查询
    const GridView1FocusChanged = async (e: any) => {
      if (e) {
        if (e.rowChanged && e.data) {
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(
            erFormHelper.convertModelAsBlock(e.data, {
              RESUME_SEQ_NO: e.data.get('RESUME_SEQ_NO')
            })
          );
          const outInfo = await erFormHelper.callService('tmsm97bf2_inq', inInfo, false, true);
          if (outInfo.sys.status < 0) {
            return false;
          }
          //清空



          //加载

          erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(0).data, true, 'LayoutGroup1')
        }
      }
    };

    onMounted(() => {

    });

    const F2_DO = async (e: any) => {
      grid1pagingQuery();
    };
    const F3_DO = async (e: any) => { };
    const F4_DO = async (e: any) => { };
    const F5_DO = async (e: any) => { };
    const F6_DO = async (e: any) => { };
    const F7_DO = async (e: any) => { };
    const F8_DO = async (e: any) => { };
    const F9_DO = async (e: any) => { };
    const F10_DO = async (e: any) => { };
    const F11_DO = async (e: any) => { };
    const F12_DO = async (e: any) => { };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F7_DO,
      F8_DO,
      F9_DO,
      F10_DO,
      F11_DO,
      F12_DO,
      GridView1FocusChanged, efFormReady
    };
  }
});
