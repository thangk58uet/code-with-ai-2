export const StringDateTimeFomat = "dd/MM/yyyy HH:mm:ss";
export const StringDateTimeFomat_ddMMyyyyHHmm = "dd/MM/yyyy HH:mm";
export const StringDateTimeFormatUnderline = "dd-MM-yyyy HH:mm:ss";
export const StringDateFomat = "dd/MM/yyyy";
export const DDMMYYYYHHMMSS = "ddMMyyyyHHmmss";
export const YYYYMMDDTHHMMSS = "yyyy-MM-dd'T'HH:mm:ss";
export const YYYYMMDD = "yyyyMMdd";
export const YYMMDD = "yyMMdd";
export const DMYY = "dMyy";
export const YYYY_MM_DD = "yyyy-MM-dd";
export const StringDateFomatEEEMMMDD = "EEE MMM dd HH:mm:ss ZZZ yyyy";
export const StringDateFomatTime = "yyyy-MM-dd HH:mm:ss";
export const yyyy_MM_DD = 'yyyy-MM-DD'
export const DD_MM_YYYY = 'DD/MM/YYYY'
export const ACTION_LC_INFO = "SEE";
export const EXTENSION = ".doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png,.msg";
export const yyyyMMddTHHmmssSSS = "yyyy-MM-dd'T'HH:mm:ss.SSS"
export const PROCESS_ID = {
    LCXK_ADVICE: '1',
    LCXK_AMEND: '2',
    LCXK_PRESENT_DOC: '3',
    LCXK_MESSAGE: '4',
    LCXK_EVALUATE: '5',
    LCXK_ADD_DOC: '6',
    LCXK_TRACING: '7',
    LCXK_CONSULT: '8',
    LCXK_ADVICE_CHARGE: '9',
};

export const CHARGE_SOURCE = {
    CN: '1',
    HO: '2'
};

export const CHARGE_SOURCE_BCT = {
    HO_THU_PHI_KHI_BAO_CO: '2',
    HO_THU_PHI_NGAY: '3'
};

export const ACTION_CHECK_CHANGE = {
    CHECK: '1',
    SAVE: '0',
    SEE: '2',
};

export const CHECK_CHANGE_TYPE = {
    ADVICE_TF: 'ADVICE_TF',
    ADVICE_FM: 'ADVICE_FM',
    AMEND_TF: 'AMEND_TF',
    AMEND_FM: 'AMEND_FM',
    PRESENT_DR: 'PRESENT_DR',
    PRESENT_FM: 'PRESENT_FM',
    SCAN_AML: 'SCAN_AML',
    SCAN_FM_FCRM: 'SCAN_FM_FCRM',
    MESSAGE_FM: 'MESSAGE_FM',
    MESSAGE_DR: 'MESSAGE_DR',
    EVALUATE_FM: 'EVALUATE_FM',
    TRACING_FM: 'TRACING_FM',
    CONSULT_FM: 'CONSULT_FM',
    CONSULT_EXPORT: 'CONSULT_EXPORT',
    TRACING_FT: 'TRACING_FT',
};

export const ACCOUNT_TYPE = '1001';
export const FILE_CONSULT = '';
export const ACCT_TYPE = '11';
export const REGEX_NUMBER = /[^0-9]/g;
export const CHARGE_TYPE = 'CHARGE_TYPE';
export const FROM_SYSTEM = 'BPM';
export const R_OBJECT__TYPE = 'mb_lcxk_doc';
export const SOURCE_ID = '1';
export const REGEX_INPUT_T24 = /[!@#$&?\\\\|~`><_;]/g;
export const FILE_EXTENSION = '&transient_delimiter=%3A%3A&transient=Content-Disposition%3A%3A%3B+filename%3D';
export const TASK_TYPE_ID = {
    ADVISE_UPLOAD: '1DD71D2E-8A0F-48C6-B516-6396F6B7660B',
    ADVISE_EXECUTE: '174E0AC5-F5B1-402A-80E4-5C654102C21D',
    ADVISE_APPROVAL: '63E0860B-C06D-47FF-95A9-D3DBE9DEBDDB',
    ADVISE_RECEIVE: '4E052E3A-0132-4533-ADC7-E51764F72F4D',

    AMEND_UPLOAD:"03172030-710E-434E-BA34-B7BE0DC14B03",
    AMEND_EXECUTE:"5D9A6A17-836D-46F8-B32C-103F7D48FE3D",
    AMEND_APPROVAL:"C6D84173-97CB-486D-BDF5-417D87CCEF82",
    AMEND_RECEIVE:"D5B105A9-AD15-4403-A79C-DAA826755444",

    PRESENT_UPLOAD:"EF40E056-864E-4B04-9BC0-6A57B3E41BC5",
    PRESENT_EXECUTE:"098E653C-07B5-4CEF-B5D3-D1618342F093",
    PRESENT_CONFIRM:"948DC4C0-6629-4057-A951-69D1459F4783",
    PRESENT_APPROVAL:"5A96F4A0-40CE-4843-B21F-9B0446F2B528",
    PRESENT_BRANCH_RECEIVE:"A49ADE61-B2EF-485D-8300-940F3D855AC0",
    PRESENT_HO_RECEIVE:"AC3D7CA6-DD14-4766-86C4-48AD34ADAFF0",

    MESSAGE_EXECUTE:"EA77F1D9-6435-45AA-ACD6-F9E1B226E4D0",
    MESSAGE_APPROVAL:"0E064674-32B1-44B2-8134-2985DDCFB3BA",
    MESSAGE_BRANCH_RECEIVE:"56C4E068-179E-4D97-B42C-D5239D9F5497",
    MESSAGE_HO_RECEIVE:"C6C51D9B-9481-46B1-ABD1-BB76790F6434",

    EVALUATE_UPLOAD: '6EC80667-8191-4B54-AFA0-198C2A36C99C',
    EVALUATE_EXECUTE: '1B7ABD03-52E4-443C-86E5-C1B499EB1030',
    EVALUATE_APPROVAL: '4FB4A308-E3BF-40DF-94B9-8C0A4C167077',
    EVALUATE_BRANCH_RECEIVE: 'B84BBEF8-6AED-4819-93C0-0E994066C501',
    EVALUATE_HO_RECEIVE: '4257C1FF-770C-4A38-8F38-19A683519A3E',
    EVALUATE_APPROVAL_RECEIVE: '90B69E29-E7E9-414F-AA3C-FD18D545B9EE',
    ADD_DOC_UPLOAD: '163BD190-15BB-45A9-BE1F-8CDC438768AB',
    ADD_DOC_APPROVAL: '1AC5D9CB-C882-4149-BBD4-DBC1B176DE84',

    TRACING_EXECUTE: '8F4A1482-722A-4FC4-B825-1EFA21DB0DF4',
    TRACING_APPROVAL: 'A34C6F2C-847A-4C84-9E52-BACDF357C83F',
    TRACING_BRANCH_RECEIVE: '94369E8A-F530-4A7C-98A3-B51CCFD0F32D',
    TRACING_HO_RECEIVE: '14EF9C3E-CBC9-451B-8818-B883755978FB',
    TRACING_APPROVAL_RECEIVE: 'A894E64E-5A95-4888-B345-E31BC22434B7',

    CONSULT_UPLOAD: 'DE525AEA-DF2E-11ED-B5EA-0242AC120002',
    CONSULT_EXECUTE: 'DE525D92-DF2E-11ED-B5EA-0242AC120002',
    CONSULT_APPROVAL: 'DE525ED2-DF2E-11ED-B5EA-0242AC120002',
    CONSULT_BRANCH_RECEIVE: 'DE52601C-DF2E-11ED-B5EA-0242AC120002',
    CONSULT_PENDING: 'C51892C0-01FC-40F3-B63B-DBB2CF1621B5',

    ADVICE_CHARGE_UPLOAD: 'D226CDE2-1EF2-11EE-BE56-0242AC120002',
    ADVICE_CHARGE_EXECUTE: '1377ADC8-1EFF-11EE-BE56-0242AC120002',
    ADVICE_CHARGE_APPROVAL: '8BD2A5E2-1EFB-11EE-BE56-0242AC120002',

};
export const STATUS_ID = {
    ADVISE_UPLOAD: '1',
    ADVISE_EXECUTE: '2',
    ADVISE_APPROVAL: '3',
    ADVISE_RECEIVE: '4',

    AMEND_UPLOAD:"5",
    AMEND_EXECUTE:"6",
    AMEND_APPROVAL:"7",
    AMEND_RECEIVE:"8",

    PRESENT_UPLOAD:"9",
    PRESENT_EXECUTE:"10",
    PRESENT_CONFIRM:"11",
    PRESENT_APPROVAL:"12",
    PRESENT_BRANCH_RECEIVE:"13",
    PRESENT_HO_RECEIVE:"14",

    MESSAGE_EXECUTE: '15',
    MESSAGE_APPROVAL: '16',
    MESSAGE_BRANCH_RECEIVE: '17',
    MESSAGE_HO_RECEIVE: '18',

    EVALUATE_UPLOAD: '19',
    EVALUATE_EXECUTE: '20',
    EVALUATE_APPROVAL: '21',
    EVALUATE_BRANCH_RECEIVE: '22',
    EVALUATE_HO_RECEIVE: '23',
    EVALUATE_APPROVAL_RECEIVE: '24',

    ADD_DOC_UPLOAD: '25',
    ADD_DOC_APPROVAL: '26',

    TRACING_EXECUTE: '27',
    TRACING_APPROVAL: '28',
    TRACING_BRANCH_RECEIVE: '29',
    TRACING_HO_RECEIVE: '30',
    TRACING_APPROVAL_RECEIVE: '31',

    CONSULT_UPLOAD: '32',
    CONSULT_EXECUTE: '33',
    CONSULT_APPROVAL: '34',
    CONSULT_BRANCH_RECEIVE: '35',

    ADVICE_CHARGE_UPLOAD: '37',
    ADVICE_CHARGE_EXECUTE: '38',
    ADVICE_CHARGE_APPROVAL: '39',
};
// export const AML_LABEL = {
//     CONTRACT_PARTNER: 'Đối tác ký kết hợp đồng',
//     GOODS_ORIGIN: 'Xuất xứ hàng hóa',
//     OTHER_INFO: 'Thông tin khác',
//     FOREIGN_TRANSPORT: 'Hãng vận tải / Đại lý vận tải nước ngoài',
//     SHIP_NAME: 'Tên tàu',
//     FOREIGN_PORT: 'Cảng nước ngoài',
// };

export const STATUS_FCRM = [
    { key: 'CLEAN', value: 'CLEAN - ${bpmId} - Giao dịch không có HIT' },
    { key: 'HOLD', value: 'HOLD - ${bpmId} - Giao dịch có HIT, cần vào hệ thống OFSAA đánh giá' },
    { key: 'ALLOW', value: 'CLEAN - ${bpmId} - Cảnh báo giả hoặc cảnh báo thật nhưng theo chính sách MB thì được thực hiện trên phương diện cấm vận' },
    { key: 'BLOCKED', value: 'BLOCKED - ${bpmId} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'BLOCK', value: 'BLOCK - ${bpmId} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'ERROR', value: 'ERROR - ${bpmId} - Giao dịch bị quét lỗi, đề nghị thực hiện lại giao dịch' },
    { key: 'HOLDCVHO', value: 'HOLD - ${bpmId} - Giao dịch có HIT, cần vào hệ thống OSFAA đánh giá. Vui lòng truy cập ${link} để thực hiện điều tra' },
    { key: 'HOLDKSV', value: 'HOLD - ${bpmId} - Giao dịch có HIT, đang chờ đánh giá. Vui lòng truy cập ${link}' },
    { key: 'PENDING', value: 'PENDING - ${bpmId} - Giao dịch đang chờ xử lí' },
    { key: 'CONFLICT', value: 'CONFLICT - ${bpmId} - Giao dịch đang chờ xử lí' },
]

export const STATUS_CONSULT_FCRM = [
    { key: 'CLEAN', value: 'CLEAN - ${bpmId} - Giao dịch không có HIT' },
    { key: 'HOLD', value: 'HOLD - ${bpmId} - Giao dịch có HIT, cần vào hệ thống OFSAA đánh giá' },
    { key: 'ALLOW', value: 'CLEAN - ${bpmId} - Cảnh báo giả hoặc cảnh báo thật nhưng theo chính sách MB thì được thực hiện trên phương diện cấm vận' },
    { key: 'BLOCKED', value: 'BLOCKED - ${bpmId} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'BLOCK', value: 'BLOCK - ${bpmId} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'ERROR', value: 'ERROR - ${bpmId} - Giao dịch bị quét lỗi, đề nghị thực hiện lại giao dịch' },
    { key: 'HOLDCVHO', value: 'HOLD - ${bpmId} - Giao dịch có HIT, đang chờ đánh giá.' },
    { key: 'HOLDKSV', value: 'HOLD - ${bpmId} - Giao dịch có HIT, đang chờ đánh giá' },
    { key: 'PENDING', value: 'PENDING - ${bpmId} - Giao dịch đang chờ xử lí' },
    { key: 'CONFLICT', value: 'CONFLICT - ${bpmId} - Giao dịch đang chờ xử lí' },
]

export const STATUS_FM_CONSULT_FCRM = [
    { key: 'CLEAN', value: 'CLEAN - ${fmNumber} - Giao dịch không có HIT' },
    { key: 'HOLD', value: 'HOLD - ${fmNumber} - Giao dịch có HIT, cần vào hệ thống OFSAA đánh giá' },
    { key: 'ALLOW', value: 'CLEAN - ${fmNumber} - Cảnh báo giả hoặc cảnh báo thật nhưng theo chính sách MB thì được thực hiện trên phương diện cấm vận' },
    { key: 'BLOCKED', value: 'BLOCKED - ${fmNumber} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'BLOCK', value: 'BLOCK - ${fmNumber} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'ERROR', value: 'ERROR - ${fmNumber} - Giao dịch bị quét lỗi, đề nghị thực hiện lại giao dịch' },
    { key: 'HOLDCVHO', value: 'HOLD - ${fmNumber} - Giao dịch có HIT, đang chờ đánh giá' },
    { key: 'HOLDKSV', value: 'HOLD - ${fmNumber} - Giao dịch có HIT, đang chờ đánh giá' },
    { key: 'PENDING', value: 'PENDING - ${fmNumber} - Giao dịch đang chờ xử lí' },
]

export const STATUS_FM_FCRM = [
    { key: 'CLEAN', value: 'CLEAN - ${fmNumber} - Giao dịch không có HIT' },
    { key: 'HOLD', value: 'HOLD - ${fmNumber} - Giao dịch có HIT, cần vào hệ thống OFSAA đánh giá' },
    { key: 'ALLOW', value: 'CLEAN - ${fmNumber} - Cảnh báo giả hoặc cảnh báo thật nhưng theo chính sách MB thì được thực hiện trên phương diện cấm vận' },
    { key: 'BLOCKED', value: 'BLOCKED - ${fmNumber} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'BLOCK', value: 'BLOCK - ${fmNumber} - Giao dịch được đánh giá là TRUE HIT - không được thực hiện' },
    { key: 'ERROR', value: 'ERROR - ${fmNumber} - Giao dịch bị quét lỗi, đề nghị thực hiện lại giao dịch' },
    { key: 'HOLDCVHO', value: 'HOLD - ${fmNumber} - Giao dịch có HIT, cần vào hệ thống OSFAA đánh giá. Vui lòng truy cập ${link} để thực hiện điều tra' },
    { key: 'HOLDKSV', value: 'HOLD - ${fmNumber} - Giao dịch có HIT, đang chờ đánh giá. Vui lòng truy cập ${link}' },
    { key: 'PENDING', value: 'PENDING - ${fmNumber} - Giao dịch đang chờ xử lí' },
]

export const FILE_ADVICE = [
    {value: 'TB_001',text: 'Thông báo LCXK tới NHL'},
    {value: 'TB_002',text: 'Thông báo LC chuyển nhượng tới NHL thứ 2'},
    {value: 'TB_003',text: 'Bìa hồ sơ'},
    {value: 'TB_005',text: 'Thông báo chuyển tiếp LCXK'},
]
export const FILE_AMEND_AMEND = [
    {value: 'SH_002',text: 'Thông báo sửa đổi LCXK tới NHL'},
    {value: 'SH_003',text: 'Thông báo sửa đổi LCXK chuyển nhượng'},
    {value: 'SH_007',text: 'Thông báo chuyển tiếp LCXK'},
]
export const FILE_AMEND_CANCEL = [
    {value: 'SH_001',text: 'Thông báo hủy LCXK'},
]
export const FILE_AMEND_CORRECTION = [
    {value: 'SH_004',text: 'Thông báo hiệu chỉnh LCXK'},
]
export const FILE_AMEND_SUGGEST = [
    {value: 'SH_006',text: 'Ý kiến đánh giá sửa đổi LCXK'},
]

export const FILE_PRESENT =[
    {value: 'BCT_004',text: 'Thông báo kiểm tra BCT'},
    {value: 'BCT_002',text: 'Cover'},
    {value: 'BCT_003',text: 'Cover hoàn trả'},
    {value: 'BCT_005',text: 'Ý kiến thương lượng thanh toán BCT LCXK'},
    {value: 'BCT_006',text: 'Cover xuất khẩu bổ sung'},

]

export const FILE_MESSAGE =[
  {key: '1', value: 'MESS_001',text: 'Thông báo chấp nhận thanh toán'},
  {key: '2', value: 'MESS_002',text: 'Thông báo từ chối thanh toán'},
  {key: '3', value: 'MESS_003',text: 'Thông báo điện của NHNN không chọn TFXX'},
  {key: '4', value: 'MESS_004',text: 'Thông báo điện của NHNN có chọn TFXX'}
]

export const FILE_MESSAGE_GUARANTEE =[
  {key: '5', value: 'GUAR_001',text: 'Bìa bảo lãnh'},
  {key: '6', value: 'GUAR_002',text: 'Thông báo bảo lãnh'},
  {key: '7', value: 'GUAR_003',text: 'Thông báo sửa bảo lãnh'},
  {key: '8', value: 'GUAR_004',text: 'Thông báo hủy bảo lãnh'},
  {key: '9', value: 'GUAR_005',text: 'Thông báo giải tỏa trách nhiệm'}
]

export const FILE_EVALUATEE =[
    {value: 'EVAL_001',text: 'Thông báo đánh giá LCXK'},
]


export const FILE_TRACING =[
    {value: 'TRA_001',text: 'Thông báo tra soát BCT LCXK'},
]

export const FILE_EXECUTE_CONSULT_BCT =[
    {value: 'TVBCT_001',text: 'Thông báo kiểm tra BCT LCXK'},
    {value: 'TVBCT_002',text: 'Đề nghị gửi BCT LCXK'},
    {value: 'TVBCT_003',text: 'Đề nghị thực hiện giao dịch'},
    {value: 'TVBCT_004',text: 'Bill of exchange - template 1'},
    {value: 'TVBCT_005',text: 'Bill of exchange - template 2'},
    {value: 'TVBCT_006',text: 'Invoice '},
    {value: 'TVBCT_007',text: 'Packing List'},
    {value: 'TVBCT_008',text: 'Beneficiary Cert'},
    {value: 'TVBCT_009',text: 'Cert Quality And Quantity'}
]

export const FILE_EXECUTE_CONSULT_BCT_CVHT =[
    {value: 'TVBCT_001',text: 'Thông báo kiểm tra BCT LCXK'},
    {value: 'TVBCT_002',text: 'Đề nghị gửi BCT LCXK'},
]

export const FILE_EXECUTE_CONSULT_LC =[
    {value: 'TVLC_001',text: 'Thông báo tư vấn LCXK'}
]
// export const FILE_PRESENT_COVER = [

// ]
// export const FILE_PRESENT_Y_KIEN_CHIET_KHAU = [

// ]

export const CONTENT_TYPE_ARR = [
    { value: 'pdf', text: 'PDF' },
    { value: 'docx', text: 'DOCX' },
];
export const ACTION_FILE = [
    { value: '0'}, // Xuất file bằng tay
    { value: '1'} // Xuất ngầm
]

export const TASK_TYPE_NAME = {
    // Sửa hủy
    AMEND_UPLOAD: "LCXK_AMEND_UPLOAD",
    AMEND_EXECUTE: "LCXK_AMEND_EXECUTE",
    AMEND_APPROVAL: "LCXK_AMEND_APPROVAL",
    AMEND_RECEIVE: "LCXK_AMEND_RECEIVE",

    // Thông báo
    ADVISE_UPLOAD: "LCXK_ADVISE_UPLOAD",
    ADVISE_EXECUTE: "LCXK_ADVISE_EXECUTE",
    ADVISE_APPROVAL: "LCXK_ADVISE_APPROVAL",
    ADVISE_RECEIVE: "LCXK_ADVISE_RECEIVE",

    // BCT
    PRESENT_UPLOAD: "LCXK_PRESENT_UPLOAD",
    PRESENT_EXECUTE: "LCXK_PRESENT_EXECUTE",
    PRESENT_APPROVAL: "LCXK_PRESENT_APPROVAL",
    PRESENT_CONFIRM: "LCXK_PRESENT_CONFIRM",
    PRESENT_BRANCH_RECEIVE: "LCXK_PRESENT_BRANCH_RECEIVE",
    PRESENT_HO_RECEIVE: "LCXK_PRESENT_HO_RECEIVE",

    // Message
    MESSAGE_EXECUTE: "LCXK_MESSAGE_EXECUTE",
    MESSAGE_APPROVAL: "LCXK_MESSAGE_APPROVAL",
    MESSAGE_BRANCH_RECEIVE: "LCXK_MESSAGE_BRANCH_RECEIVE",
    MESSAGE_HO_RECEIVE: "LCXK_MESSAGE_HO_RECEIVE",

    // Evaluate
    EVALUATE_UPLOAD: "LCXK_EVALUATE_UPLOAD",
    EVALUATE_EXECUTE: "LCXK_EVALUATE_EXECUTE",
    EVALUATE_APPROVAL: "LCXK_EVALUATE_APPROVAL",
    EVALUATE_BRANCH_RECEIVE: "LCXK_EVALUATE_BRANCH_RECEIVE",
    EVALUATE_HO_RECEIVE: "LCXK_EVALUATE_HO_RECEIVE",
    EVALUATE_APPROVAL_RECEIVE: "LCXK_EVALUATE_APPROVAL_RECEIVE",
    ADD_DOC_UPLOAD: "LCXK_ADD_DOC_UPLOAD",
    ADD_DOC_APPROVAL: "LCXK_ADD_DOC_APPROVAL",

    // Tracing
    TRACING_EXECUTE: "LCXK_TRACING_EXECUTE",
    TRACING_APPROVAL: "LCXK_TRACING_APPROVAL",
    TRACING_BRANCH_RECEIVE: "LCXK_TRACING_BRANCH_RECEIVE",
    TRACING_HO_RECEIVE: "LCXK_TRACING_HO_RECEIVE",
    TRACING_APPROVAL_RECEIVE: "LCXK_TRACING_APPROVAL_RECEIVE",

    // Consult
    CONSULT_UPLOAD: "LCXK_CONSULT_UPLOAD",
    CONSULT_EXECUTE: "LCXK_CONSULT_EXECUTE",
    CONSULT_APPROVAL: "LCXK_CONSULT_APPROVAL",
    CONSULT_BRANCH_RECEIVE: "LCXK_CONSULT_BRANCH_RECEIVE",

    // Thông báo phí
    ADVICE_CHARGE_UPLOAD: "LCXK_ADVICE_CHARGE_UPLOAD",
    ADVICE_CHARGE_EXECUTE: "LCXK_ADVICE_CHARGE_EXECUTE",
    ADVICE_CHARGE_APPROVAL: "LCXK_ADVICE_CHARGE_APPROVAL",

    //thong bao
    LAP_THONG_BAO: "Lập thông báo",
    XU_LY_THONG_BAO: "Xử lý thông báo",
    DUYET_THONG_BAO: "Duyệt thông báo",
    NHAN_THONG_BAO: "Nhận thông báo",
    UPLOAD_HO_SO: "Upload hồ sơ",
    XAC_NHAN_THONG_TIN: "Xác nhận thông tin",
    CVDVTTTM_XU_LY_BCT:"CVDVTTTM xử lý BCT",
    CVHT_XAC_NHAN_THONG_TIN: "CVHT xác nhận thông tin",
    KIEM_SOAT_VIEN_DUYET: "Kiểm soát phê duyệt",
    CVHT_NHAN_THONG_BAO: "CVHT nhận thông báo",
    CVDVTTTM_NHAN_THONG_TIN: "CVDVTTTM nhận thông tin",
    CVDVTTTM_XU_LY_DIEN: "CVDVTTTM xử lý",
    CVHT_UPLOAD_DANH_GIA: "Upload đánh giá",
    CVHO_XL_DANH_GIA: "Xử lý đánh giá",
    KSV_DUYET_DANH_GIA: "Duyệt đánh giá",
    CVHT_NHAN_DANH_GIA: "Nhận đánh giá",
    CVHO_NHAN_PHAN_HOI: "Nhận phản hồi",
    KSV_DUYET_DIEN: "Duyệt điện",
    UPLOAD_BS_HO_SO: 'Upload bổ sung hồ sơ',
    DUYET_BS_HO_SO: 'Phê duyệt bổ sung hồ sơ',
    CVHO_XL_TRA_SOAT: "Xử lý tra soát",
    KSV_DUYET_TRA_SOAT: "Duyệt tra soát",
    CVHT_NHAN_TRA_SOAT: "Nhận thông báo",
    CVHO_NHAN_PHAN_HOI_TRA_SOAT: "Xử lý phản hồi",
    KSV_DUYET_TRA_SOAT_LAN_2: "Duyệt tra soát",
    CVHT_UPLOAD_HO_SO_THANH_TOAN_PHI: "CVHT upload hồ sơ thanh toán phí",
    CVHO_XU_LY_GIAO_DICH_THANH_TOAN_PHI: "CVHO xử lý giao dịch thanh toán phí",
    KSV_DUYET_THANH_TOAN_PHI: "KSV duyệt thanh toán phí",
}

export const DOC_CODE_LIST = {
    THU_TIN_DUNG : "0001",
    THONG_BAO_LCXK : "0002",
    HO_SO_KHAC : "0003",
    TU_CHINH_LCXK : "0005",
    TU_CHINH_THU_TIN_DUNG : "0006",
    BCT: "0008",
    DONG_DAU_RUT_SO_DU_LC: '0009',
    TB_KIEM_TRA_BCT: '0010',
    COVER: '0011',
    COVER_HOAN_TRA: '0012',
    Y_KIEN_CHIET_KHAU: '0013',
    THONG_BAO_DANH_GIA_LCXK: '0018',
    Y_KIEN_DANH_GIA_SUA_DOI: '0022'
}

export const SUGGEST_TYPE = {
    INIT_MSG: "1",
    INIT_LETTER: "2",
}

export enum MSG_TYPE {
    MT700 = '700',
    MT710 = "710",
    MT720 = "720",
    MT730 = "730",
    MT707 = '707',
    MT708 = '708',
    MT799 = '799',
    MT999 = '999',
    MSG_TYPE = "fin.700/fin.701/fin.799/fin.999",
    MSG_TYPE_1 = "fin.710/fin.711/fin.720/fin.721"
}

export const TASK_TYPE_ROLE = {
    HO: '174E0AC5-F5B1-402A-80E4-5C654102C21D/63E0860B-C06D-47FF-95A9-D3DBE9DEBDDB/5D9A6A17-836D-46F8-B32C-103F7D48FE3D/C6D84173-97CB-486D-BDF5-417D87CCEF82/098E653C-07B5-4CEF-B5D3-D1618342F093/5A96F4A0-40CE-4843-B21F-9B0446F2B528/AC3D7CA6-DD14-4766-86C4-48AD34ADAFF0/EA77F1D9-6435-45AA-ACD6-F9E1B226E4D0/0E064674-32B1-44B2-8134-2985DDCFB3BA/C6C51D9B-9481-46B1-ABD1-BB76790F6434/1B7ABD03-52E4-443C-86E5-C1B499EB1030/4FB4A308-E3BF-40DF-94B9-8C0A4C167077/4257C1FF-770C-4A38-8F38-19A683519A3E/90B69E29-E7E9-414F-AA3C-FD18D545B9EE/1AC5D9CB-C882-4149-BBD4-DBC1B176DE84/DE525D92-DF2E-11ED-B5EA-0242AC120002/DE525ED2-DF2E-11ED-B5EA-0242AC120002/1377ADC8-1EFF-11EE-BE56-0242AC120002/8BD2A5E2-1EFB-11EE-BE56-0242AC120002',
    NOT_CVHT_BCT: '098E653C-07B5-4CEF-B5D3-D1618342F093/5A96F4A0-40CE-4843-B21F-9B0446F2B528/A49ADE61-B2EF-485D-8300-940F3D855AC0/AC3D7CA6-DD14-4766-86C4-48AD34ADAFF0',
};

export const TASK_NAME_ROLE = {
    HO: '174E0AC5-F5B1-402A-80E4-5C654102C21D/63E0860B-C06D-47FF-95A9-D3DBE9DEBDDB/5D9A6A17-836D-46F8-B32C-103F7D48FE3D/C6D84173-97CB-486D-BDF5-417D87CCEF82',
    NOT_CVHT_BCT: '948DC4C0-6629-4057-A951-69D1459F4783/5A96F4A0-40CE-4843-B21F-9B0446F2B528/A49ADE61-B2EF-485D-8300-940F3D855AC0/AC3D7CA6-DD14-4766-86C4-48AD34ADAFF0',
    CVHT_UPLOAD_BCT: 'EF40E056-864E-4B04-9BC0-6A57B3E41BC5',
};

export enum QUEUE_REASON {
    LAP_DIEN_XAC_THUC = "Điện xác thực/xác nhận",
    PHI_NHTB_THU_1 = "Phí NHTB thứ 1",
}

export const YESNO = {
    YES: 'YES',
    NO: 'NO'
};

export const YN = {
    Y: 'Y',
    N: 'N'
};

export const TRUE_FALSE = {
    TRUE: 'true',
    FALSE: 'false'
};

export const TIEU_CHI_PHAN_BO = {
    TAI_TRO: '01-TAITRO',
    KHONG_TAI_TRO: '02-KHONGTAITRO'
};

export const TK_CHIET_KHAU = '1142606000';

export const AML_DEFAULT = {
    AMOUNT: '0.0',
    APPLICATIONID: 'T24',
    CURRENCY: 'USD',
    DIRECTION: 'O',
    GATEWAY: 'COFI',
    MANDATOR: 'VN0010001_TF',
    MESSAGEFORMAT: 'SIC',
    MESSAGESUBTYPE: 'CO',
    MESSAGETYPE_TF: 'LC1',
    MESSAGETYPE_FM: 'FM1',
    RECEIVER: 'T24',
    RECEIVERCOUNTRY: 'XX',
    SENDER: 'T24',
    SENDERCOUNTRY: 'XX'
};

export const AML_STATUS = {
    OK: 'OK',
    SKIP: 'SKIP',
    HIT: 'HIT',
    FAILED: 'FAILED',
    HOLD: 'HOLD',
    CLEAN: 'CLEAN',
    ERROR: 'ERROR',
    PENDING: 'PENDING', // Hit nhưng chưa duyệt AML => chặn hoàn thành
    ALLOW: 'ALLOW', // Hit và đã duyệt AML => cho hoàn thành
    CANCEL: 'CANCEL', // chặn hoàn thành
    UNKNOWN: 'UNKNOWN',
    NO_HIT: 'Giao dịch không có HIT',
    OVERRIDE_ALLOW: 'The record has Hit from the Viveo Server',
    OVERRIDE_ERROR: 'Error in Viveo Server communication',
    OVERRIDE_HIT: 'The record has Hit from the Viveo Server*VIV'

};

export const AML_TYPE = {
    AML_TYPE: 'AML_TYPE',
    AML: 'AML',
    FCRM: 'FCRM',
    PRESENT_TF: 'PRESENT_TF',
    PRESENT_FM: 'PRESENT_FM',
    ADVISE_FM: 'ADVISE_FM',
    ADVISE_TF: 'ADVISE_TF',
    AMEND_TF: 'AMEND_TF',
    AMEND_FM: 'AMEND_FM',
    MESSAGE_TF: 'MESSAGE_TF',
    MESSAGE_FM: 'MESSAGE_FM',
    EVALUATE_TF: 'EVALUATE_TF',
    EVALUATE_FM: 'EVALUATE_FM',
    TRACING_FM: 'TRACING_FM',
    T24: 'T24',
};

export const ERROR_T24 = {
    ERROR_301: '301',
    ERROR_402: '402',
    ERROR_421: '421',
    ERROR_500: '500',
};

export const MESSAGE_TYPE = {
    EB_0799: 'EB-0799',
    EB_0999: 'EB-0999',
}

export const CREATED_BY_SYSTEM = {
    LCXK: '1',
    LCNK: '2',
    BPM: 'BPM',
    BIZ: 'BIZ',
}

export const FOLLOW_QUEUE_REASON = {
   DONG_RUT_SO_DU : 'Chưa đóng rút số dư LC',
   PHI_NHTB : 'Phí NHTB 1',
   DIEN_XAC_THUC: 'Điện xác thực/Xác nhận',
   KHAC : 'Khác',
}

export enum CAT_LIBRARY_INPUT {
    MTn99 = 'MTn99',
}

export enum CAT_LIBRARY_FIELD_ID {
    ADVICE_NARRATIVE = 'ADVICE_NARRATIVE',
    AMEND_NARRATIVE = 'AMEND_NARRATIVE',
    EVALUATE_NARRATIVE = 'EVALUATE_NARRATIVE',
    TRACING_NARRATIVE = 'TRACING_NARRATIVE',
    ADVICE_CHARGE = 'ADVICE_CHARGE_NARRATIVE',
}

export enum CAT_LIBRARY_KEY {
    REJECT_ADVICE = 'REJECT_ADVICE',
    CONFIRM_LETTER_MT799 = 'CONFIRM_LETTER_MT799',
    CONFIRM_LETTER_MT999 = 'CONFIRM_LETTER_MT999',
    CONFIRM_LC_AUTHENTICITY = 'CONFIRM_LC_AUTHENTICITY',
    ADVICE_WITHOUT_CONFIRM = 'ADVICE_WITHOUT_CONFIRM',
    AMENDMENT_ADVISED_MT799 = 'AMENDMENT_ADVISED_MT799',
    AMENDMENT_ADVISED_MT999 = 'AMENDMENT_ADVISED_MT999',
    EVALUATE_NARRATIVE_MT999 = 'EVALUATE_NARRATIVE_MT999',
    EVALUATE_NARRATIVE_MT799 = 'EVALUATE_NARRATIVE_MT999',
    CO = 'CO',
    AC_DP = 'AC_DP',
    CR = 'CR'
}

export const BPM_TRANS_TYPE = [
    'Tư vấn LCNK kênh Quầy',
    'Tư vấn LCNK kênh Biz',
    'Tư vấn LCXK kênh Quầy',
    'Tư vấn LCXK kênh Biz',
    'Phát hành LCNK kênh Quầy',
    'Phát hành LCNK kênh Biz',
    'Sửa hủy LCNK',
    'BCT NK',
    'Thanh toán',
    'BCT XK miễn check',
    'BCT XK có check',
    'Đánh giá LCXK',
    'Xử lý điện về',
    'Thanh toán NTNK',
    'Chấp nhận D/A NTNK',
    'Lập cover NTXK',
    'Lập thông báo NTNK',
    'Tra soát NTXK',
    'Tra soát NTNK',
    'Tu chỉnh NTNK',
    'Tu chỉnh NTXK',
    'Thông báo NTNK',
    'Sửa hủy NTNK',
    'Thanh toán NTNK'
]
