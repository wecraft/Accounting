import { OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";
import { AppService } from "../../../app.service";
import { User } from "src/app/models";

export class AuthenticableComponent implements OnInit, OnDestroy {
	public authUserSubject: Subscription;

	authUser: User;

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.authUserSubject = this.service.auth.authUserSubject.subscribe(
			(user: User) => {
				this.authUser = user;
				this.onChangeUser();
			}
		);
	}

	ngOnDestroy() {
		if (this.authUserSubject) {
			this.authUserSubject.unsubscribe();
		}
		//Logic
	}

	onChangeUser() {
		//Logic
	}
}
