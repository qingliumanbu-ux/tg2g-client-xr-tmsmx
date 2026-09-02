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
        let formName = 'TMSM14AV';
        let formName_Now = '';
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);



        const gridToolbar: Ref<any[]> = ref([]);
        const gridToolbar1: Ref<any[]> = ref([]);
        let date_c: string;
        let c_orderid: string;
        let sap_erp_main: string;
        let sampl_entr_no: string;
        let gridView1: any;
        const c_name = ref();
        const layout = ref();
        const gridview = ref();
        const callService_f2 = ref();
        const callService_f3 = ref();
        const callService_f4 = ref();
        let vif: boolean = false;
        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName; // 当前画面名
            c_name.value = efFormInfo.value.formParams.cname; // 当前画面名
            console.log('formName_Now', efFormInfo);
            layout.value = 'LayoutGroup_' + String(formName_Now).substring(4, 6);
            gridview.value = 'GridView_' + String(formName_Now).substring(4, 6);
            console.log('formName_Now', layout.value, gridview.value, c_name.value);
            callService_f2.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_inq';
            callService_f3.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f3';
            callService_f4.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f4';
            console.log('formName_Now', callService_f2.value, callService_f3.value);

            initializePage();
        };

        const erGrid1Ready = (e: any) => {
            gridView1 = erFormHelper.getGrid(gridview.value);


            erFormHelper.initialGridToolbar(gridview.value, {
                refresh: {
                    visible: true,
                    preventDefault: true,
                    action: () => {
                        erFormHelper.clearGridData(gridview.value)
                    },
                    caption: '清空',
                },

            });

        }

        // 指定要搜索的目录



        // 画面相关数据初始化
        const initializePage = async () => {

            const initialResult = await erFormHelper.Initialize(formPartition, formName, '', initializeService);

            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;

                // 回调函数获取控件信息及设置定义事件等操作
                nextTick(() => {
                    // 获取画面上的主要控件信息
                });
            } else {
                erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
            }
        };
        const rowDataChanged = (e: any) => {
            console.log('uygtfdx', e)
        }

        onMounted(() => {
            //initializePage();
        });
        const F2_DO = async (e: any) => {
            queryRecord(); //查询记录
        };
        const queryRecord = async () => {
            if (!vif) {
                erFormHelper.showGridColumn(gridview.value, 'REC_CREATE_TIME');
                vif = !vif;
            }
            else {
                erFormHelper.hideGridColumn(gridview.value, 'REC_CREATE_TIME');
                vif = !vif;
            }

            if (!await erFormHelper.checkRequiredInput(layout.value)) {
                erFormHelper.messageWarning('请检查输入');
                return false;
            }

            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value));
            const outInfo = await erFormHelper.callService(callService_f2.value, inInfo, false, true, true);

            if (outInfo.sys.status >= 0) {
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, gridview.value);
                return true;
            } else {
                return false;
            }
        };
        const F3_DO = async (e: any) => {
            saveRecord();  //保存记录
            // mergeArrays(gridview1_block.data, gridview2_block.data);

        };

        /*
        const saveRecord = async () => {

            const inInfo = new EI.EIInfo();
            const gridview1_block = erFormHelper.getGridCheckedRowsAsBlock(gridview.value, {}, true);

            console.log(gridview1_block);


            if (gridview1_block.data.length === 0) {
                erFormHelper.messageWarning(c_name.value + '没有勾选的信息！');
                return false;
            }


           
            inInfo.addBlock(
                gridview1_block
            );

            console.log('inInfo', inInfo);
            const outInfo = await erFormHelper.callService(callService_f3.value, inInfo, true, true, true);
            console.log('outInfo1', outInfo);
            if (outInfo.sys.status >= 0) {
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, gridview.value,);
                return true;
            } else {
                return false;
            }
        };
        */
        const saveRecord = async () => {


            const inInfo = new EI.EIInfo();

            const gridview1_block = erFormHelper.getGridCheckedRowsAsBlock(gridview.value, {}, true);
            console.log(gridview1_block);
            if (gridview1_block.data.length < 1) {
                erFormHelper.messageInfo('请选择需操作的记录。');
                return false;
            }

            inInfo.addBlock(gridview1_block);
            console.log('inInfo', inInfo);
            const outInfo = await erFormHelper.callService(callService_f3.value, inInfo, true, true, true);
            console.log('outInfo1', outInfo);
            if (outInfo.sys.status < 0) {
                erFormHelper.messageInfo('处理失败[' + outInfo.sys.msg + ']。');
                return false;
            } else {

                erFormHelper.messageInfo('保存成功!');
            }
            queryRecord(); //查询记录
        };

        const F3_PRE_DO = async (e: any) => {

        };
        const F3_CANCEL = async (e: any) => {

        };
        const F4_DO = async (e: any) => {
            delRecord(); //删除记录

        };
        const delRecord = async () => {

            const inInfo = new EI.EIInfo();

            const gridview1_block = erFormHelper.getGridCheckedRowsAsBlock(gridview.value, {}, true);
            console.log(gridview1_block);
            if (gridview1_block.data.length < 1) {
                erFormHelper.messageInfo('请选择需操作的记录。');
                return false;
            }

            inInfo.addBlock(gridview1_block);
            console.log('inInfo', inInfo);
            const outInfo = await erFormHelper.callService(callService_f4.value, inInfo, true, true, true);
            console.log('outInfo1', outInfo);
            if (outInfo.sys.status < 0) {
                erFormHelper.messageInfo('处理失败[' + outInfo.sys.msg + ']。');
                return false;
            } else {

                erFormHelper.messageInfo('删除成功!');
            }
            queryRecord(); //查询记录
        };

        const F4_PRE_DO = async (e: any) => {

        };
        const F4_CANCEL = async (e: any) => {

        };

        return {
            erFormHelper,
            initializeFlag, F2_DO, F3_DO, F3_PRE_DO, F3_CANCEL, F4_DO, F4_PRE_DO, F4_CANCEL, gridToolbar, gridToolbar1, efFormReady, layout, gridview, c_name, erGrid1Ready, rowDataChanged
        };
    }
});