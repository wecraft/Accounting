import { Component, OnInit, ViewChild } from "@angular/core";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { Order } from "src/app/models";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";
import { OrderComponent } from "../../order/order.component";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";

@Component({
	selector: "app-regular-transactions",
	templateUrl: "./regular-transactions.component.html",
	styles: [],
})
export class RegularTransactionsComponent extends TableDataComponent<Order> {
	displayedColumns: string[] = [
		"date",
		"account",
		"category",
		"desc",
		"files",
		"amount",
	];
	dataSource: AppDataSource<Order>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "currency,category,account,files",
	};

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	getEndpoint() {
		return this.service.regular.getOrders;
	}

	getCountMethod() {
		return this.service.regular.getOrdersCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}
}
