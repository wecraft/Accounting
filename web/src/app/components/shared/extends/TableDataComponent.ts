import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/app.service";
import { MatPaginator } from "@angular/material";
import { tap } from "rxjs/operators";
import { AppDataSource } from "./AppDataSource";
import { Observable } from "rxjs";

export abstract class TableDataComponent<T> implements OnInit {
	abstract displayedColumns: string[];
	dataSource: AppDataSource<T>;
	dataCount: number;
	chunk: number = 100;
	params = {};
	pageSizes = [100, 250, 500];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(protected service: AppService) {}

	ngOnInit() {
		this.loadCount();
		this.dataSource = new AppDataSource(this.getEndpoint());
		this.dataSource.load(0, this.chunk, this.params);
	}

	abstract getEndpoint(): any;
	abstract getCountMethod(): Observable<number>;

	ngAfterViewInit() {
		if (this.paginator) {
			this.paginator.page.pipe(tap(() => this.loadPage())).subscribe();
		}
	}

	loadCount() {
		if (this.getCountMethod()) {
			this.getCountMethod().subscribe(data => (this.dataCount = data));
		}
	}

	loadPage() {
		this.loadCount();
		if (this.paginator) {
			this.dataSource.load(
				this.paginator.pageIndex,
				this.paginator.pageSize,
				this.params
			);
		} else {
			this.dataSource.load(0, this.chunk, this.params);
		}
	}
}
