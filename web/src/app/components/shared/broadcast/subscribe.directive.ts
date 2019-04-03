import { Directive, Input, Output, EventEmitter } from "@angular/core";

import { EmitterService } from "./emitter.service";
import { TopicEvent } from "src/app/models";

@Directive({
	selector: "[subscribe]"
})
export class SubscribeDirective {
	private _subsription: any;

	@Input() subscribe: any;
	@Output() onEvent = new EventEmitter();

	constructor(private emitter: EmitterService) {}

	ngOnInit() {
		this._subsription = this.emitter.emitterSubject.subscribe(
			(event: TopicEvent) => {
				if (this.subscribe) {
					if (
						(typeof this.subscribe == "string" &&
							this.subscribe == event.topic) ||
						(this.subscribe instanceof Array &&
							this.subscribe.includes(event.topic))
					) {
						this.onEvent.next(event);
					}
				} else {
					this.onEvent.next(event);
				}
			}
		);
	}

	ngOnDestroy() {
		if (this._subsription) {
			this._subsription.unsubscribe();
		}
	}
}
