import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "app-empty-feed",
	templateUrl: "./empty-feed.component.html",
	styles: []
})
export class EmptyFeedComponent implements OnInit {
	@Input() text: string;
	constructor() {}

	ngOnInit() {}
}
