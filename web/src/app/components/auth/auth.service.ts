import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { plainToClass } from "class-transformer";
import { Router } from "@angular/router";
import { User } from "src/app/models";

@Injectable()
export class AuthService {
	//Cache authUser
	private _authUser: User;
	authUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);

	get authUser(): User {
		return this._authUser;
	}

	set authUser(user: User) {
		this._authUser = user;

		this.authUserSubject.next(user);
	}

	redirectUrl: string = "/";

	constructor(private http: HttpClient, private router: Router) {}

	login(data): Observable<any> {
		return this.http.post("/auth/login", data).pipe(
			map(res => {
				return res["access_token"];
			})
		);
	}

	logout() {
		localStorage.removeItem("authUser");

		this.authUser = null;

		this.router.navigate(["/auth/login"]);
	}

	me(): Observable<User> {
		return this.http.get("/auth/me").pipe(
			map(res => {
				let user: User = res["data"] as User;

				return plainToClass(User, user);
			})
		);
	}

	reloadAuthUser() {
		this.me().subscribe(data => {
			this.authUser = data;
		});
	}
}
