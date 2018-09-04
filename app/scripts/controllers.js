"use strict";

var app = angular.module('confusionApp');

app.controller("MenuController", ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1; 
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    $scope.dishes = menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status+" "+response.statusText;
        }
    );

    $scope.filtText = '';

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        }
        else if (setTab === 3) {
            $scope.filtText = "mains";
        }
        else if (setTab === 4) {
            $scope.filtText = "dessert";
        }
        else {
            $scope.filtText = '';
        }
    };
    $scope.isSelected = function (checkTab) {
        return (this.tab === checkTab);
    };

    $scope.showDetails = false;

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

}]).controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
    var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}]).controller('FeedbackController', ['$scope', function ($scope) {

    $scope.sendFeedback = function () {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "", firstName: "", lastName: "",
                agree: false, email: ""
            };
            $scope.feedback.mychannel = "";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };

}]).controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)})
    .$promise.then(
        function(response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status+" "+response.statusText;
        }
    );


}]).controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.formComment = {
        author: "",
        rating: 0,
        comment: ""
    };

    $scope.submitComment = function () {
        $scope.formComment.date = new Date().toISOString();
        console.log($scope.formComment);
        $scope.dish.comments.push($scope.formComment);
        menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
        $scope.commentForm.$setPristine();
        $scope.formComment = {
            author: "",
            rating: 5,
            comment: "",
            date: ""
        };
    };
}]).controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.getDishes().get({id:0})
    .$promise.then(
        function(response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status+" "+response.statusText;
        }
    );
    

    $scope.featuredPromotion = menuFactory.getPromotion(0);
    $scope.executiveChef = corporateFactory.getLeader(3);

}]).controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    $scope.leaders = corporateFactory.getLeaders();

}]);