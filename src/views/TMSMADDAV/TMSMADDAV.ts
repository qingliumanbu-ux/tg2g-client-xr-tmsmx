
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    computed,
    nextTick,
    Ref,
    toRaw,
} from "vue";
import { EI, EIManager } from "EIX/ei";
import { ER } from "ERX/Er";
// import { SiUtils } from "ERX/SiUtils";
// import { FiUtils } from "ERX/FiUtils";
import xrEfForm from "EFX/xrEfForm";
import xrEfPanel from "EFX/xrEfPanel";

import xrEfDialog from "EFX/xrEfDialog";
import erLayout from "ERX/ErLayout";
import erGrid from "ERX/ErGrid";

export default defineComponent({
    name: "TMSMADDAV",
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid,
        xrEfDialog,
    },
    // 接收父画面传递过来的参数
    props: {
        openInDialog: {
            type: Boolean,
            default: false,
        },
        dialogFormName: {
            type: String,
            default: "",
        },
        parentInfo: {
            type: Object,
        },
    },
    // 向父画面传递数据-注册emit监听事件
    emits: ["getChildInfo"],
    // setup中添加props和emit
    setup: (props, { emit }) => {
        // 变量定义
        const efFormInfo = ref<{ [key: string]: any }>({});
        // const efFormIsReady = ref(false);
        let formPartition: string;
        let formName: string;
        let PROGRAM_NAME: string;

        // xr-ef-form提供了ready事件, 在这里获取画面配置信息
        const efFormReady = (e: any) => {
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName = efFormInfo.value.formName; // 当前画面名
            if (efFormInfo.value.formParams?.form_name) {
                PROGRAM_NAME = efFormInfo.value.formParams["form_name"];
            }
            initializePage();

        };

        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);
        const initializeService = "tmsm_form_get";

        let pagePara: any; // 炼钢配置表页面参数
        let i_form_ename = props.dialogFormName; // 低代码配置画面布局名

        let grid_view_cf: any;
        let grid_view_auxi: any;
        let gridViewAuxiApi: any;
        let grid_view_temp: any;
        let gridViewTempApi: any;
        const gridView_cf_caption = ref<string>(""); // gridView_cf的低代码配置标题名
        const LayoutName = props.parentInfo?.LayoutName;
        let asdcf = props.parentInfo?.mainData

        // 画面相关数据初始化
        const initializePage = async () => {

            const initialResult = await erFormHelper.Initialize(
                formPartition,
                i_form_ename,
                "",
                initializeService
            );
            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;

                // 回调函数获取控件信息及设置定义事件等操作
                nextTick(() => {

                    console.log('fgvbhjnjkmklk,m', asdcf.data[0], LayoutName)
                    erFormHelper.setControlValueEx(LayoutName, asdcf.data[0])



                });
            } else {
                erFormHelper.messageError(
                    "ErFormHelper initialize faild, error msg is [" +
                    initialResult.msg +
                    "]!"
                );
            }
        };






        // 点击关闭按钮，绑定事件closeEfDialog
        // 向父画面传递数据-触发emit方法向父传递数据，并在emits中注册事件名
        const closeEfDialog = () => {
            const data = {

            };
            emit("getChildInfo", data);
        };

        onMounted(() => { });

        const queryChildGrid = async () => {
            console.log('fghyuio')
            const eiInfo = new EI.EIInfo();
            eiInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(LayoutName))
            const outInfo = await erFormHelper.callService(
                props.parentInfo?.callService,
                eiInfo,
                true,
                false,
                true
            );
            if (outInfo.sys.status < 0) {
                erFormHelper.messageError("错误:" + outInfo.sys.msg);
            } else {
                erFormHelper.messageSuccess('操作成功')
            }
        };
        const F2_DO = async (e: any) => {
            queryChildGrid();
            closeEfDialog();
        };


        return {
            erFormHelper,
            initializeFlag,
            efFormReady,

            closeEfDialog, LayoutName, F2_DO

        };
    },
});
