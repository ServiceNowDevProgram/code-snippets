A common complaint I hear about testing email is that people don’t know who was actually supposed to receive emails when the override is on ([glide.email.test.user](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/reference-pages/reference/r_OutboundMailConfiguration.html) property).

The included business rule takes the intended recipients information and puts it in the body of the email at the bottom as shown below. This information can be used by testers to validate that emails would have been sent to the correct recipients.

*****
Email override is on. All outbound emails are currently sent to: bob.atherton@example.com, ccarter@example.com</br>
Original Intended Recipients:</br>
TO: Ray.Hatch@example.com,Ron.deGuzman@example.com,Glen.Traasdahl@example.com</br>
CC: Cherdell.Singleton@example.com,Ruthe.Aggarwal@example.com</br>
BCC: Morgan.Avery@example.com</br>
*****

If there aren’t any CC or BCC recipients those lines will be omitted respectively.

The business rule checks to see if the override is on, so it’s ok to have in a production instance because it won’t apply once they remove the override value.
