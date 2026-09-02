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
    const default_check_p = ref([]);
    const default_check_t = ref([]);
    const repair_persons = ['aaa', 'bbb', 'ccc'];
    const repair_types = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'kkk'];

    // 变量定义
    const formName = 'TMSMGT_WX';
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
          // 获取画面上的主要控件信息
          setTimeout(function () {
            erFormHelper.setControlValue('LayoutGroup1', 'LADLE_NO', props.parentMsg);
          }, 500);
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };
    const click_get_time = (e: any) => {

      if (e.target.innerText.toString().trim()) {

        // 判断操作的字段名
        if (e.target.innerText.toString().trim() === '获取开始时间') {
          erFormHelper.setControlValue('LayoutGroup2', 'REPAIR_START_TIME', new Date());
        }
        if (e.target.innerText.toString().trim() === '获取结束时间') {
          erFormHelper.setControlValue('LayoutGroup2', 'REPAIR_END_TIME', new Date());
        }
      }
    };
    const confirm_done = async (e: any) => {

      const filter_condition = erFormHelper.getAllControlValue(['LayoutGroup1', 'LayoutGroup2'], {
        REPAIR_ITEMS: default_check_t.value.join(','),
        REPAIR_PER: default_check_p.value.join(',')
      });
      if (!erFormHelper.checkRequiredInput('LayoutGroup1')) {

        erFormHelper.messageWarning('请检查输入');
        return false;
      }
      if (
        filter_condition['MAINT_TYPE'] === '' ||
        filter_condition['REPAIR_START_TIME'] === '' ||
        filter_condition['REPAIR_END_TIME'] === ''
      ) {

        erFormHelper.messageWarning('没有检测到输入值！');
        return false;
      }
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.buildEiBlock([filter_condition]));
      console.log(default_check_t.value.join(','));
      const outInfo = await erFormHelper.callService(
        'tmsmgt_repair',
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

    onMounted(() => {

    });

    return {
      erFormHelper,
      initializeFlag,
      default_check_p,
      default_check_t,
      repair_persons,
      repair_types,
      click_get_time,
      confirm_done,
      cancel_done, efFormReady
    };
  }
});
