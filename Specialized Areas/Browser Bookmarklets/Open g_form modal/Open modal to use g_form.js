javascript:!function(){if(document.querySelector("#gform-modal-overlay"))return;const e=window.gsft_main?.g_form||this.g_form||"undefined"!=typeof querySelectorShadowDom&&querySelectorShadowDom.querySelectorAllDeep("sn-form-data-connected")[0]?.nowRecordFormBlob?.gForm||angular.element("sp-variable-layout").scope().getGlideForm?.()||null;if(!e)return;const t=e.elements?e.elements:(e=>e.getFieldNames().map((e=>({fieldName:e}))))(e);((e,t)=>{const n=document.createElement("div");n.id="gform-modal-overlay",n.style.position="fixed",n.style.top=0,n.style.left=0,n.style.width="100vw",n.style.height="100vh",n.style.backgroundColor="rgba(0, 0, 0, 0.6)",n.style.zIndex=9999,n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center";const d=document.createElement("div");d.id="modal-container",d.style.background="#fff",d.style.padding="20px",d.style.borderRadius="8px",d.style.boxShadow="0 0 10px rgba(0,0,0,0.3)",d.style.maxWidth="1000px",d.style.textAlign="center",d.style.maxHeight="70vh";const o=document.createElement("div");o.style.overflowY="auto",o.style.overflowX="hidden",o.style.maxHeight="60vh",d.appendChild(o);let l="";t.forEach((t=>{const n=t.fieldName,d=e.isReadOnly(n),o=e.isMandatory(n),a=e.isVisible(n);l+=`\n      <tr>\n        <td>${n}</td>\n        <td><input type="checkbox" ${o?"disabled":""} id="disabled-${n}" ${d?"":"checked"}></td>\n        <td><input type="checkbox" id="mandatory-${n}" ${o?"checked":""}></td>\n        <td><input type="checkbox" ${o?"disabled":""} id="visible-${n}" ${a?"checked":""}></td>\n        <td><input type="text" id="value-${n}" value="${e.getValue(n)}"></td>\n        <td><button id="change-value-${n}">Set</button></td>   \n      </tr>\n    `})),o.innerHTML=`\n    <h2>g_form modal</h2>\n    <table>\n      <thead>\n        <tr>\n          <th>Field</th>\n          <th>ReadOnly</th>\n          <th>Mandatory</th>\n          <th>Display</th>\n          <th>Value</th>\n          <th></th>\n        </tr>\n      </thead>\n      <tbody>${l}</tbody>\n    </table>\n  `;const a=[];n.addEventListener("click",(e=>{d.contains(e.target)||(a.forEach((e=>e())),document.body.removeChild(n))})),((e,t)=>{let n=!1,d=0,o=0;const l=document.createElement("div");l.style.cursor="move",l.style.height="20px",l.style.marginBottom="10px",l.style.background="rgba(100, 100, 100, 0.3)",l.style.borderRadius="8px",e.prepend(l);const a=t=>{n&&(e.style.left=t.clientX-d+"px",e.style.top=t.clientY-o+"px",e.style.position="absolute")},s=()=>{n=!1,document.body.style.userSelect=""};l.addEventListener("mousedown",(t=>{n=!0,d=t.clientX-e.offsetLeft,o=t.clientY-e.offsetTop,document.body.style.userSelect="none"})),document.addEventListener("mousemove",a),document.addEventListener("mouseup",s),t.push((()=>{document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",s)}))})(d,a),n.appendChild(d),document.body.appendChild(n),t.forEach((t=>{const n=t.fieldName,d=o.querySelector(`#disabled-${n}`),l=o.querySelector(`#mandatory-${n}`),a=o.querySelector(`#visible-${n}`),s=o.querySelector(`#value-${n}`),c=o.querySelector(`#change-value-${n}`);d&&d.addEventListener("change",(()=>{e?.setDisabled(n,d.checked)})),l&&l.addEventListener("change",(()=>{const t=l.checked,o=!e?.getValue(n),s=a.checked;e?.setMandatory(n,t),t&&(!o&&s?a.checked=!0:o&&!s?(a.checked=!0,d.checked=!1):o&&s&&(d.checked=!1)),d&&(d.disabled=t),a&&(a.disabled=t)})),a&&a.addEventListener("change",(()=>{e?.setDisplay(n,a.checked)})),c&&s&&c.addEventListener("click",(()=>{const t=s.value;e.setValue(n,t)}))}))})(e,t)}();

/*
 * full js of minified bookmarklet below inside comment
 */

/*
(function () {
    const makeDraggable = (element, cleanupHandlers) => {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const header = document.createElement('div');
        header.style.cursor = 'move';
        header.style.height = '20px';
        header.style.marginBottom = '10px';
        header.style.background = "rgba(100, 100, 100, 0.3)";
        header.style.borderRadius = "8px";
        element.prepend(header);

        const mouseMoveHandler = (e) => {
            if (isDragging) {
                element.style.left = `${e.clientX - offsetX}px`;
                element.style.top = `${e.clientY - offsetY}px`;
                element.style.position = 'absolute';
            }
        };

        const mouseUpHandler = () => {
            isDragging = false;
            document.body.style.userSelect = '';
        };

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);

        cleanupHandlers.push(() => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        });
    };

    const createOverlay = (g_form, fieldArray) => {
        const overlay = document.createElement('div');
        overlay.id = "gform-modal-overlay";
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        overlay.style.zIndex = 9999;
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';


        const container = document.createElement('div');
        container.id = "modal-container";
        container.style.background = '#fff';
        container.style.padding = '20px';
        container.style.borderRadius = '8px';
        container.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        container.style.maxWidth = '1000px';
        container.style.textAlign = 'center';
        container.style.maxHeight = '70vh';

        const modal = document.createElement('div');
        modal.style.overflowY = 'auto';
        modal.style.overflowX = 'hidden';
        modal.style.maxHeight = '60vh';
        container.appendChild(modal)

        let listItems = '';
        fieldArray.forEach(element => {
            const fieldName = element.fieldName;
            const isReadOnly = g_form.isReadOnly(fieldName);
            const isMandatory = g_form.isMandatory(fieldName);
            const isVisible = g_form.isVisible(fieldName);

            listItems += `
      <tr>
        <td>${fieldName}</td>
        <td><input type="checkbox" ${isMandatory ? 'disabled' : ''} id="disabled-${fieldName}" ${!isReadOnly ? 'checked' : ''}></td>
        <td><input type="checkbox" id="mandatory-${fieldName}" ${isMandatory ? 'checked' : ''}></td>
        <td><input type="checkbox" ${isMandatory ? 'disabled' : ''} id="visible-${fieldName}" ${isVisible ? 'checked' : ''}></td>
        <td><input type="text" id="value-${fieldName}" value="${g_form.getValue(fieldName)}"></td>
        <td><button id="change-value-${fieldName}">Set</button></td>   
      </tr>
    `;
        });

        modal.innerHTML = `
    <h2>g_form modal</h2>
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>ReadOnly</th>
          <th>Mandatory</th>
          <th>Display</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${listItems}</tbody>
    </table>
  `;

        const cleanupHandlers = [];

        overlay.addEventListener('click', (event) => {
            if (!container.contains(event.target)) {
                cleanupHandlers.forEach(fn => fn());
                document.body.removeChild(overlay);
            }
        });

        makeDraggable(container, cleanupHandlers);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        fieldArray.forEach(element => {
            const fieldName = element.fieldName;
            const disabledCheckbox = modal.querySelector(`#disabled-${fieldName}`);
            const mandatoryCheckbox = modal.querySelector(`#mandatory-${fieldName}`);
            const visibleCheckbox = modal.querySelector(`#visible-${fieldName}`);
            const valueInput = modal.querySelector(`#value-${fieldName}`);
            const changeButton = modal.querySelector(`#change-value-${fieldName}`);

            if (disabledCheckbox) {
                disabledCheckbox.addEventListener('change', () => {
                    g_form?.setDisabled(fieldName, disabledCheckbox.checked);
                });
            }

            if (mandatoryCheckbox) {
                mandatoryCheckbox.addEventListener('change', () => {
                    const setToMandatory = mandatoryCheckbox.checked;
                    const isEmpty = !g_form?.getValue(fieldName);
                    const isDisplayed = visibleCheckbox.checked;
                    g_form?.setMandatory(fieldName, setToMandatory);

                    if (setToMandatory) {
                        if (!isEmpty && isDisplayed) {
                            visibleCheckbox.checked = true;
                        } else if (isEmpty && !isDisplayed) {
                            visibleCheckbox.checked = true;
                            disabledCheckbox.checked = false;
                        } else if (isEmpty && isDisplayed) {
                            disabledCheckbox.checked = false;
                        }
                    }
                    if (disabledCheckbox) disabledCheckbox.disabled = setToMandatory;
                    if (visibleCheckbox) visibleCheckbox.disabled = setToMandatory;
                });
            }

            if (visibleCheckbox) {
                visibleCheckbox.addEventListener('change', () => {
                    g_form?.setDisplay(fieldName, visibleCheckbox.checked);
                });
            }

            if (changeButton && valueInput) {
                changeButton.addEventListener('click', () => {
                    const newValue = valueInput.value;
                    g_form.setValue(fieldName, newValue);
                });
            }
        });
    };

    if (document.querySelector("#gform-modal-overlay")) return;

    const getFieldNames = (g_form) => {
        return g_form.getFieldNames().map(name => ({ fieldName: name }));
    }

    const g_form =
        window.gsft_main?.g_form ||
        this.g_form ||
        (typeof querySelectorShadowDom !== "undefined" &&
            querySelectorShadowDom.querySelectorAllDeep('sn-form-data-connected')[0]?.nowRecordFormBlob?.gForm) ||
        (angular.element("sp-variable-layout").scope().getGlideForm?.()) ||
        null;
    if (!g_form) {
        return;
    }
    const fieldArray = g_form.elements ? g_form.elements : getFieldNames(g_form);
    createOverlay(g_form, fieldArray);
})();
*/
