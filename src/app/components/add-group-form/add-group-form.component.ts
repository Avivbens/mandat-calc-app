import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Group } from '../models'

@Component({
    selector: 'app-add-group-form',
    templateUrl: './add-group-form.component.html',
    styleUrls: ['./add-group-form.component.scss']
})
export class AddGroupFormComponent {

    @Output() clear = new EventEmitter();
    @Output() added = new EventEmitter<Group>();


    addGroup({ form }: NgForm) {
        const { name, amount } = form.value

        this.added.emit(
            { name, amount } as Group
        )

        form.reset()
    }
}
