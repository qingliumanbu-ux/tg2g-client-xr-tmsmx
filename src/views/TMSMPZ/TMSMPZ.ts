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
    name: 'TMSMPZ',
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
        let i_form_ename = '';
        let c_div: any;


        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区


            initializePage();

        };
        // 画面相关数据初始化
        const initializePage = async () => {
            i_form_ename = 'TMSMPZ';

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
                    erFormHelper.setGridEditable('GridView1', false);
                    erFormHelper.setGridEditable('GridView2', false);


                });
            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };

        const erGrid2Ready = () => {
            //不可编辑
            let gridView2: any;
            gridView2 = erFormHelper.getGrid("GridView2");

            erFormHelper.setGridEditable("GridView2", false);
            erFormHelper.initialGridToolbar("GridView2", {
                addrow: {
                    visible: false,
                    action: (e: any) => {
                        erFormHelper.stopGridEditing('GridView2', () => {
                            const asd = erFormHelper.addRowToGrid('GridView2', true);
                            const code_class = erFormHelper.getGridCurrentRow('GridView1')
                            erFormHelper.setGridRowData('GridView2', asd, { 'ACTIVITY_NAME': code_class['ACTIVITY_NAME'] });
                        })


                    },
                    preventDefault: true,
                },
            });
        }


        const grid1ToolbarVisible = (flag: boolean, config: string) => {

            erFormHelper.setGridEditable(config, flag);
            erFormHelper.setGridColumnEditable('GridView2', false, 'ACTIVITY_NAME');
            erFormHelper.setGridToolbarVisible(config, { 'copyrow': flag });
            erFormHelper.setGridToolbarVisible(config, { 'addrow': flag });

            erFormHelper.setGridToolbarVisible(config, { 'delete': flag });



        };


        //#region 分页查询信息 grid1pagingQuery start
        const grid1pagingQuery = async () => {

            const inInfo = new EI.EIInfo();

            const outInfo = await erFormHelper.callService('tmsmpz_inq', inInfo, true, true);
            console.log('hgcfghuik,', inInfo)
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView1');
                erFormHelper.setGridEditable('GridView1', false);
                return true;
            } else {
                return false;
            }


        };
        //#endregion 分页查询信息 end

        //焦点行数据查询
        const GridView1FocusChanged = async (e: any) => {
            console.log('hgcfghuik,', 1)
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getGridCurrentRowAsBlock('GridView1'));
            console.log('hgcfghuik,', inInfo)
            const outInfo = await erFormHelper.callService('tmsmpz_inq1', inInfo, true, true);

            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, 'GridView2');
                erFormHelper.setGridEditable('GridView2', false);

                return true;
            } else {
                return false;
            }
        };



        //F2按钮查询
        const F2_DO = async (e: any) => {
            //Query();
            grid1pagingQuery();
        };

        //F3按钮新增
        const F3_DO = async (e: any) => {
            erFormHelper.stopGridEditing('GridView1', async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCreatedRowsAsBlock('GridView1'), 'TMSM_INS');
                inInfo.addBlock(erFormHelper.getGridModifyRowsAsBlock('GridView1'), 'TMSM_UPD');
                inInfo.addBlock(erFormHelper.getGridDeletedRowsAsBlock('GridView1'), 'TMSM_DEL');

                const outInfo = await erFormHelper.callService('tmsmpz_f3', inInfo, true, true);

                if (outInfo.sys.status >= 0) {
                    erFormHelper.messageSuccess();
                    grid1ToolbarVisible(false, 'GridView1');
                    return true;
                } else {
                    return false;
                }
            })

        };

        const F3_PRE_DO = async (e: any) => {
            grid1ToolbarVisible(true, 'GridView1');

        };
        const F3_CANCEL = async (e: any) => {
            grid1ToolbarVisible(false, 'GridView1');
        };

        const F4_DO = async () => {
            erFormHelper.stopGridEditing('GridView2', async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCreatedRowsAsBlock('GridView2'), 'TMSM_INS');
                inInfo.addBlock(erFormHelper.getGridModifyRowsAsBlock('GridView2'), 'TMSM_UPD');
                inInfo.addBlock(erFormHelper.getGridDeletedRowsAsBlock('GridView2'), 'TMSM_DEL');
                const outInfo = await erFormHelper.callService('tmsmpz_f4', inInfo, true, true);

                if (outInfo.sys.status >= 0) {
                    erFormHelper.messageSuccess();
                    grid1ToolbarVisible(false, 'GridView2');
                    return true;
                } else {
                    return false;
                }
            })


        }
        const F4_PRE_DO = () => {
            grid1ToolbarVisible(true, 'GridView2');
        }
        const F4_CANCEL = () => {
            grid1ToolbarVisible(false, 'GridView2');
        }


        return {
            erFormHelper, efFormReady,
            initializeFlag,
            F2_DO,
            F3_DO,
            F3_PRE_DO, F3_CANCEL, F4_DO, F4_PRE_DO, F4_CANCEL, erGrid2Ready,
            GridView1FocusChanged,


        };
    }
});
