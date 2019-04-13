import { Component, OnInit, ViewChild } from "@angular/core";
import { TableDataComponent } from "../../shared/extends/TableDataComponent";
import { UserTrans } from "src/app/models";
import { AppDataSource } from "../../shared/extends/AppDataSource";
import { MatPaginator, MatDialog } from "@angular/material";
import { AppService } from "src/app/app.service";
import { UserTransComponent } from "../user-trans.component";
import { MaterialDialogConfig } from "src/app/globals/material-dialog-config";

@Component({
	selector: "app-user-trans-list",
	templateUrl: "./user-trans-list.component.html",
	styles: []
})
export class UserTransListComponent extends TableDataComponent<UserTrans> {
	displayedColumns: string[] = ["date", "users", "amount"];
	dataSource: AppDataSource<UserTrans>;
	dataCount: number;
	chunk: number = 100;
	params = {
		include: "user1,user2,currency"
	};

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService, public dialog: MatDialog) {
		super(service);
	}

	getEndpoint() {
		return this.service.transaction.getUserTransactions;
	}

	getCountMethod() {
		return this.service.transaction.getUserTransCount();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onClickRow(userTrans: UserTrans) {
		const dialogRef = this.dialog.open(
			UserTransComponent,
			new MaterialDialogConfig({
				userTransId: userTrans.id
			})
		);

		dialogRef.afterClosed().subscribe((newUserTrans: UserTrans) => {
			if (newUserTrans) {
				userTrans.amount = newUserTrans.amount;
				userTrans.currency = newUserTrans.currency;
				userTrans.user1 = newUserTrans.user1;
				userTrans.user2 = newUserTrans.user2;
			}
		});
	}
}
