!function(){const e={attachmentCanPopup:"true",attachmentCanView:"true",canReadDbImage:!0,canReadDbVideo:!0,allowedExtensions:"",videoExtensions:"webm|mov|swf|avi|mp4",convert_urls:!1,custom_elements:"sn-toc,~sn-mention",link_default_target:"",enable_media_sites:"youtube.com,player.vimeo.com,vimeo.com,players.brightcove.net,brightcove.net",extended_valid_elements:"now-illustration-custom[token-id|src|alt|width|height],sn-toc,sn-mention[class|table|sysid]",font_family_formats:"Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;",language:"en",plugins:"powerpaste table link image media codemirror lists advlist fullscreen charmap directionality emoticons insertdatetime nonbreaking pagebreak searchreplace wordcount anchor tableofcontents codesample visualblocks visualchars autolink align_listitems accordion editimage a11ychecker readonlynoborder",powerpaste_html_import:"clean",powerpaste_word_import:"prompt",powerpaste_clean_filtered_inline_elements:"strong, b",relative_urls:!0,remove_script_host:!0,contextmenu:"link image table",toolbar:["fontfamily fontsize | bold italic underline strikethrough forecolor backcolor pastetext removeformat | blocks searchreplace undo redo | bullist numlist outdent indent alignleft aligncenter alignright | tableofcontents table link unlink a11ycheck anchor accordion insertdatetime | image media codesample | code fullscreen"],menubar:!1,menu:{file:{title:"File",items:"newdocument restoredraft | preview | export print | deleteallconversations"},edit:{title:"Edit",items:"undo redo | cut copy paste pastetext | selectall | searchreplace"},view:{title:"View",items:"code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments"},insert:{title:"Insert",items:"image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime"},format:{title:"Format",items:"bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat"},tools:{title:"Tools",items:"spellchecker spellcheckerlanguage | a11ycheck code wordcount"},table:{title:"Table",items:"inserttable | cell row column | advtablesort | tableprops deletetable"},help:{title:"Help",items:"help"}},style_formats:[{title:"Headings",items:[{title:"Heading 1",format:"h1"},{title:"Heading 2",format:"h2"},{title:"Heading 3",format:"h3"},{title:"Heading 4",format:"h4"},{title:"Heading 5",format:"h5"},{title:"Heading 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",format:"bold"},{title:"Italic",format:"italic"},{title:"Underline",format:"underline"},{title:"Strikethrough",format:"strikethrough"},{title:"Superscript",format:"superscript"},{title:"Subscript",format:"subscript"},{title:"Code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Align",items:[{title:"Left",format:"alignleft"},{title:"Center",format:"aligncenter"},{title:"Right",format:"alignright"},{title:"Justify",format:"alignjustify"}]}],text_patterns:!1,promotion:!1,help_tabs:["shortcuts","keyboardnav","versions"],height:300,automatic_uploads:!1,allow_script_urls:!1},t=top?.window?.gsft_main||this,i=t.document;if(i.getElementById("drc-overlay"))return;(a=>{const o=()=>{setTimeout((()=>{t.setupTinymceField("modal-editor",e)}))},l=i.createElement("div");l.style.overflowY="auto",l.style.overflowX="hidden",l.style.maxHeight="60vh";const n=i.createElement("textarea");n.style.visibility="hidden",n.id="modal-editor",l.appendChild(n);const s=t.g_form;if(void 0!==s){const e=s.elements.filter((e=>"journal_input"===e.type)),a=i.createElement("div");e.forEach((e=>{const o=i.createElement("button");o.style.margin="0.8rem",o.textContent=e.fieldName,a.appendChild(o),o.onclick=()=>{const i=t.tinymce.get("modal-editor").getContent();s.setValue(e.fieldName,`[code]${i}[/code]`)}})),l.appendChild(a)}if(a.appendChild(l),void 0===t.tinymce){const e=["/scripts/tinymce_default/js_includes_tinymce.jsx?sysparm_substitute=false"];t.ScriptLoader.getScripts(e,o)}else o()})((()=>{const e=i.createElement("div");e.id="drc-overlay",e.style.position="fixed",e.style.top=0,e.style.left=0,e.style.width="100vw",e.style.height="100vh",e.style.backgroundColor="rgba(0, 0, 0, 0.6)",e.style.zIndex=3,e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center";const a=i.createElement("div");a.id="modal-container",a.style.background="#fff",a.style.padding="20px",a.style.borderRadius="8px",a.style.boxShadow="0 0 10px rgba(0,0,0,0.3)",a.style.maxWidth="1000px",a.style.textAlign="center",a.style.maxHeight="70vh",a.style.position="absolute";const o=i.createElement("div");o.style.cursor="move",o.style.height="20px",o.style.marginBottom="10px",o.style.background="rgba(100, 100, 100, 0.3)",o.style.borderRadius="8px";const l=((e,t)=>{let a=!1,o=0,l=0;const n=e=>{a&&(t.style.left=e.clientX-o+"px",t.style.top=e.clientY-l+"px")},s=()=>{a=!1,i.body.style.userSelect=""};e.addEventListener("mousedown",(e=>{a=!0,o=e.clientX-t.offsetLeft,l=e.clientY-t.offsetTop,i.body.style.userSelect="none"})),i.addEventListener("mousemove",n),i.addEventListener("mouseup",s);const r=[];return r.push((()=>{i.removeEventListener("mousemove",n),i.removeEventListener("mouseup",s)})),r})(o,a);a.append(o),e.appendChild(a),i.body.appendChild(e);return e.addEventListener("click",(o=>{if(!a.contains(o.target)){const a=t.tinymce?.get("modal-editor");a&&a.remove(),i.body.removeChild(e),l.forEach((e=>e()))}})),a})())}();

/*
(function () {
    const tinyMceConfig = {
        "attachmentCanPopup": "true",
        "attachmentCanView": "true",
        "canReadDbImage": true,
        "canReadDbVideo": true,
        "allowedExtensions": "",
        "videoExtensions": "webm|mov|swf|avi|mp4",
        "convert_urls": false,
        "custom_elements": "sn-toc,~sn-mention",
        "link_default_target": "",
        "enable_media_sites": "youtube.com,player.vimeo.com,vimeo.com,players.brightcove.net,brightcove.net",
        "extended_valid_elements": "now-illustration-custom[token-id|src|alt|width|height],sn-toc,sn-mention[class|table|sysid]",
        "font_family_formats": "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;",
        "language": "en",
        "plugins": "powerpaste table link image media codemirror lists advlist fullscreen charmap directionality emoticons insertdatetime nonbreaking pagebreak searchreplace wordcount anchor tableofcontents codesample visualblocks visualchars autolink align_listitems accordion editimage a11ychecker readonlynoborder",
        "powerpaste_html_import": "clean",
        "powerpaste_word_import": "prompt",
        "powerpaste_clean_filtered_inline_elements": "strong, b",
        "relative_urls": true,
        "remove_script_host": true,
        "contextmenu": "link image table",
        "toolbar": [
            "fontfamily fontsize | bold italic underline strikethrough forecolor backcolor pastetext removeformat | blocks searchreplace undo redo | bullist numlist outdent indent alignleft aligncenter alignright | tableofcontents table link unlink a11ycheck anchor accordion insertdatetime | image media codesample | code fullscreen"
        ],
        "menubar": false,
        "menu": {
            "file": {
                "title": "File",
                "items": "newdocument restoredraft | preview | export print | deleteallconversations"
            },
            "edit": {
                "title": "Edit",
                "items": "undo redo | cut copy paste pastetext | selectall | searchreplace"
            },
            "view": {
                "title": "View",
                "items": "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments"
            },
            "insert": {
                "title": "Insert",
                "items": "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime"
            },
            "format": {
                "title": "Format",
                "items": "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat"
            },
            "tools": {
                "title": "Tools",
                "items": "spellchecker spellcheckerlanguage | a11ycheck code wordcount"
            },
            "table": {
                "title": "Table",
                "items": "inserttable | cell row column | advtablesort | tableprops deletetable"
            },
            "help": {
                "title": "Help",
                "items": "help"
            }
        },
        "style_formats": [
            {
                "title": "Headings",
                "items": [
                    { "title": "Heading 1", "format": "h1" },
                    { "title": "Heading 2", "format": "h2" },
                    { "title": "Heading 3", "format": "h3" },
                    { "title": "Heading 4", "format": "h4" },
                    { "title": "Heading 5", "format": "h5" },
                    { "title": "Heading 6", "format": "h6" }
                ]
            },
            {
                "title": "Inline",
                "items": [
                    { "title": "Bold", "format": "bold" },
                    { "title": "Italic", "format": "italic" },
                    { "title": "Underline", "format": "underline" },
                    { "title": "Strikethrough", "format": "strikethrough" },
                    { "title": "Superscript", "format": "superscript" },
                    { "title": "Subscript", "format": "subscript" },
                    { "title": "Code", "format": "code" }
                ]
            },
            {
                "title": "Blocks",
                "items": [
                    { "title": "Paragraph", "format": "p" },
                    { "title": "Blockquote", "format": "blockquote" },
                    { "title": "Div", "format": "div" },
                    { "title": "Pre", "format": "pre" }
                ]
            },
            {
                "title": "Align",
                "items": [
                    { "title": "Left", "format": "alignleft" },
                    { "title": "Center", "format": "aligncenter" },
                    { "title": "Right", "format": "alignright" },
                    { "title": "Justify", "format": "alignjustify" }
                ]
            }
        ],
        "text_patterns": false,
        "promotion": false,
        "help_tabs": ["shortcuts", "keyboardnav", "versions"],
        "height": 300,
        "automatic_uploads": false,
        "allow_script_urls": false
    };

    const makeModalMovable = (headerElement, modalElement) => {
        let isDragging = false,
            offsetX = 0,
            offsetY = 0;

        const mouseMoveHandler = (event) => {
            if (isDragging) {
                modalElement.style.left = `${event.clientX - offsetX}px`
                modalElement.style.top = `${event.clientY - offsetY}px`
            }
        }
        const mouseUpHandler = () => {
            isDragging = false;
            document.body.style.userSelect = "";
        };
        const mouseDownHandler = (e) => {
            isDragging = true;
            offsetX = e.clientX - modalElement.offsetLeft;
            offsetY = e.clientY - modalElement.offsetTop;
            document.body.style.userSelect = "none";
        };

        headerElement.addEventListener("mousedown", mouseDownHandler);
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);

        const cleanupHandlers = [];
        cleanupHandlers.push(() => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        });

        return cleanupHandlers;
    }

    const createOverlay = () => {
        const overlay = document.createElement("div")
        overlay.id = "drc-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
        overlay.style.zIndex = 3;
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";

        const modalContainer = document.createElement("div");
        modalContainer.id = "modal-container";
        modalContainer.style.background = "#fff";
        modalContainer.style.padding = "20px";
        modalContainer.style.borderRadius = "8px";
        modalContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
        modalContainer.style.maxWidth = "1000px";
        modalContainer.style.textAlign = "center";
        modalContainer.style.maxHeight = "70vh";
        modalContainer.style.position = 'absolute';

        const modalHeader = document.createElement("div");
        modalHeader.style.cursor = "move";
        modalHeader.style.height = "20px";
        modalHeader.style.marginBottom = "10px";
        modalHeader.style.background = "rgba(100, 100, 100, 0.3)";
        modalHeader.style.borderRadius = "8px";

        const cleanupHandlers = makeModalMovable(modalHeader, modalContainer);
        modalContainer.append(modalHeader)
        overlay.appendChild(modalContainer);
        document.body.appendChild(overlay);

        const onOverlayClick = (event) => {
            if (!modalContainer.contains(event.target)) {
                const editor = frame.tinymce?.get("modal-editor");
                if (editor) editor.remove();
                document.body.removeChild(overlay);
                cleanupHandlers.forEach(fn => fn());
            }
        }
        overlay.addEventListener("click", onOverlayClick);

        return modalContainer;
    }

    const addModalContent = (modalContainer) => {
        const createEditor = () => {
            setTimeout(() => {
                frame.setupTinymceField("modal-editor", tinyMceConfig);
            })

        }
        const modalContent = document.createElement("div");
        modalContent.style.overflowY = "auto";
        modalContent.style.overflowX = "hidden";
        modalContent.style.maxHeight = "60vh";
        const textArea = document.createElement("textarea");
        textArea.style.visibility = "hidden";
        textArea.id = "modal-editor";
        modalContent.appendChild(textArea);

        const g_form = frame.g_form;
        if (typeof g_form !== "undefined") {
            const journalInputs = g_form.elements.filter(e => e.type === "journal_input");

            const buttonContainer = document.createElement("div");
            journalInputs.forEach(journalInput => {
                const button = document.createElement("button");
                button.style.margin = "0.8rem";
                button.textContent = journalInput.fieldName;
                buttonContainer.appendChild(button)
                button.onclick = () => {
                    const content = frame.tinymce.get('modal-editor').getContent();
                    g_form.setValue(journalInput.fieldName, `[code]${content}[/code]`)
                }
            });
            modalContent.appendChild(buttonContainer)

        }
        modalContainer.appendChild(modalContent)

        if (typeof frame.tinymce === 'undefined') {
            const scriptFiles = ['/scripts/tinymce_default/js_includes_tinymce.jsx?sysparm_substitute=false']
            frame.ScriptLoader.getScripts(scriptFiles, createEditor);
        } else {
            createEditor();
        }
    }
    const frame = top?.window?.gsft_main || this;
    const document = frame.document;

    if (document.getElementById("drc-overlay")) return;

    const modalContainer = createOverlay();
    addModalContent(modalContainer);
})();
/*
