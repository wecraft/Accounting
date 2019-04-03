import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
	MatSelectModule,
	MatTabsModule,
	MatButtonModule,
	MatCheckboxModule,
	MatRadioModule,
	MatDialogModule
} from "@angular/material";
import { MaterialDialogHeaderModule } from "./material-dialog-header/material-dialog-header.module";

@NgModule({
	imports: [
		CommonModule,
		MatSelectModule,
		MatTabsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDialogModule,
		MaterialDialogHeaderModule
	],
	exports: [
		MatSelectModule,
		MatTabsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDialogModule,
		MaterialDialogHeaderModule
	]
})
export class MaterialModule {}
