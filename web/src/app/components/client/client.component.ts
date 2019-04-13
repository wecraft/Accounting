import { Component, OnInit, Inject } from "@angular/core";
import { Client } from "src/app/models";
import { FormModel } from "../shared/form/form.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppService } from "src/app/app.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ClientForm } from "./client-form/client.form";
import { FormMode } from "src/app/types";

@Component({
	selector: "app-client",
	templateUrl: "./client.component.html",
	styles: []
})
export class ClientComponent implements OnInit {
	client: Client;
	form: FormGroup;
	formModel: FormModel;
	mode: FormMode;

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
		this.mode = this.data.clientId ? "update" : "create";
		if (this.mode == "update") {
			this.service.client
				.getClient(this.data.clientId, {
					include: "country"
				})
				.subscribe(data => {
					this.client = data;

					this.createForm();
				});
		} else {
			this.createForm();
		}
	}

	createForm() {
		if (this.client) {
			this.form = this.fb.group(new ClientForm(this.client));
		} else {
			this.form = this.fb.group(new ClientForm(new Client()));
		}

		this.formModel = new FormModel({
			service: this.service,
			form: this.form,
			action: (data: FormData) => {
				return this.mode == "create"
					? this.service.client.createClient(data)
					: this.service.client.updateClient(this.client.id, data);
			},
			onSuccess: data => {
				if (this.mode == "create") {
					this.dialogRef.close(true);
				} else {
					this.client = data;

					this.dialogRef.close(data);
				}
			}
		});
	}
}
