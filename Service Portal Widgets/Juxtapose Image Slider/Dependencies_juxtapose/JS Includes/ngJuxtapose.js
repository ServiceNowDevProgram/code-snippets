angular.module('ngJuxtapose', [])
	.provider('juxtaposeConfig', function(){

		//the default options
		var defaultConfig = {
			startingPosition: '50%',
			showLabels : true,
			showCredits: true,
			animate : true,
			vertical : false
		};

		var config = angular.extend({}, defaultConfig);

		return {
			setStartingPosition : function(value){
				config.startingPosition = value;
			},
			setShowLabels : function(value){
				config.showLabels = value;
			},
			setShowCredits : function(value){
				config.showCredits = value;
			},
			setAnimate : function(value){
				config.animate = value;
			},
			setVertical : function(value){
				config.vertical = value;
			},
			$get: function(){
				return {
					startingPosition: '50%',
					showLabels : true,
					showCredits: true,
					animate : true,
					vertical : false
				};
			}
		};
	})
	.controller('JuxtaposeController', ['$scope', '$attrs', '$parse', '$window', 'juxtaposeConfig',  function($scope, $attrs, $parse,  $window, juxtaposeConfig){

		var self = this;

		if(!$window.juxtapose) {
			console.error("Cannot find 'juxtapose'. Make sure you've included the JuxtaposeJS library before this directive");
			return;
		}

		// Configuration attributes
		angular.forEach(['startingPosition', 'showLabels', 'showCredits', 'animate', 'vertical'], function( key, index ) {
			$scope[key] = angular.isDefined($attrs[key]) ? (index < 1 ? $parse($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : juxtaposeConfig[key];
		});

		var selector = '#' + $attrs.id;

		// Watchable configuration attributes
		angular.forEach(['startingPosition', 'showLabels', 'showCredits', 'animate', 'vertical'], function( key ) {
			if ( $attrs[key] ) {
				$scope.$parent.$watch($parse($attrs[key]), function(value, oldValue) {
					if(value !== oldValue){
						$scope[key] = value;
						self.updateSlider();
					}
				});
			} 
		});

		//Watchable directive attributes
		$scope.$watchCollection(
			'[beforeImageUrl, beforeImageLabel, beforeImageCredit, beforeImageAlt, afterImageUrl, afterImageLabel, afterImageCredit, afterImageAlt]', 
			function (newValues) { 
				var beforeImageUrl = newValues[0], afterImageUrl = newValues[4];
				if(beforeImageUrl && afterImageUrl){
					self.updateSlider();
				}
			}
		);

		//Clean up
		$scope.$on('$destroy', function() {
			self.$element = null;
			self.slider = null;
		});

		this.init = function(element){
			self.$element = element;
			self.slider = null;
		};

		this.updateSlider = function(){
			
			var selector = '#' + $attrs.id;

			var images = [
				{
					src: $scope.beforeImageUrl,
					label: $scope.beforeImageLabel,
					credit: $scope.beforeImageCredit
				},
				{
					src: $scope.afterImageUrl,
					label: $scope.afterImageLabel,
					credit: $scope.afterImageCredit
				}
			];

			var options = {
				animate: $scope.animate,
				showLabels: $scope.showLabels,
				showCredits: $scope.showCredits,
				mode: $scope.vertical ? 'vertical' : 'horizontal',
				startingPosition: $scope.startingPosition,
				callback : $scope.callback
			};
			self.$element.empty();//remove previous slider if any
			self.slider = new juxtapose.JXSlider(selector, images, options);

			if($attrs.beforeImageAlt || $attrs.afterImageAlt){
				var imgElements = self.$element.find('img');

				var children =  self.$element.children();
				var $jxSlider =  self.$element.children().eq(0);
				var $jxImageLeft = $jxSlider.children().eq(1);
				var $jxImageRight = $jxSlider.children().eq(2);

				angular.element($jxImageLeft.eq(0)[0]).attr('alt', $scope.beforeImageAlt);
				angular.element($jxImageRight.eq(0)[0]).attr('alt', $scope.afterImageAlt);
			}
		};

		this.getElement = function(){
			return self.$element;
		};

		this.getSlider = function(){
			return self.slider;
		};

	}])
	.directive('juxtapose', function () {
		var counter = 0;
		var ID_ATTR = 'juxtapose';
		return {
			restrict: 'EA',
			scope: {
				beforeImageUrl : '=',
				beforeImageLabel : '=?',
				beforeImageCredit : '=?',
				beforeImageAlt : '=?',

				afterImageUrl : '=',
				afterImageLabel : '=?',
				afterImageCredit : '=?',
				afterImageAlt : '=?',

				callback : '&?'
			},
			template : '<div class="juxtapose"></div>',
			replace: true,
			controller: 'JuxtaposeController',
			link: function (scope, element, attrs, juxtaposeCtrl) {

				// generate an ID
				attrs.$set('id', ID_ATTR + '-' + counter++);

				juxtaposeCtrl.init(element);
			}
		};
	});