import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-form/login-form.component";
import { LoginFormModule } from "./login-form/login-form.module";
import { LogoutComponent } from "./auth-logout.component";
import { GuestGuard } from "../../guards/guest.guard";

const routes: Routes = [
	{
		path: "login",
		canActivate: [GuestGuard],
		component: LoginFormComponent
	},
	{
		path: "logout",
		component: LogoutComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), LoginFormModule],
	exports: [RouterModule],
	declarations: [LogoutComponent]
})
export class AuthModule {}
