import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ClientListComponent } from "./client-list/client-list.component";
import { ClientListModule } from "./client-list/client-list.module";

const routes: Routes = [
	{
		path: "",
		component: ClientListComponent
	}
];

@NgModule({
	declarations: [],
	imports: [SharedModule, RouterModule.forChild(routes), ClientListModule],
	exports: [RouterModule]
})
export class ClientLazyModule {}
