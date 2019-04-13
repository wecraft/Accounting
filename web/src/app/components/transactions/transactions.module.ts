import { NgModule } from "@angular/core";
import { TransactionsComponent } from "../transactions/transactions.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { UserTransModule } from "../user-trans/user-trans.module";
import { BankTransModule } from "../bank-trans/bank-trans.module";
import { BankTransComponent } from "../bank-trans/bank-trans.component";
import { MatTabsModule } from "@angular/material";
import { AccountTransListComponent } from "../account-trans/account-trans-list/account-trans-list.component";
import { AccountTransListModule } from "../account-trans/account-trans-list/account-trans-list.module";
import { UserTransListModule } from "../user-trans/user-trans-list/user-trans-list.module";
import { UserTransListComponent } from "../user-trans/user-trans-list/user-trans-list.component";

const routes: Routes = [
	{
		path: "",
		component: TransactionsComponent,
		children: [
			{
				path: "bank",
				component: BankTransComponent
			},
			{
				path: "account",
				component: AccountTransListComponent
			},
			{
				path: "user",
				component: UserTransListComponent
			},
			{
				path: "",
				redirectTo: "bank",
				pathMatch: "full"
			}
		]
	}
];

@NgModule({
	declarations: [TransactionsComponent],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MatTabsModule,
		AccountTransListModule,
		BankTransModule,
		UserTransListModule
	],
	exports: [RouterModule]
})
export class TransactionsModule {}
