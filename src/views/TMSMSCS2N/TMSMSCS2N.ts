
import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    computed,
    nextTick,
    Ref,
    toRaw, watch
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
import type {
    UploadInstance,
    UploadFile,
    UploadProps,
    UploadRawFile,
    UploadUserFile,
} from "element-plus";
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import axios from 'axios';
import { Console } from "console";
import { Layout } from "ant-design-vue";
import defaultImage from '../../components/word.png'; // 导入默认图片路径
import defaultImage1 from '../../components/excel.png'; // 导入默认图片路径

export default defineComponent({
    name: "TMSMSCS2N",
    components: {
        xrEfForm,
        xrEfPanel,
        erLayout,
        erGrid,
        xrEfDialog, Plus, Delete, Download, ZoomIn
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
        let gridview: any;


        // xr-ef-form提供了ready事件, 在这里获取画面配置信息
        const efFormReady = (e: any) => {
            console.log('fghio', 111)
            efFormInfo.value = e.formInfo;
            // efFormIsReady.value = true;
            formPartition = efFormInfo.value.formPartition; // 分区
            formName = efFormInfo.value.formName; // 当前画面名
            if (efFormInfo.value.formParams?.form_name) {
                PROGRAM_NAME = efFormInfo.value.formParams["form_name"];
            }
            console.log('fghio', efFormInfo)
            initializePage();
        };
        const erGridReady = (e: any) => {
            gridview = erFormHelper.getGrid(LayoutName);
        }
        const erFormHelper: ER.FormHelper = new ER.FormHelper();
        const initializeFlag = ref(0);
        const initializeService = "tmsm_form_get";
        let i_form_ename = props.dialogFormName; // 低代码配置画面布局名
        const LayoutName = props.parentInfo?.LayoutName;
        const file_path = props.parentInfo?.filePath;
        const fileList = ref<UploadUserFile[]>([

        ]);
        const dialogImageUrl = ref('')
        const dialogVisible = ref(false)
        const disabled = ref(false)
        const upload = ref<UploadInstance>()

        // 画面相关数据初始化
        const initializePage = async () => {

            const initialResult = await erFormHelper.Initialize(
                formPartition,
                formName,
                "",
                initializeService
            );
            console.log('wswesdss', props.parentInfo?.mainData.data[0], LayoutName, PROGRAM_NAME)
            if (initialResult.flag >= 0) {
                // 画面工具类初始化成功后将画面渲染条件设置为1
                initializeFlag.value = 1;

                // 回调函数获取控件信息及设置定义事件等操作
                nextTick(() => {

                    erFormHelper.stopGridEditing(LayoutName, () => {
                        erFormHelper.setControlValueEx(LayoutName, { ...props.parentInfo?.mainData.data[0] });
                    })
                    checkFileAndSetImage();
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

        onMounted(() => {
            console.log('iujhjkl', upload, file_path)

        });

        watch(
            fileList,
            (newValue) => {
                console.log("新文件", newValue);
            },
            { deep: true }
        );

        //const emits = defineEmits(["formSubmitted"])
        const F2_DO = async () => {
            console.log('iujhjkl', upload, fileList, fileList)
            upload.value!.submit();

            //console.log('uyghjiokjnjko', 1, LayoutName, props.parentInfo?.table_Name)
            const inInfo = new EI.EIInfo();
            inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(LayoutName));
            inInfo.addBlock(erFormHelper.buildEiBlock([{ tableName: props.parentInfo?.table_Name }]), 'Table2');
            console.log('uyghjiokjnjko', 2, inInfo, props.parentInfo?.callService)
            const outInfo = await erFormHelper.callService(
                props.parentInfo?.callService,
                inInfo,
                false,
                true,
                true
            );

            closeEfDialog();
        };
        const beforeAvatarUpload: UploadProps["beforeUpload"] = async (file) => {
            console.log('7yghyuioijnjkop', file, file.name.substring(file.name.indexOf(".")))
            let index = 0;
            for (let i = 0; i < fileList.value.length; i++) {
                if (fileList.value[i].name === file.name) {
                    index = i + 1;
                }
            }
            const newFileName = props.parentInfo?.mainData.data[0].DATE_C + "_" + props.parentInfo?.mainData.data[0].SEQ_NO + "_" + index + file.name.substring(file.name.indexOf("."));
            console.log('iuyhghjiokjnmkl', file_path, newFileName, props.parentInfo?.mainData.data[0].DATE_C + props.parentInfo?.mainData.data[0].SEQ_NO)
            const newFile = new File([file], newFileName, { type: file.type });
            // 然后使用 newFile 替换原来的 file 对象
            return newFile;
        };
        const handlePictureCardPreview = (file: UploadFile) => {
            // console.log('iuhghjiokjnb', file)
            dialogImageUrl.value = file.url!
            dialogVisible.value = true
        }
        const handleDownload = async (file: UploadFile) => {
            // 发送 GET 请求获取文件数据
            fetch(file.url as string)
                .then(response => response.blob())
                .then(blob => {
                    // 创建一个隐藏的 <a> 元素
                    var hiddenAnchor = document.createElement('a');
                    hiddenAnchor.href = window.URL.createObjectURL(blob);
                    hiddenAnchor.download = file.name; // 如果要指定下载文件的名称，可以在这里设置
                    document.body.appendChild(hiddenAnchor);
                    hiddenAnchor.click(); // 模拟点击链接进行下载
                    document.body.removeChild(hiddenAnchor); // 下载完成后移除 <a> 元素
                })
                .catch(error => console.error('下载文件时出错：', error));
        }
        const handleRemove = async (file: UploadFile) => {
            try {
                const response = await axios.delete(`http://10.162.72.16:10004/deletesq/${encodeURIComponent(file.name)}`);
                console.log(response.data.message);
                //await fetchFiles();再查一次后台，也可以，试试其他方法
                fileList.value.splice(fileList.value.indexOf(file), 1);
            } catch (error) {
                fileList.value.splice(fileList.value.indexOf(file), 1);
                console.error('Error during file deletion:', error);
            }
        }
        let file_Name = props.parentInfo?.mainData.data[0].DATE_C + "_" + props.parentInfo?.mainData.data[0].SEQ_NO;
        const checkFileAndSetImage = async () => {
            console.log('uyhggvhjiolk', file_Name)
            let name_l = [file_Name + "_1.png",
            file_Name + "_2.png",
            file_Name + "_1.jpg",
            file_Name + "_2.jpg",
            file_Name + "_1.doc",
            file_Name + "_2.doc",
            file_Name + "_1.docx",
            file_Name + "_2.docx",
            file_Name + "_1.xls",
            file_Name + "_2.xls",
            file_Name + "_1.xlsx",
            file_Name + "_2.xlsx"];
            //console.log('iuyhghjiokjnmkl', file_path, name_l)
            fileList.value = [];
            for (let i = 0; i < name_l.length; i++) {
                try {

                    let filename = name_l[i];
                    let response = await axios.get(`http://10.162.72.16:10004/${file_path}/${filename}`);
                    if (response.status === 200) {
                        // 文件存在，设置图片URL
                        fileList.value.push({
                            name: filename,
                            url: `http://10.162.72.16:10004/${file_path}/${filename}`
                        })
                    }

                } catch (error) {
                    console.error('检查文件时发生错误:', error);
                    //fileList.value = [];
                    continue;
                }
            }

        };
        const yuan = ref(false);
        const loadBackupImage = (e:any) => {
            console.log('oiuygtfdcvgbhjkiolp[', e);
            let file_type = e.target.currentSrc.substring(e.target.currentSrc.lastIndexOf(".") + 1);
            if (file_type === 'doc' || file_type === 'docx')
            {
                e.target.src = defaultImage;
            }
            if (file_type === 'xls' || file_type === 'xlsx') {
                e.target.src = defaultImage1;
            }
           
        }

        return {
            erFormHelper,
            initializeFlag,
            efFormReady,
            closeEfDialog, LayoutName, F2_DO, erGridReady, beforeAvatarUpload, fileList, handlePictureCardPreview, disabled, handleDownload, handleRemove, upload, dialogVisible, dialogImageUrl, file_path, loadBackupImage, yuan

        };
    },
});
