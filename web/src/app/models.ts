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
