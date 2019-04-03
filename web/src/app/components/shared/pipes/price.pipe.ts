import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "price" })
export class PricePipe implements PipeTransform {
	transform(value: number, type: string = ""): string {
		let price: any = value / 100;

		if (type == "monthly") {
			price += "/m";
		} else if (type == "cad") {
			price = `C$ ${price}`;
		} else if (type == "usd") {
			price = `$ ${price}`;
		}
		return price;
	}
}
