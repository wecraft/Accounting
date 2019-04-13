import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectListModule } from "./project-list/project-list.module";

const routes: Routes = [
	{
		path: "",
		component: ProjectListComponent
	}
];

@NgModule({
	declarations: [],
	imports: [SharedModule, RouterModule.forChild(routes), ProjectListModule],
	exports: [RouterModule]
})
export class ProjectLazyModule {}
