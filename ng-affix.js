angular.module("ng-affix", []).directive('affixTop', ['$document', '$window', '$timeout', function ($document, $window, $timeout) {
        return {
            restrict: 'E',
            scope: {name: '@', offset: '=?'},
            link: function (scope, element, attrs) {
                var parent = element.parent(),
                    offset = scope.offset || 0,
                    affixTop = null;

                var checkPosition = function () {
                    if ($window.pageYOffset >= (parent.offset().top - offset)) {
                        if (affixTop === true) {
                            return;
                        }
                        element.addClass('affix-top');
                        affixTop = true;
                    } else {
                        if (affixTop === false) {
                            return;
                        }
                        element.removeClass('affix-top');
                        affixTop = false;
                    }
                };

                var resizeChild = function () {
                    element.css({width: parent.width() + 'px'});
                    parent.css({height: element.height() + 'px'});
                };

                if (scope.name) {
                    scope.$parent[scope.name] = {
                        refresh: function () {
                            $timeout(function () {
                                resizeChild();
                                checkPosition();
                            });
                        }
                    }
                }

                angular.element($window).bind('scroll', checkPosition);
                angular.element($window).on('resize', resizeChild);
                angular.element($document).ready(resizeChild);
            }
        };
    }]).directive('affixBottom', ['$document', '$window', '$timeout', function ($document, $window, $timeout) {
        return {
            restrict: 'E',
            scope: {name: '@', offset: '=?'},
            link: function (scope, element, attrs) {
                var parent = element.parent(),
                    offset = scope.offset || 0,
                    affixBottom = null;

                var checkPosition = function () {
                    if (($window.pageYOffset + $window.innerHeight) <= (parent.offset().top + element.height() + offset)) {
                        if (affixBottom === true) {
                            return;
                        }
                        element.addClass('affix-bottom');
                        affixBottom = true;
                    } else {
                        if (affixBottom === false) {
                            return;
                        }
                        element.removeClass('affix-bottom');
                        affixBottom = false;
                    }
                };

                var resizeChild = function () {
                    element.css({width: parent.width() + 'px'});
                    parent.css({height: element.height() + 'px'});
                };

                if (scope.name) {
                    scope.$parent[scope.name] = {
                        refresh: function () {
                            $timeout(function () {
                                resizeChild();
                                checkPosition();
                            });
                        }
                    }
                }

                angular.element($window).bind('scroll', checkPosition);
                angular.element($window).on('resize', resizeChild);
                angular.element($document).ready(function () {
                    resizeChild();
                    checkPosition();
                });
            }
        };
    }]);
