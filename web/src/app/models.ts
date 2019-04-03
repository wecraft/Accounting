import { Type } from "class-transformer";

export class User {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
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
}
