import { NgModule } from "@angular/core";
import { ClientFormComponent } from "./client-form.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [ClientFormComponent],
	exports: [ClientFormComponent]
})
export class ClientFormModule {}
