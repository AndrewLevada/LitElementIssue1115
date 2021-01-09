import { html, property, customElement, PropertyValues, query } from 'lit-element';
import { MDCRipple } from "@material/ripple";
import { LightCustomElement } from "~c/base";
import styles from "./styles.module.scss";

@customElement("button-")
export class UIButton extends LightCustomElement {
	@property() text : string = "";

	@query(".mdc-button", true) element! : HTMLElement;

	render() {
		return html`
			<button class="mdc-button mdc-button--raised">
				<div class="mdc-button__ripple"></div>
				<span class="mdc-button__label">${this.text}</span>
			</button>`;
	}

	static get styles() {
		return <any>styles;
	}

	protected firstUpdated(changedProperties : PropertyValues) {
		super.firstUpdated(changedProperties);
		new MDCRipple(this.element);
	}
}