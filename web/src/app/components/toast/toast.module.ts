import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "./toast.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [ToastComponent],
	exports: [ToastComponent]
})
export class ToastModule {}
