import { NgModule } from "@angular/core";
import { UserTransComponent } from "./user-trans.component";
import { SharedModule } from "../shared/shared.module";
import { UserTransFormModule } from "./user-trans-form/user-trans-form.module";

@NgModule({
	imports: [SharedModule, UserTransFormModule],
	declarations: [UserTransComponent],
	entryComponents: [UserTransComponent]
})
export class UserTransModule {}
