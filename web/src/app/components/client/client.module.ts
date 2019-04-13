import { NgModule } from "@angular/core";
import { ClientComponent } from "./client.component";
import { SharedModule } from "../shared/shared.module";
import { ClientFormModule } from "./client-form/client-form.module";

@NgModule({
	imports: [SharedModule, ClientFormModule],
	declarations: [ClientComponent],
	entryComponents: [ClientComponent]
})
export class ClientModule {}
