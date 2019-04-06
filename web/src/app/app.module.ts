import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { SharedModule } from "./components/shared/shared.module";
import { AppRootModule } from "./app-root.module";
import { AppService } from "./app.service";
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthService } from "./components/auth/auth.service";
import { EmitterService } from "./components/shared/broadcast/emitter.service";
import { MatIconRegistry, MatNativeDateModule } from "@angular/material";
import { TransactionService } from "./components/transactions/transaction.service";
import { ProjectService } from "./components/project/project.service";
import { InvoiceService } from "./components/invoice/invoice.service";
import { ClientService } from "./components/client/client.service";
import { AccountService } from "./components/account/account.service";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CommonModule,
		AppRoutingModule,
		SharedModule,
		AppRootModule,
		MatNativeDateModule
	],
	providers: [
		AppService,
		AuthService,
		EmitterService,
		AuthGuard,
		GuestGuard,
		AdminGuard,
		MatIconRegistry,
		TransactionService,
		ProjectService,
		InvoiceService,
		ClientService,
		AccountService,
		{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
