import { onMounted, reactive, Ref, ref, nextTick, defineComponent, toRaw } from 'vue';
import { EI } from 'EIX/ei';
//import { ErUtils } from '@baosight/er';
//import { EFFormInfo } from '@baosight/ef';
//升级框架写法
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";
import xrEfSearchBox from "EFX/xrEfSearchBox";
import xrEfDialog from "EFX/xrEfDialog";
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import { ER } from 'ERX/Er';
import { useRouter } from 'vue-router';
import type { SizeType } from 'ant-design-vue/es/config-provider';
import { message } from 'ant-design-vue';

import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { title } from 'process';

import dayjs, { Dayjs } from 'dayjs';
export default defineComponent({
  name: 'QXCRDR',
  components: {
    xrEfForm,
    xrEfPanel,
    xrEfSearchBox,
    xrEfDialog,
    erGrid,
    erLayout
  },
  setup() {
    //升级框架写法
    const efFormInfo = ref<{ [key: string]: any }>({});
    const efFormIsReady = ref(false);
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition.value = efFormInfo.value.formPartition;
      // 初始化低代码工具类
      Initialize();
    };
    const formPartition = ref('');
    const initializeService = 'tmsm_form_get';
    const $router = useRouter();

    const formName = 'TMSMQXDRS2N';
    const erFormHelper: ER.FormHelper = new ER.FormHelper();
    const initializeFlag = ref(0);
    let gridView1!: any;
    let gridView2!: any;

    const editable = ref(false);

    let date2 = new Date();
    type Dayjs = any;
    const monthFormat = 'YYYY/MM/DD';
    const value3 = ref<Dayjs>(dayjs(date2.toISOString(), monthFormat));
    let size = ref<SizeType>('large');
    // 画面相关数据初始化
    const Initialize = async () => {
      const initialResult = await erFormHelper.Initialize(
        formPartition.value,
        formName,
        '',
        initializeService
      );
      if (initialResult.flag > 0) {

        initializeFlag.value = 1;

        nextTick(() => {
          // 初始化 自定义画面组件的事件等操作
          erFormHelper.setGridEditable('gridView1', false);
          erFormHelper.setGridEditable('gridView2', false);
          getCodeList();
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };

    onMounted(() => {
      //Initialize();
    });

    const erGrid1Ready = () => {
      gridView1 = erFormHelper.getGrid('gridView1');
    };

    const erGrid2Ready = () => {
      gridView2 = erFormHelper.getGrid('gridView2');
    };

    // 非新增行不可编辑
    const forbidChangeExistedRows = (e: any) => {
      if (e.data && e.colDefEditable && !e.data.isNew) {
        e.column.colDef.editable = false;
      }
    };

    // 查询
    const f2Do = () => {
      getCodeList();
    };

    // 判定统计
    const getCodeList = async () => {
      Tab0Data();
    };


    // 判定统计
    const Tab0Data = () => {
      const layoutGroupFilterValue = erFormHelper.getAllControlValue('LayoutGroupFilter');
      console.log("layoutGroupFilterValue:", layoutGroupFilterValue);
      const eiInfo = new EI.EIInfo();
      const eiBlock = EI.EiBlock.build('Table0', [
        {
          // START_TIME: layoutGroupFilterValue.START_TIME,
          END_TIME: layoutGroupFilterValue.END_TIME,
          UNIT: layoutGroupFilterValue.UNIT,
            VERSION: layoutGroupFilterValue.VERSION,
           SUBMIT_CYCLE: layoutGroupFilterValue.SUBMIT_CYCLE
        }
      ]);
      eiInfo.addBlock(eiBlock);
      console.log("eiBlock:", eiBlock);

      erFormHelper.callService('qxsm23_dr_inq1', eiInfo).then((res: EI.EIInfo) => {
        if (res.status >= 0) {
          erFormHelper.messageSuccess("查询成功")
          erFormHelper.mergeEiBlockToGrid(res.getBlock('Table0'), gridView1);
        }
        else {
          erFormHelper.messageError('查询失败:' + res.msg)
        }

      });

    };


    // const gridView1FocusChanged = (e: any) => {
    //   forbidChangeExistedRows(e);
    //   if (e && e.rowChanged) {
    //     if (e.data) {
    //       const layoutGroupFilterValue = erFormHelper.getAllControlValue('LayoutGroupFilter');
    //       const selectedMainGridRow = {
    //         UNIT_CODE: toRaw(e.data).UNIT_CODE, //获取焦点行某列的数据
    //         CURVE_DESC: toRaw(e.data).CURVE_DESC,
    //         SMALL_CODE_CLASS: layoutGroupFilterValue.SMALL_CODE_CLASS,
    //         DATE_FROM: layoutGroupFilterValue.DATE_FROM,
    //         DATE_END: layoutGroupFilterValue.DATE_END
    //       };
    //       const eiInfo = new EI.EIInfo();
    //       const eiBlock = eiInfo.addBlock(new EI.EiBlock());
    //       eiBlock.pushData(selectedMainGridRow, true);
    //       erFormHelper.callService('qxcr23tz_inq2', eiInfo).then((res: EI.EIInfo) => {
    //         erFormHelper.mergeEiBlockToGrid(res.getBlock('Table0'), gridView2);
    //       });
    //     } else {
    //       erFormHelper.clearGridData('gridView2');
    //     }
    //   }
    // };

    /* 导入数据grid清空 */
    const rflashClick = (e: any) => {
      console.log("hello world1")
      erFormHelper.clearGridData('gridView2');
    }

    /* 导入数据grid数据写入数据库 */
    const inputClick = (e: any) => {
     const view2Block = erFormHelper.getGridAllRowsAsBlock("gridView2");
        console.log("view2Block:", view2Block);
        console.log("eiBlock.counts:", view2Block.data.length);
        console.log("value3.value:", value3.value);

        if (value3.value === undefined || view2Block.data.length === 0 || value3.value === null) {
            if (value3.value === undefined || value3.value === null) {
                erFormHelper.messageWarning(" 导入月份为空！！！");

            }
            else if (view2Block.data.length === 0) {
                erFormHelper.messageWarning(" 导入数据为空！！！");
            }

            return -1;
        }
        else {
        let M: number = value3.value.$M + 1;
        let Y: number = value3.value.$y;
        let D: number = value3.value.$D;
        let time: string = Y.toString() + M.toString().padStart(2, '0') + D.toString().padStart(2, '0');
            console.log("time", time);

        const eiInfo = new EI.EIInfo();
        const tieml_ = EI.EiBlock.build('Table0', [
                {
                    TIME: time
                }
            ]);

            eiInfo.addBlock(view2Block, "data");
            eiInfo.addBlock(tieml_, "time");
            console.log("eiInfo:", eiInfo);

            erFormHelper.callService('qxsm23_dr_ins1', eiInfo).then((res: EI.EIInfo) => {
                if (res.status >= 0) {
                    erFormHelper.messageSuccess("数据导入成功")
            rflashClick(e);
                }
                else {
                    erFormHelper.messageError('数据导入失败:' + res.msg)
          }
            });
        
        

      }

    }




    return {
      f2Do,

      rflashClick,
      inputClick,
      erFormHelper,
      initializeFlag,
      editable,
      //升级框架写法
      efFormReady,
      erGrid1Ready,
      erGrid2Ready,
      value3,
      size,
      locale
    };
  }
});
