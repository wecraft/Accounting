export class FormModelMap {
	name?: string;
	model?: any;
	multiple?: boolean;
	fillable?: string[] = [];
	//когато има рйлейшън към модел с ID
	singleRelations?: string[] = [];
	multipleRelations?: string[] = [];

	children?: FormModelMap[] = [];

	constructor(fillable: string[] = []) {
		this.fillable = fillable;
	}
}
