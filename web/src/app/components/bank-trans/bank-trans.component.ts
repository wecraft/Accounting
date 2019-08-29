import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/app.service";
import { MatPaginator, MatDialog } from "@angular/material";
import { Order } from "src/app/models";
import { AppDataSource } from "../shared/extends/AppDataSource";
import { TableDataComponent } from "../shared/extends/TableDataComponent";
import { OrderComponent } from "../order/order.component";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";
import { BankTransImportComponent } from "./bank-trans-import/bank-trans-import.component";

@Component({
	selector: "app-bank-trans",
	templateUrl: "./bank-trans.component.html",
	styles: []
})
export class BankTransComponent extends TableDataComponent<Order> {
	displayedColumns: string[] = ["date", "account", "desc", "amount"];
	dataSource: AppDataSource<Order>;
	dataCount: number;
	chunk: number = 100;
	searchTerm: string = "";

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	set params(params) {}

	get params() {
		return {
			include: "currency,account,category",
			search: this.searchTerm
		};
	}

	getEndpoint() {
		return this.service.transaction.getOrders;
	}

	getCountMethod() {
		return this.service.transaction.getOrdersCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClickRow(order: Order) {
		const dialogRef = this.dialog.open(
			OrderComponent,
			new MaterialDialogConfig({
				orderId: order.id,
				onDelete: () => {
					this.loadPage();
				}
			})
		);

		dialogRef.afterClosed().subscribe((newOrder: Order) => {
			if (newOrder) {
				order.account = newOrder.account;
				order.amount = newOrder.amount;
				order.date = new Date(newOrder.date);
				order.currency = newOrder.currency;
				order.desc = newOrder.desc;
				order.type = newOrder.type;
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(
			OrderComponent,
			new MaterialDialogConfig()
		);

		dialogRef.afterClosed().subscribe(data => {
			if (data) {
				this.loadPage();
			}
		});
	}

	import(file: File) {
		this.service.submit(
			this.service.transaction.importOrders(file),
			data => {
				const dialogRef = this.dialog.open(
					BankTransImportComponent,
					new MaterialDialogConfig({
						data: data
					})
				);

				dialogRef.afterClosed().subscribe(data => {
					if (data) {
						this.loadPage();
					}
				});
			}
		);
	}

	search() {
		this.loadPage();
	}
}
