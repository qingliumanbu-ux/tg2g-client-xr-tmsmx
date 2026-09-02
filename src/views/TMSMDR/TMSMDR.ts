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
    name: 'TMSMDR',
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
        const tabActiveKeys = ref();
        let gridView1: any;
        const GridView = ref('GridView1')


        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区


            initializePage();

        };
        // 画面相关数据初始化
        const initializePage = async () => {
            i_form_ename = 'TMSMDR';

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
                    initPage()

                });
            } else {
                erFormHelper.messageError(
                    'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
                );
            }
        };
        const initPage = async () => {
            let sqlstr = ` select * from ttmsmpz where 1=1 order by SHOW_SEQ `;
            const out = await erFormHelper.querySql('', sqlstr);

            tabActiveKeys.value = out.getBlock(0).data;


        }
        const erGridReady = () => {
            console.log('uytfdcfvghjkl', GridView.value)
            erFormHelper.initialGridToolbar(GridView.value, {
                refresh: {
                    visible: true,
                    action: (e: any) => {

                        erFormHelper.clearGridData(GridView.value);
                    },
                    preventDefault: true,
                },
            });
        }





        //#region 分页查询信息 grid1pagingQuery start
        const grid1pagingQuery = async () => {



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
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getGridCheckedRowsAsBlock(GridView.value, { NAME: tabname }, true));
            console.log('IUYGFCVGHJKL;', inInfo)
            const outInfo = await erFormHelper.callService('tmsmdr_f3', inInfo, true, true);

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


        }
        const F4_PRE_DO = () => {

        }
        const F4_CANCEL = () => {

        }
        const tabActiveKey = ref('tab0')
        let tabname: any;
        // 定义列选项
        const gridOptions: Ref<any> = ref([]);
        const gridKey = ref('1');
        const compareField: any = [];
        let customColumns: any = [];
        const handleTabChange = async (activeKey: string) => {
            console.log(activeKey);
            tabname = activeKey;
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.buildEiBlock([{ NAME: tabname }]))

            const outInfo = await erFormHelper.callService('tmsmdr_inq', inInfo, true, true);


            // 获取grid1每一行数据
            const data = outInfo.getBlock(0).data;
            const data1 = outInfo.getBlock(1).data;

            // 存放每一列的相关数据
            customColumns = [];
            // 拿到grid1每一行的列名
            const keys = Object.keys(data[0]);
            const keys1 = Object.keys(data1[0]);

            let i = 0;
            // 遍历列名
            keys.forEach((item) => {
                //给customColumns加列的配置属性

                customColumns.push({

                    headerName: keys1[i],
                    field: item,
                    width: 100, //列的宽度
                    hidden: false, //列是否隐藏
                });
                i++;
            });
            GridView.value = 'GridView' + tabname.toString().substring(3);
            erFormHelper.hideGridColumn(GridView.value, 'ACTIVITY_NAME');
            setTimeout(() => {
                erFormHelper.addGridColumn(GridView.value, customColumns);
                erFormHelper.hideGridColumn(GridView.value, 'ID');
                // 给grid2添加列

                // 将数据合并到grid2
                erFormHelper.mergeDataToGrid(data, GridView.value);
            }, 100);

            if (outInfo.sys.status >= 0) {
                erFormHelper.messageSuccess();

                return true;
            } else {
                return false;
            }
        };

        return {
            erFormHelper, efFormReady, tabActiveKey, tabActiveKeys, handleTabChange, GridView,
            initializeFlag,
            F2_DO,
            F3_DO,
            F3_PRE_DO, F3_CANCEL, F4_DO, F4_PRE_DO, F4_CANCEL, erGridReady,
            GridView1FocusChanged,


        };
    }
});
