import { Component, Input } from '@angular/core';
import { DocumentService } from '@core/services/document.service';
import { MessageSeverity, ToastService } from '@core/services/toast.service';

interface CommentItem {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  time: string; // có thể là Date nhưng dùng string cho ví dụ ngắn
  likes: number;
  liked?: boolean;
  replies?: CommentItem[];
  showReplies?: boolean;
  replying?: boolean;
}

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class FacebookCommentComponent {
    constructor(private documentService: DocumentService, private toastService: ToastService) { }
    
    newCommentText = '';
    @Input() commentItems: any[];
    @Input() postId: string;

    addComment() {
        this.documentService.addComment(this.postId, this.newCommentText, 5).subscribe(res => {
            if (res.code == '00') {
                this.toastService.showToastr(
                'Thêm comment hành công',
                'Thông báo!',
                MessageSeverity.success
                );
                this.getComment();
            }
        })
    }

    getComment() {
        this.documentService.getComment(this.postId).subscribe(res => {
            if (res.code == '00') {
                this.commentItems = [...res.data];
            }
        })
    }

}
