import { Component, Input } from "@angular/core";

import { UtilImageEditorComponent } from "./util-image-editor.component";

@Component({
	exportAs: "utilImageZoom",
	selector: "util-image-zoom",
	templateUrl: "./util-image-zoom.component.html"
})
export class UtilImageZoomComponent {
	@Input() editor: UtilImageEditorComponent;
	@Input() value: number = 1;
	constructor() {}

	ngOnInit() {}

	onChange(data: any) {
		this.editor.zoomIt(data);
	}

	increase() {
		this.value = Math.min(100, this.value + 5);
		this.editor.zoomIt(this.value);
	}

	decrease() {
		this.value = Math.max(1, this.value - 5);
		this.editor.zoomIt(this.value);
	}
}
