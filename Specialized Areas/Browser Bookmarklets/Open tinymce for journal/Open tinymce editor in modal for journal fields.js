javascript:!function(){const e={attachmentCanPopup:"true",attachmentCanView:"true",canReadDbImage:!0,canReadDbVideo:!0,allowedExtensions:"",videoExtensions:"webm|mov|swf|avi|mp4",convert_urls:!1,custom_elements:"sn-toc,~sn-mention",link_default_target:"",enable_media_sites:"youtube.com,player.vimeo.com,vimeo.com,players.brightcove.net,brightcove.net",extended_valid_elements:"now-illustration-custom[token-id|src|alt|width|height],sn-toc,sn-mention[class|table|sysid]",font_family_formats:"Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;",language:"en",plugins:"powerpaste accordion advlist align_listitems anchor autolink charmap codemirror directionality editimage emoticons fullscreen help image insertdatetime link lists media nonbreaking pagebreak preview readonlynoborder searchreplace table visualblocks visualchars",powerpaste_html_import:"clean",powerpaste_word_import:"prompt",powerpaste_clean_filtered_inline_elements:"strong, b",relative_urls:!0,remove_script_host:!0,contextmenu:"link image table",toolbar:["bold italic underline undo redo | fontfamily fontsize table | forecolor backcolor link unlink | image media code | alignleft aligncenter alignright | bullist numlist fullscreen"],menubar:!1,menu:{file:{title:"File",items:"newdocument restoredraft | preview | export print | deleteallconversations"},edit:{title:"Edit",items:"undo redo | cut copy paste pastetext | selectall | searchreplace"},view:{title:"View",items:"code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments"},insert:{title:"Insert",items:"image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime"},format:{title:"Format",items:"bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat"},tools:{title:"Tools",items:"spellchecker spellcheckerlanguage | a11ycheck code wordcount"},table:{title:"Table",items:"inserttable | cell row column | advtablesort | tableprops deletetable"},help:{title:"Help",items:"help"}},style_formats:[{title:"Headings",items:[{title:"Heading 1",format:"h1"},{title:"Heading 2",format:"h2"},{title:"Heading 3",format:"h3"},{title:"Heading 4",format:"h4"},{title:"Heading 5",format:"h5"},{title:"Heading 6",format:"h6"}]},{title:"Inline",items:[{title:"Bold",format:"bold"},{title:"Italic",format:"italic"},{title:"Underline",format:"underline"},{title:"Strikethrough",format:"strikethrough"},{title:"Superscript",format:"superscript"},{title:"Subscript",format:"subscript"},{title:"Code",format:"code"}]},{title:"Blocks",items:[{title:"Paragraph",format:"p"},{title:"Blockquote",format:"blockquote"},{title:"Div",format:"div"},{title:"Pre",format:"pre"}]},{title:"Align",items:[{title:"Left",format:"alignleft"},{title:"Center",format:"aligncenter"},{title:"Right",format:"alignright"},{title:"Justify",format:"alignjustify"}]}],text_patterns:!1,promotion:!1,help_tabs:["shortcuts","keyboardnav","versions"],automatic_uploads:!1,allow_script_urls:!1},t=window.gsft_main?window.gsft_main.document:top.document;if(t.getElementById("drc-overlay"))return;(i=>{const a=()=>{if(void 0===window.gsft_main.setupTinymceField){const t=setInterval((()=>{const i=window.gsft_main.setupTinymceField;"function"==typeof i&&(clearInterval(t),i("iidee",e))}),100)}else window.gsft_main.setupTinymceField("iidee",e)};if(t.getElementById("tinymcedeps"))a();else{const e=t.createElement("script");e.id="tinymcedeps",e.src="/scripts/tinymce_default/js_includes_tinymce.jsx?sysparm_substitute=false",e.onload=()=>{a()},window.gsft_main.document.head.appendChild(e)}const n=t.createElement("div");n.style.overflowY="auto",n.style.overflowX="hidden",n.style.maxHeight="60vh";const l=t.createElement("textarea");l.id="iidee";t.createElement("div");const o=window.gsft_main.g_form,s=o.elements.filter((e=>"journal_input"===e.type));n.appendChild(l);const r=t.createElement("div");s.forEach((e=>{const i=t.createElement("button");i.textContent=e.fieldName,r.appendChild(i),i.onclick=()=>{const t=window.gsft_main.tinymce.get("iidee").getContent();o.setValue(e.fieldName,`[code]${t}[/code]`)}})),n.appendChild(r),i.appendChild(n)})((()=>{const e=t.createElement("div");e.id="drc-overlay",e.style.position="fixed",e.style.top=0,e.style.left=0,e.style.width="100vw",e.style.height="100vh",e.style.backgroundColor="rgba(0, 0, 0, 0.6)",e.style.zIndex=9999,e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center";const i=t.createElement("div");i.id="modal-container",i.style.background="#fff",i.style.padding="20px",i.style.borderRadius="8px",i.style.boxShadow="0 0 10px rgba(0,0,0,0.3)",i.style.maxWidth="1000px",i.style.textAlign="center",i.style.maxHeight="70vh",i.style.position="absolute";const a=t.createElement("div");a.style.cursor="move",a.style.height="20px",a.style.marginBottom="10px",a.style.background="rgba(100, 100, 100, 0.3)",a.style.borderRadius="8px";const n=((e,i)=>{let a=!1,n=0,l=0;const o=e=>{a&&(i.style.left=e.clientX-n+"px",i.style.top=e.clientY-l+"px")},s=()=>{a=!1,t.body.style.userSelect=""};e.addEventListener("mousedown",(e=>{a=!0,n=e.clientX-i.offsetLeft,l=e.clientY-i.offsetTop,t.body.style.userSelect="none"})),t.addEventListener("mousemove",o),t.addEventListener("mouseup",s);const r=[];return r.push((()=>{t.removeEventListener("mousemove",o),t.removeEventListener("mouseup",s)})),r})(a,i);i.append(a),e.appendChild(i),t.body.appendChild(e);return e.addEventListener("click",(a=>{i.contains(a.target)||(t.body.removeChild(e),n.forEach((e=>e())))})),i})())}();

/*
(function () {
    const tinyMceConfig = {
        attachmentCanPopup: "true",
        attachmentCanView: "true",
        canReadDbImage: true,
        canReadDbVideo: true,
        allowedExtensions: "",
        videoExtensions: "webm|mov|swf|avi|mp4",
        convert_urls: false,
        custom_elements: "sn-toc,~sn-mention",
        link_default_target: "",
        enable_media_sites: "youtube.com,player.vimeo.com,vimeo.com,players.brightcove.net,brightcove.net",
        extended_valid_elements: "now-illustration-custom[token-id|src|alt|width|height],sn-toc,sn-mention[class|table|sysid]",
        font_family_formats: "Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;",
        language: "en",
        plugins: "powerpaste accordion advlist align_listitems anchor autolink charmap codemirror directionality editimage emoticons fullscreen help image insertdatetime link lists media nonbreaking pagebreak preview readonlynoborder searchreplace table visualblocks visualchars",
        powerpaste_html_import: "clean",
        powerpaste_word_import: "prompt",
        powerpaste_clean_filtered_inline_elements: "strong, b",
        relative_urls: true,
        remove_script_host: true,
        contextmenu: "link image table",
        toolbar: [
            "bold italic underline undo redo | fontfamily fontsize table | forecolor backcolor link unlink | image media code | alignleft aligncenter alignright | bullist numlist fullscreen"
        ],
        menubar: false,
        menu: {
            file: { title: "File", items: "newdocument restoredraft | preview | export print | deleteallconversations" },
            edit: { title: "Edit", items: "undo redo | cut copy paste pastetext | selectall | searchreplace" },
            view: { title: "View", items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments" },
            insert: { title: "Insert", items: "image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime" },
            format: { title: "Format", items: "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat" },
            tools: { title: "Tools", items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount" },
            table: { title: "Table", items: "inserttable | cell row column | advtablesort | tableprops deletetable" },
            help: { title: "Help", items: "help" }
        },
        style_formats: [
            {
                title: "Headings",
                items: [
                    { title: "Heading 1", format: "h1" },
                    { title: "Heading 2", format: "h2" },
                    { title: "Heading 3", format: "h3" },
                    { title: "Heading 4", format: "h4" },
                    { title: "Heading 5", format: "h5" },
                    { title: "Heading 6", format: "h6" }
                ]
            },
            {
                title: "Inline",
                items: [
                    { title: "Bold", format: "bold" },
                    { title: "Italic", format: "italic" },
                    { title: "Underline", format: "underline" },
                    { title: "Strikethrough", format: "strikethrough" },
                    { title: "Superscript", format: "superscript" },
                    { title: "Subscript", format: "subscript" },
                    { title: "Code", format: "code" }
                ]
            },
            {
                title: "Blocks",
                items: [
                    { title: "Paragraph", format: "p" },
                    { title: "Blockquote", format: "blockquote" },
                    { title: "Div", format: "div" },
                    { title: "Pre", format: "pre" }
                ]
            },
            {
                title: "Align",
                items: [
                    { title: "Left", format: "alignleft" },
                    { title: "Center", format: "aligncenter" },
                    { title: "Right", format: "alignright" },
                    { title: "Justify", format: "alignjustify" }
                ]
            }
        ],
        text_patterns: false,
        promotion: false,
        help_tabs: ["shortcuts", "keyboardnav", "versions"],
        automatic_uploads: false,
        allow_script_urls: false
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
        overlay.style.zIndex = 9999;
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
                document.body.removeChild(overlay);
                cleanupHandlers.forEach(fn => fn());
            }
        }
        overlay.addEventListener("click", onOverlayClick);

        return modalContainer;
    }

    const addModalContent = (modalContainer) => {
        const createEditor = () => {
            if (typeof window.gsft_main.setupTinymceField === 'undefined') {
                const interval = setInterval(() => {
                    const fn = window.gsft_main.setupTinymceField;
                    if (typeof fn === 'function') {
                        clearInterval(interval);
                        fn("iidee", tinyMceConfig);
                    }
                }, 100);
            } else {
                window.gsft_main.setupTinymceField("iidee", tinyMceConfig);
            }

        }
        if (!document.getElementById("tinymcedeps")) {
            const tinymceScript = document.createElement('script');
            tinymceScript.id = "tinymcedeps"
            tinymceScript.src = '/scripts/tinymce_default/js_includes_tinymce.jsx?sysparm_substitute=false';
            tinymceScript.onload = () => {
                createEditor()
            };
            window.gsft_main.document.head.appendChild(tinymceScript)
        } else {
            createEditor()
        }

        const modalContent = document.createElement("div");
        modalContent.style.overflowY = "auto";
        modalContent.style.overflowX = "hidden";
        modalContent.style.maxHeight = "60vh";
        const textArea = document.createElement("textarea");
        textArea.id = "iidee";
        const buttons = document.createElement("div");
        const g_form = window.gsft_main.g_form;
        const journalInputs = g_form.elements.filter(e => e.type === "journal_input");

        modalContent.appendChild(textArea)
        const buttonContainer = document.createElement("div");
        journalInputs.forEach(journalInput => {
            const button = document.createElement("button");
            button.textContent = journalInput.fieldName;
            buttonContainer.appendChild(button)
            button.onclick = () => {
                const content = window.gsft_main.tinymce.get('iidee').getContent();
                g_form.setValue(journalInput.fieldName, `[code]${content}[/code]`)
            }
        });
        modalContent.appendChild(buttonContainer)
        modalContainer.appendChild(modalContent)
    }
    const document = window.gsft_main ? window.gsft_main.document : top.document;

    if (document.getElementById("drc-overlay")) return;

    const modalContainer = createOverlay();
    addModalContent(modalContainer);
})();
/*
