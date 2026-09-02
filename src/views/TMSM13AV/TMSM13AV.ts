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
import ErPopFree from 'ERX/ErPopFree';
import ErPopQuery from 'ERX/ErPopQuery';
import { config } from "process";


export default defineComponent({
    name: 'TMSM13AV',
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid, ErPopFree, ErPopQuery
    },
    setup: () => {
        // 获取画面的分区信息及设置画面初始化service
        const efFormInfo = ref<{ [key: string]: any }>({});
        let formPartition: string;

        // 变量定义
        const formName = '';
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);
        const editable = ref(false);
        const initializeService = 'tmsm_form_get';
        let GridView1!: any;
        let GridView2!: any;
        let GridView3!: any;
        let i_form_ename = '';
        let c_div: any;
        const tabcname1 = ref('夜班');
        const tabcname2 = ref('早班');
        const tabcname3 = ref('中班');

        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            if (efFormInfo.value.formParams?.tabcname1)
                tabcname1.value = efFormInfo.value.formParams['tabcname1'];
            if (efFormInfo.value.formParams?.tabcname2)
                tabcname2.value = efFormInfo.value.formParams['tabcname2'];
            if (efFormInfo.value.formParams?.tabcname3)
                tabcname3.value = efFormInfo.value.formParams['tabcname3'];
            if (efFormInfo.value.formName === 'TMSM13AS2N') {
                c_div = 'A';

            }
            else if (efFormInfo.value.formName === 'TMSM13BS2N') {
                c_div = 'B';

            }
            initializePage();

        };
        const erGrid1Ready = (e: any) => {
            GridView1 = erFormHelper.getGrid("GridView1");
        }
        const erGrid2Ready = (e: any) => {
            GridView2 = erFormHelper.getGrid("GridView2");
        }
        const erGrid3Ready = (e: any) => {
            GridView3 = erFormHelper.getGrid("GridView3");
        }
        // 画面相关数据初始化
        const initializePage = async () => {
            i_form_ename = 'TMSM13AV';

            const formPartition = efFormInfo.value.formPartition;
            const initialResult = await erFormHelper.Initialize(
                formPartition,
                i_form_ename,
                '',
                initializeService
            );

            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;
                //设置在gridview1中进行分页查询

                // 回调函数获取控件信息及设置定义事件等操作

                nextTick(() => {
                    // 获取画面上的主要控件信息
                    erFormHelper.setGridEditable(GridView1, false);
                    erFormHelper.setGridEditable(GridView2, false);
                    erFormHelper.setGridEditable(GridView3, false);
                    erFormHelper.setControlValue('LayoutGroupQuery', 'DATE_C', new Date());
                    if (c_div === 'A') {
                        console.log('ftyuhbnhjikop')
                        erFormHelper.hideGridColumn(GridView1, ['C_ISNORMALTURNLADLE']);
                        erFormHelper.hideGridColumn(GridView2, ['C_ISNORMALTURNLADLE']);
                        erFormHelper.hideGridColumn(GridView3, ['C_ISNORMALTURNLADLE']);
                    }
                });
            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };




        const getgroup = (groupno: any) => {
            if (groupno === "A") {
                return '甲班'
            } else if (groupno === "B") {
                return '乙班'
            } else if (groupno === "C") {
                return '丙班'
            }
            else if (groupno === "D") {
                return '丁班'
            } else {
                return ' '
            }
        }
        const refreshban = () => {
            if (efFormInfo.value.formParams?.tabcname1)
                tabcname1.value = efFormInfo.value.formParams['tabcname1'];
            if (efFormInfo.value.formParams?.tabcname2)
                tabcname2.value = efFormInfo.value.formParams['tabcname2'];
            if (efFormInfo.value.formParams?.tabcname3)
                tabcname3.value = efFormInfo.value.formParams['tabcname3'];
        }


        //#region 分页查询信息 grid1pagingQuery start
        const grid1pagingQuery = async () => {
            console.log('hgffghyuiokjnb bnjko', erFormHelper.getControlValue('LayoutGroupQuery', 'DATE_C'))
            if (erFormHelper.getControlValue('LayoutGroupQuery', 'DATE_C') === null) {
                erFormHelper.messageWarning('请输入日期！');
                return false;
            }
            const inInfo = new EI.EIInfo();


            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupQuery', { C_DIV: c_div }));


            console.log('inInfo', inInfo);
            const outInfo = await erFormHelper.callService('tmsm13av_inq', inInfo, true, true);
            console.log('yghjikm,l;', outInfo.getBlock(0).data)
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                refreshban();
                erFormHelper.mergeDataToGrid(outInfo.getBlock(0), GridView1, true);
                tabcname1.value += getgroup(outInfo.getBlock(0).data[0]?.SHIFT_GROUP === undefined ? '' : outInfo.getBlock(0).data[0]?.SHIFT_GROUP);
                erFormHelper.mergeDataToGrid(outInfo.getBlock(1), GridView2, true);
                tabcname2.value += getgroup(outInfo.getBlock(1).data[0]?.SHIFT_GROUP === undefined ? '' : outInfo.getBlock(1).data[0]?.SHIFT_GROUP);
                erFormHelper.mergeDataToGrid(outInfo.getBlock(2), GridView3, true);
                tabcname3.value += getgroup(outInfo.getBlock(2).data[0]?.SHIFT_GROUP === undefined ? '' : outInfo.getBlock(2).data[0]?.SHIFT_GROUP);

                erFormHelper.setGridEditable(GridView1, false);
                erFormHelper.setGridEditable(GridView2, false);
                erFormHelper.setGridEditable(GridView3, false);
                return true;
            } else {
                return false;
            }


        };
        //#endregion 分页查询信息 end

        //焦点行数据查询
        const GridView1FocusChanged = async (e: any) => {

        };



        //F2按钮查询
        const F2_DO = async (e: any) => {
            //Query();
            grid1pagingQuery();
        };

        //F3按钮新增
        const F3_DO = async (e: any) => {
            if (!await erFormHelper.checkRequiredInput('LayoutGroupQuery')) {
                erFormHelper.messageWarning('请检查输入！');
                return false;
            }
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupQuery', { C_DIV: c_div }));

            const outInfo = await erFormHelper.callService('tmsm13av_ins', inInfo, true, true);

            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();

                return true;
            } else {
                return false;
            }
        };

        const F3_PRE_DO = async (e: any) => {


        };
        const F3_CANCEL = async (e: any) => {

        };

        const F4_DO = async () => {
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(GridView1));
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(GridView2), 'Table2');
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(GridView3), 'Table3');

            const outInfo = await erFormHelper.callService('tmsm13av_upd', inInfo, true, true);

            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                erFormHelper.setGridEditable(GridView1, false);
                erFormHelper.setGridEditable(GridView2, false);
                erFormHelper.setGridEditable(GridView3, false);
                return true;
            } else {
                return false;
            }

        }
        const F4_PRE_DO = () => {
            erFormHelper.setGridEditable(GridView1, true);
            erFormHelper.setGridColumnEditable(GridView1, false, 'LADLE_NO');
            erFormHelper.setGridEditable(GridView2, true);
            erFormHelper.setGridColumnEditable(GridView2, false, 'LADLE_NO');
            erFormHelper.setGridEditable(GridView3, true);
            erFormHelper.setGridColumnEditable(GridView3, false, 'LADLE_NO');
        }
        const F4_CANCEL = () => {
            erFormHelper.setGridEditable(GridView1, false);
            erFormHelper.setGridEditable(GridView2, false);
            erFormHelper.setGridEditable(GridView3, false);
        }


        return {
            erFormHelper, efFormReady,
            initializeFlag,
            F2_DO,
            F3_DO,
            F3_PRE_DO, F3_CANCEL, F4_DO, F4_PRE_DO, F4_CANCEL,
            GridView1FocusChanged,
            tabcname1,
            tabcname2,
            tabcname3, erGrid1Ready, erGrid2Ready, erGrid3Ready

        };
    }
});
