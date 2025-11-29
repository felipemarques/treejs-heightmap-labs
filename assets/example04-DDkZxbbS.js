import{G as yt,l as v,d as b,M as f,W as Nt,S as Kt,C as Zt,n as Wt,a as qt,O as Jt,b as Qt,H as te,D as ee,V as G,j as ie,m as ne,h as se,e as le,o as oe}from"./PointerLockControls-CkVu5uzN.js";import{S as re,c as ae}from"./simplex-noise-BLd_4JM9.js";import{a as he}from"./alea-wHZKoMPZ.js";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class C{constructor(t,e,i,s,l="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(l),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),C.nextNameID=C.nextNameID||0,this.$name.id=`lil-gui-name-${++C.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class de extends C{constructor(t,e,i){super(t,e,i,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function dt(n){let t,e;return(t=n.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),e?"#"+e:!1}const ce={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:dt,toHexString:dt},j={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},ue={isPrimitive:!1,match:n=>Array.isArray(n)||ArrayBuffer.isView(n),fromHexString(n,t,e=1){const i=j.fromHexString(n);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(i&255)/255*e},toHexString([n,t,e],i=1){i=255/i;const s=n*i<<16^t*i<<8^e*i<<0;return j.toHexString(s)}},pe={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,t,e=1){const i=j.fromHexString(n);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(i&255)/255*e},toHexString({r:n,g:t,b:e},i=1){i=255/i;const s=n*i<<16^t*i<<8^e*i<<0;return j.toHexString(s)}},ge=[ce,j,ue,pe];function me(n){return ge.find(t=>t.match(n))}class fe extends C{constructor(t,e,i,s){super(t,e,i,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=me(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const l=dt(this.$text.value);l&&this._setValueFromHexString(l)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class rt extends C{constructor(t,e,i){super(t,e,i,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class we extends C{constructor(t,e,i,s,l,o){super(t,e,i,"lil-number"),this._initInput(),this.min(s),this.max(l);const d=o!==void 0;this.step(d?o:this._getImplicitStep(),d),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=e*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=()=>{let a=parseFloat(this.$input.value);isNaN(a)||(this._stepExplicit&&(a=this._snap(a)),this.setValue(this._clamp(a)))},i=a=>{const m=parseFloat(this.$input.value);isNaN(m)||(this._snapClampSetValue(m+a),this.$input.value=this.getValue())},s=a=>{a.key==="Enter"&&this.$input.blur(),a.code==="ArrowUp"&&(a.preventDefault(),i(this._step*this._arrowKeyMultiplier(a))),a.code==="ArrowDown"&&(a.preventDefault(),i(this._step*this._arrowKeyMultiplier(a)*-1))},l=a=>{this._inputFocused&&(a.preventDefault(),i(this._step*this._normalizeMouseWheel(a)))};let o=!1,d,r,c,p,g;const y=5,R=a=>{d=a.clientX,r=c=a.clientY,o=!0,p=this.getValue(),g=0,window.addEventListener("mousemove",S),window.addEventListener("mouseup",L)},S=a=>{if(o){const m=a.clientX-d,B=a.clientY-r;Math.abs(B)>y?(a.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(m)>y&&L()}if(!o){const m=a.clientY-c;g-=m*this._step*this._arrowKeyMultiplier(a),p+g>this._max?g=this._max-p:p+g<this._min&&(g=this._min-p),this._snapClampSetValue(p+g)}c=a.clientY},L=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",L)},H=()=>{this._inputFocused=!0},h=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",e),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",l,{passive:!1}),this.$input.addEventListener("mousedown",R),this.$input.addEventListener("focus",H),this.$input.addEventListener("blur",h)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(h,a,m,B,tt)=>(h-a)/(m-a)*(tt-B)+B,e=h=>{const a=this.$slider.getBoundingClientRect();let m=t(h,a.left,a.right,this._min,this._max);this._snapClampSetValue(m)},i=h=>{this._setDraggingStyle(!0),e(h.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",l)},s=h=>{e(h.clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",l)};let o=!1,d,r;const c=h=>{h.preventDefault(),this._setDraggingStyle(!0),e(h.touches[0].clientX),o=!1},p=h=>{h.touches.length>1||(this._hasScrollBar?(d=h.touches[0].clientX,r=h.touches[0].clientY,o=!0):c(h),window.addEventListener("touchmove",g,{passive:!1}),window.addEventListener("touchend",y))},g=h=>{if(o){const a=h.touches[0].clientX-d,m=h.touches[0].clientY-r;Math.abs(a)>Math.abs(m)?c(h):(window.removeEventListener("touchmove",g),window.removeEventListener("touchend",y))}else h.preventDefault(),e(h.touches[0].clientX)},y=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",g),window.removeEventListener("touchend",y)},R=this._callOnFinishChange.bind(this),S=400;let L;const H=h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const m=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+m),this.$input.value=this.getValue(),clearTimeout(L),L=setTimeout(R,S)};this.$slider.addEventListener("mousedown",i),this.$slider.addEventListener("touchstart",p,{passive:!1}),this.$slider.addEventListener("wheel",H,{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){let e=0;return this._hasMin?e=this._min:this._hasMax&&(e=this._max),t-=e,t=Math.round(t/this._step)*this._step,t+=e,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ve extends C{constructor(t,e,i,s){super(t,e,i,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(e=>{const i=document.createElement("option");i.textContent=e,this.$select.appendChild(i)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.textContent=e===-1?t:this._names[e],this}}class be extends C{constructor(t,e,i){super(t,e,i,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var xe=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function ye(n){const t=document.createElement("style");t.innerHTML=n;const e=document.querySelector("head link[rel=stylesheet], head style");e?document.head.insertBefore(t,e):document.head.appendChild(t)}let _t=!1;class ut{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:s,title:l="Controls",closeFolders:o=!1,injectStyles:d=!0,touchStyles:r=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(l),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),r&&this.domElement.classList.add("lil-allow-touch-styles"),!_t&&d&&(ye(xe),_t=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=o}add(t,e,i,s,l){if(Object(i)===i)return new ve(this,t,e,i);const o=t[e];switch(typeof o){case"number":return new we(this,t,e,i,s,l);case"boolean":return new de(this,t,e);case"string":return new be(this,t,e);case"function":return new rt(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,o)}addColor(t,e,i=1){return new fe(this,t,e,i)}addFolder(t){const e=new ut({parent:this,title:t});return this.root._closeFolders&&e.close(),e}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof rt||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof rt)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("lil-transition");const i=l=>{l.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const s=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(i=>i.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}function _e(n={}){const{skinColor:t=7049074,shirtColor:e=4019566,pantsColor:i=1909811,trimColor:s=9741240,accessoryColor:l=8011565,scale:o=1,speedFactor:d=1.5}=n,r=new yt;r.name="ZombieNPC";const c=new v(1.6,2.2,1),p=new b({color:e,flatShading:!0}),g=new f(c,p);g.position.y=2.1,r.add(g);const y=new v(1.2,1.2,1.2),R=new b({color:t,flatShading:!0}),S=new f(y,R);S.position.y=3.5,r.add(S);const L=new v(1.2,.35,1.1),H=new f(L,R);H.position.set(0,2.95,.02),r.add(H);const h=new v(1.2,.25,1.2),a=new b({color:2764605,flatShading:!0}),m=new f(h,a);m.position.set(0,4.15,0),r.add(m);const B=new v(.9,.35,.6),tt=new b({color:1707794,flatShading:!0}),wt=new f(B,tt);wt.position.set(0,3.05,.65),r.add(wt);const et=new yt,Mt=new v(.12,.16,.2),Ft=new b({color:14936043,flatShading:!0});for(let N=-2;N<=2;N++){const z=new f(Mt,Ft);z.position.set(N*.18,0,.35),et.add(z)}et.position.set(0,3,.65),r.add(et);const Dt=new v(.45,1.8,.6),Vt=new b({color:e,flatShading:!0}),Y=new f(Dt,Vt);Y.position.set(-1.1,2.1,0);const it=Y.clone();it.position.x=1.1,r.add(Y,it);const Ot=new v(.55,.45,.6),Ht=new b({color:t,flatShading:!0}),U=new f(Ot,Ht);U.position.set(-1.1,1.25,0);const nt=U.clone();nt.position.x=1.1,r.add(U,nt);const zt=new v(.55,1.8,.7),It=new b({color:i,flatShading:!0}),X=new f(zt,It);X.position.set(-.5,.9,0);const st=X.clone();st.position.x=.5,r.add(X,st);const Rt=new v(.7,.35,1),Bt=new b({color:s,flatShading:!0}),T=new f(Rt,Bt);T.position.set(-.5,.15,.1);const lt=T.clone();lt.position.x=.5,r.add(T,lt);const Pt=new v(1.7,.18,1.05),jt=new b({color:l,flatShading:!0}),vt=new f(Pt,jt);vt.position.set(0,1.6,0),r.add(vt);const Gt=new v(1.9,.25,1.05),bt=new f(Gt,p);bt.position.set(0,3.1,0),r.add(bt);const Yt=new v(.2,.2,.1),Ut=new b({color:1052688,flatShading:!0}),ot=new f(Yt,Ut),xt=ot.clone();ot.position.set(-.3,3.65,.65),xt.position.set(.3,3.65,.65),r.add(ot,xt),r.scale.setScalar(o);const w={swaySpeed:2,stepSpeed:2.3*d,headBob:0,armL:Y,armR:it,legL:X,legR:st,handL:U,handR:nt,footL:T,footR:lt,jaw:H};function Xt(N,z){const Tt=Math.sin(z*w.swaySpeed)*.25,M=Math.sin(z*w.stepSpeed)*.35;w.armL.rotation.x=M*1.3,w.armR.rotation.x=-M*1.3,w.legL.rotation.x=-M,w.legR.rotation.x=M,w.handL.rotation.x=M*1.1,w.handR.rotation.x=-M*1.1,w.footL.rotation.x=-M*.8,w.footR.rotation.x=M*.8,w.headBob=.07*Math.sin(z*3.2*d),S.position.y=3.5+w.headBob,w.jaw.rotation.x=Math.max(0,Math.sin(z*3.4*d)*.16),g.rotation.y=Tt*.2,r.rotation.y+=0}return{object:r,update:Xt}}const u={seed:"heightmap-seed-04",scale:1,heightMultiplier:60,exponent:1.2,octaves:4,persistence:.5,lacunarity:2,biomeScale:.3,maskOffset:0,randomSeed:()=>{u.seed=Math.random().toString(36).substring(7),Fe.updateDisplay(),A()}};let q;function Ct(){const n=he(u.seed);q=ae(n)}Ct();const $e=document.getElementById("c"),V=new Nt({canvas:$e,antialias:!0});V.setPixelRatio(window.devicePixelRatio);V.setSize(window.innerWidth,window.innerHeight);const O=new Kt;O.background=new Zt(790295);O.fog=new Wt(790295,.0025);const D=new qt(60,window.innerWidth/window.innerHeight,.1,5e3);D.position.set(0,50,50);const I=new Jt(D,V.domElement);I.enableDamping=!0;I.target.set(0,10,0);const E=new Qt(D,V.domElement);O.add(new te(10533375,1054752,.5));const pt=new ee(16777215,1.2);pt.position.set(100,200,100);pt.castShadow=!0;O.add(pt);const x=64,Ee=[{segments:64,distance:x*1.5},{segments:32,distance:x*3},{segments:16,distance:x*6},{segments:8,distance:x*10}],K=4,Ce=2.5,F=new Map,at=new Map;function gt(n,t){const e=n/200,i=t/200;let s=q(e*u.biomeScale,i*u.biomeScale);s=(s+1)/2,s=Math.max(0,Math.min(1,s+u.maskOffset)),s=s*s*(3-2*s);let l=1,o=1,d=0,r=0;for(let y=0;y<u.octaves;y++)d+=l*q(e*u.scale*o,i*u.scale*o),r+=l,l*=u.persistence,o*=u.lacunarity;let c=d/r;c=(c+1)/2,c=Math.pow(c,u.exponent);const p=(q(e*10,i*10)*.05+.1)*u.heightMultiplier*.2,g=c*u.heightMultiplier;return p*(1-s)+g*s}function Ae(n){const t=Math.max(0,Math.min(1,n/u.heightMultiplier));return t<.05?Z([15,30,48],[28,74,122],t/.05):t<.3?Z([45,106,63],[84,168,99],(t-.05)/.25):t<.7?Z([92,83,75],[143,134,118],(t-.3)/.4):Z([224,224,224],[255,255,255],(t-.7)/.3)}function Z(n,t,e){const i=Math.max(0,Math.min(1,e));return{r:(n[0]+(t[0]-n[0])*i)/255,g:(n[1]+(t[1]-n[1])*i)/255,b:(n[2]+(t[2]-n[2])*i)/255}}function At(n,t){return`${n},${t}`}function ke(){if(at.has("terrain"))return at.get("terrain");const n=new b({vertexColors:!0,flatShading:!1,roughness:.8,metalness:.1,side:oe});return at.set("terrain",n),n}function Se(n,t,e){const i=new se(x,x,n,n);i.rotateX(-Math.PI/2);const s=i.attributes.position,l=new Float32Array(s.count*3);for(let o=0;o<s.count;o++){const d=s.getX(o)+t,r=s.getZ(o)+e,c=gt(d,r);s.setY(o,c);const p=Ae(c);l[o*3+0]=p.r,l[o*3+1]=p.g,l[o*3+2]=p.b}return i.setAttribute("color",new le(l,3)),i.computeVertexNormals(),i}function Le(n,t){const e=At(n,t);if(F.has(e))return F.get(e);const i=n*x+x/2,s=t*x+x/2,l=new ne;for(const d of Ee){const r=Se(d.segments,i,s),c=new f(r,ke());c.position.set(i,0,s),c.castShadow=!1,c.receiveShadow=!0,l.addLevel(c,d.distance)}O.add(l);const o={lod:l,ix:n,iz:t,lastUsed:performance.now()};return F.set(e,o),o}function kt(n){!n||!n.lod||(n.lod.levels.forEach(({object:t})=>{t.geometry&&t.geometry.dispose()}),O.remove(n.lod))}function Me(){const n=Math.floor(D.position.x/x),t=Math.floor(D.position.z/x),e=new Set;for(let i=-K;i<=K;i++)for(let s=-K;s<=K;s++){const l=n+s,o=t+i;e.add(At(l,o)),Le(l,o).lastUsed=performance.now()}for(const[i,s]of F.entries())e.has(i)||(kt(s),F.delete(i))}function A(){Ct();for(const n of F.values())kt(n);F.clear()}const mt=new ut({title:"Configurações"}),J=mt.addFolder("Geral"),Fe=J.add(u,"seed").name("Seed").onFinishChange(A);J.add(u,"randomSeed").name("🎲 Seed Aleatória");J.add(u,"heightMultiplier",10,300).name("Altura Máx").onFinishChange(A);J.add(u,"exponent",.1,4).name("Exponente").onFinishChange(A);const Q=mt.addFolder("Noise (Detalhes)");Q.add(u,"scale",.1,5).name("Escala (Freq)").onFinishChange(A);Q.add(u,"octaves",1,8,1).name("Oitavas").onFinishChange(A);Q.add(u,"persistence",.1,1).name("Persistência").onFinishChange(A);Q.add(u,"lacunarity",1,5).name("Lacunaridade").onFinishChange(A);const St=mt.addFolder("Bioma (Máscara)");St.add(u,"biomeScale",.01,2).name("Escala Bioma").onFinishChange(A);St.add(u,"maskOffset",-1,1).name("Offset (Plan/Mont)").onFinishChange(A);const De=document.getElementById("hud"),k=new re;k.showPanel(0);k.dom.style.position="absolute";k.dom.style.top="12px";k.dom.style.left="calc(50% - 40px)";document.body.appendChild(k.dom);const Ve=new ie,ct=[],$={forward:!1,backward:!1,left:!1,right:!1,jump:!1};let W=!1,P=0;const $t=new G;function Oe(){const n=document.getElementById("info");V.domElement.addEventListener("click",e=>{e.preventDefault(),E.lock()}),E.addEventListener("lock",()=>{n.style.opacity="0.5",I.enabled=!1}),E.addEventListener("unlock",()=>{n.style.opacity="1",I.enabled=!0,I.target.copy(E.getObject().position),I.update()})}function He(){const n=t=>e=>{switch(e.code){case"KeyW":case"ArrowUp":$.forward=t;break;case"KeyS":case"ArrowDown":$.backward=t;break;case"KeyA":case"ArrowLeft":$.left=t;break;case"KeyD":case"ArrowRight":$.right=t;break;case"Space":$.jump=t;break}};document.addEventListener("keydown",n(!0)),document.addEventListener("keyup",n(!1))}const ze=new G,ht=new G,Et=new G;function Ie(n){if(!E.isLocked)return;const t=($.right?1:0)-($.left?1:0),e=($.forward?1:0)-($.backward?1:0),i=t!==0||e!==0,s=25;if(i){ht.copy(E.getDirection(ze)).setY(0).normalize(),Et.crossVectors(ht,new G(0,1,0)).normalize();const r=E.getObject().position;r.addScaledVector(ht,e*s*n),r.addScaledVector(Et,t*s*n)}P-=50*n;const l=E.getObject().position,d=gt(l.x,l.z)+Ce;l.y<d&&P<0&&(l.y=d,P=0,W=!0),$.jump&&W&&(P=20,W=!1),l.y+=P*n,l.y<d&&(l.y=d,P=0,W=!0)}function Re(n,t){if(ct.length===0)return;const e=E.getObject().position;ct.forEach(i=>{i.update(n,t),$t.copy(e);const s=i.object.position,l=$t.clone().sub(s);l.y=0,l.length()>2&&(l.normalize(),s.addScaledVector(l,8*n),i.object.rotation.y=Math.atan2(l.x,l.z)),s.y=gt(s.x,s.z)+.1})}function Be(){const t=V.info.render.triangles,e=Math.round(k.getFPS?k.getFPS():0)||"--";De.innerHTML=`
        <div>Chunks: ${F.size}</div>
        <div>Tris: ${t.toLocaleString("pt-BR")}</div>
        <div>FPS: ${e}</div>
      `}function Lt(){const n=Ve.getDelta(),t=performance.now()*.001;k.begin(),requestAnimationFrame(Lt),Ie(n),Re(n,t),Me(),E.isLocked||I.update(),V.render(O,D),k.end(),Be()}function Pe(){const{innerWidth:n,innerHeight:t}=window;D.aspect=n/t,D.updateProjectionMatrix(),V.setSize(n,t)}window.addEventListener("resize",Pe);Oe();He();const ft=_e({scale:1.2});ft.object.position.set(10,0,10);O.add(ft.object);ct.push(ft);Lt();const _=document.querySelector(".lil-gui.root");if(_){let n=!1,t,e,i,s;const l=r=>{if(r.target.tagName==="INPUT"||r.target.tagName==="SELECT"||r.target.closest(".controller"))return;n=!0,t=r.clientX,e=r.clientY;const c=_.getBoundingClientRect();i=c.left,s=c.top,_.style.cursor="grabbing",_.style.right="auto",_.style.bottom="auto",_.style.left=`${i}px`,_.style.top=`${s}px`,r.preventDefault()},o=r=>{if(!n)return;const c=r.clientX-t,p=r.clientY-e;_.style.left=`${i+c}px`,_.style.top=`${s+p}px`},d=()=>{n=!1,_.style.cursor="auto"};_.addEventListener("mousedown",l),window.addEventListener("mousemove",o),window.addEventListener("mouseup",d)}
