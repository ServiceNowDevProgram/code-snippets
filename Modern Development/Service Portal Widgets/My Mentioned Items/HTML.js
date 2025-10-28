<div class="main-cont">
  <div class="panel-heading b-b">
    <h2 class="panel-title ng-binding">${My Mentions}</h2>
  </div>
  <div>
    <div class="page-container">
      <ul>
        <li ng-repeat="item in data.mentionArr">
          <span>${You have been mentioned in }</span><a href = {{item.url}} target="_blank">{{item.record}}</a> <span>${by }{{item.user_from}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
