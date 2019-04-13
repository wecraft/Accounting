import { NgModule } from "@angular/core";
import { OrderComponent } from "../order/order.component";
import { SharedModule } from "../shared/shared.module";
import { MatDialogModule } from "@angular/material";
import { OrderFormModule } from "./order-form/order-form.module";
import { OrderGroupFormModule } from "./order-group-form/order-group-form.module";

@NgModule({
	imports: [
		SharedModule,
		MatDialogModule,
		OrderFormModule,
		OrderGroupFormModule
	],
	declarations: [OrderComponent],
	entryComponents: [OrderComponent]
})
export class OrderModule {}
