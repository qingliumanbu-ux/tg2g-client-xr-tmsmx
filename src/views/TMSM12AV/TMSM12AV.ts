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
    name: 'TMSM12AV',
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
        let i_form_ename = '';
        let formName_Now = '';
        let shift_group: any;
        let shift_no: any;
        let heat_no: any;
        let c_div: any;
        const gridview = ref('');
        const layout = ref('');
        let aaaaa: any;

        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName; // 当前画面名


            if (formName_Now === 'TMSM12AS2N') {
                c_div = 'A';
                gridview.value = 'GridView1'
                layout.value = 'LayoutGroup_' + '1';
            }
            else if (formName_Now === 'TMSM12BS2N') {
                c_div = 'B';
                gridview.value = 'GridView2'
                layout.value = 'LayoutGroup_' + '2';
            }
            console.log('formName_Now', layout.value, gridview.value);
            initializePage();

        };
        const erGrid1Ready = (e: any) => {
            GridView1 = erFormHelper.getGrid(gridview.value);
            //console.log('sdrtyhgvhjk', gridView1);
            erFormHelper.setGridEditable(gridview.value, false);
            nextTick(() => {
                // aaaaa = erFormHelper.getGridApi(gridview.value)?.redrawRows();
                // console.log('rtgghjnkm', aaaaa)
            })
           
        }
        // 画面相关数据初始化
        const initializePage = async () => {
            i_form_ename = 'TMSM12AV';

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
                //设置在gridview1中进行分页查询
                console.log('dyhjjklkkl', 2);
                // 回调函数获取控件信息及设置定义事件等操作
                /*
                nextTick(() => {
                    // 获取画面上的主要控件信息
                    console.log('dyhjjklkkl',4);
                    erFormHelper.setControlValue('LayoutGroupFilter', 'DATE_C', new Date());
                    erFormHelper.setControlValue('LayoutGroupFilter', 'FURNACE_NO', '0');
                    console.log('dyhjjklkkl',5);

                });
                */
                nextTick(() => {
                    // 获取画面上的主要控件信息
                });
                console.log('dyhjjklkkl', 3);
            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };






        //#region 分页查询信息 grid1pagingQuery start
        const grid1pagingQuery = async () => {


            const inInfo = new EI.EIInfo();

            /*
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter', { C_DIV: c_div }));
            */

            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value, { C_DIV: c_div }));

            console.log('inInfo', inInfo);
            const outInfo = await erFormHelper.callService('tmsm12av_inq', inInfo, true, true);
            console.log('yghjikm,l;', outInfo)
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                //erFormHelper.clearLayoutOrGridData('GridView1');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, gridview.value);
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
            /*
            if (erFormHelper.getControlValue('LayoutGroupFilter', 'FURNACE_NO') === undefined) {
                erFormHelper.messageWarning('请输入炉座号！');
                return false;
            }
            console.log('sdftgyuiop', erFormHelper.getControlValue('LayoutGroupFilter', 'DATE_C'))
            if (erFormHelper.getControlValue('LayoutGroupFilter', 'DATE_C') === null) {
                erFormHelper.messageWarning('请输入日期！');
                return false;
            }
            */

            if (!await erFormHelper.checkRequiredInput(layout.value)) {
                erFormHelper.messageWarning('请检查输入');
                return false;
            }
            erFormHelper.stopGridEditing(gridview.value, async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(gridview.value,
                    {
                        C_DIV: c_div,
                        /*
                        FURNACE_NO: erFormHelper.getControlValue('LayoutGroupFilter', 'FURNACE_NO')
                        */
                        FURNACE_NO: erFormHelper.getControlValue(layout.value, 'FURNACE_NO')
                    }, true
                ));

                const out = await erFormHelper.callService('tmsm12av_ins1', inInfo, false, true);
                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败');
                    return false;
                }
                erFormHelper.setGridEditable(gridview.value, false);
                grid1pagingQuery();
            })

        };
        const F3_PRE_DO = async (e: any) => {
            console.log('fghujiop', erFormHelper.getControlValue(layout.value, 'FURNACE_NO'))
            if (erFormHelper.getControlValue(layout.value, 'FURNACE_NO') === '') {
                erFormHelper.messageWarning('请输入炉座号！');
                return false;
            }
            /*
     console.log('sdftgyuiop', erFormHelper.getControlValue('LayoutGroupFilter', 'DATE_C'))
     if (erFormHelper.getControlValue('LayoutGroupFilter', 'DATE_C') === null) {
         erFormHelper.messageWarning('请输入日期！');
         return false;
     }
     */
            // if (!await erFormHelper.checkRequiredInput(layout.value)) {
            //     erFormHelper.messageWarning('请检查输入');
            //     return false;
            // }
            const inInfo = new EI.EIInfo();
            /*
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter', { C_DIV: c_div }));
            */
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value, { C_DIV: c_div }));
            const out = await erFormHelper.callService('tmsm12av_ins', inInfo, false, true);

            erFormHelper.stopGridEditing(gridview.value, () => {
                const sdf = erFormHelper.addRowToGrid(gridview.value, true);
                erFormHelper.setGridEditable(gridview.value, true);
                erFormHelper.setGridColumnEditable(gridview.value, true, 'HEAT_NO');
                erFormHelper.setGridRowData(gridview.value, sdf, out.getBlock(0).data[0]);

            })


        };
        const F3_CANCEL = async (e: any) => {
            erFormHelper.setGridEditable(gridview.value, false);
            grid1pagingQuery();
        };
        const grid1ToolbarVisible = (flag: boolean, config: string) => {

            erFormHelper.setGridEditable(config, flag);

            erFormHelper.setGridToolbarVisible(config, { 'copyrow': flag });
            erFormHelper.setGridToolbarVisible(config, { 'addrow': flag });
            erFormHelper.setGridToolbarVisible(config, { 'delete': flag });



        };
        const valueChanged = async (e: any) => {
            console.log('utfdftyujmnbfdwertyujkl', e)
            if (e.column.colId === 'LADLE_NO') {
                console.log('AAA', e.newValue)
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.buildEiBlock([{ LADLE_NO: e.newValue, C_DIV: c_div, LD_TYPE: e.data.LD_TYPE }]));

                const out = await erFormHelper.callService('tmsm12av_inq1', inInfo, false, true);

                erFormHelper.stopGridEditing(gridview.value, () => {
                    const sdf = erFormHelper.getGridCurrentRow(gridview.value)

                    erFormHelper.setGridRowData(gridview.value, sdf, out.getBlock(0).data[0]);

                })
            }

        }
        const F4_DO = async () => {

            erFormHelper.stopGridEditing(gridview.value, async () => {
                console.log('fgtyuiokmn m,', gridview.value, erFormHelper.getGridCheckedRowsAsBlock(gridview.value))
                if (erFormHelper.getGridCheckedRowsAsBlock(gridview.value).data.length === 0) {
                    erFormHelper.messageWarning('请勾选修改数据！');
                    return false;
                }
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(gridview.value,
                    {
                        C_DIV: c_div,

                        FURNACE_NO: erFormHelper.getControlValue(layout.value, 'FURNACE_NO')
                    }, true
                ));
                console.log('ytfdftyuhgh', inInfo)
                const out = await erFormHelper.callService('tmsm12av_upd', inInfo, false, true);
                if (out?.sys.status < 0) {
                    // erFormHelper.messageError('操作失败');
                    return false;
                }

                erFormHelper.setGridEditable(gridview.value, false);
                grid1pagingQuery();
            })


        }
        const F4_PRE_DO = () => {
            erFormHelper.setGridColumnEditable(gridview.value, false, 'HEAT_NO');
            erFormHelper.setGridEditable(gridview.value, true);
            
            
        }
        const F4_CANCEL = () => {

            erFormHelper.setGridEditable(gridview.value, false);
        }

        const F5_DO = async () => {
            if (erFormHelper.getGridCheckedRowsAsBlock(gridview.value).data.length === 0) {
                erFormHelper.messageWarning('请勾选删除数据！');
                return false;
            }
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(gridview.value,
                {
                    C_DIV: c_div
                }, true
            ));

            const out = await erFormHelper.callService('tmsm12av_del', inInfo, false, true);
            if (out?.sys.status < 0) {
                //erFormHelper.messageError('操作失败');
                return false;
            }
            erFormHelper.setGridEditable(gridview.value, false);
            grid1pagingQuery();
        }
        const F5_PRE_DO = () => {

        }
        const F5_CANCEL = () => {

        }

        return {
            erFormHelper, efFormReady, erGrid1Ready,
            initializeFlag,
            F2_DO,
            F3_DO,
            F3_PRE_DO,
            F3_CANCEL, F4_DO, F5_DO, F4_PRE_DO, F4_CANCEL, F5_PRE_DO, F5_CANCEL,
            valueChanged, gridview, layout
        };
    }
});
