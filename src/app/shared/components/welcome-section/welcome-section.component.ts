import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-section',
  templateUrl: './welcome-section.component.html',
  styleUrls: ['./welcome-section.component.scss']
})
export class WelcomeSectionComponent {
  @Input() userName: string = 'John';
  @Input() subtitle: string = 'Stay updated with the latest documents and company information.';
}
