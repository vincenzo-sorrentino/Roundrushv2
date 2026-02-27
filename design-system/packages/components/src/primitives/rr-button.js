import { rrBaseStyles } from "../internal/theme.js"

const VALID_VARIANTS = ["primary", "secondary", "neutral", "border", "text", "destructive"]
const VALID_SIZES = ["xs", "sm", "md", "lg", "xl", "xxl"]
const VALID_STATES = ["default", "hover", "focused", "disabled"]

class RrButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  static get observedAttributes() {
    return ["variant", "type", "size", "state", "disabled", "icon-left", "icon-right", "dot"]
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  getBooleanAttribute(name, fallback = false) {
    if (!this.hasAttribute(name)) {
      return fallback
    }

    const value = this.getAttribute(name)
    return value === "" || value === "true" || value === name
  }

  getVariant() {
    const candidate = (this.getAttribute("variant") || this.getAttribute("type") || "primary").toLowerCase()
    return VALID_VARIANTS.includes(candidate) ? candidate : "primary"
  }

  getSize() {
    const candidate = (this.getAttribute("size") || "md").toLowerCase()
    return VALID_SIZES.includes(candidate) ? candidate : "md"
  }

  getState() {
    const candidate = (this.getAttribute("state") || "default").toLowerCase()
    return VALID_STATES.includes(candidate) ? candidate : "default"
  }

  render() {
    const variant = this.getVariant()
    const size = this.getSize()
    const forcedState = this.getState()
    const disabled = this.hasAttribute("disabled") || forcedState === "disabled"
    const iconLeft = this.getBooleanAttribute("icon-left")
    const iconRight = this.getBooleanAttribute("icon-right")
    const dot = this.getBooleanAttribute("dot")

    const dotTemplate = dot
      ? `
      <span class="dot">
        <slot name="dot">
          <span class="dot-fallback" aria-hidden="true"></span>
        </slot>
      </span>
    `
      : ""

    const iconLeftTemplate = iconLeft
      ? `
      <span class="icon icon-left">
        <slot name="icon-left">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </slot>
      </span>
    `
      : ""

    const iconRightTemplate = iconRight
      ? `
      <span class="icon icon-right">
        <slot name="icon-right">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </slot>
      </span>
    `
      : ""

    this.shadowRoot.innerHTML = `
      <style>
        ${rrBaseStyles}

        button {
          min-height: 40px;
          border-radius: 8px;
          border: 1px solid transparent;
          padding: 10px 16px;
          gap: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--rr-typography-fontFamilyBase);
          font-size: var(--rr-typography-fontSizeMd);
          font-weight: var(--rr-typography-fontWeightMedium);
          line-height: var(--rr-textTokens-lineHeight-actions-medium, var(--rr-typography-lineHeightParagraph));
          letter-spacing: var(--rr-typography-letterSpacingMax);
          color: var(--rr-btn-text-color, var(--rr-sem-textPrimary));
          background: var(--rr-btn-background, transparent);
          border-color: var(--rr-btn-border-color, transparent);
          box-shadow: var(--rr-btn-shadow, none);
          white-space: nowrap;
          cursor: pointer;
          transition: all 120ms ease-in-out;
        }

        button .label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        button .icon {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        button .icon svg {
          width: 24px;
          height: 24px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
        }

        button .dot {
          width: 10px;
          height: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        button .dot-fallback {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: currentColor;
          display: block;
        }

        button[data-size="xs"] {
          min-height: 30px;
          border-radius: 4px;
          padding: 6px 12px;
          gap: 8px;
          font-size: var(--rr-typography-fontSizeSm);
          font-weight: var(--rr-typography-fontWeightRegular);
          line-height: var(--rr-typography-lineHeightParagraph);
        }

        button[data-size="sm"] {
          min-height: 36px;
          border-radius: 8px;
          padding: 9px 14px;
          gap: 8px;
          font-size: var(--rr-typography-fontSizeSm);
          font-weight: var(--rr-typography-fontWeightRegular);
          line-height: var(--rr-typography-lineHeightParagraph);
        }

        button[data-size="md"] {
          min-height: 40px;
          border-radius: 8px;
          padding: 10px 16px;
          gap: 8px;
          font-size: var(--rr-typography-fontSizeMd);
          font-weight: var(--rr-typography-fontWeightMedium);
          line-height: var(--rr-textTokens-lineHeight-actions-medium, var(--rr-typography-lineHeightParagraph));
        }

        button[data-size="lg"] {
          min-height: 44px;
          border-radius: 8px;
          padding: 12px 18px;
          gap: 8px;
          font-size: var(--rr-typography-fontSizeMd);
          font-weight: var(--rr-typography-fontWeightMedium);
          line-height: var(--rr-textTokens-lineHeight-actions-medium, var(--rr-typography-lineHeightParagraph));
        }

        button[data-size="xl"] {
          min-height: 48px;
          border-radius: 8px;
          padding: 12px 20px;
          gap: 8px;
          font-size: var(--rr-typography-fontSizeBig);
          font-weight: var(--rr-typography-fontWeightSemibold);
          line-height: var(--rr-textTokens-lineHeight-actions-big, 24px);
        }

        button[data-size="xxl"] {
          min-height: 56px;
          border-radius: 8px;
          padding: 16px 28px;
          gap: 12px;
          font-size: var(--rr-typography-fontSizeBig);
          font-weight: var(--rr-typography-fontWeightSemibold);
          line-height: var(--rr-textTokens-lineHeight-actions-big, 24px);
        }

        button[data-variant="primary"] {
          --rr-btn-background: var(--rr-sem-action-btnPrimary, var(--rr-sem-actionPrimary));
          --rr-btn-text-color: var(--rr-sem-text-actionForeground, var(--rr-sem-surfaceOnPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="secondary"] {
          --rr-btn-background: var(--rr-sem-action-btnSecondary);
          --rr-btn-text-color: var(--rr-sem-text-actionForeground, var(--rr-sem-surfaceOnPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="neutral"] {
          --rr-btn-background: var(--rr-sem-action-btnNeutral);
          --rr-btn-text-color: var(--rr-sem-text-primary, var(--rr-sem-textPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="border"] {
          --rr-btn-background: transparent;
          --rr-btn-text-color: var(--rr-sem-text-primary, var(--rr-sem-textPrimary));
          --rr-btn-border-color: var(--rr-sem-stroke-btnNeutral);
          --rr-btn-shadow: none;
        }

        button[data-variant="text"] {
          --rr-btn-background: transparent;
          --rr-btn-text-color: var(--rr-sem-text-primary, var(--rr-sem-textPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: none;
        }

        button[data-variant="destructive"] {
          --rr-btn-background: var(--rr-sem-action-btnDanger);
          --rr-btn-text-color: var(--rr-sem-text-actionForeground, var(--rr-sem-surfaceOnPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="primary"]:not(:disabled):hover,
        button[data-variant="primary"][data-state="hover"] {
          --rr-btn-background: var(--rr-sem-action-btnPrimaryHover, var(--rr-sem-actionPrimaryHover));
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="secondary"]:not(:disabled):hover,
        button[data-variant="secondary"][data-state="hover"] {
          --rr-btn-background: var(--rr-sem-action-btnSecondaryHover);
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="neutral"]:not(:disabled):hover,
        button[data-variant="neutral"][data-state="hover"] {
          --rr-btn-background: var(--rr-sem-action-btnNeutralHover);
          --rr-btn-border-color: var(--rr-sem-stroke-secondary);
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="border"]:not(:disabled):hover,
        button[data-variant="border"][data-state="hover"] {
          --rr-btn-background: var(--rr-sem-background-card);
          --rr-btn-border-color: var(--rr-sem-stroke-btnNeutralHover);
          --rr-btn-shadow: none;
        }

        button[data-variant="text"]:not(:disabled):hover,
        button[data-variant="text"][data-state="hover"] {
          --rr-btn-background: var(--rr-sem-background-card);
          --rr-btn-shadow: none;
        }

        button[data-variant="destructive"]:not(:disabled):hover,
        button[data-variant="destructive"][data-state="hover"] {
          --rr-btn-background: var(--rr-sem-action-btnDangerHover);
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
        }

        button[data-variant="primary"]:not(:disabled):focus-visible,
        button[data-variant="primary"][data-state="focused"] {
          --rr-btn-background: var(--rr-sem-action-btnPrimaryHover, var(--rr-sem-actionPrimaryHover));
          --rr-btn-border-color: var(--rr-sem-stroke-btnFocus);
          --rr-btn-shadow: var(--rr-effects-focusRing-4pxPrimary, none);
          outline: none;
        }

        button[data-variant="secondary"]:not(:disabled):focus-visible,
        button[data-variant="secondary"][data-state="focused"] {
          --rr-btn-background: var(--rr-sem-action-btnSecondaryHover);
          --rr-btn-border-color: var(--rr-sem-stroke-btnFocus);
          --rr-btn-shadow: var(--rr-effects-focusRing-4pxSecondary, none);
          outline: none;
        }

        button[data-variant="neutral"]:not(:disabled):focus-visible,
        button[data-variant="neutral"][data-state="focused"] {
          --rr-btn-background: var(--rr-sem-action-btnNeutralHover);
          --rr-btn-border-color: var(--rr-sem-stroke-btnFocus);
          --rr-btn-shadow: var(--rr-effects-focusRing-4pxNeutral, none);
          outline: none;
        }

        button[data-variant="border"]:not(:disabled):focus-visible,
        button[data-variant="border"][data-state="focused"] {
          --rr-btn-background: var(--rr-sem-background-card);
          --rr-btn-border-color: var(--rr-sem-stroke-btnFocus);
          --rr-btn-shadow: var(--rr-effects-focusRing-4pxNeutral, none);
          outline: none;
        }

        button[data-variant="text"]:not(:disabled):focus-visible,
        button[data-variant="text"][data-state="focused"] {
          --rr-btn-background: var(--rr-sem-background-card);
          --rr-btn-border-color: var(--rr-sem-stroke-btnFocus);
          --rr-btn-shadow: var(--rr-effects-focusRing-4pxNeutral, none);
          outline: none;
        }

        button[data-variant="destructive"]:not(:disabled):focus-visible,
        button[data-variant="destructive"][data-state="focused"] {
          --rr-btn-background: var(--rr-sem-action-btnDangerHover);
          --rr-btn-border-color: var(--rr-sem-stroke-btnFocus);
          --rr-btn-shadow: var(--rr-effects-focusRing-4pxError, none);
          outline: none;
        }

        button[data-variant="primary"]:disabled,
        button[data-variant="primary"][data-state="disabled"] {
          --rr-btn-background: var(--rr-sem-action-btnPrimaryDisabled);
          --rr-btn-text-color: var(--rr-sem-text-actionForeground, var(--rr-sem-surfaceOnPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: var(--rr-effects-shadow-xs, var(--rr-shadow-xs, none));
          cursor: not-allowed;
        }

        button[data-variant="secondary"]:disabled,
        button[data-variant="secondary"][data-state="disabled"] {
          --rr-btn-background: var(--rr-sem-action-btnSecondaryDisabled);
          --rr-btn-text-color: var(--rr-sem-text-actionForeground, var(--rr-sem-surfaceOnPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: none;
          cursor: not-allowed;
        }

        button[data-variant="neutral"]:disabled,
        button[data-variant="neutral"][data-state="disabled"] {
          --rr-btn-background: var(--rr-sem-action-btnNeutralDisabled);
          --rr-btn-text-color: var(--rr-sem-text-disabled);
          --rr-btn-border-color: var(--rr-sem-stroke-btnNeutralDisabled);
          --rr-btn-shadow: none;
          cursor: not-allowed;
        }

        button[data-variant="border"]:disabled,
        button[data-variant="border"][data-state="disabled"] {
          --rr-btn-background: transparent;
          --rr-btn-text-color: var(--rr-sem-text-disabled);
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: none;
          cursor: not-allowed;
        }

        button[data-variant="text"]:disabled,
        button[data-variant="text"][data-state="disabled"] {
          --rr-btn-background: transparent;
          --rr-btn-text-color: var(--rr-sem-text-disabled);
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: none;
          cursor: not-allowed;
        }

        button[data-variant="destructive"]:disabled,
        button[data-variant="destructive"][data-state="disabled"] {
          --rr-btn-background: var(--rr-sem-action-btnDangerDisabled);
          --rr-btn-text-color: var(--rr-sem-text-actionForeground, var(--rr-sem-surfaceOnPrimary));
          --rr-btn-border-color: transparent;
          --rr-btn-shadow: none;
          cursor: not-allowed;
        }
      </style>
      <button
        data-variant="${variant}"
        data-size="${size}"
        data-state="${forcedState}"
        type="button"
        ${disabled ? "disabled" : ""}>
        ${dotTemplate}
        ${iconLeftTemplate}
        <span class="label"><slot></slot></span>
        ${iconRightTemplate}
      </button>
    `

    const button = this.shadowRoot.querySelector("button")
    button?.addEventListener("click", (event) => {
      this.dispatchEvent(
        new CustomEvent("rr-click", {
          bubbles: true,
          composed: true,
          detail: { sourceEvent: event }
        })
      )
    })
  }
}

if (!customElements.get("rr-button")) {
  customElements.define("rr-button", RrButton)
}
