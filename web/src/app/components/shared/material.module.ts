import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
	MatSelectModule,
	MatTabsModule,
	MatButtonModule,
	MatCheckboxModule,
	MatRadioModule,
	MatDialogModule,
	MatInputModule,
	MatIconModule
} from "@angular/material";

@NgModule({
	imports: [
		CommonModule,
		MatSelectModule,
		MatTabsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule
	],
	exports: [
		MatSelectModule,
		MatTabsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule
	]
})
export class MaterialModule {}
