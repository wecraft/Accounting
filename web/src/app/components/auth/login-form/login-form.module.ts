import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./login-form.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [LoginFormComponent],
	exports: [LoginFormComponent]
})
export class LoginFormModule {}
