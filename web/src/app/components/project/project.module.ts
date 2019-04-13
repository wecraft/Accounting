import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ProjectComponent } from "./project.component";
import { ProjectFormModule } from "./project-form/project-form.module";

@NgModule({
	imports: [SharedModule, ProjectFormModule],
	declarations: [ProjectComponent],
	entryComponents: [ProjectComponent]
})
export class ProjectModule {}
