import { NgModule } from "@angular/core";
import { LoginFormComponent } from "./login-form.component";
import { SharedModule } from "../../shared/shared.module";
import { MatCardModule } from "@angular/material";

@NgModule({
	imports: [SharedModule, MatCardModule],
	declarations: [LoginFormComponent],
	exports: [LoginFormComponent]
})
export class LoginFormModule {}
