var StickyStatesPlugin = window['@uirouter/sticky-states'].StickyStatesPlugin;
var Visualizer = (window['@uirouter/visualizer'] || window['ui-router-visualizer']).Visualizer;

// Create the module where our functionality can attach to
var APP_MODULE = angular.module('app', ['ui.router']);

APP_MODULE.config(function($uiRouterProvider) {
    $uiRouterProvider.plugin(StickyStatesPlugin);
    $uiRouterProvider.plugin(Visualizer);

    // Add states
    var stateRegistry = $uiRouterProvider.stateRegistry;

    stateRegistry.register({
        name: 'home',
        url: '/home?refresh',
        sticky: true,
        views: {
            home: 'generic',
        },
    });

    stateRegistry.register({
        name: 'about',
        url: '/about',
        sticky: true,
        views: {
            about: 'generic',
        },
    });

    // Set initial state
    var urlService = $uiRouterProvider.urlService;
    urlService.rules.initial({
        state: 'home'
    })
});

// Generic component
APP_MODULE.component('generic', {
    template: `
    <h1>{{ $ctrl.$state$.name }} state loaded</h1>
    <textarea ng-model="$ctrl.text"></textarea>
  `,
    controller: function() {
        this.text = "Text entered here is not lost";
    },
    bindings: {
        '$state$': '<'
    },
});


APP_MODULE.run(function($state, $rootScope) {
    $rootScope.$state = $state;
}).directive('reloadUiRouter', function($state, $compile) {
    return {
        priority: -1000,
        compile: function(tElement) {
            return function(scope, $element, attrs) {
                scope.$watch(attrs.reloadUiRouter, function(value) {
                    if (parseInt(value) === 1) {
                        var element = angular.element('div[ui-view="home"]');
                        $element.html($compile(element.contents())(scope));
                        $state.go('home');
                    }
                });

            }
        }
    }
});


// APP_MODULE.run(function($state, $rootScope) {
//     $rootScope.$state = $state;
// }).directive('reloadUiRouter', function($stateProvider, $uiRouterProvider, $transitionsProvider) {
//     $transitionsProvider.onSuccess({}, function(transition) {
//         var stateRegistry = $uiRouterProvider.stateRegistry;
//         var stickyStatesPlugin = $uiRouterProvider.getPlugin('sticky-states');
//         var currentState = $stateProvider.stateService.current;
//         if (currentState.name === 'home') {
//             stickyStatesPlugin.exitSticky('about');
//         }
//     })
// });
