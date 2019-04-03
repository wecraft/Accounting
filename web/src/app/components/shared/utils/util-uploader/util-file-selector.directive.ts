import {
	Directive,
	ViewContainerRef,
	ElementRef,
	Input,
	Output,
	EventEmitter,
	Renderer2
} from "@angular/core";
import { AppImage } from "../../models/image";

@Directive({
	selector: "[util-file-selector]",
	exportAs: "utilFileSelector"
})
export class UtilFileSelectorDirective {
	@Input() multiple: boolean;
	@Input() accept: string;
	@Input() format: string;
	@Output() onSelect = new EventEmitter<AppImage | File | File[]>();

	constructor(
		public viewContainerRef: ViewContainerRef,
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit() {
		let input = this.renderer.createElement("input");
		this.renderer.addClass(input, "file-selector-input");
		this.renderer.appendChild(this.el.nativeElement, input);
		this.renderer.setAttribute(input, "type", "file");
		if (this.multiple) {
			this.renderer.setAttribute(input, "multiple", "multiple");
		}
		if (this.accept) {
			this.renderer.setAttribute(input, "accept", this.accept);
		}
		this.renderer.listen(input, "change", event => {
			const files = event.target.files;

			if (files.length > 0) {
				if (this.format == "editor") {
					this.formatEditor(files[0], (image: AppImage) => {
						this.onSelect.next(image);
						return true;
					});
				} else {
					let send: File | File[];

					if (this.multiple) {
						send = [];
						for (var i = 0; i < files.length; i++) {
							let file = files[i];
							send.push(file);
						}
					} else {
						send = files[0];
					}

					this.onSelect.next(send);
				}
			}

			event.target.value = null;
		});
	}

	formatEditor(file: File, callback: (imageData: AppImage) => {}) {
		if (file) {
			const reader = new FileReader();
			let image: AppImage = new AppImage();

			reader.addEventListener(
				"load",
				() => {
					//Get Image dimensionz
					const img = new Image();
					const src = reader.result;
					img.src = src;

					img.onload = () => {
						image.orig = src;
						image.file = file;
						image.dimensions = {
							width: img.width,
							height: img.height
						};

						callback(image);
					};
				},
				false
			);
			reader.readAsDataURL(file);
		}
	}
}
