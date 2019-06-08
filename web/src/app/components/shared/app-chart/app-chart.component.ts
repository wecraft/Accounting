import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Input,
	SimpleChanges
} from "@angular/core";
import { Chart } from "chart.js";

@Component({
	selector: "app-chart",
	templateUrl: "./app-chart.component.html",
	styles: []
})
export class AppChartComponent implements OnInit {
	@Input() data: any;
	@Input() title: string;
	@Input() type: string = "bar";
	@Input() ratio: number = 4;
	@Input() legend: boolean = true;

	@ViewChild("canvas") canvas: ElementRef;

	chart: any;

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {
		if (changes["data"]) {
			this.loadData();
		}
	}

	ngAfterViewInit() {
		// this.loadData();
	}

	private loadData() {
		if (this.canvas && this.data) {
			this.chart = new Chart(this.canvas.nativeElement, {
				type: this.type,
				data: this.data,
				options: this.getOptions()
			});
		}
	}

	private getOptions() {
		let options: any = {
			title: {
				display: this.title ? true : false,
				text: this.title
			},
			legend: {
				display: this.legend
			},
			animation: false,
			maintainAspectRatio: true,
			responsive: true,
			aspectRatio: this.ratio,
			onResize: (chart, sizes) => {
				// console.log(chart, sizes);
			}
		};

		if (this.type == "bar") {
			options.scales = {
				yAxes: [
					{
						ticks: {
							beginAtZero: true,
							userCallback: function(label, index, labels) {
								// when the floored value is the same as the value we have a whole number
								if (Math.floor(label) === label) {
									return label;
								}
							}
						}
					}
				],
				xAxes: [
					{
						ticks: {
							autoSkip: false
						}
					}
				]
			};
		} else if (this.type == "horizontalBar") {
			options.scales = {
				xAxes: [
					{
						ticks: {
							beginAtZero: true,
							userCallback: function(label, index, labels) {
								// when the floored value is the same as the value we have a whole number
								if (Math.floor(label) === label) {
									return label;
								}
							}
						}
					}
				]
			};
		}

		return options;
	}
}
