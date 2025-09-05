import { LcxkOpnComponent } from './components/lcxk-opn/lcxk-opn.component';
import { LcxkQueueComponent } from './components/lcxk-queue/lcxk-queue.component';
import { Routes, RouterModule } from '@angular/router';
import { LcxkSearchComponent } from './components/lcxk-search/lcxk-search.component';
import { NgModule } from '@angular/core';
import { MessageBodyComponent } from './components/message-body/message-body.component';
import { LcxkViewDetailComponent } from './components/lcxk-view-detail/lcxk-view-detail.component';
import { LcxkCommonInfoComponent } from './components/lcxk-common-info/lcxk-common-info.component';
import {LcxkAbortProcessComponent} from '@features/commons/components/lcxk-abort-process/lcxk-abort-process.component';
import { LcxkAssignTaskComponent } from './components/lcxk-assign-task/lcxk-assign-task.component';
import { LcxkQueueApprovalComponent } from './components/lcxk-queue-approval/lcxk-queue-approval.component';
import { LcxkDashboardDistribute } from './components/lcxk-dashboard-distribute/lcxk-dashboard-distribute.component';
import {ManualTradingSearchComponent} from "@features/commons/components/manual-trading-search/manual-trading-search.component";
import { LcxkDashboardSynthetic } from './components/lcxk-dashboard-synthetic/lcxk-dashboard-synthetic.component';
import { UserDhlComponent } from './components/user-dhl/user-dhl.component';
const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'msg-body/:msgId/:processId', component: MessageBodyComponent, data: { title: 'Nội dung điện' } },
            { path: 'lcxk-search', component: LcxkSearchComponent },
            { path: 'lcxk-queue', component: LcxkQueueComponent },
            { path: 'lcxk-queue-approval', component: LcxkQueueApprovalComponent, data: { title: 'Queue theo dõi ký TB/SH/TB BL/SH BL' } },
            { path: 'lcxk-opn', component: LcxkOpnComponent },
            { path: 'lcxk-common-info', component: LcxkCommonInfoComponent },
            { path: 'lcxk-view-detail/:processId/:bpmId', component: LcxkViewDetailComponent, data: { title: 'Thông tin chi tiết' } },
            { path: 'lcxk-abort-process', component: LcxkAbortProcessComponent },
            { path: 'lcxk-assign-task', component: LcxkAssignTaskComponent, data: { title: 'Bàn giao tác vụ' } },
            { path: 'lcxk-dashboard-distribute', component: LcxkDashboardDistribute, data: { title: 'Dashboard điều phối CV + KSV' } },
            { path: 'lcxk-dashboard-synthetic', component: LcxkDashboardSynthetic, data: { title: 'Dashboard tổng hợp' } },
            { path: 'lcxk-manual-trading', component: ManualTradingSearchComponent, data: { title: 'Khởi tạo giao dịch thủ công' } },
            { path: 'user-dhl', component: UserDhlComponent, data: { title: 'Cập nhật user DHL' } },
        ],
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
})
export class CommonsRouting {}
