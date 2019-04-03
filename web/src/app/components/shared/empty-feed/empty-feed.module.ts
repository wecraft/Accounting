import { NgModule } from "@angular/core";
import { EmptyFeedComponent } from "./empty-feed.component";
import { CommonModule } from "@angular/common";

@NgModule({
	imports: [CommonModule],
	declarations: [EmptyFeedComponent],
	exports: [EmptyFeedComponent]
})
export class EmptyFeedModule {}
