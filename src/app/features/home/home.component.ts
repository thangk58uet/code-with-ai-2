import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild,} from '@angular/core';
import { DestroyService } from '@features/commons/services/destroy.service';

@Component({
  selector: 'mf-bpm-home-remittance',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DestroyService],
  host: {
    id: 'homeLcId'
  }
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
