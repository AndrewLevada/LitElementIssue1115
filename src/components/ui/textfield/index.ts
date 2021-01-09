import { html, property, customElement, PropertyValues, query } from 'lit-element';
import { LightCustomElement } from "~c/base";
import styles from "./styles.module.scss";
import { MDCTextField } from "@material/textfield";

@customElement('text-field')
export class UITextFieldElement extends LightCustomElement implements UITextField {
	@property() alias : string = "";
	@property() value : string = "";
	@property() label : string = "";
	@property() type : string = "text";
	@property() minLength : number | undefined = undefined;
	@property() maxLength : number | undefined = undefined;

	private mdc : MDCTextField | undefined = undefined;

	public get valid() : boolean { return this.mdc ? this.mdc.valid : false; };
	public set valid(value : boolean) { if (this.mdc) this.mdc.valid = value; };

	public get helperTextContent() : string { return this.mdc ? this.mdc.helperTextContent : ""; };
	public set helperTextContent(value : string) { if (this.mdc) this.mdc.helperTextContent = value; };

	@query(".mdc-text-field", true) element! : HTMLElement;

	render() { return html`
		<label class="mdc-text-field mdc-text-field--outlined">
			<input id="${this.alias}-input" class="mdc-text-field__input" 
				   type="${this.type}" 
				   aria-labelledby="${this.alias}-input-label" 
				   ${this.minLength ? `minlength="${this.minLength}"` : ""} 
				   ${this.maxLength ? `maxlength="${this.maxLength}"` : ""}>
			
			<span class="mdc-notched-outline">
				<span class="mdc-notched-outline__leading"></span>
				<span class="mdc-notched-outline__notch">
					<span class="mdc-floating-label" id="${this.alias}-input-label">${this.label}</span>
				</span>
				<span class="mdc-notched-outline__trailing"></span>
			</span>
		</label>`;
	}

	static get styles() {
		return <any>styles;
	}

	protected firstUpdated(changedProperties : PropertyValues) {
		super.firstUpdated(changedProperties);
		this.mdc = new MDCTextField(this.element);
	}
}

export default interface UITextField extends HTMLElement {
	alias : string;
	value : string;
	label : string;
	type : string;
	minLength : number | undefined;
	maxLength : number | undefined;
	valid : boolean;
	helperTextContent : string;
}