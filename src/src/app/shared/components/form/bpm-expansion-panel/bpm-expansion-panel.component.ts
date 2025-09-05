import {
    Component,
    OnInit,
    Attribute,
    Output,
    EventEmitter,
    Input,
    ChangeDetectorRef,
    AfterViewChecked,
} from '@angular/core';

@Component({
    selector: 'bpm-expansion',
    templateUrl: './bpm-expansion-panel.component.html',
    styleUrls: ['./bpm-expansion-panel.component.scss'],
})
export class BpmExpansionPanelComponent implements OnInit, AfterViewChecked {
    @Output() closed = new EventEmitter<any>();
    @Output() opened = new EventEmitter<any>();
    @Input() panelOpen: boolean = true;
    @Input() disabled: boolean = false;

    constructor(
        @Attribute('panelTitle') public panelTitle: string,
        @Attribute('description') public description: string,
        @Attribute('hideToggle') public hideToggle: string,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {}

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    onClose() {
        this.closed.emit(false);
    }

    onOpen() {
        this.opened.emit(true);
    }
}
