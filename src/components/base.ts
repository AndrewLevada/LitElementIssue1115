import { LitElement } from 'lit-element';

/**
 * Extension of LitElement which renders element in light dom
 */
export class LightCustomElement extends LitElement {
	// Override this method to use light dom instead of shadow
	protected createRenderRoot() : Element | ShadowRoot {
		return this;
	}
}