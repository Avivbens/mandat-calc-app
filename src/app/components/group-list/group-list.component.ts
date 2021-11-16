import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Group } from '../models'

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {

    @Input() groups: Group[] | undefined
    @Output() deleteGroup = new EventEmitter();

}
