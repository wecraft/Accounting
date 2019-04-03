import { NgModule } from "@angular/core";
import { ListNamesPipe } from "./list-names.pipe";
import { SortPipe } from "./sort.pipe";
import { StripTagsPipe } from "./strip-tags.pipe";
import { SafePipe } from "./safe.pipe";
import { Nl2BrPipe } from "./nl2br.pipe";
import { MatchesNamePipe } from "./matches-name.pipe";
import { MatchesPipe } from "./matches.pipe";
import { PricePipe } from "./price.pipe";
import { SafeHtmlPipe } from "./safe-html.pipe";
@NgModule({
	exports: [
		ListNamesPipe,
		SortPipe,
		StripTagsPipe,
		SafePipe,
		Nl2BrPipe,
		MatchesNamePipe,
		MatchesPipe,
		PricePipe,
		SafeHtmlPipe
	],
	declarations: [
		ListNamesPipe,
		SortPipe,
		StripTagsPipe,
		SafePipe,
		Nl2BrPipe,
		MatchesNamePipe,
		MatchesPipe,
		PricePipe,
		SafeHtmlPipe
	]
})
export class PipesModule {}
