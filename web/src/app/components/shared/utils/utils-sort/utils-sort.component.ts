import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Sort } from "./sort";

@Component({
	selector: "app-utils-sort",
	templateUrl: "./utils-sort.component.html",
	styles: []
})
export class UtilsSortComponent implements OnInit {
	@Output() onChange: EventEmitter<Sort> = new EventEmitter<Sort>();

	@Input("sort") defaultSort: "asc" | "desc";

	@Input("type") defaultType: string;

	@Input("matching") matching: boolean;

	types = [
		{ key: "name", label: "Name" },
		{ key: "created", label: "Date Created" }
	];

	sort: string = "asc";
	type: string = "name";

	constructor() {}

	ngOnInit() {
		if (this.defaultSort) {
			this.sort = this.defaultSort;
		}
		if (this.defaultType) {
			this.type = this.defaultType;
		}
		if (this.matching) {
			this.types.push({ key: "matching", label: "Matching" });
		}
	}

	private change() {
		this.onChange.next(new Sort(this.type, this.sort));
	}

	// asc <> desc toggle
	sortChange() {
		if (this.sort === "asc") {
			this.sort = "desc";
		} else {
			this.sort = "asc";
		}
		this.change();
	}

	typeChange() {
		this.change();
	}
}
