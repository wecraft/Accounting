import { NgModule } from "@angular/core";
import { ProjectFormComponent } from "./project-form.component";
import { SharedModule } from "../../shared/shared.module";
import { UserPieFormModule } from "../../user/user-pie-form/user-pie-form.module";

@NgModule({
	imports: [SharedModule, UserPieFormModule],
	declarations: [ProjectFormComponent],
	exports: [ProjectFormComponent]
})
export class ProjectFormModule {}
