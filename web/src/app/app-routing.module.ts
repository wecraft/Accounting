import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRootComponent } from "./app-root.component";
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DashboardModule } from "./components/dashboard/dashboard.module";

const routes: Routes = [
	{
		path: "",
		component: AppRootComponent,
		children: [
			{
				path: "auth",
				loadChildren: "./components/auth/auth.module#AuthModule"
			},
			{
				path: "",
				canActivate: [AuthGuard],
				children: [
					{
						path: "dashboard",
						component: DashboardComponent
					},
					{
						path: "",
						pathMatch: "full",
						redirectTo: "dashboard"
					}
				]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes), DashboardModule],
	exports: [RouterModule]
})
export class AppRoutingModule {}
