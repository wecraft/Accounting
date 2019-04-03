import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormHelperModule } from "./form/form-helper-module.module";
import { MaterialModule } from "./material.module";
import { BootstrapModule } from "./bootstrap.module";
import { RouterModule } from "@angular/router";
import { ComponentHostDirective } from "./directives/component-host";
import { DraggableDirective } from "./directives/draggable.directive";
import { SubscribeDirective } from "./broadcast/subscribe.directive";
import { EmptyFeedModule } from "./empty-feed/empty-feed.module";
import { TimeAgoPipe } from "time-ago-pipe";
import { EmitDirective } from "./broadcast/emit.directive";
import { ListNamesPipe } from "./pipes/list-names.pipe";
import { PipesModule } from "./pipes/pipes.module";
import { DisplayProfileTypeComponent } from "./display-profile-type/display-profile-type.component";
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormHelperModule,
		MaterialModule,
		BootstrapModule,
		RouterModule,
		EmptyFeedModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FormHelperModule,
		MaterialModule,
		BootstrapModule,
		RouterModule,
		ComponentHostDirective,
		DraggableDirective,
		SubscribeDirective,
		EmptyFeedModule,
		TimeAgoPipe,
		EmitDirective,
		PipesModule,
		DisplayProfileTypeComponent
	],
	declarations: [
		ComponentHostDirective,
		DraggableDirective,
		SubscribeDirective,
		TimeAgoPipe,
		EmitDirective,
		DisplayProfileTypeComponent
	]
})
export class SharedModule {}
