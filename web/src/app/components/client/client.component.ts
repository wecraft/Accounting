import { Component, OnInit, Inject } from "@angular/core";
import { Client } from "src/app/models";
import { FormModel } from "../shared/form/form.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ClientForm } from "./client-form/client.form";

@Component({
	selector: "app-client",
	templateUrl: "./client.component.html",
	styles: []
})
export class ClientComponent implements OnInit {
	client: Client;
	form: FormGroup;
	formModel: FormModel;

	constructor(
		protected service: AppService,
		protected fb: FormBuilder,
		public dialogRef: MatDialogRef<ClientComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: {
			clientId: number;
		}
	) {}

	ngOnInit() {
		this.service.client
			.getClient(this.data.clientId, {
				include: "country"
			})
			.subscribe(data => {
				this.client = data;

				this.createForm();
			});
	}

	createForm() {
		this.form = this.fb.group(new ClientForm(this.client));

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.service.client.updateClient(this.client.id, data);
			},
			onSuccess: data => {
				this.client = data;

				this.dialogRef.close(data);
			}
		});
	}
}
