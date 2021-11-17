import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { GroupPreviewComponent } from './components/group-preview/group-preview.component'
import { GroupListComponent } from './components/group-list/group-list.component'
import { FormsModule } from '@angular/forms';
import { ControlAreaComponent } from './components/control-area/control-area.component';
import { AddGroupFormComponent } from './components/add-group-form/add-group-form.component';
import { SortPipe } from './pipes/sort.pipe'

@NgModule({
    declarations: [
        AppComponent,
        GroupPreviewComponent,
        GroupListComponent,
        ControlAreaComponent,
        AddGroupFormComponent,
        SortPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
