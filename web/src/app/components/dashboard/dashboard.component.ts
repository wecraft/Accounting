import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { Account, Project } from "src/app/models";
import { TableDataComponent } from "../shared/extends/TableDataComponent";
import { AppDataSource } from "../shared/extends/AppDataSource";
import { ProjectComponent } from "../project/project.component";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";
import { MatDialog } from "@angular/material";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styles: []
})
export class DashboardComponent extends TableDataComponent<Project> {
	displayedColumns: string[] = ["date", "name", "payments"];
	dataSource: AppDataSource<Project>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "orders"
	};

	data: any;
	accounts: Account[];

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	ngOnInit() {
		super.ngOnInit();

		this.service.getDashboard().subscribe(data => (this.data = data));

		this.service.account
			.getAccounts()
			.subscribe(data => (this.accounts = data));
	}

	getEndpoint() {
		return this.service.project.getProgressProjects;
	}

	getCountMethod() {
		return null;
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
			}
		});
	}
}
