import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";

export class AppDataSource<T> implements DataSource<T> {
	private resourceSubject = new BehaviorSubject<T[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	constructor(private endpoint: any) {}

	connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.resourceSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.resourceSubject.complete();
		this.loadingSubject.complete();
	}

	load(page: number, chunk: number = 100, params: any = {}) {
		page += 1; //index starts from 0
		params.page = page;
		params.chunk = chunk;

		this.loadingSubject.next(true);

		this.endpoint(params).subscribe(data => {
			this.resourceSubject.next(data);
		});
	}
}
