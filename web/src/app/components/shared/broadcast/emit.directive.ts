import {Directive, Input, HostListener} from '@angular/core';


import {EmitterService} from './emitter.service';


@Directive({
	selector: '[emit]',
})
export class EmitDirective {

	@Input('emit') emitData: any

	@HostListener('click') onClick() {
		this.emit()
	}

	constructor(
		private emitter: EmitterService,
	) {}


	ngOnInit() {

	}

	emit() {
		let message: string
		let data: any

		if (typeof this.emitData === 'string') {
			message = this.emitData
			data = null
		} else {
			message = this.emitData[0]
			data = this.emitData[1]
		}
		this.emitter.emit(message, data)
	}

}

