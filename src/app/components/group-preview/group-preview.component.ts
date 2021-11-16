import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Group } from '../models'

@Component({
    selector: 'app-group-preview',
    templateUrl: './group-preview.component.html',
    styleUrls: ['./group-preview.component.scss']
})
export class GroupPreviewComponent {

    @Input() group: Group | undefined
    @Output() deleteMe = new EventEmitter();
}
