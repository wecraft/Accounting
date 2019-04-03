import {
	Component,
	Input,
	ViewChild,
	Renderer2,
	ElementRef,
	Output,
	EventEmitter
} from "@angular/core";
import { AppImage } from "../../models/image";

@Component({
	exportAs: "utilImageEditor",
	selector: "util-image-editor",
	templateUrl: "./util-image-editor.component.html"
})
export class UtilImageEditorComponent {
	private _image: AppImage;
	private _loadView: boolean;

	imageSrc: string;

	@ViewChild("el") el: ElementRef;
	@ViewChild("elWrap") elWrap: ElementRef;
	@ViewChild("elImg") elImg: ElementRef;
	@Output() onChange = new EventEmitter();

	@Input()
	set image(image: AppImage) {
		this._image = image;
		this.loadImage();
	}

	get image(): AppImage {
		return this._image;
	}

	@Input() editorClass: string;

	imgWidth: number;
	imgHeight: number;
	imgLeft: number;
	imgTop: number;
	imgOrigWidth: number;
	imgOrigHeight: number;
	imgMinWidth: number;
	imgMinHeight: number;
	response: any;
	zoom: number = 1;

	constructor(private renderer: Renderer2) {}

	ngOnInit() {}

	ngAfterViewInit() {
		setTimeout(() => {
			this._loadView = true;
			this.loadImage();
		});
	}

	zoomIt(value: number) {
		value = Math.max(1, value);
		this.zoom = value;
		const k = 1 + value * 0.1; //sensitivity
		const diff = this.imgWidth - this.imgMinWidth * k;

		const leftDiff = this.imgLeft + diff / 2;
		const topDiff = this.imgTop + diff / 2;

		this.imgWidth = this.imgMinWidth * k;
		this.imgHeight = this.imgMinHeight * k;

		this.strictPosition(leftDiff, topDiff);

		this.applyImgStyles();
	}

	loadImage() {
		const image = this.image;
		// console.log(image);
		this.imageSrc = image ? image.orig : "";

		if (this._loadView && this.imageSrc) {
			if (image.meta && image.meta.w) {
				this.convertMetaToSize(image.meta);
			} else if (image.dimensions) {
				this.convertDimensionsToSize(image.dimensions);
			}

			this.applyImgStyles();
		}
	}

	private convertMetaToSize(meta: any) {
		this.imgOrigWidth = meta.width;
		this.imgOrigHeight = meta.height;

		this.calculateMinImgSize();
		const zoom = Number(meta.z);

		const k = 1 + zoom * 0.1; //sensitivity

		this.imgWidth = this.imgMinWidth * k;
		this.imgHeight = this.imgMinHeight * k;
		this.imgLeft = meta.x * this.imgWidth;
		this.imgTop = meta.y * this.imgHeight;
		this.zoom = zoom;
		this.applyImgStyles();
	}

	private convertDimensionsToSize(dimensions: any) {
		this.imgOrigWidth = dimensions.width;
		this.imgOrigHeight = dimensions.height;

		this.resetImage();
	}

	private resetImage() {
		this.calculateMinImgSize();
		this.imgWidth = this.imgMinWidth;
		this.imgHeight = this.imgMinHeight;
		this.calculateCenterPosition();
		this.applyImgStyles();
	}

	private calculateCenterPosition() {
		let elWrapW = this.elWrap.nativeElement.clientWidth;
		let elWrapH = this.elWrap.nativeElement.clientHeight;

		this.imgLeft = Math.round((elWrapW - this.imgWidth) / 2);
		this.imgTop = Math.round((elWrapH - this.imgHeight) / 2);
	}

	private calculateMinImgSize() {
		let elWrapW = this.elWrap.nativeElement.clientWidth;
		let elWrapH = this.elWrap.nativeElement.clientHeight;

		const imgRatio = this.imgOrigWidth / this.imgOrigHeight;

		let newW = elWrapW;
		let newH = newW / imgRatio;

		if (newH < elWrapH) {
			newH = elWrapH;
			newW = elWrapH * imgRatio;
		}

		this.imgMinWidth = Math.round(newW);
		this.imgMinHeight = Math.round(newH);
	}

	private applyImgStyles() {
		this.renderer.setStyle(
			this.elImg.nativeElement,
			"width",
			this.imgWidth + "px"
		);
		this.renderer.setStyle(
			this.elImg.nativeElement,
			"height",
			this.imgHeight + "px"
		);
		this.renderer.setStyle(
			this.elImg.nativeElement,
			"top",
			this.imgTop + "px"
		);
		this.renderer.setStyle(
			this.elImg.nativeElement,
			"left",
			this.imgLeft + "px"
		);

		//Update the response
		this.setResponse();
	}

	private setResponse() {
		let elWrapW = this.elWrap.nativeElement.clientWidth;
		let elWrapH = this.elWrap.nativeElement.clientHeight;

		this.response = {
			width: this.imgOrigWidth,
			height: this.imgOrigHeight,
			w: this.formatResponseValue(elWrapW / this.imgWidth),
			h: this.formatResponseValue(elWrapH / this.imgHeight),
			x: this.formatResponseValue(this.imgLeft / this.imgWidth),
			y: this.formatResponseValue(this.imgTop / this.imgHeight),
			z: this.zoom
		};

		this.onChange.next(this.response);
	}

	private formatResponseValue(value) {
		return Math.round(value * 100) / 100;
	}

	private strictPosition(imgLeft, imgTop) {
		let elWrapW = this.elWrap.nativeElement.clientWidth;
		let elWrapH = this.elWrap.nativeElement.clientHeight;

		if (imgTop > 0) {
			imgTop = 0;
		}
		if (imgLeft > 0) {
			imgLeft = 0;
		}
		if (imgTop < elWrapH - this.imgHeight) {
			imgTop = elWrapH - this.imgHeight;
		}

		if (imgLeft < elWrapW - this.imgWidth) {
			imgLeft = elWrapW - this.imgWidth;
		}

		this.imgTop = imgTop;
		this.imgLeft = imgLeft;

		this.applyImgStyles();
	}

	onDrag(t) {
		let imgTop = this.elImg.nativeElement.offsetTop;
		let imgLeft = this.elImg.nativeElement.offsetLeft;
		this.strictPosition(imgLeft, imgTop);
	}
}
