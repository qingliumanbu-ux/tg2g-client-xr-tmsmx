import { toIsoString } from './../../../build/utils';
import { GridApi, IRowNode } from '@ag-grid-community/core';
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
import { EI, EIManager, EP } from 'EIX/ei';
import xrEfForm from 'EFX/xrEfForm';
import xrEfPanel from 'EFX/xrEfPanel';
import xrEfSearchBox from 'EFX/xrEfSearchBox';
import xrEfDialog from 'EFX/xrEfDialog';
import EFUtility from 'EFX/EFUtility';
import eBFR from 'EFX/eBFR';
import erLayout from 'ERX/ErLayout';
import erGrid from 'ERX/ErGrid';
import { ER } from 'ERX/Er';
import { SiUtils } from 'ERX/SiUtils';
import { FiUtils } from 'ERX/FiUtils';
import { useRoute } from 'vue-router';
import ErPopFree from 'ERX/ErPopFree';
import ErPopQuery from 'ERX/ErPopQuery';
import { PopQueryReturnInfo, PopFreeReturnInfo } from 'ERX/er-type';
import EFCallForm from 'EFX/EFCallForm';
import { Console, log } from 'console';
import { config } from 'process';
import TMSMSCS2N from '../TMSMSCS2N/TMSMSCS2N.vue';
import { ElMessageBox } from 'element-plus';

export default defineComponent({
  name: '',
  components: {
    xrEfForm,
    xrEfPanel,
    erLayout,
    erGrid, xrEfDialog, TMSMSCS2N
  },
  setup: () => {

    // 获取画面的分区信息及设置画面初始化service
    const efFormInfo = ref<{ [key: string]: any }>({});
    let formPartition: string;
    const initializeService = 'tmsm_form_get';
    const efFormIsReady = ref(false);
    // 变量定义
    let formName = 'TMSM200AV';
    let formName_Now = '';
    const erFormHelper: ER.FormHelper = new ER.FormHelper() as any;
    const initializeFlag = ref(0);
    const now = new Date();
    const currDate = now.toLocaleDateString();
    const timestamp = Date.now();
    const formattedDate = timestampToDateString(timestamp);

    const gridToolbar: Ref<any[]> = ref([]);
    const gridToolbar1: Ref<any[]> = ref([]);
    let date_c: string;
    let c_orderid: string;
    let sap_erp_main: string;
    let sampl_entr_no: string;
    let old_seq_no = 0; //旧序号
    let new_seq_no = 0; //新序号
    let gridViewseq: any;
    let gridViewseqApi: any;
    let gridView1: any;
    let selectedDataItems: any[] = [];
    let time_2: string;
    let time_now: string;
    let flag_color = 0;
    const c_name = ref();
    const c_colornote = ref();
    const layout = ref();
    const gridview = ref();
    const editable = ref(false);
    const callService_f2 = ref();
    const callService_f3 = ref();
    const callService_f4 = ref();
    const callService_f5 = ref();
    const callService_f7 = ref();
    const callService_inq1 = ref();
    let cx_WORK_AREA: any = '';
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区
      formName_Now = efFormInfo.value.formName; // 当前画面名
      c_name.value = efFormInfo.value.formParams.cname; // 当前画面名
      c_colornote.value = ' '; // 颜色提示
      console.log('formName_Now', efFormInfo.value);
      layout.value = 'LayoutGroup_' + String(formName_Now).substring(4, 7);
      gridview.value = 'GridView_' + String(formName_Now).substring(4, 7);
      console.log('formName_Now', layout.value, gridview.value, c_name.value);
      callService_f2.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_inq';
      callService_inq1.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_inq1';
      callService_f3.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f3';
      callService_f4.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f4';
      callService_f5.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f5';
      callService_f7.value = String(formName_Now).substring(0, formName_Now.indexOf('S2N', 0)).toLowerCase() + 'av_f7';
      console.log('formName_Now', formName_Now, callService_f2.value, callService_f3.value, callService_f7.value);

      initializePage();
    };

    // 指定要搜索的目录



    // 画面相关数据初始化
    const initializePage = async () => {

      const initialResult = await erFormHelper.Initialize(formPartition, formName, '', initializeService);

      if (initialResult.flag >= 0) {
        // 画面工具类初始化成功后将画面渲染条件设置为1
        initializeFlag.value = 1;

        // 回调函数获取控件信息及设置定义事件等操作
        nextTick(async () => {
          // 获取画面上的主要控件信息
          let sqlstr = 'select T3.CODE_DESC_3_CONTENT from tesuserinfo t1 left join tesdeptinfo t2 on t1.DEPTID = t2.ID ' +
            `LEFT JOIN TWMSMZD02 t3 on t3.CODE_CLASS = 'TMQX' AND T2.ENAME = T3.CODE_DESC_1_CONTENT where t1.ENAME='${EP.User.userId}'`;
          const out = await erFormHelper.querySql('', sqlstr);



          for (let i = 0; i < out.getBlock(0).data.length; i++) {

            cx_WORK_AREA += out.getBlock(0).data[i].CODE_DESC_3_CONTENT + `,`;

          }
          cx_WORK_AREA = cx_WORK_AREA.substring(0, cx_WORK_AREA.length - 1)
          //console.log('fdrtygfvghujhbnjkolkmdrtgfcvghujhnbnj', sqlstr, out.getBlock(0).data, cx_WORK_AREA)
          erFormHelper.setControlValueEx(layout.value, { 'WORK_AREA': cx_WORK_AREA })

        });
      } else {
        erFormHelper.messageError('ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!');
      }
    };

    onMounted(() => {
      //initializePage();
    });

    const valueChanged = async (e: any) => {
      console.log('utfdftyujmnbfdwertyujkl', e)


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
        let hour = date.$H.toString().padStart(2, '0');
        let minute = date.$m.toString().padStart(2, '0');
        let second = date.$s.toString().padStart(2, '0');
        return year + month + day;
      }

    }
    //时间字符串转yyyyMMdd
    function timestampToDateString(timestamp: any): string {
      const date = new Date(timestamp);
      if (date === null) {
        return ' ';
      }
      else {
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return year + month + day;
      }

    }
    let gridView1Api!: GridApi;
    const erGrid1Ready = (e: any) => {
      gridView1Api = e.api;
      gridView1 = erFormHelper.getGrid(gridview.value);

      gridView1.gridOptions.getRowStyle = (params: any) => {
        //console.log('params', params);

        if (formName_Now == 'TMSM203S2N' || formName_Now == 'TMSM204S2N')//用于203、204页面下次时间超时警告
        {
          c_colornote.value = '（绿色：已更换 蓝色：临期 红色：超期）';
          if (params.data && 'DATE_C' in params.data) {

            //console.log('now', now.toLocaleDateString("af"));
            time_now = timestampToDateString(timestamp);
            // console.log('time_now', time_now.toString());
            // console.log('check_flag', params.data.CHECK_FLAG.toString().trim());
            //time_2=formatDate(erFormHelper.getControlValue(gridview.value, 'TIME_2')); //下次测试时间
            //time_2=String(params.data.TIME_2.$y)+String(params.data.TIME_2.$m)+String(params.data.TIME_2.$D);

            //控制警告显示
            if (params.data.TIME_2 != null) {
              //time_2=String(params.data.TIME_2.$d.toLocaleDateString("af"));
              time_2 = String(timestampToDateString(params.data.TIME_2.$d));
              //console.log('time_2', time_2.toString());


              //params.data.IS_ABNORMAL.toString().trim()=='1'
              //'#FFB6C1'

              if (time_2.toString() < time_now.toString() && params.data.CHECK_FLAG.toString().trim() == '0') {
                //未审核且下次计划时间小于当前时间为异常情况，颜色为红色
                return {
                  fontweight: 'blod',
                  background: '#DF3A01'
                };
              }

              else {
                //临期天数
                perd_dd1 = params.data.PERD_DD1.toString().trim();
                //计划时间
                const plandate = new Date(params.data.TIME_2.$d);
                //临期时间
                const perddateconst = plandate.setDate(plandate.getDate() - Number(perd_dd1));
                perddate = String(timestampToDateString(perddateconst));
                // console.log('perddate', perddate.toString());
                if (perddate.toString() < time_now.toString() && params.data.CHECK_FLAG.toString().trim() == '0') {
                  //未审核且临期时间小于当前时间为临期情况，颜色为粉红色
                  return {
                    fontweight: 'blod',
                    background: '#4FB9DA'
                  };

                }
              }

            }


            //控制审核后该行不可编辑，颜色为绿色
            if (params.data.CHECK_FLAG.toString().trim() == '1') {
              //erFormHelper.setControlEnable(,false);
              return {
                fontweight: 'blod',
                background: '#71C671'
              };

            }


          }
        }
      };
      // console.log('gridView1', gridView1);
      erFormHelper.setGridEditable('GridView1', false);
      erFormHelper.setGridToolbarVisible('GridView1', {
        addrow: false,
        copyrow: false,
        excel: true
      });

    };


    const F2_DO = async (e: any) => {
      queryRecord(); //查询记录
    };
    const queryRecord = async () => {
      //获取查询条件
      const Query: EI.EiBlock = erFormHelper.getAllControlValueAsEiBlock('LayoutGroupFilter');

      if (!await erFormHelper.checkRequiredInput(layout.value)) {
        erFormHelper.messageWarning('请检查输入');
        return false;
      }

      const inInfo = new EI.EIInfo();
      //获取查询条件
      inInfo.addBlock(erFormHelper.getAllControlValueAsEiBlock(layout.value));
      const outInfo = await erFormHelper.callService(callService_f2.value, inInfo, true, false, true);

      //判断调后台是否失败
      if (outInfo.sys.status < 0) {
        erFormHelper.messageError('查询错误:' + outInfo.sys.msg);
      } else {
        //是否弹出查询成功提示
        console.log('outInfo', outInfo);
        erFormHelper.messageInfo('信息查询成功！本次查询返回' + outInfo.getBlock(0).data.length + '条记录！');
        console.log('outInfo', outInfo);
        erFormHelper.mergeDataToGrid(outInfo, gridview.value);
        editable.value = false;
        erFormHelper.setGridEditable(gridview.value, false);
      }


    };


    //作业区维护
    const F3_DO = async (e: any) => {


      erFormHelper.setGridToolbarVisible(gridview.value, {
        addrow: false,
        delete: false,
        import: false
      });
      return await saveMainGridData()
        .then((res: any) => {
          queryRecord(); //查询记录
          editable.value = false;
          erFormHelper.setGridEditable(gridview.value, false);
        })
        .catch((error) => {
          erFormHelper.messageError(error);
          return false;
        });


    };


    // 作业区维护主表保存
    const saveMainGridData = async () => {
      if (erFormHelper.hasDataChange(gridview.value)) {
        const eiinfo = new EI.EIInfo();


        const created = erFormHelper.getGridCreatedRowsAsBlock(gridview.value);
        eiinfo.addBlock(created, 'ADD');

        const updated = erFormHelper.getGridModifyRowsAsBlock(gridview.value);
        eiinfo.addBlock(updated, 'UPD');

        const deleted = erFormHelper.getGridDeletedRowsAsBlock(gridview.value);
        eiinfo.addBlock(deleted, 'DEL');
        if (created.data.length === 0 && updated.data.length === 0 && deleted.data.length === 0) {
          erFormHelper.messageInfo('请选择需操作的记录。');
          return false;
        }
        //const para = erFormHelper.getAllControlValueAsEiBlock(layout.value);
        //eiinfo.addBlock(para, 'PARA');

        console.log('asdfghnm', eiinfo);

        const outInfo = await erFormHelper.callService(callService_f3.value, eiinfo, true, true, true);


        if (outInfo.sys.status < 0) {
          erFormHelper.messageInfo('处理失败[' + outInfo.sys.msg + ']。');
          return false;
        } else {

          erFormHelper.messageInfo('保存成功!');
        }
        queryRecord(); //查询记录
      }
    };




    // 作业区维护确认
    const F3_PRE_DO = async (e: any) => {

      editable.value = true;
      erFormHelper.setGridToolbarVisible(gridview.value, {
        addrow: true,
        delete: false,
        import: true
      });

      erFormHelper.setGridEditable(gridview.value, true);
    };
    // 作业区维护取消
    const F3_CANCEL = async (e: any) => {

      //erFormHelper.setGridEditable(gridview.value, true);
      //queryRecord(); //查询记录

      editable.value = false;
      erFormHelper.setGridToolbarVisible(gridview.value, {
        addrow: false,
        delete: false,
        import: false
      });
      erFormHelper.setGridEditable(gridview.value, false);



    };

    // 调度维护主表保存
    const saveMainGridDataDD = async () => {
      if (erFormHelper.hasDataChange(gridview.value)) {
        const eiinfo = new EI.EIInfo();


        const created = erFormHelper.getGridCreatedRowsAsBlock(gridview.value);
        eiinfo.addBlock(created, 'ADD');

        const updated = erFormHelper.getGridModifyRowsAsBlock(gridview.value);
        eiinfo.addBlock(updated, 'UPD');

        const deleted = erFormHelper.getGridDeletedRowsAsBlock(gridview.value);
        eiinfo.addBlock(deleted, 'DEL');
        if (created.data.length === 0 && updated.data.length === 0 && deleted.data.length === 0) {
          erFormHelper.messageInfo('请选择需操作的记录。');
          return false;
        }
        //const para = erFormHelper.getAllControlValueAsEiBlock(layout.value);
        //eiinfo.addBlock(para, 'PARA');

        console.log('asdfghnm', eiinfo);

        const outInfo = await erFormHelper.callService(callService_f7.value, eiinfo, true, true, true);


        if (outInfo.sys.status < 0) {
          erFormHelper.messageInfo('处理失败[' + outInfo.sys.msg + ']。');
          return false;
        } else {

          erFormHelper.messageInfo('保存成功!');
        }
        queryRecord(); //查询记录
      }
    };
    // 调度维护
    const F7_DO = async (e: any) => {


      erFormHelper.setGridToolbarVisible(gridview.value, {
        addrow: false,
        delete: false,
        import: false
      });
      return await saveMainGridDataDD()
        .then((res: any) => {
          queryRecord(); //查询记录
          editable.value = false;
          erFormHelper.setGridEditable(gridview.value, false);
        })
        .catch((error) => {
          erFormHelper.messageError(error);
          return false;
        });


    };
    // 调度维护确认
    const F7_PRE_DO = async (e: any) => {

      editable.value = true;
      erFormHelper.setGridToolbarVisible(gridview.value, {
        addrow: true,
        delete: true,
        import: true
      });

      erFormHelper.setGridEditable(gridview.value, true);
    };
    // 调度维护取消
    const F7_CANCEL = async (e: any) => {

      //erFormHelper.setGridEditable(gridview.value, true);
      //queryRecord(); //查询记录

      editable.value = false;
      erFormHelper.setGridToolbarVisible(gridview.value, {
        addrow: false,
        delete: false,
        import: false
      });
      erFormHelper.setGridEditable(gridview.value, false);



    };
    let popFreeEdit: ER.PopFreeHelper;
    // 审核前判断
    const F4_PRE_DO = (e: any) => {
      selectedDataItems = [];
      const selectedRows = erFormHelper.getGridSelectRows(gridview.value);
      selectedRows.forEach((tr: any) => {
        const json = tr.toJSON();
        selectedDataItems.push(json);
      });
      if (selectedDataItems.length === 0) {
        erFormHelper.messageWarning('请选择一条数据进行审核');
        return false;
      }

    };

    const popBACKOkClick = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      console.log('eiBlock', e.dataModel);
      selectedDataItems[0].TIME_3 = formatDate(e.dataModel['TIME_3'])
      const eiBlock = EI.EiBlock.build('Table0', selectedDataItems);
      console.log('eiBlock', eiBlock);
      eiInfo.addBlock(eiBlock);
      console.log('check！', callService_f4.value);
      erFormHelper.callService(callService_f4.value, eiInfo, true, true).then((res) => {
        const platonicResData = res.blocks['Table0'].data;
        nextTick(() => {
          erFormHelper.mergeDataToGrid(platonicResData, gridview.value);
        });

        queryRecord(); //查询记录
      });
    };

    // 审核确认
    const F4_DO = async () => {
      if (formName_Now == 'TMSM203S2N') {
        selectedDataItems = [];
        const selectedRows = erFormHelper.getGridSelectRows(gridview.value);
        selectedRows.forEach((tr: any) => {
          const json = tr.toJSON();
          selectedDataItems.push(json);
        });
        if (selectedDataItems.length === 0) {
          erFormHelper.messageWarning('请选择一条数据进行审核');
          return false;
        }
        popFreeEdit = new ER.PopFreeHelper(formPartition, 'TMSM200AV', 'LayoutGroupFilter2');
        const data = {}
        popFreeEdit.ReceiveData(selectedDataItems[0])
        //console.log('qwsedfvb ', popFreeEdit)
        ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popBACKOkClick);
      }
      else {
        const eiInfo = new EI.EIInfo();
        const eiBlock = EI.EiBlock.build('Table0', selectedDataItems);
        const eiinfo = new EI.EIInfo();
        eiInfo.addBlock(eiBlock);
        console.log('check！', callService_f4.value);
        erFormHelper.callService(callService_f4.value, eiInfo, true, true).then((res) => {
          const platonicResData = res.blocks['Table0'].data;
          nextTick(() => {
            erFormHelper.mergeDataToGrid(platonicResData, gridview.value);
          });

          queryRecord(); //查询记录
        });
      }

    };

    // 审核取消
    const F4_CANCEL = () => { };

    // 取消审核前判断
    const F5_PRE_DO = (e: any) => {
      selectedDataItems = [];
      const selectedRows = erFormHelper.getGridSelectRows(gridview.value);
      selectedRows.forEach((tr: any) => {
        const json = tr.toJSON();
        selectedDataItems.push(json);
      });
      if (selectedDataItems.length === 0) {
        erFormHelper.messageWarning('请选择一条数据进行取消审核');
        return false;
      }
    };

    // 取消审核确认
    const F5_DO = async () => {
      const eiInfo = new EI.EIInfo();
      const eiBlock = EI.EiBlock.build('Table0', selectedDataItems);
      const eiinfo = new EI.EIInfo();
      eiInfo.addBlock(eiBlock);
      console.log('check！', callService_f5.value);
      erFormHelper.callService(callService_f5.value, eiInfo, true, true).then((res) => {
        const platonicResData = res.blocks['Table0'].data;
        nextTick(() => {
          erFormHelper.mergeDataToGrid(platonicResData, gridview.value);
        });

        queryRecord(); //查询记录
      });
    };

    // 取消审核取消
    const F5_CANCEL = () => { };
    const dialogFormVisible = ref(false);//是否打开弹出窗口
    const dialogFormName = ref(''); // 弹出画面的画面名
    const dialogFormName_title = ref(''); // 弹出画面的画面中文名
    const parentInfo = ref({}); // 给弹出画面传入数据
    const showDialog = () => {
      dialogFormVisible.value = true;
      console.log('uyhggvhjiolk', 1)
    };
    const handleClose = () => {
      dialogFormVisible.value = false;
    };
    const getChildInfo = (info: any) => {
      console.log("获取弹窗画面传递过来的信息", info);


      dialogFormVisible.value = false; // 关闭弹框
      handleClose();
      queryRecord();
      return true;

    };
    let v_LayoutName: any;
    let v_filePath: any;
    let v_tablename: any;
    let perd_dd1: string;
    let perddate: string;
    const F6_DO = () => {

      if (erFormHelper.getGridCheckedRows(gridview.value).length !== 1) {
        erFormHelper.messageWarning('请选择一条信息！');
        return;
      }

      if (formName_Now === 'TMSM201S2N') {
        v_LayoutName = 'layout_201';
        v_filePath = 'GuZhang';
        v_tablename = 'TTMSM201';
      }
      if (formName_Now === 'TMSM203S2N') {
        v_LayoutName = 'layout_203';
        v_filePath = 'ZhouQi';
        v_tablename = 'TTMSM203';
      }
      const data = {
        LayoutName: v_LayoutName,
        filePath: v_filePath,
        callService: 'tmsm203_upd',
        table_Name: v_tablename,
        mainData: erFormHelper.getGridCheckedRowsAsBlock(gridview.value)
      };
      dialogFormName.value = 'TMSMSCS2N'; // 读配置表获取画面名
      dialogFormName_title.value = '上传';
      //console.log('fcfghuijn', data.mainData)
      parentInfo.value = data;
      console.log('sdfghjkl0', parentInfo)
      showDialog();
    };


    const gridFocusChanged = (e: any) => {
      console.log('iuyhgc', e.data, e.column.colId, e.data.isNew)
      if (formName_Now === 'TMSM203S2N' && (e.column.colId !== 'SHIFT_CLASS'
        && e.column.colId !== 'RESP'
        && e.column.colId !== 'BACKC1'

      )) {

        // 新增行可编辑，其他行不可编辑
        if (e.data && e.data.isNew) {
          console.log('e.data', 'true')
          // e.column.colDef.editable = true;
          erFormHelper.setGridColumnEditable(gridview.value, true, ...[e.column.colId]);
        } else {
          console.log('e.data', 'false')
          // e.column.colDef.editable = false;
          erFormHelper.setGridColumnEditable(gridview.value, false, ...[e.column.colId]);
        }
      }
    }

    return {
      erGrid1Ready,
      erFormHelper,
      initializeFlag,
      F2_DO,
      F3_DO,
      F3_PRE_DO,
      F3_CANCEL,
      F4_DO,
      F4_PRE_DO,
      F4_CANCEL,
      F5_DO,
      F5_PRE_DO,
      F5_CANCEL,
      F6_DO,
      F7_DO,
      F7_PRE_DO,
      F7_CANCEL,
      gridToolbar,
      gridToolbar1,
      efFormReady,
      layout,
      gridview,
      c_name,
      c_colornote,
      gridFocusChanged,
      valueChanged, dialogFormVisible, dialogFormName, dialogFormName_title, parentInfo, getChildInfo, handleClose
    };
  }
});