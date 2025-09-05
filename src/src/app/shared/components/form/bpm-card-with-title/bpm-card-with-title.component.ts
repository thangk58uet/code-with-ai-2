import { Attribute, Component, OnInit } from '@angular/core';

@Component({
  selector: 'bpm-card',
  templateUrl: './bpm-card-with-title.component.html',
  styleUrls: ['./bpm-card-with-title.component.scss']
})
export class BpmCardWithTitleComponent implements OnInit {

  constructor(
    @Attribute('title') public title: string,
    @Attribute('subTitle') public subTitle: string,
    @Attribute('className') public className: string,
    @Attribute('marginDefault') public marginDefault: string,
  ) { }

  ngOnInit(): void {
  }

}
