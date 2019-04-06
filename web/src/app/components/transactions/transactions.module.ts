import { NgModule } from "@angular/core";
import { TransactionsComponent } from "../transactions/transactions.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { AccountTransModule } from "../account-trans/account-trans.module";
import { UserTransModule } from "../user-trans/user-trans.module";
import { BankTransModule } from "../bank-trans/bank-trans.module";
import { AccountTransComponent } from "../account-trans/account-trans.component";
import { BankTransComponent } from "../bank-trans/bank-trans.component";
import { UserTransComponent } from "../user-trans/user-trans.component";
import { MatTabsModule, MatTabNav } from "@angular/material";

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
				component: AccountTransComponent
			},
			{
				path: "user",
				component: UserTransComponent
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
		AccountTransModule,
		UserTransModule,
		BankTransModule
	],
	exports: [RouterModule]
})
export class TransactionsModule {}
