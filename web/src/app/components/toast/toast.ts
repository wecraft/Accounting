export class Toast {
	type: "success" | "info" | "danger" | "warning";
	timeout: number;
	text: string;
	data: any;

	constructor(
		text: string,
		type: "success" | "info" | "danger" | "warning" = "success",
		data: any = {},
		timeout = 5000
	) {
		this.text = text;
		this.type = type;
		this.timeout = timeout;
		this.data = data;
	}
}
