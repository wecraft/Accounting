import { NgModule } from "@angular/core";
import { ClientListComponent } from "./client-list.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [ClientListComponent],
	exports: [ClientListComponent]
})
export class ClientListModule {}
