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
  name: 'TMSMXXAV',
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
    let v_factory_div: any;
    let cs_OkClick = '';
    let i_windowsNumber: any;
    const tabcname1 = ref('');
    const tabcname2 = ref('');
    const tabcname3 = ref('');
    const tabcname4 = ref('');
    const tabable1 = ref(true);
    const tabable2 = ref(true);
    const tabable3 = ref(true);
    const tabable4 = ref(true);
    const efFormReady = (e: any) => {
      efFormInfo.value = e.formInfo;
      // efFormIsReady.value = true;
      formPartition = efFormInfo.value.formPartition; // 分区


      initializePage();

    };
    // 画面相关数据初始化
    const initializePage = async () => {
      i_form_ename = efFormInfo.value.formName;

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
          GridView1 = erFormHelper.getGrid('GridView1');
          erFormHelper.setGridEditable('GridView1', false);
          tabcname1.value = String(getConfig(i_form_ename)?.tabcname1);
          tabcname2.value = String(getConfig(i_form_ename)?.tabcname2);
          tabcname3.value = String(getConfig(i_form_ename)?.tabcname3);
          tabcname4.value = String(getConfig(i_form_ename)?.tabcname4);
          tabable1.value = Boolean(getConfig(i_form_ename)?.tabable1);
          tabable2.value = Boolean(getConfig(i_form_ename)?.tabable2);
          tabable3.value = Boolean(getConfig(i_form_ename)?.tabable3);
          tabable4.value = Boolean(getConfig(i_form_ename)?.tabable4);
        });
      } else {
        erFormHelper.messageError(
          'ErFormHelper initialize faild, error msg is [' + initialResult.msg + ']!'
        );
      }
    };

    onMounted(() => {
      //initializePage();
    });
    //模板参数查询

    const getConfig = (formname: any) => {
      if (formname === 'TMSM21S2N') {
        const formconfig = {
          layout: 'LayoutGroupFilter',
          callservice: 'tmsm21bf2_inq',
          popform: 'TMSM21A2',
          layoutF3: 'LayoutGroupF3',
          layoutF4: 'LayoutGroupF4',
          layoutF7: ' ',
          layoutF8: 'LayoutGroupF8',
          layoutF9: 'LayoutGroupF9',
          layoutF10: 'LayoutGroupF10',
          layoutF11: ' ',
          servicef3: 'tmsm21bf3_ins',
          servicef4: 'tmsm21bf4_upd',
          servicef7: ' ',
          servicef8: 'tmsm21bf8_pro',
          servicef9: 'tmsm21bf9_pro',
          servicef10: 'tmsm21bf10_pro',
          tabname1: 'LayoutGroup1',
          tabcname1: '中间包基本信息',
          tabable1: true,
          tabname2: 'LayoutGroup2',
          tabcname2: '中间包使用信息',
          tabable2: true,
          tabname3: 'LayoutGroup3',
          tabcname3: '中间包维修信息',
          tabable3: true,
          tabname4: 'LayoutGroup4',
          tabcname4: '中间包烘烤信息',
          tabable4: true,
        }
        return formconfig;
      }
      if (formname === 'TMSM31S2N') {
        const formconfig = {
          layout: 'LayoutGroupFilter',
          callservice: 'tmsm31bf2_inq',
          popform: 'TMSM31A3',
          layoutF3: 'LayoutGroupF3',
          layoutF4: 'LayoutGroupF4',
          layoutF7: 'LayoutGroupF7',
          layoutF8: ' ',
          layoutF9: 'LayoutGroupF9',
          layoutF10: 'LayoutGroupF10',
          layoutF11: 'LayoutGroupF11',
          servicef3: 'tmsm31bf3_ins',
          servicef4: 'tmsm31bf4_upd',
          servicef7: 'tmsm31bf7_bind',
          servicef9: 'tmsm31bf9_pro',
          servicef10: 'tmsm31bf10_pro',
          servicef11: 'tmsm31bf11_pro',
          tabname1: 'LayoutGroup1',
          tabcname1: '结晶器基本信息',
          tabable1: true,
          tabname2: 'LayoutGroup2',
          tabcname2: '结晶器使用信息',
          tabable2: true,
          tabname3: 'LayoutGroup3',
          tabcname3: '结晶器维修信息',
          tabable3: true,
          tabname4: ' ',
          tabcname4: ' ',
          tabable4: false,
        }
        return formconfig;
      }
      if (formname === 'TMSM41S2N') {
        const formconfig = {
          layout: 'LayoutGroupFilter',
          callservice: 'tmsm41bf2_inq',
          popform: 'TMSM41A3',
          layoutF3: 'LayoutGroupF3',
          layoutF4: 'LayoutGroupF4',
          layoutF7: ' ',
          layoutF8: ' ',
          layoutF9: 'LayoutGroupF9',
          layoutF10: '  ',
          layoutF11: ' ',
          servicef3: 'tmsm41bf3_ins',
          servicef4: 'tmsm41bf4_upd',
          servicef7: ' ',
          servicef9: 'tmsm41bf9_pro',
          servicef10: ' ',
          servicef11: ' ',
          tabname1: 'LayoutGroup1',
          tabcname1: '铜板基本信息',
          tabable1: true,
          tabname2: ' ',
          tabcname2: ' ',
          tabable2: false,
          tabname3: ' ',
          tabcname3: ' ',
          tabable3: false,
          tabname4: ' ',
          tabcname4: ' ',
          tabable4: false,
        }
        return formconfig;
      }
    }
    console.log('sdtyuijhvbhjnbnk', i_form_ename);




    //#region 分页查询信息 grid1pagingQuery start
    const grid1pagingQuery = async () => {


      const inInfo = new EI.EIInfo();
      inInfo.addBlock(erFormHelper.getAllControlValueAsFilter(String(getConfig(i_form_ename)?.layout)), 'QUERY_FILTER');
      const outInfo = await erFormHelper.callService(String(getConfig(i_form_ename)?.callservice), inInfo, false, true);
      if (outInfo.sys.status >= 0) {
        const resultData = outInfo.getBlock(0).data; //后台返回的当页的数据
        erFormHelper.mergeDataToGrid(resultData, 'GridView1');
        if (outInfo.getBlock(0).data.length === 0) {
          erFormHelper.messageInfo('未查询到材料信息');
        }
      }
    };
    //#endregion 分页查询信息 end

    //焦点行数据查询
    const GridView1FocusChanged = async (e: any) => {
      if (e) {
        if (e.rowChanged && e.data) {
          const inInfo = new EI.EIInfo();
          inInfo.addBlock(
            erFormHelper.convertModelAsBlock(e.data)
          );
          const outInfo = await erFormHelper.callService(String(getConfig(i_form_ename)?.callservice), inInfo, false, true);
          if (outInfo.sys.status < 0) {
            return false;
          }
          //清空
          erFormHelper.clearLayoutData(...['LayoutGroup1', 'LayoutGroup2', 'LayoutGroup3', 'LayoutGroup4']);
          console.log(outInfo.getBlock(0).data[0]);
          //加载
          erFormHelper.setControlValueEx('LayoutGroup1', outInfo.getBlock(0).data[0]);
          erFormHelper.setControlValueEx('LayoutGroup2', outInfo.getBlock(0).data[0]);
          erFormHelper.setControlValueEx('LayoutGroup3', outInfo.getBlock(0).data[0]);
          erFormHelper.setControlValueEx('LayoutGroup4', outInfo.getBlock(0).data[0]);
        }
      }
    };

    //弹窗配置
    const popFreeEditOkClick = async (e: any) => {
      const inInfo = new EI.EIInfo();
      let outInfo: EI.EIInfo = new EI.EIInfo();
      //新增
      if (cs_OkClick === 'F3') {
        inInfo.addBlock(
          erFormHelper.convertModelAsBlock(e.dataModel, {
            FACTORY_DIV: v_factory_div
          }),
          'PARA'
        );

        outInfo = await erFormHelper.callService(String(getConfig(i_form_ename)?.servicef3), inInfo, false, true, true);
      }
      //修改
      if (cs_OkClick === 'F4') {
        inInfo.addBlock(
          erFormHelper.convertModelAsBlock(e.dataModel, {
            FACTORY_DIV: v_factory_div
          }),
          'PARA'
        );
        outInfo = await erFormHelper.callService('tmsm01a1f4_upd', inInfo, false, true);
      }
      //烘烤
      if (cs_OkClick === 'F8') {

        inInfo.addBlock(
          erFormHelper.convertModelAsBlock(e.dataModel, {
            FACTORY_DIV: v_factory_div
          }),
          'PARA'
        );
        outInfo = await erFormHelper.callService('tmsm01a1f8_pro', inInfo, false, true);
      }
      //维修
      if (cs_OkClick === 'F9') {
        inInfo.addBlock(
          erFormHelper.convertModelAsBlock(e.dataModel, {
            FACTORY_DIV: v_factory_div
          }),
          'PARA'
        );
        outInfo = await erFormHelper.callService('tmsm01a1f9_pro', inInfo, false, true);
      }
      //使用
      if (cs_OkClick === 'F10') {
        inInfo.addBlock(
          erFormHelper.convertModelAsBlock(e.dataModel, {
            FACTORY_DIV: v_factory_div
          }),
          'PARA'
        );
        outInfo = await erFormHelper.callService('tmsm01a1f10_pro', inInfo, false, true);
      }
      //判断操作
      if (outInfo?.sys.status >= 0) {
        erFormHelper.messageSuccess('操作成功');
      }
      grid1pagingQuery();
    };
    let popFreeEdit: ER.PopFreeHelper;;
    //自定义模板参数
    const popFreeEdit_paras = async (windowsNumber: string, Click_name: string) => {

      //新增
      if (Click_name === 'F3') {
        popFreeEdit = new ER.PopFreeHelper(formPartition, String(getConfig(i_form_ename)?.popform), String(getConfig(i_form_ename)?.layoutF3));
      }
      //修改
      if (Click_name === 'F4') {
        popFreeEdit = new ER.PopFreeHelper(formPartition, String(getConfig(i_form_ename)?.popform), String(getConfig(i_form_ename)?.layoutF4));
      }
      //烘烤
      if (Click_name === 'F8') {
        popFreeEdit = new ER.PopFreeHelper(formPartition, String(getConfig(i_form_ename)?.popform), String(getConfig(i_form_ename)?.layoutF8));
      }
      //维修
      if (Click_name === 'F9') {
        popFreeEdit = new ER.PopFreeHelper(formPartition, String(getConfig(i_form_ename)?.popform), String(getConfig(i_form_ename)?.layoutF9));
      }
      //使用
      if (Click_name === 'F10') {
        popFreeEdit = new ER.PopFreeHelper(formPartition, String(getConfig(i_form_ename)?.popform), String(getConfig(i_form_ename)?.layoutF10));
      }

      //新增
      if (Click_name === 'F3') {
        //新增
        //popFreeEdit.AllowEidt = true;
        if (i_windowsNumber === String(getConfig(i_form_ename)?.popform)) {
          popFreeEdit.FormHelper.setControlReadOnly(String(getConfig(i_form_ename)?.layoutF3), true);
          //popFreeEdit.ReceiveData(erFormHelper.getGridCurrentRow('GridView1'), true);
        }
      }
      //修改
      if (Click_name === 'F4') {
        //popFreeEdit.AllowEidt = true;
        console.log('dtgfcvghuj', i_windowsNumber, String(getConfig(i_form_ename)?.popform));
        if (i_windowsNumber === String(getConfig(i_form_ename)?.popform)) {
          console.log('dtgfcvghuj', erFormHelper.getGridCurrentRow('GridView1'));
          popFreeEdit.FormHelper.setControlReadOnly('LayoutGroupF4', true);
          popFreeEdit.ReceiveData({
            ...JSON.parse(
              JSON.stringify(
                erFormHelper.getGridCurrentRow('GridView1', true)
                  ? erFormHelper.getGridCurrentRow('GridView1', true)
                  : {}
              )
            ),

          });
        }
      }
      //烘烤
      if (Click_name === 'F8') {
        //popFreeEdit.AllowEidt = true;
        if (i_windowsNumber === String(getConfig(i_form_ename)?.popform)) {
          console.log('dtgfcvghuj', erFormHelper.getGridCurrentRow('GridView1'));
          popFreeEdit.FormHelper.setControlReadOnly('LayoutGroupF8', true);
          popFreeEdit.ReceiveData({
            ...JSON.parse(
              JSON.stringify(
                erFormHelper.getGridCurrentRow('GridView1', true)
                  ? erFormHelper.getGridCurrentRow('GridView1', true)
                  : {}
              )
            ),

          });
        }
      }
      //维修
      if (Click_name === 'F9') {
        if (i_windowsNumber === String(getConfig(i_form_ename)?.popform)) {
          console.log('dtgfcvghuj', erFormHelper.getGridCurrentRow('GridView1'));
          popFreeEdit.FormHelper.setControlReadOnly('LayoutGroupF9', true);
          popFreeEdit.ReceiveData({
            ...JSON.parse(
              JSON.stringify(
                erFormHelper.getGridCurrentRow('GridView1', true)
                  ? erFormHelper.getGridCurrentRow('GridView1', true)
                  : {}
              )
            ),

          });
        }
      }
      //使用
      if (Click_name === 'F10') {
        if (i_windowsNumber === String(getConfig(i_form_ename)?.popform)) {
          console.log('dtgfcvghuj', erFormHelper.getGridCurrentRow('GridView1'));
          popFreeEdit.FormHelper.setControlReadOnly('LayoutGroupF10', true);
          popFreeEdit.ReceiveData({
            ...JSON.parse(
              JSON.stringify(
                erFormHelper.getGridCurrentRow('GridView1', true)
                  ? erFormHelper.getGridCurrentRow('GridView1', true)
                  : {}
              )
            ),

          });
        }
      }
    };

    //F2按钮查询
    const F2_DO = async (e: any) => {
      //Query();
      grid1pagingQuery();
    };

    //F3按钮新增
    const F3_DO = async (e: any) => {
      // 弹出新增画面
      cs_OkClick = 'F3';
      i_windowsNumber = String(getConfig(i_form_ename)?.popform);
      //模板参数
      popFreeEdit_paras(i_windowsNumber, cs_OkClick);
      //加载弹窗配置
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
    };

    //修改
    const F4_DO = async (e: any) => {
      //获取当前新增行
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      // 弹出新增画面
      cs_OkClick = 'F4';
      i_windowsNumber = String(getConfig(i_form_ename)?.popform);
      //模板参数
      popFreeEdit_paras(i_windowsNumber, cs_OkClick);
      //加载弹窗配置
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
      //添加
      grid1pagingQuery();
      editable.value = false;
      erFormHelper.setGridEditable('GridView1', false);
    };

    //删除
    const F5_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      eiInfo.addBlock(selectedRows, 'Table0');
      const outInfo = await erFormHelper.callService('tmsm01a1f5_del', eiInfo);
      if (outInfo.sys.status < 0) {
        //维护完成重新查询
        erFormHelper.messageError('查询错误：' + outInfo.sys.msg);
        return false;
      }
      grid1pagingQuery();
    };
    //报废
    const F6_DO = async (e: any) => {
      const eiInfo = new EI.EIInfo();
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      eiInfo.addBlock(selectedRows, 'Table0');
      let outInfo: EI.EIInfo = new EI.EIInfo();
      outInfo = await erFormHelper.callService('tmsm01a1f6_pro', eiInfo, false, true);
      grid1pagingQuery();
    };
    //烘烤
    const F8_DO = async (e: any) => {
      //获取当前新增行
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      cs_OkClick = 'F8';
      i_windowsNumber = String(getConfig(i_form_ename)?.popform);
      //模板参数
      popFreeEdit_paras(i_windowsNumber, cs_OkClick);
      //加载弹窗配置
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
      grid1pagingQuery();
      editable.value = false;
      erFormHelper.setGridEditable('GridView1', false);
    };
    //维修
    const F9_DO = async (e: any) => {
      //获取当前新增行
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      cs_OkClick = 'F9';
      i_windowsNumber = String(getConfig(i_form_ename)?.popform);
      //模板参数
      popFreeEdit_paras(i_windowsNumber, cs_OkClick);
      //加载弹窗配置
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
      grid1pagingQuery();
      editable.value = false;
      erFormHelper.setGridEditable('GridView1', false);
    };
    //使用
    const F10_DO = async (e: any) => {
      //获取当前新增行
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      cs_OkClick = 'F10';
      i_windowsNumber = String(getConfig(i_form_ename)?.popform);
      //模板参数
      popFreeEdit_paras(i_windowsNumber, cs_OkClick);
      //加载弹窗配置
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
      grid1pagingQuery();
      editable.value = false;
      erFormHelper.setGridEditable('GridView1', false);
    };
    //使用
    const F11_DO = async (e: any) => {
      //获取当前新增行
      const selectedRows = erFormHelper.getGridSelectRowsAsBlock('GridView1');
      //判断是否有选中行
      if (selectedRows.data.length === 0) {
        erFormHelper.messageInfo('请勾选数据行！');
        return;
      }
      cs_OkClick = 'F11';
      i_windowsNumber = String(getConfig(i_form_ename)?.popform);
      //模板参数
      popFreeEdit_paras(i_windowsNumber, cs_OkClick);
      //加载弹窗配置
      ER.PopUtils.showErPopFree(ErPopFree, popFreeEdit, popFreeEditOkClick);
      grid1pagingQuery();
      editable.value = false;
      erFormHelper.setGridEditable('GridView1', false);
    };
    const tabActiveKey = ref('tab1')
    const handleTabChange = (activeKey: string) => {
      console.log(activeKey);
      if (activeKey === 'tab1') {
        //Tab0Data();
      } else if (activeKey === 'tab2') {
        //Tab1Data();
      }
    };

    return {
      erFormHelper, efFormReady, tabActiveKey, handleTabChange,
      initializeFlag,
      F2_DO,
      F3_DO,
      F4_DO,
      F5_DO,
      F6_DO,
      F8_DO,
      F9_DO,
      F10_DO, F11_DO,
      GridView1FocusChanged,
      tabcname1,
      tabcname2,
      tabcname3,
      tabcname4,
      tabable1,
      tabable2,
      tabable3,
      tabable4,
    };
  }
});
