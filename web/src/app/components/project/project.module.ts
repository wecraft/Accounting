import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProjectComponent } from "./project.component";
import { ProjectFormModule } from "./project-form/project-form.module";
import { AccountIconModule } from "../account/account-icon/account-icon.module";

@NgModule({
	imports: [SharedModule, ProjectFormModule, AccountIconModule],
	declarations: [ProjectComponent],
	entryComponents: [ProjectComponent]
})
export class ProjectModule {}
