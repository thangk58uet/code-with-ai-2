export class FmInfo {
    messageType?: string
    receiver?: string
    receiverBankName?: string
    errReceiverBankName?: string
    showErrReceiverBankName?: boolean = false
    ourReference?: string
    theirRef?: string
    narMt799?: string
    narMt999?: string
    firstRow?: boolean = false
    id?: string
    fmNumber?: string
    fmStatus?: string
    fmOverride?: string
    fmAml?: string
    amlRequestId?: string
    receiveBankSwiftCode?: string
    nationalBankRefNumber?: string 
    mt99Narrative?: string
}
