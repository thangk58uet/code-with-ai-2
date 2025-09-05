export enum DIRECTIVE_VALIDATION_TYPE {
    D_NUMBER_PHONE = 'numberPhone',
    D_REMINDER_CODE = 'remindercode',
    D_NUMBER = 'number',
    D_NUMBER_AND_TEXT = 'numberAndText',
    D_TEXT = 'text',
    D_EMAIL = 'email',
    D_CURRENCY = 'currency'
}

export enum CONTROL_TYPE {
    TEXTBOX = 'textbox',
    NUMBER = 'number',
    DROPDOWN = 'dropdown',
    TEXTAREA = 'textarea',
    DATETIME = 'datetime',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    NGSELECT = 'ngselect',
    UPLOAD = 'upload',
    SLIDE = 'slide',
    DATE = 'date',
    HIDDEN = "hidden"
}

export enum FILE_EXTENSION {
    PNG = 'png',
    JPG = 'jpg',
    PDF = 'pdf',
    XLSX = 'xlsx',
    XLS = 'xls',
    ZIP = 'zip',
    RAR = 'rar',
    DOCX = 'docx',
    XML = 'xml'
}
export const FILE_EXTENSION_SIGNATURE = {
    [FILE_EXTENSION.PNG]: ['89504e47'],
    [FILE_EXTENSION.PDF]: ['25504446'],
    [FILE_EXTENSION.JPG]: ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8'],
    [FILE_EXTENSION.XLSX]: ['504b34'],
    [FILE_EXTENSION.XLS]: ['d0cf11e0', '09081000', 'fdffffff'],
    [FILE_EXTENSION.ZIP]: ['504b34'],
    [FILE_EXTENSION.RAR]: ['52617221'],
    [FILE_EXTENSION.DOCX]: ['504b34'],
    [FILE_EXTENSION.XML]: ['efbbbf3c'],
}
