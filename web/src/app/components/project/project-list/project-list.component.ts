import { Component, OnInit, ViewChild } from "@angular/core";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { Project } from "src/app/models";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";
import { ProjectComponent } from "../project.component";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";

@Component({
	selector: "app-project-list",
	templateUrl: "./project-list.component.html",
	styles: []
})
export class ProjectListComponent extends TableDataComponent<Project> {
	displayedColumns: string[] = ["date", "name", "client", "status", "price"];
	dataSource: AppDataSource<Project>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "currency,client"
	};

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	getEndpoint() {
		return this.service.project.getProjects;
	}

	getCountMethod() {
		return this.service.project.getProjectsCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClickRow(project: Project) {
		const dialogRef = this.dialog.open(
			ProjectComponent,
			new MaterialDialogConfig({
				projectId: project.id
			})
		);

		dialogRef.afterClosed().subscribe((newProject: Project) => {
			if (newProject) {
				project.name = newProject.name;
				project.price = newProject.price;
				project.client = newProject.client;
				project.currency = newProject.currency;
				project.status = newProject.status;
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(
			ProjectComponent,
			new MaterialDialogConfig()
		);

		dialogRef.afterClosed().subscribe(data => {
			if (data) {
				this.loadPage();
			}
		});
	}
}
