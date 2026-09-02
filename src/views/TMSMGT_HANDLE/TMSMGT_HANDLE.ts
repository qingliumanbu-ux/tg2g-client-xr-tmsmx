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
  props: {
    old_posi: { type: String, default: '0' },
    new_posi: { type: String, default: '0' },
    openInDialog: {
      type: Boolean,
      default: false
    },
    parentInfo: {
      type: String,
      default: ''
    },
    parentMsg: {
      type: String,
      default: ''
    }
  },
  setup: (props, { emit }) => {
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});

    let formPartition: string;
    const initializeService = 'tmsm_form_get';

    // 变量定义
    const formName = 'TMSMGT_HANDLE';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    const input1 = ref(props.old_posi);
    const input2 = ref(props.new_posi);
    const radio1 = ref();
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区


      initializePage();
    };
    const closeEfDialog = () => {
      const data = {
        // name: formName,
        close: true
      };
      emit('getChildInfo', data);
    };
    const efFormInitialized = (formInfo: any) => {
      //console.log('DEMO03-efFormInitialized');
    };

    console.log('vghjnbhjkknjkl', props.old_posi);
    // 画面相关数据初始化
    const initializePage = async () => {
      console.log('打开弹窗');
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
    const F2_DO = () => {
      const layout = erFormHelper.getAllControlValue('LayoutGroup1');
      if (!input1.value || !input2.value) {
        erFormHelper.messageWarning('起始位置有问题！');
        return false;
      }
      if (!radio1.value) {
        erFormHelper.messageWarning('请至少选一项！');
        return false;
      }
      const obj_process = {
        OLD_POSITION: input1.value,
        NEW_POSITION: input2.value,
        OPERATOR_TYPE: radio1.value,
        EMPTY_LADLE_WT: layout.EMPTY_LADLE_WT,
        LABLE_TEMP: layout.LABLE_TEMP,
        SINCE_LAST_TAP_TIME: layout.SINCE_LAST_TAP_TIME
      };

      emit('getChildprocess', obj_process);
    };
    const cancel_done = () => {
      emit('close');
    };

    onMounted(() => {
      initializePage();
    });

    return {
      erFormHelper,
      initializeFlag,
      input1,
      input2,
      radio1,
      closeEfDialog,
      efFormInitialized,
      cancel_done,
      F2_DO, efFormReady
    };
  }
});
