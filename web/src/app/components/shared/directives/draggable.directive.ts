import {
	Directive,
	Input,
	ViewContainerRef,
	ElementRef,
	Renderer2,
	Output,
	EventEmitter
} from "@angular/core";
import * as $ from "jquery";

@Directive({
	selector: "[app-draggable]",
	exportAs: "draggable"
})
export class DraggableDirective {
	@Input() parent: string;
	@Output() onDrop = new EventEmitter<any>();

	private isDragging: boolean = false;
	private xPos: number;
	private yPos: number;
	private left: number;
	private top: number;
	private newLeft: number = null;
	private newTop: number = null;

	constructor(
		public viewContainerRef: ViewContainerRef,
		public el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit() {
		const el = $(this.el.nativeElement);
		const parent = el.closest(this.parent);

		const helper = el;
		helper.mousedown(e => {
			e.stopPropagation();
			this.xPos = e.pageX;
			this.yPos = e.pageY;
			this.left = Math.round(el.position().left);
			this.top = Math.round(el.position().top);
			this.isDragging = true;
			el.addClass("ui-dragging");
		});

		$(document)
			.mousemove(e => {
				if (this.isDragging) {
					let xDiff = Math.round(e.pageX - this.xPos);
					let yDiff = Math.round(e.pageY - this.yPos);
					this.newTop = Math.round(this.top + yDiff);
					this.newLeft = Math.round(this.left + xDiff);

					el.css({
						top: this.newTop + "px",
						left: this.newLeft + "px"
					});
				}
			})
			.mouseup(e => {
				if (this.isDragging) {
					this.isDragging = false;
					el.removeClass("ui-dragging");

					this.onDrop.next();
				}
			});
	}
}
