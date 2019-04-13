import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { UserTransListComponent } from "./user-trans-list.component";
import { UserTransModule } from "../user-trans.module";
import { MatPaginatorModule, MatTableModule } from "@angular/material";

@NgModule({
	imports: [
		SharedModule,
		MatPaginatorModule,
		MatTableModule,
		UserTransModule
	],
	declarations: [UserTransListComponent],
	exports: [UserTransListComponent]
})
export class UserTransListModule {}
