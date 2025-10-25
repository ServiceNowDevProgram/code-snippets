//HTML code that displays the incidents to select multiple at once.
<div class="panel panel-default m-t">
  <div class="panel-heading">
    <h3 class="m-b-md">Complaints</h3>

    <div class="form-inline"
         style="display:flex; align-items:center; flex-wrap:wrap; gap:12px;">
      <!-- Search -->
      <div class="form-group" style="margin-left:auto;">
        <div class="input-group">
          <input type="text"
                 class="form-control"
                 placeholder="Search complaints..."
                 ng-model="c.searchText"
                 ng-keypress="$event.keyCode==13 && c.searchIncidents()"
                 style="min-width:250px;">
          <span class="input-group-addon" ng-click="c.searchIncidents()">
            <i class="fa fa-search"></i>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="panel-body">
    <!-- Selected Count Indicator -->
<div class="text-right text-muted" ng-if="c.getSelectedCount() > 0" style="margin-bottom: 8px;">
  <span class="label label-info" style="font-size: 13px; padding: 6px 10px;">
    {{c.getSelectedCount()}} complaint<span ng-if="c.getSelectedCount() > 1">s</span> selected
    (across pages)
  </span>
</div>

    <table id="incidentsList"
       class="table table-hover table-striped table-bordered"
       role="table">
  <thead>
    <tr>
      <th>
        <input type="checkbox"
               ng-checked="c.isAllSelectedOnPage()"
               ng-click="c.toggleSelectAll($event)"
               title="Select all on this page" />
      </th>
      <th>
        <a href="javascript:void(0)" ng-click="sortType='batchno'; sortReverse=!sortReverse">
          Run Date
          <span ng-show="sortType=='number' && !sortReverse" class="fa fa-caret-down"></span>
          <span ng-show="sortType=='number' && sortReverse" class="fa fa-caret-up"></span>
        </a>
      </th>
      <th><a href="javascript:void(0)" ng-click="sortType='caseid'; sortReverse=!sortReverse">
        Case ID
        <span ng-show="sortType == 'caller_id' && !sortReverse" class="fa fa-caret-down"></span>
        <span ng-show="sortType == 'caller_id' && sortReverse" class="fa fa-caret-up"></span>
        </a></th>
      <th><a href="javascript:void(0)" ng-click="sortType = 'policyid'; sortReverse = !sortReverse">
        Policy ID
        <span ng-show="sortType == 'short_description' && !sortReverse" class="fa fa-caret-down"></span>
              <span ng-show="sortType == 'short_description' && sortReverse" class="fa fa-caret-up"></span>
            </a></th>
      
    </tr>
  </thead>

  <tbody>
    <tr ng-repeat="item in c.incidentsList | orderBy:sortType:sortReverse">
      <td>
        <input type="checkbox"
               ng-checked="c.isChecked(item.sys_id)"
               ng-click="c.toggleCheckbox(item.sys_id, $event)" />
      </td>
      <td><a href="{{item.url}}">{{item.batchno}}</a></td>
      <td>{{item.caseid}}</td>
      <td>{{item.policyid}}</td>
    </tr>
    <tr ng-if="!c.complaintsList.length">
      <td colspan="9" class="text-center text-muted">No incidents found.</td>
    </tr>
  </tbody>
</table>

    <!-- Pagination Controls -->
    <div class="pagination-controls text-center" style="margin-top:10px;">
      <button class="btn btn-default" ng-disabled="c.pageNumber===1" ng-click="c.prevPage()">Prev</button>
      <span> Page {{c.pageNumber}} of {{c.totalPages}} </span>
      <button class="btn btn-default" ng-disabled="c.pageNumber===c.totalPages" ng-click="c.nextPage()">Next</button>
    </div>
  </div>
</div>
