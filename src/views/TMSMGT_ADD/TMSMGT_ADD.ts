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
    erGrid
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
  emits: ['getChildInfo'],
  setup: (props, { emit }) => {
    //console.log('props.parentInfo', props.parentInfo);
    const closeEfDialog = () => {
      console.log('进来了');
      const data = {
        // name: formName,
        close: true
      };
      emit('getChildInfo', data);
    };
    const efFormInitialized = (formInfo: any) => {
      //console.log('DEMO03-efFormInitialized');
    };
    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    const initializeService = 'tmsm_form_get';

    // 变量定义
    const formName = 'TMSMGT_ADD';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    const i_form_name = ref('TMSMGT_ADD'); //低代码配置的画面名
    // eslint-disable-next-line vue/no-setup-props-destructure
    if (props.parentInfo) i_form_name.value = props.parentInfo;
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
        'TMSMGT_ADD',
        '',
        initializeService
      );
      console.log('initialResult', formPartition, i_form_name.value, initializeService, initialResult);
      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(() => {
          console.log('fvwsdbwsaycquinx')
          setTimeout(() => {
            // 获取画面上的主要控件信息
            if (i_form_name.value === 'TMSMGT_CHECK') {
              erFormHelper.setControlVisible('LayoutGroup5', false, 'REPAIR_SHIFT_NO');
              console.log('parentMsg', props.parentMsg);
              if (props.parentMsg) show_label_message(props.parentMsg);
            }
            if (i_form_name.value === 'TMSMGT_UPD') {
              erFormHelper.setControlVisible('LayoutGroup5', true, 'REPAIR_SHIFT_NO');
              console.log('parentMsg', props.parentMsg);
              if (props.parentMsg) show_label_message(props.parentMsg);
            }
          }, 5);

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
      const filter_condition = erFormHelper.getAllControlValue([
        'LayoutGroup1',
        'LayoutGroup2',
        'LayoutGroup3',
        'LayoutGroup4',
        'LayoutGroup5',
        'LayoutGroup6',
        'LayoutGroup7',
        'LayoutGroup8',
        'LayoutGroup9',
        'LayoutGroup10'
      ]);
      if (!erFormHelper.checkRequiredInput('LayoutGroup1')) {
        erFormHelper.messageWarning('请检查输入');
        return false;
      }
      console.log('filter_condition', filter_condition);
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.buildEiBlock([filter_condition]));
      const outInfo = await erFormHelper.callService(
        'tmsmgt_ins',
        inInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        return true;
      } else {
        console.log(outInfo);
        erFormHelper.messageError('新增失败:' + outInfo.sys.msg);
        return false;
      }
    };

    const F3_DO = async (e: any) => {
      const filter_condition = erFormHelper.getAllControlValue([
        'LayoutGroup1',
        'LayoutGroup2',
        'LayoutGroup3',
        'LayoutGroup4',
        'LayoutGroup5',
        'LayoutGroup6',
        'LayoutGroup7',
        'LayoutGroup8',
        'LayoutGroup9',
        'LayoutGroup10'
      ]);
      if (!erFormHelper.checkRequiredInput('LayoutGroup1')) {
        erFormHelper.messageWarning('请检查输入');
        return false;
      }
      console.log('filter_condition', filter_condition);
      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.buildEiBlock([filter_condition]));
      console.log(inInfo);
      const outInfo = await erFormHelper.callService(
        'tmsmgt_upd',
        inInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        return true;
      } else {
        return false;
      }
    };
    const show_label_message = async (labelNO: any) => {
      const inInfo = new EI.EIInfo();
      const eiBlock = inInfo.addBlock(new EI.EiBlock(), 'Table0');
      eiBlock.pushData(
        {
          LADLE_NO: labelNO
        },
        true
      );
      console.log(inInfo);
      const outInfo = await erFormHelper.callService(
        'tmsmgt_inq',
        inInfo,
        true,
        true,
        true,
        formPartition
      );
      if (outInfo.sys.status >= 0) {
        erFormHelper.messageSuccess();
        console.log('outInfo', outInfo);
        //erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, ...['LayoutGroup1', 'LayoutGroup2', 'LayoutGroup3']);
        //erFormHelper.setControlValueEx('LayoutGroup1', outInfo.getBlock(0).data[0]);
        mergeDataToLayouts(outInfo.getBlock(0).data[0], [
          'LayoutGroup1',
          'LayoutGroup2',
          'LayoutGroup3',
          'LayoutGroup4',
          'LayoutGroup5',
          'LayoutGroup6',
          'LayoutGroup7',
          'LayoutGroup8',
          'LayoutGroup9',
          'LayoutGroup10'
        ]);

        erFormHelper.setControlReadOnly('LayoutGroup1', true, 'LADLE_NO');
        return true;
      } else {
        return false;
      }
    };
    const getAllLayoutControl = (layoutGroups: Array<String>) => {
      let mergedObj = {};
      layoutGroups.forEach((element) => {
        mergedObj = Object.assign(mergedObj, erFormHelper.getAllControlValue(`${element}`));
      });
      return mergedObj;
    };
    const mergeDataToLayouts = (dataArr: Object, layoutArr: Array<String>) => {
      console.log('dataArr', dataArr);
      for (const layout of layoutArr) {
        erFormHelper.setControlValueEx(`${layout}`, dataArr);
      }
    };
    const click_tiaojie = (e: any) => {

      if (e) {
        console.log('cfgyhgvbhj', e.target.innerHTML);
        // 判断操作的字段名
        if (e.target.innerHTML === '矫正罐温') {
          // 根据业务需求写程序
          const temperature = prompt('请输入温度：', '1000');

          if (temperature !== null) {
            console.log('获取输入内容', temperature);
            erFormHelper.setControlValue('LayoutGroup5', 'LABLE_TEMP', temperature);
          } else {
            alert('您取消了输入。');
          }
        }
      }
    };

    return {
      erFormHelper,
      initializeFlag,
      closeEfDialog,
      efFormInitialized,
      F2_DO,
      F3_DO,
      click_tiaojie, efFormReady
    };
  }
});
