import { AmendViewDetailComponent } from './../lcxk-amend/components/amend-view-detail/amend-view-detail.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LcxkAmlComponent } from './components/lcxk-aml/lcxk-aml.component';
import { SharedModule } from '../../shared/shared.module';
import { IntegratedInfoComponent } from './components/integrated-info/integrated-info.component';
import { LcxkChargeComponent } from './components/lcxk-charge/lcxk-charge.component';
import { LcxkCommentComponent } from './components/lcxk-comment/lcxk-comment.component';
import { LcxkDocumentComponent } from './components/lcxk-document/lcxk-document.component';
import { LcxkExportFileComponent } from './components/lcxk-export-file/lcxk-export-file.component';
import { LcxkFmCreateComponent } from './components/lcxk-fm-create/lcxk-fm-create.component';
import { LcxkFooterComponent } from './components/lcxk-footer/lcxk-footer.component';
import { LcxkTrackingComponent } from './components/lcxk-tracking/lcxk-tracking.component';
import { MessageBodyComponent } from './components/message-body/message-body.component';
import { LcxkSearchComponent } from './components/lcxk-search/lcxk-search.component';
import { CommonsRouting } from './commons-routing';
import { LcxkViewDetailComponent } from './components/lcxk-view-detail/lcxk-view-detail.component';
import { AdviceViewDetailComponent } from '@features/lcxk-advice/components/advice-view-detail/advice-view-detail.component';
import { AdviceCommonComponent } from '@features/lcxk-advice/components/advice-common/advice-common.component';
import { AdviceCreateComponent } from '../lcxk-advice/components/advice-create/advice-create.component';
import { AmendLcInfoComponent } from '../lcxk-amend/components/amend-lc-info/amend-lc-info.component';
import { AmendCommonComponent } from '../lcxk-amend/components/amend-common/amend-common.component';
import { AmendCreateComponent } from '../lcxk-amend/components/amend-create/amend-create.component';
import { LcxkCommonInfoComponent } from './components/lcxk-common-info/lcxk-common-info.component';
import { LcxkQueueComponent } from './components/lcxk-queue/lcxk-queue.component';
import { LcxkOpnComponent } from './components/lcxk-opn/lcxk-opn.component';
import { LibraryDialogComponent } from './components/library-dialog/library-dialog.component';
import { NostroAccountComponent } from './components/nostro-account/nostro-account.component';
import { PresentDocViewDetailComponent } from '@features/lcxk-present-doc/components/present-doc-view-detail/present-doc-view-detail.component';
import { PresentDocCommonComponent } from '@features/lcxk-present-doc/components/present-doc-common/present-doc-common.component';
import { PresentDocCreateComponent } from '@features/lcxk-present-doc/components/present-doc-create/present-doc-create.component';
import { PresentDocClaimCoverComponent } from '@features/lcxk-present-doc/components/present-doc-claim-cover/present-doc-claim-cover.component';
import { PresentDocChargeHoComponent } from '@features/lcxk-present-doc/components/present-doc-charge-ho/present-doc-charge-ho.component';
import { PresentDocDiscountOpnComponent } from '@features/lcxk-present-doc/components/present-doc-discount-opn/present-doc-discount-opn.component';
import { PresentDocGoodsComponent } from '@features/lcxk-present-doc/components/present-doc-goods/present-doc-goods.component';
import { AccessDeniedComponent } from '@public/components/access-denied/access-denied.component';
import { LcxkAbortProcessComponent } from './components/lcxk-abort-process/lcxk-abort-process.component';
import {MessageViewDetailComponent} from "@features/lcxk-message/components/message-view-detail/message-view-detail.component";
import {MessageModule} from "@features/lcxk-message/message.module";
import {MessageCommonComponent} from "@features/lcxk-message/components/message-common/message-common.component";
import {MessageCreateComponent} from "@features/lcxk-message/components/message-create/message-create.component";
import {MessageChargeComponent} from "@features/lcxk-message/components/message-charge/message-charge.component";
import {MessageRequireResponseComponent} from "@features/lcxk-message/components/message-require-response/message-require-response.component";
import {MessageGuaranteeInfoComponent} from "@features/lcxk-message/components/message-guarantee-info/message-guarantee-info.component";
import {MessageGuaranteeNoticeComponent} from "@features/lcxk-message/components/message-guarantee-notice/message-guarantee-notice.component";
import {EvaluateViewDetailComponent} from "@features/lcxk-evaluate/components/evaluate-view-detail/evaluate-view-detail.component";
import {EvaluateCommonComponent} from "@features/lcxk-evaluate/components/evaluate-common/evaluate-common.component";
import {EvaluateInfoComponent} from "@features/lcxk-evaluate/components/evaluate-info/evaluate-info.component";
import {EvaluateSuggestContentComponent} from "@features/lcxk-evaluate/components/evaluate-suggest-content/evaluate-suggest-content.component";
import {
    EvaluateMbFinanceComponent
} from "@features/lcxk-evaluate/components/evaluate-mb-finance/evaluate-mb-finance.component";
import { LcxkAssignTaskComponent } from './components/lcxk-assign-task/lcxk-assign-task.component';
import { LcxkAssignTaskPopupComponent } from './components/lcxk-assign-task/lcxk-assign-task-popup/lcxk-assign-task-popup.component';
import {AmendRatingComponent} from "@features/lcxk-amend/components/amend-rating/amend-rating.component";
import {
    AddDocViewDetailComponent
} from "@features/lcxk-add-doc/components/add-doc-view-detail/add-doc-view-detail.component";
import {AddDocCommonComponent} from "@features/lcxk-add-doc/components/add-doc-common/add-doc-common.component";
import { LcxkMT710Component } from './components/lcxk-mt710/lcxk-mt710.component';
import { TracingPresentDocViewDetailComponent } from '@features/lcxk-tracing-present-doc/components/tracing-present-doc-view-detail/tracing-present-doc-view-detail.component';
import { PresentDocInfoTracingComponent } from '@features/lcxk-tracing-present-doc/components/commons/present-doc-info/present-doc-info.component';
import { LcInfoTracingComponent } from '@features/lcxk-tracing-present-doc/components/commons/lc-info/lc-info.component';
import { TracingInfoComponent } from '@features/lcxk-tracing-present-doc/components/commons/tracing-info/tracing-info.component';
import { CreateNoticeComponent } from '@features/lcxk-tracing-present-doc/components/commons/create-notice/create-notice.component';
import { SendMailFIComponent } from '@features/lcxk-tracing-present-doc/components/commons/send-mail-fi/send-mail-fi.component';
import { LcxkQueueApprovalComponent } from './components/lcxk-queue-approval/lcxk-queue-approval.component';
import { PresentDocInfoConsultComponent } from '@features/lcxk-consult/components/common/present-doc-info/present-doc-info.component';
import { LcInfoConsultComponent } from '@features/lcxk-consult/components/common/lc-info/lc-info.component';
import { ConsultViewDetailComponent } from '@features/lcxk-consult/components/consult-view-detail/consult-view-detail.component';
import { LcxkDashboardDistribute } from './components/lcxk-dashboard-distribute/lcxk-dashboard-distribute.component';
import {ManualTradingAddComponent} from "@features/commons/components/manual-trading-add/manual-trading-add.component";
import {ManualTradingSearchComponent} from "@features/commons/components/manual-trading-search/manual-trading-search.component";
import {BpmDateTimePickerWithLabelComponent} from "@features/commons/components/common/bpm-date-time-picker-with-label/bpm-date-time-picker-with-label.component";
import {InputWithLabelComponent} from "@features/commons/components/common/bpm-input-custom/input-with-label.component";
import {BpmSelectWithLabelComponent} from "@features/commons/components/common/bpm-select-with-label/bpm-select-with-label.component";
import { ConsultRatingComponent } from '../lcxk-consult/components/common/consult-rating/consult-rating.component';
import { ConsultContentConsultComponent } from '@features/lcxk-consult/components/common/consult-content/consult-content.component';
import { LcxkDashboardSynthetic } from './components/lcxk-dashboard-synthetic/lcxk-dashboard-synthetic.component';
import {AdviceChargeViewDetailComponent} from "@features/lcxk-advice-charge/components/advice-charge-view-detail/advice-charge-view-detail.component";
import {AdviceChargeModule} from "@features/lcxk-advice-charge/lcxk-advice-charge.module";
import {AdviceChargeCommonComponent} from "@features/lcxk-advice-charge/components/advice-charge-common/advice-charge-common.component";
import {AdviceChargeLcComponent} from "@features/lcxk-advice-charge/components/advice-charge-lc/advice-charge-lc.component";
import {AccountingAdviceChargeComponent} from "@features/lcxk-advice-charge/components/accounting-advice-charge/accounting-advice-charge.component";
import {LcxkMt202Component} from "@features/lcxk-advice-charge/components/lcxk-mt202/lcxk-mt202.component";
import {DomesticAccountingAdviceChargeComponent} from "@features/lcxk-advice-charge/components/domestic-accounting-advice-charge/domestic-accounting-advice-charge.component";
import {AdviceChargeInfoComponent} from "@features/lcxk-advice-charge/components/advice-charge-info/advice-charge-info.component";
import { UserDhlComponent } from './components/user-dhl/user-dhl.component';
import { PresentDocClaimCoverBranchReceiveComponent } from '@features/lcxk-present-doc/components/present-doc-claim-cover-branch-receive/present-doc-claim-cover-branch-receive.component';

const COMPONENTS = [
  LcxkAmlComponent,
  IntegratedInfoComponent,
  LcxkChargeComponent,
  LcxkCommentComponent,
  LcxkDocumentComponent,
  LcxkExportFileComponent,
  LcxkFmCreateComponent,
  LcxkFooterComponent,
  LcxkTrackingComponent,
  MessageBodyComponent,
  LcxkSearchComponent,
  AdviceViewDetailComponent,
  LcxkViewDetailComponent,
  AdviceCommonComponent,
  AdviceCreateComponent,
  AmendLcInfoComponent,
  AmendCommonComponent,
  AmendCreateComponent,
  AmendViewDetailComponent,
  AmendRatingComponent,
  LcxkCommonInfoComponent,
  LcxkQueueComponent,
  LcxkOpnComponent,
  PresentDocViewDetailComponent,
  PresentDocCommonComponent,
  PresentDocCreateComponent,
  PresentDocClaimCoverComponent,
  PresentDocClaimCoverBranchReceiveComponent,
  PresentDocChargeHoComponent,
  PresentDocDiscountOpnComponent,
  PresentDocGoodsComponent,
  AccessDeniedComponent,
  LcxkAbortProcessComponent,
  MessageViewDetailComponent,
  MessageCommonComponent,
  MessageCreateComponent,
  MessageChargeComponent,
  MessageRequireResponseComponent,
  MessageGuaranteeInfoComponent,
  MessageGuaranteeNoticeComponent,
  EvaluateViewDetailComponent,
  EvaluateCommonComponent,
  EvaluateInfoComponent,
  EvaluateSuggestContentComponent,
  EvaluateMbFinanceComponent,
  LcxkAssignTaskComponent,
  LcxkAssignTaskPopupComponent,
  AddDocViewDetailComponent,
  AddDocCommonComponent,
  LcxkMT710Component,
  TracingPresentDocViewDetailComponent,
  PresentDocInfoTracingComponent,
  LcInfoTracingComponent,
  TracingInfoComponent,
  CreateNoticeComponent,
  SendMailFIComponent,
  LcxkQueueApprovalComponent,
  PresentDocInfoConsultComponent,
  LcInfoConsultComponent,
  ConsultViewDetailComponent,
  LcxkDashboardDistribute,
  LcxkDashboardSynthetic,
  ManualTradingAddComponent,
  ManualTradingSearchComponent,
  ConsultRatingComponent,
  ConsultContentConsultComponent,
  AdviceChargeViewDetailComponent,
  AdviceChargeCommonComponent,
  AdviceChargeLcComponent,
  AccountingAdviceChargeComponent,
  LcxkMt202Component,
  DomesticAccountingAdviceChargeComponent,
  AdviceChargeInfoComponent,
  UserDhlComponent
]

@NgModule({
    declarations: [...COMPONENTS, LibraryDialogComponent, NostroAccountComponent, BpmDateTimePickerWithLabelComponent, InputWithLabelComponent, BpmSelectWithLabelComponent],
  imports: [
    CommonModule,
    SharedModule,
    CommonsRouting,
  ],
  exports: [CommonModule, ...COMPONENTS],
})
export class CommonsModule { }
