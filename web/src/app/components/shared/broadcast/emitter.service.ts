import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TopicEvent } from "src/app/models";

@Injectable()
export class EmitterService {
	public emitterSubject: Subject<TopicEvent> = new Subject<TopicEvent>();

	emit(topic: string, data?: any) {
		const event = new TopicEvent(topic, data);
		this.emitterSubject.next(event);
	}
}
