import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { UserTransFormComponent } from "./user-trans-form.component";
import { MatDatepickerModule } from "@angular/material";

@NgModule({
	imports: [SharedModule, MatDatepickerModule],
	declarations: [UserTransFormComponent],
	exports: [UserTransFormComponent]
})
export class UserTransFormModule {}
