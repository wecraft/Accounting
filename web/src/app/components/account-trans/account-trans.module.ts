import { NgModule } from "@angular/core";
import { AccountTransComponent } from "./account-trans.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	imports: [SharedModule],
	declarations: [AccountTransComponent],
	exports: [AccountTransComponent]
})
export class AccountTransModule {}
