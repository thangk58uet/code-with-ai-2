export class ChargeInfor {
    id?: string;
    chargeCode?: string;
    chargeName?: string;
    chargeRate?: string;
    chargeAmt?: string;
    chargeCurrency?: string;
    accountNumber?: string;
    accountName?: string;
    accountCurrency?: string;
    accountBalance?: string;
    categoryName?: string;
    firstRow?: Boolean;
    chargeAmountVAT?: string;
    totalChargeFee?: string;
    warningAccountNumber?: string;
    warningChargeCode?: string;
    percentVAT: string; //VAT tính phí
    chargePolicy: string // chính sách gói
    chargeSchedule: string; // phí theo biểu
    constructor() {
        this.id = this.randomID();
        this.accountNumber = '';
        this.totalChargeFee = '';
        this.chargeAmountVAT = '';
    }
    // Sinh ngẫu nhiên ID
    randomID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}
