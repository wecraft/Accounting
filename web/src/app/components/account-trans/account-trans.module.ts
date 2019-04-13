import { NgModule } from "@angular/core";

import { AccountTransComponent } from "./account-trans.component";
import { SharedModule } from "../shared/shared.module";
import { AccountTransFormModule } from "./account-trans-form/account-trans-form.module";

@NgModule({
	imports: [SharedModule, AccountTransFormModule],
	declarations: [AccountTransComponent],
	entryComponents: [AccountTransComponent]
})
export class AccountTransModule {}
