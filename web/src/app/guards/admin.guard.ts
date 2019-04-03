import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild
} from "@angular/router";
import { AppService } from "../app.service";

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
	constructor(private service: AppService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		let ret: boolean;

		ret =
			this.service.auth.authUser &&
			this.service.auth.authUser.role == "admin";

		return ret;
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		return this.canActivate(route, state);
	}
}
