import { NgModule } from "@angular/core";
import { UserTransComponent } from "./user-trans.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [UserTransComponent],
	exports: [UserTransComponent]
})
export class UserTransModule {}
