angular.module('uiWebsite', []);

function MainCtrl($scope, $http, $filter) {
    var filter = $filter('filter');
    
    $scope.modules = [];
    $http.get('/modules').success(function(modules) {
        $scope.modules = modules;
    });

    $scope.buildSelectedModules = function() {
        $http.post('/build', {
            modules: $scope.selectedModules()
        })
    }
    
    $scope.selectAllModules = function() {
        angular.forEach($scope.modules, function(module) {
            module.checked = true;
        });
    };
    
    $scope.selectedModules = function() {
        return filter($scope.modules, {checked: true});  
    };
    
}