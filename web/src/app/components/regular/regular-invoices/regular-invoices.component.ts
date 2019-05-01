import { Component, OnInit, ViewChild } from "@angular/core";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { Invoice } from "src/app/models";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";

@Component({
	selector: "app-regular-invoices",
	templateUrl: "./regular-invoices.component.html",
	styles: []
})
export class RegularInvoicesComponent extends TableDataComponent<Invoice> {
	displayedColumns: string[] = [
		"date",
		"number",
		"project",
		"proforma",
		"payment",
		"download",
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
		return this.service.regular.getInvoices;
	}

	getCountMethod() {
		return this.service.regular.getInvoicesCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	viewPdf(invoice: Invoice, type: "original" | "copy") {
		this.service.regular
			.getInvoicePdf(invoice.id, {
				responseType: type
			})
			.subscribe(data => {
				const fileURL = URL.createObjectURL(data);
				window.open(fileURL, "_blank");
			});
	}
}
