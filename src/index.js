angular.module('clickAndWait', [])
  .directive('clickAndWait', () => ({
    restrict: 'A',
    scope: {
      asyncAction: '&clickAndWait',
    },
    link: (scope, element) => {
      element.bind('click', () => {
        element.prop('disabled', true);
        scope.$apply(() => {
          scope.asyncAction().finally(() => {
            element.prop('disabled', false);
          });
        });
      });
    },
  }));
