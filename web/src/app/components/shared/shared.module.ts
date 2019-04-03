import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormHelperModule } from "./form/form-helper-module.module";
import { MaterialModule } from "./material.module";
import { RouterModule } from "@angular/router";
import { ComponentHostDirective } from "./directives/component-host";
import { DraggableDirective } from "./directives/draggable.directive";
import { SubscribeDirective } from "./broadcast/subscribe.directive";
import { EmptyFeedModule } from "./empty-feed/empty-feed.module";
import { EmitDirective } from "./broadcast/emit.directive";
import { PipesModule } from "./pipes/pipes.module";
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormHelperModule,
		MaterialModule,
		RouterModule,
		EmptyFeedModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormHelperModule,
		MaterialModule,
		RouterModule,
		ComponentHostDirective,
		DraggableDirective,
		SubscribeDirective,
		EmptyFeedModule,
		EmitDirective,
		PipesModule
	],
	declarations: [
		ComponentHostDirective,
		DraggableDirective,
		SubscribeDirective,
		EmitDirective
	]
})
export class SharedModule {}
