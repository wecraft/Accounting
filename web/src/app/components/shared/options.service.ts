import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Industry } from "./models/industry";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { OwnerType } from "./models/owner-type";
import { Salutation } from "./models/salutation";
import { BusinessSize } from "./models/business-size";
import { WorkHours } from "./models/workhours";
import { plainToClass } from "class-transformer";
import { MessageType } from "./models/message-type";
import { Country } from "./models/country";
import { TimeZone } from "./models/timezone";
import { Degree } from "./models/degree";
import { AppFile } from "./models/file";
import { PriceRange } from "./models/pricerange";
import { PRICE_RANGE } from "../../mocks/price-ranges";
import { InfoType } from "./models/infotype";
import { Language } from "./models/language";
import { Category } from "./models/category";
import { AppLocation } from "./models/location";
import { ResCategory } from "./models/res-category";
import { Tag } from "./models/tag";

@Injectable()
export class OptionsService {
	private _industries: Industry[];
	private _categories: Category[];
	private _languages: Language[];
	private _ownerTypes: OwnerType[];
	private _salutations: Salutation[];
	private _businessSizes: BusinessSize[];
	private _workHours: WorkHours[];
	private _messageTypes: MessageType[];
	private _countries: Country[];
	private _timezones: TimeZone[];
	private _degrees: Degree[];
	private _files: AppFile[];
	private _priceRanges: PriceRange[];
	private _infoTypes: InfoType[];
	private _resCategories: ResCategory[];
	private _tags: Tag[];

	constructor(private http: HttpClient) {}

	refreshOptions(name: string) {
		if (this[`_${name}`]) {
			this[`_${name}`] = null;
		}
	}

	getFiles(): Observable<any> {
		if (this._files) {
			return of(this._files);
		}
		return of(plainToClass(AppFile, this._mockOptions("Files")));
	}

	getPriceRanges(): Observable<PriceRange[]> {
		if (this._priceRanges) {
			return of(this._priceRanges);
		}
		return of(plainToClass(PriceRange, PRICE_RANGE));
	}

	getDegrees(): Observable<Degree[]> {
		if (this._degrees) {
			return of(this._degrees);
		}
		return this.http.get("/options/degree").pipe(
			map(res => {
				const data = plainToClass(Degree, res["data"]);
				this._degrees = data;
				return data;
			})
		);
	}

	getIndustries(): Observable<Industry[]> {
		if (this._industries) {
			return of(this._industries);
		}
		return this.http.get("/options/industry").pipe(
			map(res => {
				const data = plainToClass(Industry, res["data"]);
				this._industries = data;
				return data;
			})
		);
	}

	getCategories(): Observable<Category[]> {
		if (this._categories) {
			return of(this._categories);
		}
		return this.http.get("/options/category").pipe(
			map(res => {
				const data = plainToClass(Category, res["data"]);
				this._categories = data;
				return data;
			})
		);
	}

	getLanguages(): Observable<Language[]> {
		if (this._languages) {
			return of(this._languages);
		}
		return this.http.get("/options/language").pipe(
			map(res => {
				const data = plainToClass(Language, res["data"]);
				this._languages = data;
				return data;
			})
		);
	}

	getOwnerTypes(): Observable<OwnerType[]> {
		if (this._ownerTypes) {
			return of(this._ownerTypes);
		}
		return this.http.get("/options/ownerType").pipe(
			map(res => {
				const data = plainToClass(OwnerType, res["data"]);
				this._ownerTypes = data;
				return data;
			})
		);
	}

	getSalutations(): Observable<Salutation[]> {
		if (this._salutations) {
			return of(this._salutations);
		}
		return this.http.get("/options/salutation").pipe(
			map(res => {
				const data = plainToClass(Salutation, res["data"]);
				this._salutations = data;
				return data;
			})
		);
	}

	getBusinessSizes(): Observable<BusinessSize[]> {
		if (this._businessSizes) {
			return of(this._businessSizes);
		}
		return this.http.get("/options/businessSize").pipe(
			map(res => {
				const data = plainToClass(BusinessSize, res["data"]);
				this._businessSizes = data;
				return data;
			})
		);
	}

	getWorkHours(): Observable<WorkHours[]> {
		if (this._workHours) {
			return of(this._workHours);
		}
		return this.http.get("/options/workHours").pipe(
			map(res => {
				const data = plainToClass(WorkHours, res["data"]);
				this._workHours = data;
				return data;
			})
		);
	}

	getBusinessYears(): Observable<any> {
		let data: number[] = [];
		const start = Math.max(new Date().getFullYear(), 1901);
		for (let i = start; i >= 1900; i--) {
			data.push(i);
		}
		return of(data);
	}

	getMessageType(): Observable<MessageType[]> {
		if (this._messageTypes) {
			return of(this._messageTypes);
		}
		return this.http.get("/options/messageType").pipe(
			map(res => {
				const data = plainToClass(MessageType, res["data"]);
				this._messageTypes = data;
				return data;
			})
		);
	}

	getCountries(): Observable<Country[]> {
		if (this._countries) {
			return of(this._countries);
		}
		return this.http.get("/options/country").pipe(
			map(res => {
				const data = plainToClass(Country, res["data"]);
				this._countries = data;
				return data;
			})
		);
	}

	getTimezone(): Observable<TimeZone[]> {
		if (this._timezones) {
			return of(this._timezones);
		}
		return this.http.get("/options/timeZone").pipe(
			map(res => {
				const data = plainToClass(TimeZone, res["data"]);
				this._timezones = data;
				return data;
			})
		);
	}

	getInfoTypes(): Observable<InfoType[]> {
		if (this._infoTypes) {
			return of(this._infoTypes);
		}
		return this.http.get("/options/infoType").pipe(
			map(res => {
				const data = plainToClass(InfoType, res["data"]);
				this._infoTypes = data;
				return data;
			})
		);
	}

	getLocation(placeId: string): Observable<AppLocation> {
		return this.http.get(`/location/${placeId}`).pipe(
			map(res => {
				return plainToClass(AppLocation, res["data"] as AppLocation);
			})
		);
	}

	updateIndustry(data: FormData): Observable<Industry> {
		data.append("type", "industry");
		data.append("_method", "PUT");
		return this.http.post(`/adm/options/${data.get("id")}`, data).pipe(
			map(res => {
				return plainToClass(Industry, res["data"] as Industry);
			})
		);
	}

	createIndustry(data: FormData): Observable<Industry> {
		data.append("type", "industry");
		return this.http.post(`/adm/options`, data).pipe(
			map(res => {
				return plainToClass(Industry, res["data"] as Industry);
			})
		);
	}

	deleteIndustry(id: number): Observable<any> {
		return this.http.delete(`/adm/options/${id}?type=industry`);
	}

	getResCategories(): Observable<ResCategory[]> {
		if (this._resCategories) {
			return of(this._resCategories);
		}
		return this.http.get("/options/res_category").pipe(
			map(res => {
				const data = plainToClass(ResCategory, res["data"]);
				this._resCategories = data;
				return data;
			})
		);
	}

	getTags(): Observable<Tag[]> {
		if (this._tags) {
			return of(this._tags);
		}
		return this.http.get("/options/tag").pipe(
			map(res => {
				const data = plainToClass(Tag, res["data"]);
				this._tags = data;
				return data;
			})
		);
	}

	private _mockOptions(name: string, count: number = 5) {
		let data = [];
		for (let i = 1; i <= 5; i++) {
			data.push({
				id: i,
				name: `${name} - ${i}`
			});
		}
		return data;
	}
}
