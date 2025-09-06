import { Component } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {
  showPopup = false;
  copiedLink: string = '';

  copyLink() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      this.copiedLink = currentUrl;
      this.showPopup = true;
      setTimeout(() => this.showPopup = false, 2000);
    });
  }
}