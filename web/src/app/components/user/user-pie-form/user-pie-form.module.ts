import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { UserPieFormComponent } from "./user-pie-form.component";

@NgModule({
	imports: [SharedModule],
	declarations: [UserPieFormComponent],
	exports: [UserPieFormComponent]
})
export class UserPieFormModule {}
