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
    watch,
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
        let formName = 'TMSM15AV';
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
        let gridView2: any;
        const c_name = ref();
        const layout = ref();
        const gridview1 = ref();
        const gridview2 = ref();
        const callService_f2 = ref();
        const callService_f3 = ref();
        const callService_f4 = ref();
        const callService_f5 = ref();
        const callService_ins = ref();

        const table_name = ref();

        let vif: boolean = false;
        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName_Now = efFormInfo.value.formName; // 当前画面名
            c_name.value = efFormInfo.value.formParams.cname; // 当前画面名
            console.log('formName_Now', efFormInfo);
            layout.value = 'LayoutGroup_' + String(formName_Now).substring(4, 6);
            gridview1.value = 'GridView_' + String(formName_Now).substring(4, 6) + '_1';
            gridview2.value = 'GridView_' + String(formName_Now).substring(4, 6) + '_2';
            console.log('formName_Now', layout.value, gridview1.value, c_name.value);
            callService_f2.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_inq';
            callService_f3.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f3';
            callService_f4.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f4';
            callService_f5.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f5';
            callService_f5.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f5';
            callService_ins.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_ins';

            table_name.value = 'T' + String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toUpperCase();
            console.log('formName_Now', callService_f2.value, callService_f3.value, table_name.value);

            initializePage();
        };

        const erGrid1Ready = (e: any) => {
            gridView1 = erFormHelper.getGrid(gridview1.value);
            erFormHelper.initialGridToolbar(gridview1.value, {


            });

        }
        const erGrid2Ready = (e: any) => {
            gridView2 = erFormHelper.getGrid(gridview2.value);
            erFormHelper.initialGridToolbar(gridview2.value, {


            });

        }

        //时间格式转字符串
        function formatDate(date: any): string {
            console.log('zxdfghujikop[]', date);
            if (date === null) {
                return ' ';
            }
            else {
                let year = date.$y.toString();
                let month = (date.$M + 1).toString().padStart(2, '0');
                let day = date.$D.toString().padStart(2, '0');
                console.log('zxdfghujikop[]', date);
                return year + month + day;
            }

        }



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


            if (!await erFormHelper.checkRequiredInput(layout.value) && tabActiveKey.value === 'tab1') {
                erFormHelper.messageWarning('请检查输入');
                return false;
            }

            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value));
            inInfo.addBlock(erFormHelper.buildEiBlock([{ flag: tabActiveKey.value }]), 'Table2')
            console.log('jhbv', inInfo)
            const outInfo = await erFormHelper.callService(callService_f2.value, inInfo, false, true, true);

            if (outInfo.sys.status >= 0) {
                if (tabActiveKey.value === 'tab1') {
                    erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, gridview1.value);
                }
                else {
                    erFormHelper.mergeDataToLayoutOrGrid(outInfo, true, gridview2.value);
                }

                return true;
            } else {
                return false;
            }
        };
        const F3_DO = async (e: any) => {


            erFormHelper.stopGridEditing(gridview1.value, async () => {
                const inInfo = new EI.EIInfo();
                let sqlstr = `SELECT * FROM ${table_name.value} WHERE DATE_C = '${erFormHelper.getAllControlValueAsEiBlock(layout.value).data[0].DATE_C?.toString()}' 
                AND CC_MACH_NO = '${erFormHelper.getControlValue(layout.value, 'CC_MACH_NO')}' 
                AND STRAND_DIV = '${erFormHelper.getControlValue(layout.value, 'STRAND_DIV')}' `;
                console.log('iuygfx', sqlstr)
                if ((await erFormHelper.querySql('', sqlstr)).getBlock(0).data.length > 0) {
                    console.log(1)
                    if (await erFormHelper.messageConfirm('当前日期，铸机，流号存在数据，是否清除原有数据，继续操作？')) {
                        inInfo.addBlock(erFormHelper.getGridAllRowsAsBlock(gridview1.value,
                            {
                                DATE_C: erFormHelper.getAllControlValueAsEiBlock(layout.value).data[0].DATE_C
                            }, true
                        ));

                        const out = await erFormHelper.callService(callService_f3.value, inInfo, false, true);
                        console.log('hg', out.sys.msg)
                        if (out?.sys.status < 0) {
                            //erFormHelper.messageError('操作失败' + out.sys.msg);
                            return false;
                        }
                        erFormHelper.setGridEditable(gridview1.value, false);
                    }
                    else {
                        queryRecord();
                    }
                }
                else {
                    console.log(2)
                    inInfo.addBlock(erFormHelper.getGridAllRowsAsBlock(gridview1.value,
                        {
                            DATE_C: erFormHelper.getAllControlValueAsEiBlock(layout.value).data[0].DATE_C
                        }, true
                    ));
                    console.log(3, inInfo)
                    const out = await erFormHelper.callService(callService_f3.value, inInfo, false, true);
                    console.log('hg', out.sys.msg)
                    if (out?.sys.status < 0) {
                        //erFormHelper.messageError('操作失败' + out.sys.msg);
                        return false;
                    }
                    erFormHelper.setGridEditable(gridview1.value, false);
                }

            })

        };




        const F3_PRE_DO = async (e: any) => {
            console.log('iuhygtfdsaz', erFormHelper.getAllControlValueAsEiBlock(layout.value).data[0].DATE_C)
            tabActiveKey.value = 'tab1';
            erFormHelper.clearGridData(gridview1.value)
            if (!await erFormHelper.checkRequiredInput(layout.value)) {
                erFormHelper.messageError('请检查输入！');
                return false;
            }
            erFormHelper.setGridEditable(gridview1.value, true);
            const inInfo = new EI.EIInfo();

            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value));
            const out = await erFormHelper.callService(callService_ins.value, inInfo, false, true);

            if (out.sys.status >= 0) {
                erFormHelper.mergeDataToLayoutOrGrid(out, true, gridview1.value);
                erFormHelper.stopGridEditing(gridview1.value, () => {
                    erFormHelper.autoBestFit(gridview1.value)
                })
                if (table_name.value === 'TTMSM15') {
                    erFormHelper.setGridColumnEditable(gridview1.value, false, ...['SEQ_NO', 'ROLLER_NO_DESC', 'ALLOW_DEVIATION', 'CC_MACH_NO', 'STRAND_DIV'])
                }
                if (table_name.value === 'TTMSM16') {
                    erFormHelper.setGridColumnEditable(gridview1.value, false, ...['SEQ_NO', 'CC_MACH_NO', 'STRAND_DIV'])
                }

                return true;
            } else {
                return false;
            }
        };
        const F3_CANCEL = async (e: any) => {
            queryRecord();
        };
        const F4_DO = async (e: any) => {
            erFormHelper.stopGridEditing(gridview1.value, async () => {
                const inInfo = new EI.EIInfo();
                inInfo.addBlock(erFormHelper.getGridModifyRowsAsBlock(gridview1.value, undefined, true));
                if (inInfo.getBlock(0).data.length === 0) {
                    erFormHelper.messageError('未检测到修改数据！')
                    return false;
                }

                const out = await erFormHelper.callService(callService_f4.value, inInfo, false, true);
                if (out.sys.status >= 0) {
                    erFormHelper.messageSuccess('处理成功！')
                    return true;
                } else {
                    return false;
                }
            })

        };


        const F4_PRE_DO = async (e: any) => {
            if (tabActiveKey.value === 'tab2') {
                erFormHelper.messageWarning('历史记录不可修改！');
                return false;
            }
        };
        const F4_CANCEL = async (e: any) => {

        };

        const F5_DO = async (e: any) => {
            const inInfo = new EI.EIInfo();
            if (await erFormHelper.messageConfirm('确认将会清除当前铸机，流号的数据，是否继续操作？')) {
                inInfo.addBlock(erFormHelper.getGridAllRowsAsBlock(gridview1.value));
                if (inInfo.getBlock(0).data.length === 0) {
                    erFormHelper.messageError('当前记录无数据！')
                    return false;
                }

                const out = await erFormHelper.callService(callService_f5.value, inInfo, false, true);
                console.log('hg', out.sys.msg)
                if (out?.sys.status < 0) {
                    //erFormHelper.messageError('操作失败' + out.sys.msg);
                    return false;
                }
                erFormHelper.setGridEditable(gridview1.value, false);
            }
            else {
                queryRecord();
            }

        };


        const F5_PRE_DO = async (e: any) => {
            if (tabActiveKey.value === 'tab2') {
                erFormHelper.messageWarning('历史记录不可删除！');
                return false;
            }
        };
        const F5_CANCEL = async (e: any) => {

        };
        const tabActiveKey = ref('tab1');
        const handleTabChange = (e: any) => {
            tabActiveKey.value = e;
        }
        return {
            erFormHelper,
            initializeFlag, F2_DO,
            F3_DO,
            F3_PRE_DO,
            F3_CANCEL,
            F4_DO,
            F4_PRE_DO,
            F4_CANCEL,
            F5_DO,
            F5_PRE_DO, F5_CANCEL, gridToolbar, gridToolbar1, efFormReady, layout, gridview1, gridview2, c_name, erGrid1Ready, erGrid2Ready, rowDataChanged, tabActiveKey, handleTabChange
        };
    }
});