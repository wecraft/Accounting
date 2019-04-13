import { NgModule } from "@angular/core";
import { ProjectListComponent } from "./project-list.component";
import { SharedModule } from "../../shared/shared.module";
import { ProjectModule } from "../project.module";
import { MatPaginatorModule, MatTableModule } from "@angular/material";

@NgModule({
	imports: [SharedModule, MatPaginatorModule, MatTableModule, ProjectModule],
	declarations: [ProjectListComponent],
	exports: [ProjectListComponent]
})
export class ProjectListModule {}
