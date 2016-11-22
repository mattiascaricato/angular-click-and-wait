'use strict';

angular.module('clickAndWait', []).directive('clickAndWait', function () {
  return {
    restrict: 'A',
    scope: {
      asyncAction: '&clickAndWait'
    },
    link: function link(scope, element) {
      element.bind('click', function () {
        element.prop('disabled', true);
        scope.$apply(function () {
          scope.asyncAction().finally(function () {
            element.prop('disabled', false);
          });
        });
      });
    }
  };
});