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
import xrEfDialog from "EFX/xrEfDialog";

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
    const formName = 'TMSMGT_SHOW';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    const layout = ref('');
    const gridview = ref('');
    let service: string;
    console.log(efFormInfo.value.formName);


    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      layout.value = 'LayoutGroup_' + String(efFormInfo.value.formName).substring(7);
      gridview.value = 'gridview_' + String(efFormInfo.value.formName).substring(7);
      service = String(efFormInfo.value.formName).toLowerCase() + '_inq';
      console.log(service);

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
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };

    onMounted(() => {

    });

    const F2_DO = async (e: any) => {
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value));

      console.log(inInfo);
      const outInfo = await erFormHelper.callService(
        service,
        inInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        console.log('outInfo', outInfo);
        erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, gridview.value);

        return true;
      } else {
        return false;
      }
    };
    const F3_DO = () => {
      console.log(erFormHelper.getGridAllRows('gridview1'));
      console.log(erFormHelper.getGridCheckedRows('gridview1'));
      const arr1 = erFormHelper.getGridAllRows('gridview1');
      const arr2 = erFormHelper.getGridCheckedRows('gridview1');
      arr1.splice(2, 0, ...arr2);
      erFormHelper.mergeDataToLayoutOrGrid(arr1, true, 'gridview1');
      console.log(arr1, arr2);
    };

    return {
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      layout,
      gridview, efFormReady
    };
  }
});
