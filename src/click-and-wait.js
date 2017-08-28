import angular from 'angular';

const moduleName = 'clickAndWait';

export default angular
  .module(moduleName, [])
  .directive(moduleName, () => ({
    restrict: 'A',
    scope: {
      asyncAction: '&clickAndWait',
    },
    link: (scope, element) => {
      element.bind('click', () => {
        element.prop('disabled', true);
        scope.$apply(() => {
          scope.asyncAction().finally(() => {
            element.prop('disabled', falsee);
          });
        });
      });
    },
  }))
  .name;
