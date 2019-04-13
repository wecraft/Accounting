import { Component, OnInit, ViewChild } from "@angular/core";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { Client } from "src/app/models";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";
import { ClientComponent } from "../client.component";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";

@Component({
	selector: "app-client-list",
	templateUrl: "./client-list.component.html",
	styles: []
})
export class ClientListComponent extends TableDataComponent<Client> {
	displayedColumns: string[] = [
		"date",
		"name",
		"email",
		"country",
		"company"
	];
	dataSource: AppDataSource<Client>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "country"
	};

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	getEndpoint() {
		return this.service.client.getClients;
	}

	getCountMethod() {
		return this.service.client.getClientsCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClickRow(client: Client) {
		const dialogRef = this.dialog.open(
			ClientComponent,
			new MaterialDialogConfig({
				clientId: client.id
			})
		);

		dialogRef.afterClosed().subscribe((newClient: Client) => {
			if (newClient) {
				client.name = newClient.name;
				client.email = newClient.email;
				client.country = newClient.country;
				client.company = newClient.company;
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(
			ClientComponent,
			new MaterialDialogConfig()
		);

		dialogRef.afterClosed().subscribe(data => {
			if (data) {
				this.loadPage();
			}
		});
	}
}
