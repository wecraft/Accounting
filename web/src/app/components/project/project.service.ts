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

	getProjects = (params: any = {}): Observable<Project[]> => {
		return this.http
			.get(`/project`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Project, data["data"]);
				})
			);
	};

	getProgressProjects = (params: any = {}): Observable<Project[]> => {
		if (this._projects) {
			return of(this._projects);
		}
		params.in_progress = 1;
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
	};

	getProjectsCount(): Observable<number> {
		return this.http.get(`/project/count`).pipe(map(data => data["data"]));
	}

	getProject(id: number, params: any = {}): Observable<Project> {
		return this.http
			.get(`/project/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Project, data["data"] as Project);
				})
			);
	}

	updateProject = (id: number, data: FormData): Observable<Project> => {
		data.append("_method", "PUT");
		return this.http.post(`/project/${id}`, data).pipe(
			map(data => {
				return plainToClass(Project, data["data"] as Project);
			})
		);
	};

	createProject = (data: FormData): Observable<Project> => {
		return this.http.post(`/project`, data).pipe(
			map(data => {
				return plainToClass(Project, data["data"] as Project);
			})
		);
	};

	deleteProject(id: number): Observable<any> {
		return this.http.delete(`/project/${id}`);
	}
}
