import { NgModule } from "@angular/core";
import { ClientComponent } from "./client.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [ClientComponent],
	entryComponents: [ClientComponent]
})
export class ClientModule {}
