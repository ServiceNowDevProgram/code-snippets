<div>
  <h1 class="heading-message">${This page could not be found. Based on your search we have found below valid pages}</h1>
  <div class="page-container"> <!-- Container to show valid pages.-->
    <ul>
      <li ng-repeat="item in data.pageArr">  <!-- List to show valid pages.-->
        <a href = {{item.url}} target="_blank">{{item.name}}</a>
      </li>
    </ul>
  </div>
</div>
