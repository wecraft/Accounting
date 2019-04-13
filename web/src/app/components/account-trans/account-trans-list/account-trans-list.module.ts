import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { MatPaginatorModule, MatTableModule } from "@angular/material";
import { AccountIconModule } from "../../account/account-icon/account-icon.module";
import { AccountTransModule } from "../account-trans.module";
import { AccountTransListComponent } from "./account-trans-list.component";

@NgModule({
	imports: [
		SharedModule,
		MatPaginatorModule,
		MatTableModule,
		AccountIconModule,
		AccountTransModule
	],
	declarations: [AccountTransListComponent],
	exports: [AccountTransListComponent]
})
export class AccountTransListModule {}
