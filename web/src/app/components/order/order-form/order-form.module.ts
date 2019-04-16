import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { OrderFormComponent } from "./order-form.component";
import { MatDatepickerModule } from "@angular/material";
import { UserPieFormModule } from "../../user/user-pie-form/user-pie-form.module";
import { AccountFormModule } from "../../account/account-form/account-form.module";
import { UtilUploaderModule } from "../../shared/utils/util-uploader/util-uploader.module";

@NgModule({
	imports: [
		SharedModule,
		MatDatepickerModule,
		UserPieFormModule,
		AccountFormModule,
		UtilUploaderModule
	],
	declarations: [OrderFormComponent],
	exports: [OrderFormComponent]
})
export class OrderFormModule {}
