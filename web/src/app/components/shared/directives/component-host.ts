import {
	Directive,
	ViewContainerRef,
	ComponentFactoryResolver,
	Input,
	ComponentRef,
	OnChanges,
	SimpleChanges
} from "@angular/core";

@Directive({
	selector: "[component-host]"
})
export class ComponentHostDirective {
	componentRef: ComponentRef<{}>;

	constructor(
		public viewContainerRef: ViewContainerRef,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	loadComponent(component) {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
			component
		);

		this.clearComponent();

		this.componentRef = this.viewContainerRef.createComponent(
			componentFactory
		);

		return this.componentRef;
	}

	private clearComponent() {
		this.viewContainerRef.clear();
	}
}
