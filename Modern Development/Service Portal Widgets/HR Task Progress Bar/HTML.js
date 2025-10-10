<!-- HTML to show progress bar on HRM Page -->
<div class="parent">
  <div ng-class="{{tasks.state}}==18||data.state==18 ? 'child':'child_1'" ng-repeat="tasks in data.taskArr">
   {{tasks.number}}
  </div>
</div>
