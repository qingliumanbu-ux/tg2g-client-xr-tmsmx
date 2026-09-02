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
    name: 'TMSM111S2N',
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

        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);

        const initializeService = 'tmsm_form_get';
        let GridView1!: any;
        let GridView2!: any;
        let GridView3!: any;
        let i_form_ename = '';
        let formName_Now = '';
        let shift_group: any;
        let shift_no: any;
        let heat_no: any;
        let c_div: any;
        const gridview = ref('');
        const layout = ref('');
        let aaaaa: any;
        const gridToolbar1: Ref<any[]> = ref([]);
        const n_zhouzhaun = ref(0);
        const n_hongkao = ref(0);
        const n_tingyong = ref(0);

        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName; // 当前画面名


            initializePage();

        };
        const erGrid1Ready = (e: any) => {
            GridView1 = erFormHelper.getGrid("GridView1");

            erFormHelper.setGridEditable("GridView1", false);
            GridView1.gridOptions.columnDefs = (e: any) => {
                console.log('ytffghjiko', e)
                return {
                    background: 'red'
                }
            }

        }

        // 画面相关数据初始化
        const initializePage = async () => {
            i_form_ename = 'TMSM111S2N';

            const formPartition = efFormInfo.value.formPartition;
            console.log('dyhjjklkkl', 1);
            const initialResult = await erFormHelper.Initialize(
                formPartition,
                i_form_ename,
                '',
                initializeService
            );
            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;

                nextTick(() => {
                    // 获取画面上的主要控件信息
                    erFormHelper.setGridEditable('GridView2', false);
                });

            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };






        //#region 分页查询信息 grid1pagingQuery start
        const grid1pagingQuery = async () => {


            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.buildEiBlock([{ tab: 'TAB1' }]));

            console.log('dfghjkiol', inInfo)
            const outInfo = await erFormHelper.callService('tmsm11av_inq', inInfo, true, true);
            console.log('dfghjkiol', outInfo)
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                //erFormHelper.clearLayoutOrGridData('GridView1');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView1');
                erFormHelper.setGridEditable('GridView1', false);
                n_zhouzhaun.value = outInfo.getBlock(0).data.filter(item => String(item.LADLE_STATUS) === '周转').length;
                n_hongkao.value = outInfo.getBlock(0).data.filter(item => String(item.LADLE_STATUS) === '烘烤').length;
                n_tingyong.value = outInfo.getBlock(0).data.filter(item => String(item.LADLE_STATUS) === '停用').length;
                console.log('dfghjkiol', n_zhouzhaun, n_hongkao)
                return true;
            } else {
                return false;
            }

        };
        const grid2pagingQuery = async () => {


            const inInfo = new EI.EIInfo();

            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('Layout1', { tab: 'TAB2' }));

            const outInfo = await erFormHelper.callService('tmsm11av_inq', inInfo, true, true);
            console.log('dfghjkiol', outInfo)
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                //erFormHelper.clearLayoutOrGridData('GridView1');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView2');
                return true;
            } else {
                return false;
            }

        };


        //F2按钮查询
        const F2_DO = async () => {


            if (tabActiveKey.value === 'tab1') {
                grid1pagingQuery();
            } else if (tabActiveKey.value === 'tab2') {
                grid2pagingQuery();
            }

        };

        //F3按钮新增
        const F3_DO = async (e: any) => {

            erFormHelper.stopGridEditing(gridview.value, async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { fn_no: 'F3' }, false));

                console.log('inInfo', inInfo)
                const out = await erFormHelper.callService('tmsm11av_pro', inInfo, false, true);

                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败');
                    return false;
                }

                F2_DO();

            })
            erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS']);
            erFormHelper.setGridEditable('GridView1', false);

        };
        const F3_PRE_DO = async (e: any) => {
            if (erFormHelper.getGridSelectRowsAsBlock('GridView1').data.length === 0) {
                erFormHelper.messageWarning('请选择一行数据');
                return false;
            }
            erFormHelper.setGridEditable('GridView1', true);
            erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS']);

            console.log(erFormHelper.getGridSelectRows('GridView1'))
            erFormHelper.setGridRowData('GridView1', erFormHelper.getGridSelectRows('GridView1')[0].uid, { LADLE_STATUS: '周转' })
            erFormHelper.setGridRowData('GridView1', erFormHelper.getGridSelectRows('GridView1')[0].uid, { DRYING_ST: ' ', BAKE_TYPE: ' ', BAKE_POS: ' ', LADLE_HEATING_DURATION: 0, DRYING_ET: ' ' });


        };
        const F3_CANCEL = async (e: any) => {
            erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS']);
            F2_DO();
        };


        const F4_DO = async () => {

            erFormHelper.stopGridEditing(gridview.value, async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { fn_no: 'F3' }, false));

                console.log('inInfo', inInfo)
                const out = await erFormHelper.callService('tmsm11av_pro', inInfo, false, true);

                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败');
                    return false;
                }

                F2_DO();

            })
            erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'LADLE_HEATING_DURATION', 'LADLE_STATUS', 'UPLOADER', 'UPLOAD_TIME', 'WORK_MAKER']);
            erFormHelper.setGridEditable('GridView1', false);


        }
        const F4_PRE_DO = () => {
            if (erFormHelper.getGridSelectRowsAsBlock('GridView1').data.length === 0) {
                erFormHelper.messageWarning('请选择一行数据');
                return false;
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '烘烤') {
                erFormHelper.messageWarning('烘烤的钢包不能再烘烤，如需修正数据，请点击修改！');
                return false;
            }
            erFormHelper.setGridEditable('GridView1', true);
            erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'LADLE_HEATING_DURATION', 'LADLE_STATUS', 'UPLOADER', 'UPLOAD_TIME', 'WORK_MAKER']);

            console.log(erFormHelper.getGridSelectRows('GridView1'))
            erFormHelper.setGridRowData('GridView1', erFormHelper.getGridSelectRows('GridView1')[0].uid, { LADLE_STATUS: '烘烤' })
        }
        const F4_CANCEL = () => {
            erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'LADLE_HEATING_DURATION', 'LADLE_STATUS', 'UPLOADER', 'UPLOAD_TIME', 'WORK_MAKER']);
            F2_DO();
        }

        const F5_DO = async () => {
            erFormHelper.stopGridEditing(gridview.value, async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { fn_no: 'F3' }, false));

                console.log('inInfo', inInfo)
                const out = await erFormHelper.callService('tmsm11av_pro', inInfo, false, true);

                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败');
                    return false;
                }

                F2_DO();

            })
            erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS', 'WORK_MAKER', 'UPLOADER', 'UPLOAD_TIME']);
            erFormHelper.setGridEditable('GridView1', false);
        }
        const F5_PRE_DO = () => {
            if (erFormHelper.getGridSelectRowsAsBlock('GridView1').data.length === 0) {
                erFormHelper.messageWarning('请选择一行数据');
                return false;
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '停用') {
                erFormHelper.messageWarning('停用的钢包不能再停用，如需修正数据，请点击修改！');
                return false;
            }
            erFormHelper.setGridEditable('GridView1', true);
            erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS', 'WORK_MAKER', 'UPLOADER', 'UPLOAD_TIME']);

            console.log(erFormHelper.getGridSelectRows('GridView1'))
            erFormHelper.setGridRowData('GridView1', erFormHelper.getGridSelectRows('GridView1')[0].uid, { LADLE_STATUS: '停用' });
            erFormHelper.setGridRowData('GridView1', erFormHelper.getGridSelectRows('GridView1')[0].uid, { DRYING_ST: ' ', BAKE_TYPE: ' ', BAKE_POS: ' ', LADLE_HEATING_DURATION: 0, DRYING_ET: ' ' });
        }
        const F5_CANCEL = () => {
            erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS', 'WORK_MAKER', 'UPLOADER', 'UPLOAD_TIME']);
            F2_DO();
        }
        const F6_DO = async () => {
            erFormHelper.stopGridEditing(gridview.value, async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { fn_no: 'F4' }, false));

                console.log('inInfo', inInfo)
                const out = await erFormHelper.callService('tmsm11av_pro', inInfo, false, true);

                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败');
                    return false;
                }

                F2_DO();

            })
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '周转') {
                erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS']);
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '烘烤') {
                erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'LADLE_HEATING_DURATION', 'LADLE_STATUS', 'UPLOADER', 'UPLOAD_TIME']);
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '停用') {
                erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS', 'WORK_MAKER', 'UPLOADER', 'UPLOAD_TIME']);
            }
            erFormHelper.setGridEditable('GridView1', false);
        }
        const F6_PRE_DO = () => {
            tabActiveKey.value = 'tab1';
            if (erFormHelper.getGridSelectRowsAsBlock('GridView1').data.length === 0) {
                erFormHelper.messageWarning('请选择一行数据');
                return false;
            }
            erFormHelper.setGridEditable('GridView1', true);
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '周转') {
                erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS']);
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '烘烤') {
                erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'LADLE_HEATING_DURATION', 'LADLE_STATUS', 'UPLOADER', 'UPLOAD_TIME',]);
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '停用') {
                erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS', 'WORK_MAKER', 'UPLOADER', 'UPLOAD_TIME']);
            }
            //erFormHelper.setGridColumnEditable('GridView1', false, ...['LADLE_NO', 'LADLE_LIFE', 'LADLE_STATUS']);

            console.log(erFormHelper.getGridSelectRows('GridView1'))

        }
        const F6_CANCEL = () => {
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '周转') {
                erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS']);
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '烘烤') {
                erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'ABN_REASON', 'LADLE_HEATING_DURATION', 'LADLE_STATUS', 'UPLOADER', 'UPLOAD_TIME']);
            }
            if (erFormHelper.getGridSelectRows('GridView1')[0].LADLE_STATUS === '停用') {
                erFormHelper.setGridColumnEditable('GridView1', true, ...['LADLE_NO', 'LADLE_LIFE', 'DRYING_ST', 'BAKE_TYPE', 'BAKE_POS', 'LADLE_HEATING_DURATION', 'DRYING_ET', 'LADLE_STATUS', 'WORK_MAKER', 'UPLOADER', 'UPLOAD_TIME']);
            }
            F2_DO();
        }

        const tabActiveKey = ref('tab1')
        const handleTabChange = (activeKey: string) => {
            console.log(activeKey);
            if (activeKey === 'tab1') {
                tabActiveKey.value = 'tab1';
            } else if (activeKey === 'tab2') {
                tabActiveKey.value = 'tab2';
            }
            F2_DO();
        };

        return {
            erFormHelper, efFormReady, erGrid1Ready,
            initializeFlag,
            F2_DO,
            F3_DO,
            F3_PRE_DO,
            F3_CANCEL, F4_DO, F5_DO, F4_PRE_DO, F4_CANCEL, F5_PRE_DO, F5_CANCEL, F6_DO,
            F6_PRE_DO,
            F6_CANCEL,
            gridview, layout, gridToolbar1, tabActiveKey, handleTabChange, n_zhouzhaun, n_hongkao, n_tingyong
        };
    }
});
