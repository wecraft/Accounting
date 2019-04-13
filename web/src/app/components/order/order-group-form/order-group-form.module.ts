import { NgModule } from "@angular/core";
import { OrderGroupFormComponent } from "./order-group-form.component";
import { SharedModule } from "../../shared/shared.module";
import { OrderFormModule } from "../order-form/order-form.module";

@NgModule({
	imports: [SharedModule, OrderFormModule],
	declarations: [OrderGroupFormComponent],
	exports: [OrderGroupFormComponent]
})
export class OrderGroupFormModule {}
