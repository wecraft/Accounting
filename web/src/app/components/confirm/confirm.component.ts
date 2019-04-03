import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
	selector: "app-confirm",
	templateUrl: "./confirm.component.html",
	styles: []
})
export class ConfirmComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<ConfirmComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			type: string;
			data: any;
			onConfirm: () => {};
		}
	) {}

	ngOnInit() {
		console.log(this.data);
	}

	confirm() {
		if (this.data.onConfirm) {
			this.data.onConfirm();
		}
		this.dialogRef.close();
	}
}
