<h1>Major Incident Proposal - Client Script & Script Include</h1>

<p>This solution asks the users to propose an incident as a <strong>Major Incident</strong> candidate. The process is initiated from the <strong>Incident</strong> form when the priority is set to <strong>1 (Critical)</strong>, and the system checks if the incident has already been proposed as a Major Incident. If not, the user is prompted to confirm whether they wish to propose the incident. Upon confirmation, the incident is updated, and the <strong>Major Incident</strong> status is assigned.</p>

<p>This solution consists of a <strong>Client Script</strong> and a <strong>Script Include</strong>, which handle the user interaction and the back-end logic, respectively.</p>

<h2>Functionality</h2>

<h3>1. Client Script - <code>onSubmit()</code></h3>
<p>The <strong>Client Script</strong> is triggered when the user submits an Incident form with a priority of <strong>1 (Critical)</strong>. It performs the following actions:</p>
<ul>
    <li>Checks if the incident is already marked as a Major Incident by calling the Script Include via <strong>GlideAjax</strong>.</li>
    <li>If the incident is not already marked as a Major Incident, the user is prompted to confirm whether they wish to propose it as a Major Incident.</li>
    <li>Upon confirmation, the incident is proposed as a Major Incident candidate, and a success message is displayed with the incident number.</li>
</ul>

<h4>Key Features:</h4>
<ul>
    <li><strong>Priority Check</strong>: The script only runs when the priority is set to 1 (Critical).</li>
    <li><strong>GlideAjax Call</strong>: Uses <strong>GlideAjax</strong> to communicate with the server-side <strong>Script Include</strong> to check and propose the Major Incident.</li>
    <li><strong>User Confirmation</strong>: The user is prompted to confirm the proposal of the Major Incident before proceeding.</li>
    <li><strong>Synchronous Execution</strong>: The script waits for a response from the server using <code>getXMLWait()</code> to ensure the process completes before submitting the form.</li>
</ul>



<h3>2. Script Include - <code>CreateMajorIncident</code></h3>
<p>The <strong>Script Include</strong> provides the back-end logic for:</p>
<ul>
    <li>Checking whether the incident is already proposed as a Major Incident.</li>
    <li>Proposing the incident as a Major Incident by updating its <code>major_incident_state</code>, <code>proposed_by</code>, and <code>proposed_on</code> fields, and adding work notes.</li>
</ul>



<h3>Usage Example:</h3>
<ol>
    <li>When the priority of an incident is set to <strong>1 (Critical)</strong>, the client script checks whether the incident is already a Major Incident.</li>
    <li>If not, the user is prompted to confirm the Major Incident proposal.</li>
    <li>Upon confirmation, the <code>CreateMajorIncident</code> Script Include updates the incident record to reflect its <strong>proposed</strong> Major Incident status and returns the incident number.</li>
</ol>

<h2>Customization</h2>
<p>You can easily customize this functionality by:</p>
<ul>
    <li>Adding more validation rules to the Script Include.</li>
    <li>Modifying the client script to handle different priorities or additional fields.</li>
    <li>Updating the work notes or other fields when proposing the incident.</li>
</ul>
