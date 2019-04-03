import { OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs";
import { FormComponent } from "../form/form-component";
import { User } from "src/app/models";

export abstract class AuthenticableFormComponent extends FormComponent
	implements OnInit, OnDestroy {
	public authUserSubject: Subscription;

	authUser: User;

	ngOnInit() {
		super.ngOnInit();

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
