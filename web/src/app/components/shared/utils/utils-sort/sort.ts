export class Sort {
	type: "name" | "created" | "matching";
	sort: "asc" | "desc";

	constructor(type?, sort?) {
		this.type = type;
		this.sort = sort;
	}
}
