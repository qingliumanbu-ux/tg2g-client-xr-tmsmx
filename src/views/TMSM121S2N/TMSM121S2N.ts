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
    name: 'TMSM121S2N',
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

        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName; // 当前画面名



            c_div = 'A';
            gridview.value = 'GridView1'
            layout.value = 'LayoutGroup_' + '1';

            console.log('formName_Now', formName_Now, layout.value, gridview.value);
            initializePage();

        };
        const erGrid1Ready = (e: any) => {
            GridView1 = erFormHelper.getGrid("GridView1");

            erFormHelper.setGridEditable("GridView1", false);
            erFormHelper.initialGridToolbar("GridView1", {
                addrow: {
                    visible: false,
                    action: async () => {
                        console.log("addrow", erFormHelper.getGridCreatedRowsAsBlock(GridView1));
                        if (erFormHelper.getGridCreatedRowsAsBlock(GridView1).data.length === 0) {
                            const inInfo = new EI.EIInfo();
                            inInfo.addBlock(erFormHelper.buildEiBlock([{ FURNACE_NO: '0', C_DIV: 'A' }]));
                            const out = await erFormHelper.callService('tmsm12av_ins', inInfo, false, true);

                            erFormHelper.stopGridEditing("GridView1", () => {
                                const sdf = erFormHelper.addRowToGrid("GridView1", true);
                                erFormHelper.setGridEditable("GridView1", true);
                                erFormHelper.setGridColumnEditable("GridView1", true, 'HEAT_NO');
                                erFormHelper.setGridRowData("GridView1", sdf, out.getBlock(0).data[0]);

                            })
                        }
                        else {
                            let maxIdItem = erFormHelper.getGridCreatedRowsAsBlock(GridView1).data.reduce((prev, current) => (String(prev.HEAT_NO) > String(current.HEAT_NO)) ? prev : current);
                            console.log(1, maxIdItem);
                            maxIdItem.HEAT_NO = (await erFormHelper.querySql('', `select SUBSTR('${maxIdItem.HEAT_NO}', 0, 1)||lpad(substr('${maxIdItem.HEAT_NO}', 2) + 1, 7, '0') HEAT_NO from dual`)).getBlock(0).data[0].HEAT_NO;
                            maxIdItem.LADLE_NO = ' ';
                            maxIdItem.LADLE_LIFE = 0;
                            maxIdItem.NOZZLE_BRICK_LIFE = 0;
                            maxIdItem.UP_NOZZLE_LIFE = 0;
                            maxIdItem.SLIDE_LIFE = 0;
                            maxIdItem.DOWN_NOZZLE_LIFE = 0;
                            maxIdItem.BOTTOM_BLOW1_LIFE = 0;
                            maxIdItem.BOTTOM_BLOW2_LIFE = 0;
                            maxIdItem.LADLE_RETURN_TIME = ' ';
                            console.log(2, maxIdItem);
                            erFormHelper.stopGridEditing("GridView1", () => {
                                const sdf = erFormHelper.addRowToGrid("GridView1", true);
                                erFormHelper.setGridEditable("GridView1", true);
                                erFormHelper.setGridColumnEditable("GridView1", true, 'HEAT_NO');
                                erFormHelper.setGridRowData("GridView1", sdf, maxIdItem);

                            })
                        }
                    },
                    // 是否阻止默认事件触发
                    preventDefault: true,
                },
            })
            GridView1.gridOptions.getRowStyle = (params: any) => {


                if (params.data.LADLE_GROSS_WT > 340) {
                    return {
                        fontweight: 'bold',
                        color: 'red'
                    }
                }


            }
        }
        const erGrid2Ready = (e: any) => {
            GridView2 = erFormHelper.getGrid("GridView2");

            erFormHelper.setGridEditable("GridView2", false);
            erFormHelper.initialGridToolbar("GridView2", {
                addrow: {
                    visible: false,
                    action: async () => {
                        console.log("addrow");
                        if (erFormHelper.getGridCreatedRowsAsBlock(GridView2).data.length === 0) {
                            const inInfo = new EI.EIInfo();
                            inInfo.addBlock(erFormHelper.buildEiBlock([{ FURNACE_NO: '1', C_DIV: 'A' }]));
                            const out = await erFormHelper.callService('tmsm12av_ins', inInfo, false, true);

                            erFormHelper.stopGridEditing("GridView2", () => {
                                const sdf = erFormHelper.addRowToGrid("GridView2", true);
                                erFormHelper.setGridEditable("GridView2", true);
                                erFormHelper.setGridColumnEditable("GridView2", true, 'HEAT_NO');
                                erFormHelper.setGridRowData("GridView2", sdf, out.getBlock(0).data[0]);

                            })
                        }
                        else {
                            let maxIdItem = erFormHelper.getGridCreatedRowsAsBlock(GridView2).data.reduce((prev, current) => (String(prev.HEAT_NO) > String(current.HEAT_NO)) ? prev : current);
                            console.log(1, maxIdItem);
                            maxIdItem.HEAT_NO = (await erFormHelper.querySql('', `select SUBSTR('${maxIdItem.HEAT_NO}', 0, 1)||lpad(substr('${maxIdItem.HEAT_NO}', 2) + 1, 7, '0') HEAT_NO from dual`)).getBlock(0).data[0].HEAT_NO;
                            maxIdItem.LADLE_NO = ' ';
                            maxIdItem.LADLE_LIFE = 0;
                            maxIdItem.NOZZLE_BRICK_LIFE = 0;
                            maxIdItem.UP_NOZZLE_LIFE = 0;
                            maxIdItem.SLIDE_LIFE = 0;
                            maxIdItem.DOWN_NOZZLE_LIFE = 0;
                            maxIdItem.BOTTOM_BLOW1_LIFE = 0;
                            maxIdItem.BOTTOM_BLOW2_LIFE = 0;
                            maxIdItem.LADLE_RETURN_TIME = ' ';
                            console.log(2, maxIdItem);
                            erFormHelper.stopGridEditing("GridView2", () => {
                                const sdf = erFormHelper.addRowToGrid("GridView2", true);
                                erFormHelper.setGridEditable("GridView2", true);
                                erFormHelper.setGridColumnEditable("GridView2", true, 'HEAT_NO');
                                erFormHelper.setGridRowData("GridView2", sdf, maxIdItem);

                            })
                        }
                    },
                    // 是否阻止默认事件触发
                    preventDefault: true,
                },
            })
            GridView2.gridOptions.getRowStyle = (params: any) => {


                if (params.data.LADLE_GROSS_WT > 340) {
                    return {
                        fontweight: 'bold',
                        color: 'red'
                    }
                }


            }
        }
        const erGrid3Ready = (e: any) => {
            GridView3 = erFormHelper.getGrid("GridView3");

            erFormHelper.setGridEditable("GridView3", false);
            erFormHelper.initialGridToolbar("GridView3", {
                addrow: {
                    visible: false,
                    action: async () => {
                        console.log("addrow");
                        if (erFormHelper.getGridCreatedRowsAsBlock(GridView3).data.length === 0) {
                            const inInfo = new EI.EIInfo();
                            inInfo.addBlock(erFormHelper.buildEiBlock([{ FURNACE_NO: '2', C_DIV: 'A' }]));
                            const out = await erFormHelper.callService('tmsm12av_ins', inInfo, false, true);

                            erFormHelper.stopGridEditing("GridView3", () => {
                                const sdf = erFormHelper.addRowToGrid("GridView3", true);
                                erFormHelper.setGridEditable("GridView3", true);
                                erFormHelper.setGridColumnEditable("GridView3", true, 'HEAT_NO');
                                erFormHelper.setGridRowData("GridView3", sdf, out.getBlock(0).data[0]);

                            })
                        }
                        else {
                            let maxIdItem = erFormHelper.getGridCreatedRowsAsBlock(GridView3).data.reduce((prev, current) => (String(prev.HEAT_NO) > String(current.HEAT_NO)) ? prev : current);
                            console.log(1, maxIdItem);
                            maxIdItem.HEAT_NO = (await erFormHelper.querySql('', `select SUBSTR('${maxIdItem.HEAT_NO}', 0, 1)||lpad(substr('${maxIdItem.HEAT_NO}', 2) + 1, 7, '0') HEAT_NO from dual`)).getBlock(0).data[0].HEAT_NO;
                            maxIdItem.LADLE_NO = ' ';
                            maxIdItem.LADLE_LIFE = 0;
                            maxIdItem.NOZZLE_BRICK_LIFE = 0;
                            maxIdItem.UP_NOZZLE_LIFE = 0;
                            maxIdItem.SLIDE_LIFE = 0;
                            maxIdItem.DOWN_NOZZLE_LIFE = 0;
                            maxIdItem.BOTTOM_BLOW1_LIFE = 0;
                            maxIdItem.BOTTOM_BLOW2_LIFE = 0;
                            maxIdItem.LADLE_RETURN_TIME = ' ';
                            console.log(2, maxIdItem);
                            erFormHelper.stopGridEditing("GridView3", () => {
                                const sdf = erFormHelper.addRowToGrid("GridView3", true);
                                erFormHelper.setGridEditable("GridView3", true);
                                erFormHelper.setGridColumnEditable("GridView3", true, 'HEAT_NO');
                                erFormHelper.setGridRowData("GridView3", sdf, maxIdItem);

                            })
                        }
                    },
                    // 是否阻止默认事件触发
                    preventDefault: true,
                },
            })
            GridView3.gridOptions.getRowStyle = (params: any) => {


                if (params.data.LADLE_GROSS_WT > 340) {
                    return {
                        fontweight: 'bold',
                        color: 'red'
                    }
                }


            }

        }
        // 画面相关数据初始化
        const initializePage = async () => {
            i_form_ename = 'TMSM121S2N';

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

            //console.log('inInfo', inInfo);
            const outInfo = await erFormHelper.callService('tmsm121av_inq', inInfo, true, true);
            console.log('yghjikm,l;', outInfo)
            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();
                //erFormHelper.clearLayoutOrGridData('GridView1');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(0), true, 'GridView1');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(1), true, 'GridView2');
                erFormHelper.mergeDataToLayoutOrGrid(outInfo.getBlock(2), true, 'GridView3');
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
                let info = erFormHelper.getGridCheckedRowsAsBlock("GridView1", {}, true).data.concat(erFormHelper.getGridCheckedRowsAsBlock("GridView2", {}, true).data).concat(erFormHelper.getGridCheckedRowsAsBlock("GridView3", {}, true).data);
                console.log('info', info)
                for (let i = 0; i < info.length; i++) {
                    console.log('info[i].LADLE_NO', info[i].LADLE_NO);
                    let sql = (await erFormHelper.querySql('',` select MAX(LADLE_LIFE) LADLE_LIFE from ttmsm12 where C_DIV='A' AND LADLE_NO='${info[i].LADLE_NO}' `)).getBlock(0).data[0].LADLE_LIFE;
                    console.log('sql', sql);
                    if (info[i].LADLE_LIFE != Number(sql) + 1) {
                        if (!await erFormHelper.messageConfirm(`钢包${info[i].LADLE_NO}的炉龄不为上一炉递增，是否确认`)) {
                            grid1ToolbarVisible(false, 'GridView1');
                            grid1ToolbarVisible(false, 'GridView2');
                            grid1ToolbarVisible(false, 'GridView3');
                            return false;
                        }
                    }

                }

                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { C_DIV: c_div, FURNACE_NO: '0' }, true));
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView2", { C_DIV: c_div, FURNACE_NO: '1' }, true), 'Table2');
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView3", { C_DIV: c_div, FURNACE_NO: '2' }, true), 'Table3');
                console.log('inInfo', inInfo)
                const out = await erFormHelper.callService('tmsm121av_ins1', inInfo, false, true);
                grid1ToolbarVisible(false, 'GridView1');
                grid1ToolbarVisible(false, 'GridView2');
                grid1ToolbarVisible(false, 'GridView3');
                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败');
                    return false;
                }

                grid1pagingQuery();

            })

        };
        const F3_PRE_DO = async (e: any) => {


            grid1ToolbarVisible(true, 'GridView1');
            grid1ToolbarVisible(true, 'GridView2');
            grid1ToolbarVisible(true, 'GridView3');

        };
        const F3_CANCEL = async (e: any) => {

            grid1pagingQuery();
            grid1ToolbarVisible(false, 'GridView1');
            grid1ToolbarVisible(false, 'GridView2');
            grid1ToolbarVisible(false, 'GridView3');
        };
        const grid1ToolbarVisible = (flag: boolean, config: string) => {

            erFormHelper.setGridEditable(config, flag);

            erFormHelper.setGridToolbarVisible(config, { 'addrow': flag });




        };
        const valueChanged = async (e: any) => {
            console.log('utfdftyujmnbfdwertyujkl', e.context.configId)
            if (e.column.colId === 'LADLE_NO' && e.data.LADLE_NO.trim() !== '') {
                console.log('AAA', e.newValue)
                if (erFormHelper.getGridCreatedRowsAsBlock(e.context.configId).data.length === 1) {
                    const inInfo = new EI.EIInfo();
                    inInfo.addBlock(erFormHelper.buildEiBlock([{ LADLE_NO: e.newValue, C_DIV: c_div, LD_TYPE: e.data.LD_TYPE }]));

                    const out = await erFormHelper.callService('tmsm12av_inq1', inInfo, false, true);

                    erFormHelper.stopGridEditing(e.context.configId, () => {
                        const sdf = erFormHelper.getGridCurrentRow(e.context.configId)

                        erFormHelper.setGridRowData(e.context.configId, sdf, out.getBlock(0).data[0]);

                    })
                }
                else {

                    const inInfo = new EI.EIInfo();
                    inInfo.addBlock(erFormHelper.buildEiBlock([{ LADLE_NO: e.newValue, C_DIV: c_div, LD_TYPE: e.data.LD_TYPE }]));

                    const out = await erFormHelper.callService('tmsm12av_inq1', inInfo, false, true);
                    const newData = erFormHelper.getGridCreatedRowsAsBlock(e.context.configId).data.reduce((prev, current) => (Number(prev.LADLE_LIFE) > Number(current.LADLE_LIFE) && String(prev.LADLE_NO) === e.data.LADLE_NO) ? prev : current);
                    let nn = erFormHelper.getGridCreatedRowsAsBlock(e.context.configId).data.filter((item: any) => item.LADLE_NO === e.data.LADLE_NO).length;
                    console.log('uyhghjoplkm', newData, nn);

                    if (nn >= 2) {
                        let aa: any = {};
                        aa['LADLE_LIFE'] = Number(newData.LADLE_LIFE) + 1;
                        aa['NOZZLE_BRICK_LIFE'] = Number(newData.NOZZLE_BRICK_LIFE) + 1;
                        aa['UP_NOZZLE_LIFE'] = Number(newData.UP_NOZZLE_LIFE) + 1;
                        aa['SLIDE_LIFE'] = Number(newData.SLIDE_LIFE) + 1;
                        aa['DOWN_NOZZLE_LIFE'] = Number(newData.DOWN_NOZZLE_LIFE) + 1;
                        aa['BOTTOM_BLOW1_LIFE'] = Number(newData.BOTTOM_BLOW1_LIFE) + 1;
                        aa['BOTTOM_BLOW2_LIFE'] = Number(newData.BOTTOM_BLOW2_LIFE) + 1;

                        erFormHelper.stopGridEditing(e.context.configId, () => {
                            const sdf = erFormHelper.getGridCurrentRow(e.context.configId)

                            erFormHelper.setGridRowData(e.context.configId, sdf, aa);

                        })
                    }
                    else {
                        erFormHelper.stopGridEditing(e.context.configId, () => {
                            const sdf = erFormHelper.getGridCurrentRow(e.context.configId)

                            erFormHelper.setGridRowData(e.context.configId, sdf, out.getBlock(0).data[0]);

                        })
                    }



                }
            }

        }
        const F4_DO = async () => {

            erFormHelper.stopGridEditing(['GridView1', 'GridView2', 'GridView3'], async () => {
                //console.log('fgtyuiokmn m,', gridview.value, erFormHelper.getGridCheckedRowsAsBlock(gridview.value))
                if (erFormHelper.getGridCheckedRowsAsBlock('GridView1').data.length === 0
                    && erFormHelper.getGridCheckedRowsAsBlock('GridView2').data.length === 0
                    && erFormHelper.getGridCheckedRowsAsBlock('GridView3').data.length === 0) {
                    erFormHelper.messageWarning('请勾选修改数据！');
                    return false;
                }
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { C_DIV: c_div, FURNACE_NO: '0' }, true));
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView2", { C_DIV: c_div, FURNACE_NO: '1' }, true), 'Table2');
                inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView3", { C_DIV: c_div, FURNACE_NO: '2' }, true), 'Table3');
                console.log('ytfdftyuhgh', inInfo)
                const out = await erFormHelper.callService('tmsm121av_upd', inInfo, false, true);
                if (out?.sys.status < 0) {
                    // erFormHelper.messageError('操作失败');
                    return false;
                }

                erFormHelper.setGridEditable(gridview.value, false);
                grid1pagingQuery();
            })


        }
        const F4_PRE_DO = () => {
            erFormHelper.setGridColumnEditable('GridView1', false, 'HEAT_NO');
            erFormHelper.setGridEditable('GridView1', true);
            erFormHelper.setGridColumnEditable('GridView2', false, 'HEAT_NO');
            erFormHelper.setGridEditable('GridView2', true);
            erFormHelper.setGridColumnEditable('GridView3', false, 'HEAT_NO');
            erFormHelper.setGridEditable('GridView3', true);
        }
        const F4_CANCEL = () => {

            erFormHelper.setGridEditable('GridView1', false);
            erFormHelper.setGridEditable('GridView2', false);
            erFormHelper.setGridEditable('GridView3', false);
        }

        const F5_DO = async () => {
            if (erFormHelper.getGridCheckedRowsAsBlock('GridView1').data.length === 0
                && erFormHelper.getGridCheckedRowsAsBlock('GridView2').data.length === 0
                && erFormHelper.getGridCheckedRowsAsBlock('GridView3').data.length === 0) {
                erFormHelper.messageWarning('请勾选删除数据！');
                return false;
            }
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView1", { C_DIV: c_div }, true));
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView2", { C_DIV: c_div }, true), 'Table2');
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock("GridView3", { C_DIV: c_div }, true), 'Table3');

            const out = await erFormHelper.callService('tmsm121av_del', inInfo, false, true);
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
            valueChanged, gridview, layout, gridToolbar1, erGrid2Ready, erGrid3Ready
        };
    }
});
