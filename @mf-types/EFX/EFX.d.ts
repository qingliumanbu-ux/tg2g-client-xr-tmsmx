// declare module "EFX/*";
declare module "EFX/agPaginationPanel" {
  const _default: import("vue").DefineComponent<
    {},
    {
      gridApi: any;
      paginationParams: any;
      pageSizesOptions: import("vue").Ref<number[]>;
      pageSizes: any;
      totalPages: any;
      currentPages: any;
      totalCount: any;
      isPagination: import("vue").Ref<boolean>;
      onPageSizeChanged: () => void;
      onPageChanged: () => void;
      refreshPagination: () => void;
      toFirst: () => void;
      toLast: () => void;
      toPre: () => void;
      toNext: () => void;
      handlePageChange: () => void;
      firstDisabled: import("vue").Ref<boolean>;
      preDisabled: import("vue").Ref<boolean>;
      nextDisabled: import("vue").Ref<boolean>;
      lastDisabled: import("vue").Ref<boolean>;
    },
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<import("vue").ExtractPropTypes<{}>>,
    {},
    {}
  >;
  export default _default;
}
declare module "EFX/agToolbarPanel" {
  const _default: import("vue").DefineComponent<
    {},
    {
      saveChangedData: (saveCallback: Function) => void;
      clickExportButton: () => void;
      clickImportButton: () => void;
      addRow: () => void;
      copyRow: () => void;
      deleteRow: () => void;
      clickSaveButton: () => void;
      change: (editStatus: boolean) => void;
      isEditable: import("vue").Ref<boolean>;
      exportIsAuth: import("vue").Ref<boolean>;
      importIsAuth: import("vue").Ref<boolean>;
    },
    {},
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<import("vue").ExtractPropTypes<{}>>,
    {},
    {}
  >;
  export default _default;
}
declare module "EFX/xrEfForm" {
  import { PropType } from "vue";
  interface IAuthButton {
    name: string;
    desc: string;
    opType: string;
  }
  const _default: import("vue").DefineComponent<
    {
      inDialogFormName: {
        type: StringConstructor;
        default: null;
      };
      haveAuthButton: {
        type: BooleanConstructor;
        default: boolean;
      };
      buttonList: {
        type: PropType<IAuthButton[]>;
        default: () => never[];
      };
      hiddenButton: {
        type: ArrayConstructor;
        default: () => never[];
      };
      customDisableStatus: {
        type: BooleanConstructor;
        default: boolean;
      };
      authButtonDisabled: {
        type: BooleanConstructor;
        default: boolean;
      };
      showConfirmButton: {
        type: BooleanConstructor;
        default: boolean;
      };
      showCancelButton: {
        type: BooleanConstructor;
        default: boolean;
      };
      confirmButtonText: {
        type: StringConstructor;
        default: string;
      };
      cancelButtonText: {
        type: StringConstructor;
        default: string;
      };
    },
    {
      leftButtonBox: import("vue").Ref<HTMLElement | null>;
      clickArrowButton: (arrow: string) => void;
      arrowRightDisabled: import("vue").Ref<boolean>;
      arrowLeftDisabled: import("vue").Ref<boolean>;
      arrowButtonVisible: import("vue").Ref<boolean>;
      isShowRightButton: () => boolean;
      currentClickBtn: IAuthButton;
      optDisabled: import("vue").Ref<boolean>;
      authButtonList: import("vue").Ref<
        {
          name: string;
          desc: string;
          opType: string;
        }[]
      >;
      setActiveClass: (item: IAuthButton) => "" | "auth-button__active";
      buttonClick: (btnInfo: IAuthButton) => Promise<void>;
      confirmClick: () => Promise<void>;
      cancelClick: () => Promise<void>;
      showCloseDialogButton: import("vue").Ref<boolean>;
      closeClick: () => void;
      setDisplay: (item: IAuthButton) => "" | "auth-button__hidden";
      handleKeyDown: (event: KeyboardEvent) => false | undefined;
      buttonRefs: import("vue").Ref<(HTMLButtonElement | null)[]>;
      efFormContainer: import("vue").Ref<Element | undefined>;
      currentFormName: import("vue").Ref<string>;
      setRightButtonDisabled: () => boolean;
      setLeftButtonDisabled: () => boolean;
      setDisabledClass: () => "" | "auth-button__disabled";
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    ("closeEfDialogForm" | "closeDialog" | "initialized" | "ready")[],
    "closeEfDialogForm" | "closeDialog" | "initialized" | "ready",
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<{
        inDialogFormName: {
          type: StringConstructor;
          default: null;
        };
        haveAuthButton: {
          type: BooleanConstructor;
          default: boolean;
        };
        buttonList: {
          type: PropType<IAuthButton[]>;
          default: () => never[];
        };
        hiddenButton: {
          type: ArrayConstructor;
          default: () => never[];
        };
        customDisableStatus: {
          type: BooleanConstructor;
          default: boolean;
        };
        authButtonDisabled: {
          type: BooleanConstructor;
          default: boolean;
        };
        showConfirmButton: {
          type: BooleanConstructor;
          default: boolean;
        };
        showCancelButton: {
          type: BooleanConstructor;
          default: boolean;
        };
        confirmButtonText: {
          type: StringConstructor;
          default: string;
        };
        cancelButtonText: {
          type: StringConstructor;
          default: string;
        };
      }>
    > & {
      onCloseEfDialogForm?: ((...args: any[]) => any) | undefined;
      onCloseDialog?: ((...args: any[]) => any) | undefined;
      onInitialized?: ((...args: any[]) => any) | undefined;
      onReady?: ((...args: any[]) => any) | undefined;
    },
    {
      inDialogFormName: string;
      haveAuthButton: boolean;
      buttonList: IAuthButton[];
      hiddenButton: unknown[];
      customDisableStatus: boolean;
      authButtonDisabled: boolean;
      showConfirmButton: boolean;
      showCancelButton: boolean;
      confirmButtonText: string;
      cancelButtonText: string;
    },
    {}
  >;
  export default _default;
}
declare module "EFX/xrEfFormBase" {
  const _default: import("vue").DefineComponent<
    Readonly<
      import("vue").ComponentPropsOptions<{
        [x: string]: unknown;
      }>
    >,
    {},
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    | readonly string[]
    | Readonly<
        import("vue").ExtractPropTypes<
          Readonly<
            import("vue").ComponentObjectPropsOptions<{
              [x: string]: unknown;
            }>
          >
        >
      >,
    | {
        [x: number]: string;
      }
    | {},
    {}
  >;
  export default _default;
}
declare module "EFX/xrEfPanel" {
  const _default: import("vue").DefineComponent<
    {
      showHeader: {
        type: BooleanConstructor;
        default: boolean;
      };
      flex: {
        type: NumberConstructor;
        default: number;
      };
      title: {
        type: StringConstructor;
        default: string;
      };
      height: {
        type: StringConstructor;
        default: string;
        require: boolean;
      };
      isSearchBox: {
        type: BooleanConstructor;
        default: boolean;
        require: boolean;
      };
      showAuthButton: {
        type: BooleanConstructor;
        default: boolean;
        require: boolean;
      };
      padding: {
        type: StringConstructor;
        default: string;
        require: boolean;
      };
      openHeaderShow: {
        type: BooleanConstructor;
        default: boolean;
        require: boolean;
      };
    },
    {
      openHeader: import("vue").Ref<boolean>;
      flexStyle: import("vue").Ref<string>;
      query: () => void;
      openHeaderChange: () => void;
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    ("queryClick" | "openHeaderChange")[],
    "queryClick" | "openHeaderChange",
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<{
        showHeader: {
          type: BooleanConstructor;
          default: boolean;
        };
        flex: {
          type: NumberConstructor;
          default: number;
        };
        title: {
          type: StringConstructor;
          default: string;
        };
        height: {
          type: StringConstructor;
          default: string;
          require: boolean;
        };
        isSearchBox: {
          type: BooleanConstructor;
          default: boolean;
          require: boolean;
        };
        showAuthButton: {
          type: BooleanConstructor;
          default: boolean;
          require: boolean;
        };
        padding: {
          type: StringConstructor;
          default: string;
          require: boolean;
        };
        openHeaderShow: {
          type: BooleanConstructor;
          default: boolean;
          require: boolean;
        };
      }>
    > & {
      onQueryClick?: ((...args: any[]) => any) | undefined;
      onOpenHeaderChange?: ((...args: any[]) => any) | undefined;
    },
    {
      title: string;
      height: string;
      padding: string;
      showHeader: boolean;
      flex: number;
      isSearchBox: boolean;
      showAuthButton: boolean;
      openHeaderShow: boolean;
    },
    {}
  >;
  export default _default;
}
declare module "EFX/xrEfSearchBox" {
  const _default: import("vue").DefineComponent<
    {
      title: {
        type: StringConstructor;
        default: string;
        require: boolean;
      };
      height: {
        type: StringConstructor;
        default: string;
        require: boolean;
      };
      showAuthButton: {
        type: BooleanConstructor;
        default: boolean;
        require: boolean;
      };
      padding: {
        type: StringConstructor;
        default: string;
        require: boolean;
      };
      openHeaderShow: {
        type: BooleanConstructor;
        default: boolean;
        require: boolean;
      };
    },
    {
      searchClick: (e: any) => void;
      openChange: (e: any) => void;
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    ("openHeaderChange" | "searchClick")[],
    "openHeaderChange" | "searchClick",
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<{
        title: {
          type: StringConstructor;
          default: string;
          require: boolean;
        };
        height: {
          type: StringConstructor;
          default: string;
          require: boolean;
        };
        showAuthButton: {
          type: BooleanConstructor;
          default: boolean;
          require: boolean;
        };
        padding: {
          type: StringConstructor;
          default: string;
          require: boolean;
        };
        openHeaderShow: {
          type: BooleanConstructor;
          default: boolean;
          require: boolean;
        };
      }>
    > & {
      onOpenHeaderChange?: ((...args: any[]) => any) | undefined;
      onSearchClick?: ((...args: any[]) => any) | undefined;
    },
    {
      title: string;
      height: string;
      padding: string;
      showAuthButton: boolean;
      openHeaderShow: boolean;
    },
    {}
  >;
  export default _default;
}
declare module "EFX/xrEfDialog" {
  const _default: import("vue").DefineComponent<
    {
      visible: {
        type: BooleanConstructor;
        required: true;
      };
      title: {
        type: StringConstructor;
        default: string;
      };
      width: {
        type: StringConstructor;
        default: string;
      };
      height: {
        type: StringConstructor;
        default: string;
      };
      modal: {
        type: BooleanConstructor;
        default: boolean;
      };
    },
    {
      dialogFrameRef: any;
      clickClose: () => void;
      modalZIndex: import("vue").Ref<number>;
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    ("clickCloseIcon" | "update:visible")[],
    "clickCloseIcon" | "update:visible",
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<{
        visible: {
          type: BooleanConstructor;
          required: true;
        };
        title: {
          type: StringConstructor;
          default: string;
        };
        width: {
          type: StringConstructor;
          default: string;
        };
        height: {
          type: StringConstructor;
          default: string;
        };
        modal: {
          type: BooleanConstructor;
          default: boolean;
        };
      }>
    > & {
      onClickCloseIcon?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    },
    {
      title: string;
      width: string;
      height: string;
      modal: boolean;
    },
    {}
  >;
  export default _default;
}
declare module "EFX/EFDialogForm" {
  import { EfDialogFormOptions } from "EFX/efx-model";
  /**
   * @description: 获取efDialogForm组件挂载dom
   * @param {string} formName
   * @param {{ [key: string]: any }} message
   * @param {EfDialogFormOptions} options
   * @return {*} efDialogForm组件
   */
  const getEfDialogFormDom: {
    (
      formName: string,
      message?:
        | {
            [key: string]: any;
          }
        | undefined,
      options?: EfDialogFormOptions
    ): import("vue").ComponentPublicInstance<
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      false,
      import("vue").ComponentOptionsBase<
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        {},
        {},
        string,
        {}
      >,
      {},
      {}
    >;
    open(
      formName: string,
      message?:
        | {
            [key: string]: any;
          }
        | undefined,
      options?: EfDialogFormOptions
    ): any;
  };
  export default getEfDialogFormDom;
  export class EFDialogFormMessage {
    static receive: (id: string, callback: Function) => void;
    static post: (
      id: string,
      message: {
        [key: string]: any;
      }
    ) => void;
  }
}

declare module "EFX/efx-model" {
  export type TTitleType = "both" | "field" | "desc";
  export interface IExportHeader {
    titleType: TTitleType;
  }
  export interface IExportConfig {
    fileName?: string;
    header?: IExportHeader;
  }
  export interface EfDialogFormOptions {
    modal?: boolean;
    width?: string | number;
    height?: string | number;
    title?: string;
  }
}
declare module "EFX/EFGridUtils" {
  import { IExportConfig } from "EFX/efx-model";
  export default class EFGridUtils {
    static exportGridAsExcel(gridRef: any, exportConfig: IExportConfig): void;
    static importExcelToGrid(gridRef: any): Promise<unknown>;
  }
}

declare module "EFX/EFUtility" {
  import { EI } from "@baosight/ei";
  export default class Utility {
    /**
     * 根据传入的代码编号获取值集信息
     * @param partName 分区名，传入''调用默认分区服务
     * @param codeClassNames 代码编号数组
     * @param boolean 是否判断细部资源权限
     */
    static getCodeClassValue(
      partName: string,
      codeClassNames: string[],
      auth?: boolean
    ): Promise<EI.EIInfo>;
    /**
     * 在指定的分区上执行动态查询
     * @param partName 分区名称
     * @param sqls SQL语句列表
     */
    static execQueryPart(partName: string, sqls: string[]): Promise<EI.EIInfo>;
    /**
     * 根据传入的时间戳、班次类获取对应班次、班组信息
     * @param time 时间戳，日期类型
     * @param shiftClass 班次类
     * @param partName 分区名，不传，则调用默认分区服务
     */
    static getShiftNoGroup(
      time: Date,
      shiftClass: string,
      partName?: string
    ): Promise<
      | {
          shift_no: import("@baosight/ei").ValueType;
          shift_group: import("@baosight/ei").ValueType;
        }
      | undefined
    >;
    /**
     * 根据传入的时间戳、班次类获取对应班次、班组、班次日期信息
     * @param time 时间戳，日期类型
     * @param shiftClass 班次类
     * @param partName 分区名，不传，则调用默认分区服务
     */
    static getShiftNoGroupDate(
      time: Date,
      shiftClass: string,
      partName?: string
    ): Promise<
      | {
          shift_no: import("@baosight/ei").ValueType;
          shift_group: import("@baosight/ei").ValueType;
          shift_day: import("@baosight/ei").ValueType;
        }
      | undefined
    >;
    /**
     * 计算打开每个画面所花费的时间
     */
    static calcLoadDuration(): void;
  }
}
declare module "EFX/EFCallForm" {
  /**
   * 打开画面，跨子应用画面只能在父应用上才能生效
   * @param formName 画面名
   * @param formParams 可选，url传参参数
   */
  const EFCallForm: (
    formName: string,
    formParams?: Record<string, any>
  ) => void;
  export default EFCallForm;
}

declare module "EFX/agPlugins" {
  import "@ag-grid-community/styles/ag-grid.min.css";
  import "@ag-grid-community/styles/ag-theme-balham.min.css";
  import { ModuleRegistry } from "@ag-grid-community/core";
  import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
  import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
  import { SideBarModule } from "@ag-grid-enterprise/side-bar";
  import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
  import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
  import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
  import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
  import { AdvancedFilterModule } from "@ag-grid-enterprise/advanced-filter";
  import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
  import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
  import { GridChartsModule } from "@ag-grid-enterprise/charts";
  import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
  import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
  import { SparklinesModule } from "@ag-grid-enterprise/sparklines";
  import { MenuModule } from "@ag-grid-enterprise/menu";
  import { CsvExportModule, CsvCreator } from "@ag-grid-community/csv-export";
  import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
  import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
  import { RichSelectModule } from "@ag-grid-enterprise/rich-select";
  import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
  import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
  export {
    CsvExportModule,
    CsvCreator,
    InfiniteRowModelModule,
    ClipboardModule,
    RichSelectModule,
    ServerSideRowModelModule,
    ViewportRowModelModule,
    ModuleRegistry,
    ExcelExportModule,
    StatusBarModule,
    SideBarModule,
    ClientSideRowModelModule,
    RowGroupingModule,
    SetFilterModule,
    FiltersToolPanelModule,
    AdvancedFilterModule,
    MultiFilterModule,
    ColumnsToolPanelModule,
    MenuModule,
    GridChartsModule,
    MasterDetailModule,
    RangeSelectionModule,
    SparklinesModule,
  };
}
declare module "EFX/AgGridVue" {
  import { AgGridVue } from "@ag-grid-community/vue3";
  export default AgGridVue;
}
declare module "EFX/ag-i18n-cn" {
  const AG_GRID_LOCALE_ZH: {
    selectAll: string;
    selectAllSearchResults: string;
    addCurrentSelectionToFilter: string;
    searchOoo: string;
    blanks: string;
    noMatches: string;
    filterOoo: string;
    equals: string;
    notEqual: string;
    blank: string;
    notBlank: string;
    empty: string;
    lessThan: string;
    greaterThan: string;
    lessThanOrEqual: string;
    greaterThanOrEqual: string;
    inRange: string;
    inRangeStart: string;
    inRangeEnd: string;
    contains: string;
    notContains: string;
    startsWith: string;
    endsWith: string;
    dateFormatOoo: string;
    andCondition: string;
    orCondition: string;
    applyFilter: string;
    resetFilter: string;
    clearFilter: string;
    cancelFilter: string;
    textFilter: string;
    numberFilter: string;
    dateFilter: string;
    setFilter: string;
    groupFilterSelect: string;
    advancedFilterContains: string;
    advancedFilterNotContains: string;
    advancedFilterTextEquals: string;
    advancedFilterTextNotEqual: string;
    advancedFilterStartsWith: string;
    advancedFilterEndsWith: string;
    advancedFilterBlank: string;
    advancedFilterNotBlank: string;
    advancedFilterEquals: string;
    advancedFilterNotEqual: string;
    advancedFilterGreaterThan: string;
    advancedFilterGreaterThanOrEqual: string;
    advancedFilterLessThan: string;
    advancedFilterLessThanOrEqual: string;
    advancedFilterTrue: string;
    advancedFilterFalse: string;
    advancedFilterAnd: string;
    advancedFilterOr: string;
    advancedFilterApply: string;
    advancedFilterBuilder: string;
    advancedFilterValidationMissingColumn: string;
    advancedFilterValidationMissingOption: string;
    advancedFilterValidationMissingValue: string;
    advancedFilterValidationInvalidColumn: string;
    advancedFilterValidationInvalidOption: string;
    advancedFilterValidationMissingQuote: string;
    advancedFilterValidationNotANumber: string;
    advancedFilterValidationInvalidDate: string;
    advancedFilterValidationMissingCondition: string;
    advancedFilterValidationJoinOperatorMismatch: string;
    advancedFilterValidationInvalidJoinOperator: string;
    advancedFilterValidationMissingEndBracket: string;
    advancedFilterValidationExtraEndBracket: string;
    advancedFilterValidationMessage: string;
    advancedFilterValidationMessageAtEnd: string;
    advancedFilterBuilderTitle: string;
    advancedFilterBuilderApply: string;
    advancedFilterBuilderCancel: string;
    advancedFilterBuilderAddButtonTooltip: string;
    advancedFilterBuilderRemoveButtonTooltip: string;
    advancedFilterBuilderMoveUpButtonTooltip: string;
    advancedFilterBuilderMoveDownButtonTooltip: string;
    advancedFilterBuilderAddJoin: string;
    advancedFilterBuilderAddCondition: string;
    advancedFilterBuilderSelectColumn: string;
    advancedFilterBuilderSelectOption: string;
    advancedFilterBuilderEnterValue: string;
    advancedFilterBuilderValidationAlreadyApplied: string;
    advancedFilterBuilderValidationIncomplete: string;
    advancedFilterBuilderValidationSelectColumn: string;
    advancedFilterBuilderValidationSelectOption: string;
    advancedFilterBuilderValidationEnterValue: string;
    columns: string;
    filters: string;
    pivotMode: string;
    groups: string;
    rowGroupColumnsEmptyMessage: string;
    values: string;
    valueColumnsEmptyMessage: string;
    pivots: string;
    pivotColumnsEmptyMessage: string;
    group: string;
    rowDragRow: string;
    rowDragRows: string;
    loadingOoo: string;
    loadingError: string;
    noRowsToShow: string;
    enabled: string;
    pinColumn: string;
    pinLeft: string;
    pinRight: string;
    noPin: string;
    valueAggregation: string;
    noAggregation: string;
    autosizeThiscolumn: string;
    autosizeAllColumns: string;
    groupBy: string;
    ungroupBy: string;
    ungroupAll: string;
    addToValues: string;
    removeFromValues: string;
    addToLabels: string;
    removeFromLabels: string;
    resetColumns: string;
    expandAll: string;
    collapseAll: string;
    copy: string;
    ctrlC: string;
    ctrlX: string;
    copyWithHeaders: string;
    copyWithGroupHeaders: string;
    cut: string;
    paste: string;
    ctrlV: string;
    export: string;
    csvExport: string;
    excelExport: string;
    sum: string;
    first: string;
    last: string;
    min: string;
    max: string;
    none: string;
    count: string;
    avg: string;
    filteredRows: string;
    selectedRows: string;
    totalRows: string;
    totalAndFilteredRows: string;
    more: string;
    to: string;
    of: string;
    page: string;
    pageLastRowUnknown: string;
    nextPage: string;
    lastPage: string;
    firstPage: string;
    previousPage: string;
    pivotColumnGroupTotals: string;
    pivotChartAndPivotMode: string;
    pivotChart: string;
    chartRange: string;
    columnChart: string;
    groupedColumn: string;
    stackedColumn: string;
    normalizedColumn: string;
    barChart: string;
    groupedBar: string;
    stackedBar: string;
    normalizedBar: string;
    pieChart: string;
    pie: string;
    doughnut: string;
    line: string;
    xyChart: string;
    scatter: string;
    bubble: string;
    areaChart: string;
    area: string;
    stackedArea: string;
    normalizedArea: string;
    histogramChart: string;
    histogramFrequency: string;
    combinationChart: string;
    columnLineCombo: string;
    AreaColumnCombo: string;
    pivotChartTitle: string;
    rangeChartTitle: string;
    settings: string;
    data: string;
    format: string;
    categories: string;
    defaultCategory: string;
    series: string;
    xyValues: string;
    paired: string;
    axis: string;
    navigator: string;
    color: string;
    thickness: string;
    xType: string;
    automatic: string;
    category: string;
    number: string;
    time: string;
    autoRotate: string;
    xRotation: string;
    yRotation: string;
    ticks: string;
    width: string;
    height: string;
    length: string;
    padding: string;
    spacing: string;
    chart: string;
    title: string;
    titlePlaceholder: string;
    background: string;
    font: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
    labels: string;
    size: string;
    minSize: string;
    maxSize: string;
    legend: string;
    position: string;
    markerSize: string;
    markerStroke: string;
    markerPadding: string;
    itemSpacing: string;
    itemPaddingX: string;
    itemPaddingY: string;
    layoutHorizontalSpacing: string;
    layoutVerticalSpacing: string;
    strokeWidth: string;
    lineDash: string;
    offset: string;
    offsets: string;
    tooltips: string;
    callout: string;
    markers: string;
    shadow: string;
    blur: string;
    xOffset: string;
    yOffset: string;
    lineWidth: string;
    normal: string;
    bold: string;
    italic: string;
    boldItalic: string;
    predefined: string;
    fillOpacity: string;
    strokeOpacity: string;
    histogramBinCount: string;
    columnGroup: string;
    barGroup: string;
    pieGroup: string;
    lineGroup: string;
    scatterGroup: string;
    areaGroup: string;
    histogramGroup: string;
    combinationGroup: string;
    groupedColumnTooltip: string;
    stackedColumnTooltip: string;
    normalizedColumnTooltip: string;
    groupedBarTooltip: string;
    stackedBarTooltip: string;
    normalizedBarTooltip: string;
    pieTooltip: string;
    doughnutTooltip: string;
    lineTooltip: string;
    groupedAreaTooltip: string;
    stackedAreaTooltip: string;
    normalizedAreaTooltip: string;
    scatterTooltip: string;
    bubbleTooltip: string;
    histogramTooltip: string;
    columnLineComboTooltip: string;
    areaColumnComboTooltip: string;
    customComboTooltip: string;
    noDataToChart: string;
    pivotChartRequiresPivotMode: string;
    chartSettingsToolbarTooltip: string;
    chartLinkToolbarTooltip: string;
    chartUnlinkToolbarTooltip: string;
    chartDownloadToolbarTooltip: string;
    seriesChartType: string;
    seriesType: string;
    secondaryAxis: string;
    ariaAdvancedFilterBuilderItem: string;
    ariaAdvancedFilterBuilderItemValidation: string;
    ariaAdvancedFilterBuilderList: string;
    ariaAdvancedFilterBuilderFilterItem: string;
    ariaAdvancedFilterBuilderGroupItem: string;
    ariaAdvancedFilterBuilderColumn: string;
    ariaAdvancedFilterBuilderOption: string;
    ariaAdvancedFilterBuilderValueP: string;
    ariaAdvancedFilterBuilderJoinOperator: string;
    ariaAdvancedFilterInput: string;
    ariaChecked: string;
    ariaColumn: string;
    ariaColumnGroup: string;
    ariaColumnList: string;
    ariaColumnSelectAll: string;
    ariaDateFilterInput: string;
    ariaDefaultListName: string;
    ariaFilterColumnsInput: string;
    ariaFilterFromValue: string;
    ariaFilterInput: string;
    ariaFilterList: string;
    ariaFilterToValue: string;
    ariaFilterValue: string;
    ariaFilterMenuOpen: string;
    ariaFilteringOperator: string;
    ariaHidden: string;
    ariaIndeterminate: string;
    ariaInputEditor: string;
    ariaMenuColumn: string;
    ariaRowDeselect: string;
    ariaRowSelectAll: string;
    ariaRowToggleSelection: string;
    ariaRowSelect: string;
    ariaSearch: string;
    ariaSortableColumn: string;
    ariaToggleVisibility: string;
    ariaToggleCellValue: string;
    ariaUnchecked: string;
    ariaVisible: string;
    ariaSearchFilterValues: string;
    ariaRowGroupDropZonePanelLabel: string;
    ariaValuesDropZonePanelLabel: string;
    ariaPivotDropZonePanelLabel: string;
    ariaDropZoneColumnComponentDescription: string;
    ariaDropZoneColumnValueItemDescription: string;
    ariaDropZoneColumnGroupItemDescription: string;
    ariaDropZoneColumnComponentAggFuncSeparator: string;
    ariaDropZoneColumnComponentSortAscending: string;
    ariaDropZoneColumnComponentSortDescending: string;
    ariaLabelColumnMenu: string;
    ariaLabelCellEditor: string;
    ariaLabelDialog: string;
    ariaLabelSelectField: string;
    ariaLabelRichSelectField: string;
    ariaLabelTooltip: string;
    ariaLabelContextMenu: string;
    ariaLabelSubMenu: string;
    ariaLabelAggregationFunction: string;
    ariaLabelAdvancedFilterAutocomplete: string;
    ariaLabelAdvancedFilterBuilderAddField: string;
    ariaLabelAdvancedFilterBuilderColumnSelectField: string;
    ariaLabelAdvancedFilterBuilderOptionSelectField: string;
    ariaLabelAdvancedFilterBuilderJoinSelectField: string;
    thousandSeparator: string;
    decimalSeparator: string;
    true: string;
    false: string;
    invalidDate: string;
    invalidNumber: string;
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  export default AG_GRID_LOCALE_ZH;
}
declare module "EFX/theme" {
  export const getTheme: () => "default" | "ghostShark";
  /**
   * 换取antd主题配置
   * @returns
   */
  export const getAntdTheme: () =>
    | {
        token: {
          fontSize: number;
          sizeStep: number;
          borderRadius: number;
          wireframe: boolean;
          colorPrimary: string;
        };
        components: {
          Tabs: {
            colorFillAlter: string;
            colorBgContainer: string;
            colorPrimary: string;
            colorText: string;
            colorSplit: string;
            colorBorder: string;
            colorPrimaryBorder: string;
            lineHeight: number;
          };
        };
      }
    | {
        token: {
          fontSize: number;
          sizeStep: number;
          borderRadius: number;
          wireframe: boolean;
          colorPrimary: string;
          colorPrimaryBorder: string;
          colorPrimaryBorderHover: string;
          colorPrimaryText: string;
        };
        components: {
          Button: {
            colorBgContainer: string;
            colorBorder: string;
            colorText: string;
          };
          Form: {
            colorPrimary: string;
            colorTextHeading: string;
            colorTextDescription: string;
            colorText: string;
            colorBorder: string;
            controlOutline: string;
            colorError: string;
          };
          Input: {
            colorBgContainer: string;
            colorBorder: string;
            colorIconHover: string;
            colorPrimaryActive: string;
            colorBgContainerDisabled: string;
            colorText: string;
          };
          Checkbox: {
            colorBgContainer: string;
            colorBorder: string;
          };
          InputNumber: {
            colorBgContainer: string;
            colorBorder: string;
            colorIconHover: string;
            colorPrimaryActive: string;
            colorBgContainerDisabled: string;
            colorText: string;
          };
          Radio: {
            colorBgContainer: string;
            colorBgContainerDisabled: string;
          };
          Switch: {
            colorPrimary: string;
            colorBgContainer: string;
          };
          TreeSelect: {
            colorBgContainer: string;
          };
          Tabs: {
            colorPrimaryActive: string;
            colorBgContainer: string;
            colorPrimary: string;
            colorFillAlter: string;
            colorSplit: string;
            colorText: string;
          };
          Select: {
            colorBgContainer: string;
            colorBgContainerDisabled: string;
            colorBgElevated: string;
            controlItemBgActive: string;
            colorBorder: string;
            colorText: string;
          };
          DatePicker: {
            colorBgContainer: string;
            colorBgContainerDisabled: string;
            colorBorder: string;
            colorText: string;
            colorBgElevated: string;
          };
          Calendar: {
            colorBgContainer: string;
          };
        };
      };
  /**
   * 换肤
   * @param theme 主题
   * @param reload 是否强制换肤
   */
  export const changeTheme: (theme?: string, reload?: boolean) => void;
}
declare module "EFX/xrEfSelect" {
  const _default: import("vue").DefineComponent<
    {
      modelValue: {
        type: (ArrayConstructor | StringConstructor)[];
      };
      options: {
        type: ObjectConstructor;
        default: () => void;
      };
      columns: ArrayConstructor;
      data: ArrayConstructor;
    },
    {},
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {
      change: (...args: any[]) => void;
      "update:modelValue": (...args: any[]) => void;
    },
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<{
        modelValue: {
          type: (ArrayConstructor | StringConstructor)[];
        };
        options: {
          type: ObjectConstructor;
          default: () => void;
        };
        columns: ArrayConstructor;
        data: ArrayConstructor;
      }>
    > & {
      onChange?: ((...args: any[]) => any) | undefined;
      "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    },
    {
      options: Record<string, any>;
    },
    {}
  >;
  export default _default;
}
declare module "EFX/agMultiDropDownEditor" {
  const _default: import("vue").DefineComponent<
    Readonly<{
      params?: any;
    }>,
    {
      rowWasClicked: (e: any) => void;
      rowMultiSelect: import("vue").Ref<boolean>;
      inputValue: import("vue").Ref<any[]>;
      FatherGridApi: any;
      getValue: () => string;
      cellWasClicked: (e: any) => void;
      defaultColDef: any;
      columnDefs: any;
      rowData: any;
      onGridReady: (params: any) => void;
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<
        Readonly<{
          params?: any;
        }>
      >
    >,
    {
      readonly params?: any;
    },
    {}
  >;
  export default _default;
}

declare module "EFX/agDateEditor" {
  const _default: import("vue").DefineComponent<
    Readonly<{
      params?: any;
    }>,
    {
      localDateTime: any;
      getValue: () => any;
      onChange: () => void;
      onOk: (e: any) => void;
    },
    unknown,
    {},
    {},
    import("vue").ComponentOptionsMixin,
    import("vue").ComponentOptionsMixin,
    {},
    string,
    import("vue").VNodeProps &
      import("vue").AllowedComponentProps &
      import("vue").ComponentCustomProps,
    Readonly<
      import("vue").ExtractPropTypes<
        Readonly<{
          params?: any;
        }>
      >
    >,
    {
      readonly params?: any;
    },
    {}
  >;
  export default _default;
}

declare module "EFX/eBFR" {
  const eBFR: {
    ExportReportFile: (reportInfodata: { [key: string]: any }) => Promise<any>;
    OpenReportFile: (reportInfodata: { [key: string]: any }) => Promise<void>;
    ReportPrintInfo: (reportInfodata: { [key: string]: any }) => Promise<void>;
    GetReportViewInfoAnsy: (
      RENAME: string,
      PARAM: string,
      FILENAME: string,
      CERTIPRINTNO: string,
      UploadFileAddress: string
    ) => Promise<void>;
    GetReportViewInfoAnsyInfo: (reportInfodata: {
      [key: string]: any;
    }) => Promise<void>;
    SilentPrintingAnsy: (
      RENAME: string,
      PARAM: string,
      PRINTNAME: string,
      CONMPUTER_IP: string,
      PRINT_COUNT: Number
    ) => Promise<void>;
    SilentPrinting: (
      RENAME: string,
      PARAM: string,
      PRINTNAME: string,
      PRINT_COUNT: Number
    ) => Promise<void>;
    CallReportPDFFrom: (RENAME: string, PARAM: string) => Promise<void>;
    CallReportPDFFromMap: (
      RENAME: string,
      PARAM: Map<any, any>
    ) => Promise<void>;
    CallReportXLSXFrom: (RENAME: string, PARAM: string) => Promise<void>;
    CallReportXLSXFromReadOnly: (
      RENAME: string,
      PARAM: string,
      READONLY: string
    ) => Promise<void>;
    CallReportPDF: (RENAME: string, PARAM: string) => Promise<void>;
    CallReportXLSX: (RENAME: string, PARAM: string) => Promise<void>;
  };
  export default eBFR;
}
