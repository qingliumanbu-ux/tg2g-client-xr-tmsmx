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

export default defineComponent({
  name: '',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid,
  },
  props: {
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
    const formName = 'TMSMGT_HK';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
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
          nextTick(() => {
            // 获取画面上的主要控件信息
            erFormHelper.setControlValue('LayoutGroup1', 'LADLE_NO', props.parentMsg);
          });
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };
    const confirm_done = async () => {
      const filter_condition = erFormHelper.getAllControlValue(['LayoutGroup1']);
      if (!erFormHelper.checkRequiredInput('LayoutGroup1')) {
        erFormHelper.messageWarning('请检查输入');
        return false;
      }
      if (
        filter_condition['DRYING_ET'] === '' ||
        filter_condition['DRYING_REMARK'] === '' ||
        filter_condition['DRYING_ST'] === '' ||
        filter_condition['GAS_PRESSURE'] === 0 ||
        filter_condition['GAS_TRAFFIC'] === 0 ||
        filter_condition['LABLE_TEMP'] === 0
      ) {
        erFormHelper.messageWarning('没有检测到输入值！');
        return false;
      }
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.buildEiBlock([filter_condition]));
      console.log(filter_condition);
      const outInfo = await erFormHelper.callService(
        'tmsmgt_bake',
        inInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();

        emit('getChildInfo');
        return true;
      } else {
        return false;
      }
    };
    const cancel_done = () => {
      emit('getChildInfo');
    };
    const click_get_time = (e: any) => {
      if (e.model) {
        // 判断操作的字段名
        if (e.itemCode === 'GET_DRY_ST') {
          erFormHelper.setControlValue('LayoutGroup1', 'DRYING_ST', new Date());
        }
        if (e.itemCode === 'GET_DRY_ET') {
          erFormHelper.setControlValue('LayoutGroup1', 'DRYING_ET', new Date());
        }
      }
    };

    onMounted(() => {

    });

    return {
      erFormHelper,
      initializeFlag,
      confirm_done,
      cancel_done,
      click_get_time, efFormReady
    };
  }
});
