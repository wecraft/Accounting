import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "nl2br"
})
export class Nl2BrPipe implements PipeTransform {
	transform(input: string): any {
		let ret: string;

		if (typeof input === "undefined") {
			return input;
		}

		ret = input.replace(/<\S[^><]*>/g, "");
		ret = this.nl2br(ret);
		return ret;
	}

	nl2br(str, is_xhtml = true) {
		if (typeof str === "undefined" || str === null) {
			return "";
		}
		var breakTag =
			is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
		return (str + "").replace(
			/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
			"$1" + breakTag + "$2"
		);
	}
}
