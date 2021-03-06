import { Type } from "class-transformer";
import { OrderType } from "./types";

export class User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	role: string;

	get isAdmin() {
		return this.role == "admin";
	}
}

export class TopicEvent {
	topic: string;
	data: any;

	constructor(topic: string, data?: any) {
		this.topic = topic;
		this.data = data;
	}
}

export class AppImage {
	id: number;
	meta: any;
	attachKey: string;
	thumb: string;
	main: string;
	orig: string;
	small: string;
	featured?: boolean;

	//Uploaded Image
	dimensions?: {
		width: number;
		height: number;
	};
	file?: File;
}

export class AppFile {
	id: number;
	name: string;
	size: number;
	meta: any;
	attachKey: string;
	extension: string;
	thumb: string;
	url: string;
	description?: string;

	@Type(() => Date)
	updatedAt: Date;

	constructor(name?: string) {
		this.name = name;
	}
}

export class Category {
	id: number;
	name: string;
}

export class Order {
	id: number;
	amount: number;
	type: OrderType;
	rate: number;
	date: Date;
	desc: string;
	tax: boolean;
	vat: boolean;
	createdAt: Date;
	other: string;
	files_count: number;

	@Type(() => Currency)
	currency: Currency;

	@Type(() => Account)
	account: Account;

	@Type(() => Category)
	category: Category;

	@Type(() => UserPie)
	pies: UserPie[];

	@Type(() => Invoice)
	invoices: Invoice[];

	@Type(() => Project)
	projects: Project[];

	@Type(() => AppFile)
	files: AppFile[];

	get tableInfo(): string {
		let info: string = "";

		if (this.category) {
			info = this.category.name;

			//Show additional info if the category is "Other"
			if (this.category.id == 27) {
				info += `: ${this.other}`;
			}
		}
		return info;
	}
}

export class Account {
	id: number;
	name: string;
	code: string;
	meta: any;
	defCurrency: number;
}

export class AccountTrans {
	id: number;
	amount1: number;
	amount2: number;
	date: Date;
	createdAt: Date;

	@Type(() => Account)
	account1: Account;

	@Type(() => Account)
	account2: Account;

	@Type(() => Currency)
	currency1: Currency;

	@Type(() => Currency)
	currency2: Currency;
}

export class Client {
	id: number;
	name: string;
	eik: string;
	mol: string;
	email: string;
	city: string;
	address: string;
	postCode: string;
	company: boolean;
	vat: boolean;
	createdAt: Date;

	@Type(() => Country)
	country: Country;

	@Type(() => Project)
	projects: Project[];
}

export class Country {
	id: number;
	name: string;
	code: string;
	zip: string;
}

export class Currency {
	id: number;
	name: string;
}

export class Invoice {
	id: number;
	prefix: number;
	number: number;
	meta: any;
	advance: boolean;
	proforma: boolean;
	issueDate: Date;
	dueDate: Date;
	pmtDate: string;
	advPmtDate: Date;
	createdAt: Date;
	invoiceNumber: string;

	@Type(() => Currency)
	currency: Currency;

	@Type(() => Account)
	account: Account;

	@Type(() => Project)
	project: Project;

	@Type(() => Order)
	orders: Order[];

	@Type(() => InvoiceItem)
	items: InvoiceItem[];

	get amount() {
		let amount = 0;

		if (this.items) {
			this.items.forEach((item) => {
				amount += item.amount;
			});
		}

		return amount;
	}
}

export class InvoiceItem {
	id: number;
	descBg: string;
	descEn: string;
	qty: string;
	amount: number;
}

export class Project {
	id: number;
	name: string;
	price: number;
	status: string;
	createdAt: Date;

	@Type(() => Currency)
	currency: Currency;

	@Type(() => Client)
	client: Client;

	@Type(() => UserPie)
	pies: UserPie[];

	@Type(() => Order)
	orders: Order[];

	@Type(() => Invoice)
	invoices: Invoice[];

	get payments() {
		if (!this.orders) {
			return 0;
		}

		const sum = this.orders
			.filter((item) => item.type == "income")
			.reduce((sum, current) => sum + current.amount, 0);
		const percent = Math.round((sum / this.price) * 100);

		return percent;
	}
}

export class UserPie {
	id: number;
	amount: number;
	userId: number;

	constructor(userId?: number, amount?: number) {
		this.userId = userId;
		this.amount = amount;
	}
}

export class UserTrans {
	id: number;
	amount: number;
	desc: string;
	createdAt: Date;

	@Type(() => User)
	user1: User;

	@Type(() => User)
	user2: User;

	@Type(() => Currency)
	currency: Currency;
}

export class BankImport {
	@Type(() => Order)
	orders: Order[];

	@Type(() => AccountTrans)
	transfers: AccountTrans[];
}
