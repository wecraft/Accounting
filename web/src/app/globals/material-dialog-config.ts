import { MatDialogConfig } from "@angular/material";

export class MaterialDialogConfig extends MatDialogConfig {
	constructor(data: any = {}, width: string = "720px") {
		super();
		this.data = data;
		this.width = width;
		this.hasBackdrop = true;
		this.disableClose = true;
		this.closeOnNavigation = true;
	}
}

export const DIALOG_SMALL: string = "480px";
export const DIALOG_MID: string = "720px";
export const DIALOG_BIG: string = "1200px";
