'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
        $routeProvider.when('/view2/:id', {
            templateUrl: 'view2/view22.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
        $scope.show = true;
        $scope.infoMed = [];
        $scope.showme = false;
        $scope.cetId = 0;
        $scope.quelMed = $routeParams.id;
        $scope.listChecked = [];
        $scope.showStat = false;
        $scope.stat = "show";
        $scope.infoTest = [
            {titre: "extitre", naissance: "momom", sexe: "omncds", travail: "obo"}
        ];


        $scope.testMed = [
            {cetId: 0, prenom: "nnnn", nom: "swrefs"},
            {cetId: 1, prenom: "uiom", nom: "noedvf"}
        ];

        $scope.listeSelect = ["Tout", "Nom", "Titre"];

        //hide / show responsable
        $scope.showResp = function (resp) {
            if (resp == "Oui") {
                $scope.showme = true;
            } else {
                $scope.showme = false;
            }
        };

//hide / show
        $scope.nvMed = function () {
            $scope.show = false;
        };
        $scope.retourMed = function () {
            $scope.show = true;
        };

//Ajouter infos formulaire à liste
        $scope.addMed = function () {
            $scope.infoMed.push({
                cetId: $scope.cetId,
                nom: $scope.med.nom,
                prenom: $scope.med.prenom,
                titre: $scope.med.titre,
                naissance: $scope.med.naissance,
                sexe: $scope.med.radios,
                lieu: $scope.med.lieu,
                mail: $scope.med.mail,
                numero: $scope.med.numero,
                reponsable: $scope.med.radioresp,
                nomresp: $scope.med.nomresp,
                preresp: $scope.med.preresp,
                mailresp: $scope.med.mailresp
            });
            $scope.show = true;
            $scope.cetId++;
        };

        $scope.medChecked = function (unId, chkd) {
            if (chkd == 1) {
                $scope.listChecked.push({idMed: unId});
            } else {
                for (var i = 0; i < $scope.listChecked.length; i++) {
                    if (unId == $scope.listChecked[i].idMed) {
                        $scope.listChecked.splice(i, 1);
                    }
                }
            }
            $scope.bonjour = $scope.listChecked;
        };

        $scope.deleteMed = function () {
            if (confirm("Voulez-vous vraiment supprimer ces éléments?") == true) {
                for (var i = 0; i < $scope.listChecked.length; i++) {
                    $scope.x = $scope.listChecked[i].idMed;
                    $scope.index = $scope.x.toString();
                    $scope.index = parseInt($scope.index);
                    $scope.test = $scope.index;
                    for (var j = 0; j < $scope.infoMed.length; j++) {
                        if ($scope.index == $scope.infoMed[j].cetId) {
                            $scope.infoMed.splice(j, 1);
                        }
                    }
                }
                $scope.listChecked = [];
            }
        };

        $scope.selectChange = function (value) {
            if (value != "Tout") {
                $scope.rech = value.toLowerCase();
            } else {
                $scope.rech = "$";
            }
            $scope.recherche = {};
            $scope.recherche[$scope.rech] = $scope.searchKeyword;
            console.log($scope.recherche);
        };
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        if ($routeParams.id != null) {
            $(document).ready(function () {
                var ctx = $("#mycanvas").get(0).getContext("2d");
                //pie chart data
                var data = {
                    labels: ["2011", "2012", "2013", "2014", "2015", "2016"],
                    datasets: [{
                        data: [65, 59, 80, 81, 56, 55],
                        fillColor: "powderblue",
                        highlightFill: "lightskyblue"
                    }]
                };
                //draw
                var piechart = new Chart(ctx).Line(data);
            })
        }


        $scope.showStati = function () {
            if ($scope.showStat == true) {
                $scope.showStat = false;
                $scope.stat = "show";
            } else {
                $scope.showStat = true;
                $scope.stat = "hide";
            }
        };

    }]);

