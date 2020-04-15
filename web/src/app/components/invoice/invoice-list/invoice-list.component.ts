import { Component, OnInit, ViewChild } from "@angular/core";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { Invoice } from "src/app/models";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";
import { InvoiceComponent } from "../invoice.component";
import {
	MaterialDialogConfig,
	DIALOG_BIG
} from "src/app/globals/material-dialog-config";

@Component({
	selector: "app-invoice-list",
	templateUrl: "./invoice-list.component.html",
	styles: []
})
export class InvoiceListComponent extends TableDataComponent<Invoice> {
	displayedColumns: string[] = [
		"date",
		"number",
		"project",
		"proforma",
		"payment",
		"amount"
	];
	dataSource: AppDataSource<Invoice>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "currency,project,items"
	};

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	getEndpoint() {
		return this.service.invoice.getInvoices;
	}

	getCountMethod() {
		return this.service.invoice.getInvoicesCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClickRow(invoice: Invoice) {
		const dialogRef = this.dialog.open(
			InvoiceComponent,
			new MaterialDialogConfig(
				{
					invoiceId: invoice.id,
					onDelete: () => {
						this.loadPage();
					},
					onCopy: () => {
						this.loadPage();
					}
				},
				DIALOG_BIG
			)
		);

		dialogRef.afterClosed().subscribe((newInvoice: Invoice) => {
			if (newInvoice) {
				invoice.issueDate = newInvoice.issueDate;
				invoice.project = newInvoice.project;
				invoice.items = newInvoice.items;
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(
			InvoiceComponent,
			new MaterialDialogConfig({}, DIALOG_BIG)
		);

		dialogRef.afterClosed().subscribe(data => {
			if (data) {
				this.loadPage();
			}
		});
	}
}
