import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { Account, Project, User } from "src/app/models";
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
	authUser: User;

	chartType: string = "monthly";

	chartData: any;
	chartJsType: string = "line";

	showChart: boolean = false;

	summary: {
		income: number;
		cost: number;
		profit: number;
	};

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	ngOnInit() {
		super.ngOnInit();

		this.authUser = this.service.auth.authUser;

		if (this.authUser.isAdmin) {
			this.service.getDashboard().subscribe(data => (this.data = data));

			this.service.account
				.getAccounts()
				.subscribe(data => (this.accounts = data));
		} else {
			this.service.router.navigate(["/regular"]);
		}

		this.loadGraph();
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

	loadGraph() {
		this.showChart = false;
		this.chartJsType = "bar";

		this.service.getDashboardStat(this.chartType).subscribe(data => {
			this.chartData = data["data"];
			this.showChart = true;
			this.summary = data["summary"];
		});
	}
}
