import { Toast } from "./toast";

export const TOAST_CHANGES_SAVED: Toast = new Toast("changes_saved");
export const TOAST_REQUEST_SENT: Toast = new Toast("request_sent", "info");
export const TOAST_REQUEST_APPROVED: Toast = new Toast(
	"request_approved",
	"info"
);
export const TOAST_REQUEST_REJECTED: Toast = new Toast(
	"request_rejected",
	"info"
);
export const TOAST_FORM_ERROR: Toast = new Toast("form_error", "danger");
export const TOAST_DEFAULT_ERROR: Toast = new Toast(
	"default_error",
	"danger",
	{},
	5000
);
