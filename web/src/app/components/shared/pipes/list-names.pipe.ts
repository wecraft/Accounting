import { Pipe } from "@angular/core";

@Pipe({
	name: "listNames"
})
export class ListNamesPipe {
	transform(value: any[], prop: string = "name"): string {
		return value.map(item => item[prop]).join(", ");
	}
}
