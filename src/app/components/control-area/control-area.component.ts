import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-control-area',
    templateUrl: './control-area.component.html',
    styleUrls: ['./control-area.component.scss']
})
export class ControlAreaComponent {

    @Input() data: { seats: number, percent: number } | undefined
}
