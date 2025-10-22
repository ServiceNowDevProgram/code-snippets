<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
    <g:ui_form>
        <div class="modal-body">
            <h1 class="text-center">Important Message</h1>
            <p>Please read and acknowledge this important message before proceeding.</p>
            <p>
                Your access will be revoked if you don't log in for 30 days!
            </p>
            <div class="text-center" style="margin-top: 20px;">
                <button id="acknowledge_btn" class="btn btn-primary" onclick="return closeDialog();">Acknowledge</button>
            </div>
        </div>
    </g:ui_form>
    <script>
        (function() {
            function closeDialogAndRedirect() {
                try {
                    GlideDialogWindow.get().destroy();
                } catch (e) {}

                // Set user preference
                if (typeof setPreference === 'function') {
                    setPreference('login.consent1', 'true');
                }
                // Redirect to home.do
                window.top.location.href = 'home.do';
            }
            document.getElementById('acknowledge_btn').addEventListener('click', closeDialogAndRedirect);
        })();
    </script>

</j:jelly>
