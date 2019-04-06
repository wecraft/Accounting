import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";
import { Project } from "src/app/models";

@Injectable()
export class ProjectService {
	private _projects: Project[];
	constructor(public http: HttpClient) {}

	getProjects(params: any = {}): Observable<Project[]> {
		if (this._projects) {
			return of(this._projects);
		}
		return this.http
			.get(`/project`, {
				params: params
			})
			.pipe(
				map(data => {
					let res = plainToClass(Project, data["data"]);
					this._projects = res;
					return res;
				})
			);
	}
}
