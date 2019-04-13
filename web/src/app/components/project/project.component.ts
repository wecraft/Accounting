import { Component, OnInit, Inject } from "@angular/core";
import { Project, UserPie } from "src/app/models";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { FormModel } from "../shared/form/form.model";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProjectForm } from "./project-form/project.form";
import { UserPieForm } from "../user/user-pie.form";

@Component({
	selector: "app-project",
	templateUrl: "./project.component.html",
	styles: []
})
export class ProjectComponent implements OnInit {
	project: Project;
	form: FormGroup;
	formModel: FormModel;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<ProjectComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			projectId: number;
		}
	) {}

	ngOnInit() {
		this.service.project
			.getProject(this.data.projectId, {
				include: "currency,client,pies,orders.account,orders.currency"
			})
			.subscribe(data => {
				this.project = data;

				this.createForm();
			});
	}

	createForm() {
		this.form = this.fb.group(new ProjectForm(this.project));
		const pies = this.form.get("pies") as FormArray;

		for (let i of [1, 2]) {
			const userPie: UserPie =
				this.project.pies.find(item => item.userId == +i) ||
				new UserPie(+1, 0);

			pies.push(this.fb.group(new UserPieForm(userPie)));
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.project.updateProject(
					this.project.id,
					data
				);
			},
			onSuccess: data => {
				this.project = data;

				this.dialogRef.close(data);
			}
		});
	}
}
