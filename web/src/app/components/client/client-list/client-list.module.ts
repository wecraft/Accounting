import { NgModule } from "@angular/core";
import { ClientListComponent } from "./client-list.component";
import { SharedModule } from "../../shared/shared.module";
import { ClientModule } from "../client.module";
import { MatPaginatorModule, MatTableModule } from "@angular/material";

@NgModule({
	imports: [SharedModule, MatPaginatorModule, MatTableModule, ClientModule],
	declarations: [ClientListComponent],
	exports: [ClientListComponent]
})
export class ClientListModule {}
