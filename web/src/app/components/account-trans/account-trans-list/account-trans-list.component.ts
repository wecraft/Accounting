import { Component, ViewChild } from "@angular/core";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { AccountTrans } from "src/app/models";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";
import { AccountTransComponent } from "../account-trans.component";

@Component({
	selector: "app-account-trans-list",
	templateUrl: "./account-trans-list.component.html",
	styles: []
})
export class AccountTransListComponent extends TableDataComponent<
	AccountTrans
> {
	displayedColumns: string[] = ["date", "accounts", "amount"];
	dataSource: AppDataSource<AccountTrans>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "currency1,account1,currency2,account2"
	};

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	getEndpoint() {
		return this.service.transaction.getAccountTransactions;
	}

	getCountMethod() {
		return this.service.transaction.getAccountTransCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClickRow(accountTrans: AccountTrans) {
		const dialogRef = this.dialog.open(
			AccountTransComponent,
			new MaterialDialogConfig({
				accountTransId: accountTrans.id,
				onDelete: () => {
					this.loadPage();
				}
			})
		);

		dialogRef.afterClosed().subscribe((newAccountTrans: AccountTrans) => {
			if (newAccountTrans) {
				accountTrans.account1 = newAccountTrans.account1;
				accountTrans.account2 = newAccountTrans.account2;
				accountTrans.currency1 = newAccountTrans.currency1;
				accountTrans.currency2 = newAccountTrans.currency2;
				accountTrans.amount1 = newAccountTrans.amount1;
				accountTrans.amount2 = newAccountTrans.amount2;
				accountTrans.date = new Date(newAccountTrans.date);
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(
			AccountTransComponent,
			new MaterialDialogConfig()
		);

		dialogRef.afterClosed().subscribe(data => {
			if (data) {
				this.loadPage();
			}
		});
	}
}
