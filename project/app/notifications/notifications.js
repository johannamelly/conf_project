/**
 * Created by johanna.melly on 27.04.2016.
 */
'use strict';

angular.module('myApp.notifications', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/notifications', {
            templateUrl: 'notifications/notifications.html',
            controller: 'NotificationsCtrl'
        });
    }])

    .controller('NotificationsCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.listeConf = [
            {nom: "conf1", debut: "01-11-2016", fin: "03-11-2016"},
            {nom: "conf2", debut: "13-10-2017", fin: "15-10-2017"}
        ];

        $scope.idNotif = 0;
        $scope.listeNotif = [
            {
                cetId: 0,
                date: new Date(2016, 4, 3),
                notification: "La conférence 1 est dans 3 jours",
                voir: "1008" //id conf
            },
            {
                cetId: 1,
                date: new Date(2016, 1, 3),
                notification: "La conférence 2 est dans 3 jours",
                voir: "1008" //id conf
            }
        ];

        $scope.tab = [];
        $scope.selectedNotif = [];

        $scope.notifPassees = [];

        $scope.selectedPassees = [];

        $scope.notifTroisJ = [];
        $scope.diffJours = 24 * 60 * 60 * 1000;
        $scope.today = new Date();
        $scope.fDate = new Date($scope.today.getFullYear(), $scope.today.getMonth(), $scope.today.getDate());

        $scope.notifMedecin = [];
        $scope.notifMedecinP = [];

        $scope.dansTroisJ = new Date;
        $scope.dansTroisJ.setDate(($scope.dansTroisJ.getDate()) + 3);

        $scope.dansUnMois = new Date;
        $scope.dansUnMois.setDate(($scope.dansUnMois.getDate()) + 30);

        $scope.showNotif=false;
        $scope.showHide="Montrer";

        $scope.notifClick=function(){
          if($scope.showNotif==false){
              $scope.showNotif=true;
              $scope.showHide="Cacher";
          }else{
              $scope.showNotif=false;
              $scope.showHide="Montrer";
          }
        };


        $scope.changeTab = function () {
            $http({
                method: "POST",
                url: "http://localhost/WebServ/changeTab.php",
                data: {listeASuppr: $scope.selectedNotif}
            }).then(function (response) {
                $scope.notifChange = response.data;
            }, function (response) {
                $scope.notifChange = response.statusText;
            });
            $scope.selectedNotif = [];
            $scope.dbAfficherNotif();

        };


        $scope.checkNotif = function (value, quelId) {
            if (value == 1) {
                $scope.selectedNotif.push({cetId: quelId});
            } else {
                for (var i = 0; i < $scope.selectedNotif.length; i++) {
                    if ($scope.selectedNotif[i].cetId == quelId) {
                        $scope.selectedNotif.splice(i, 1);
                    }
                }
            }
        };

        $scope.checkPassee = function (value, quelId) {
            if (value == 1) {
                $scope.selectedPassees.push({cetId: quelId});
            } else {
                for (var i = 0; i < $scope.selectedPassees.length; i++) {
                    if ($scope.selectedPassees[i].cetId == quelId) {
                        $scope.selectedPassees.splice(i, 1);
                    }
                }
            }
            $scope.test = $scope.selectedPassees;
        };


        $scope.supprNotif = function () {
            $http({
                method: "POST",
                url: "http://localhost/WebServ/supprNotif.php",
                data: {
                    listeASuppr: $scope.selectedPassees
                }
            }).then(function (response) {
                $scope.delNotif = response.data;
            }, function (response) {
                $scope.delNotif = response.statusText;
            });
            $scope.dbAfficherNotif();
        };

        $scope.addDate = function () {
            $scope.test2 = $scope.form.deb;
            $scope.aujDate = new Date;
            $scope.test1 = $scope.test2 - $scope.aujDate;
            $scope.jours = Math.floor($scope.test1 / (1000 * 60 * 60 * 24)) + 1;
            if ($scope.jours == 3) {
                $scope.test1 = "La conférence est dans 3 jours";
            }
        };
        //Get les dates justes
        //comparaison entre dans 1 mois et la date récupérée
        $scope.dbGetNotif = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/getNotif.php"
            }).then(function (response) {
                $scope.lesDates = response.data;

                for ($scope.varJ = 0; $scope.varJ < $scope.lesDates.length; $scope.varJ++) {
                    if ($scope.lesDates[$scope.varJ].debut != '0000-00-00 00:00:00') {
                        $scope.lesDates[$scope.varJ].debut = new Date($scope.lesDates[$scope.varJ].debut);
                        $scope.diffDates = $scope.lesDates[$scope.varJ].debut - $scope.dansUnMois;
                        if (($scope.diffDates < $scope.diffJours) && ($scope.diffDates > 0)) {
                            $scope.notifTroisJ.push($scope.lesDates[$scope.varJ]);
                            //console.log("INOJIN");
                            //console.log($scope.notifTroisJ[($scope.notifTroisJ.length) - 1].titre);
                        }
                    } else {
                        $scope.lesDates[$scope.varJ].debut = null;
                    }
                    if ($scope.lesDates[$scope.varJ].fin != '0000-00-00 00:00:00') {
                        $scope.lesDates[$scope.varJ].fin = new Date($scope.lesDates[$scope.varJ].fin);
                    } else {
                        $scope.lesDates[$scope.varJ].fin = null;
                    }
                }

                $scope.notifTroisJ.forEach(function (ligneNot) {
                    $http({
                        method: "POST",
                        url: "http://localhost/WebServ/postNotifConf.php",
                        data: {
                            notif: ligneNot,
                            date: $scope.today
                        }
                    }).then(function (response) {
                        $scope.addNotifC = response.data;
                        //console.log("Les dates: ");
                        //console.log(ligneNot);
                        //console.log($scope.addNotifC.notif);
                    }, function (response) {
                        $scope.addNotifC = response.statusText;
                    });
                });

            }, function (response) {
                $scope.lesDates = response.statusText;
            });
        };



        //get dans liste les lignes où il y a un invité sans réponse
        //get dans conférence les lignes de la conférence concernée (dans une boucle for)
        //si le début de la conf est dans 3 jours ou moins alors on get dans médecin le médecin concerné
        //afficher dans les notifications (tableau ou table?)
        $scope.dbGetNotifMed = function () {

            $http({
                method: "GET",
                url: "http://localhost/WebServ/getNotifMed.php"
            }).then(function (response) {
                $scope.notifMed = response.data; //toutes les lignes de liste
                for ($scope.varJ = 0; $scope.varJ < $scope.notifMed.length; $scope.varJ++) {
                    if (($scope.notifMed[$scope.varJ].invite != '0000-00-00 00:00:00') && ($scope.notifMed[$scope.varJ].repondu == '0000-00-00 00:00:00')) {
                        $scope.tab.push($scope.notifMed[$scope.varJ]); //tab: lignes où med ont été invités mais n'ont pas répondu
                    }
                }
                var varI = 0;
                $scope.tab.forEach(function (ligne) {
                    //console.log("TOUR " + varI);
                    var varTest = ligne.conference;
                    var varData = ligne.medecin;
                    //console.log("VARTEST" + varTest);
                    $http({
                        method: "GET",
                        url: "http://localhost/WebServ/getNotifDateC.php",
                        params: {
                            titre: varTest
                        }
                    }).then(function (response) {

                        $scope.detConf = response.data; //info de la conf dont le titre match
                        if ($scope.detConf[0] && $scope.detConf[0].titre) {
                            //console.log($scope.detConf[0].titre);
                        }
                        if ($scope.detConf[0] && $scope.detConf[0].debut && $scope.detConf[0].debut != '0000-00-00 00:00:00') {
                            //console.log("DEB" + $scope.detConf[0].debut);
                            $scope.dateConf = new Date($scope.detConf[0].debut);
                        }
                        if (($scope.dateConf - $scope.dansTroisJ < $scope.diffJours) && $scope.dateConf - $scope.dansTroisJ > 0) {

                            //console.log("OUI" + $scope.dateConf);


                            var titreCetteConf = varTest;
                            var idCetteConf = $scope.detConf[0].id;


                            //
                            $http({
                                method: "GET",
                                url: "http://localhost/WebServ/getNotifQuelMed.php",
                                params: {idMed: varData}
                            }).then(function (response) {
                                $scope.notifQuelMed = response.data;
                                $scope.notifMedecin.push({
                                    idMed: $scope.notifQuelMed[0].id,
                                    nom: $scope.notifQuelMed[0].nom,
                                    prenom: $scope.notifQuelMed[0].prenom,
                                    idConf: idCetteConf,
                                    titre: titreCetteConf
                                });
                                $http({
                                    method: "POST",
                                    url: "http://localhost/WebServ/postNotif.php",
                                    data: {
                                        notif: $scope.notifQuelMed,
                                        titre: titreCetteConf,
                                        date: $scope.today,
                                        nomNotif:"med"
                                    }
                                }).then(function (response) {
                                    $scope.addNotif = response.data;
                                    //console.log(titreCetteConf);
                                }, function (response) {
                                    $scope.addNotif = response.statusText;
                                });


                            }, function (response) {
                                $scope.notifQuelMed = response.statusText;
                            });
                            //
                        }
                    }, function (response) {
                        $scope.detConf = response.statusText;
                    });
                });
            }, function (response) {
                $scope.notifMed = response.statusText;
            });
        };



        $scope.dbAfficherNotif = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/afficherNotif.php"
            }).then(function (response) {
                $scope.nvlNotifMed = response.data;
                for (var i = 0; i < $scope.nvlNotifMed.length; i++) {
                    $scope.nvlNotifMed[i].date = new Date($scope.nvlNotifMed[i].date);
                    $scope.nvlNotifMed[i].date = new Date($scope.nvlNotifMed[i].date.getFullYear(), $scope.nvlNotifMed[i].date.getMonth(), $scope.nvlNotifMed[i].date.getDate());
                }
            }, function (response) {
                $scope.nvlNotifMed = response.statusText;
            });
        };








//fonctionne mais tout apparaît à double lorsque l'on affiche notifMedecinP
        $scope.dbGetNotifPasse = function () {

            $http({
                method: "GET",
                url: "http://localhost/WebServ/getNotifMed.php"
            }).then(function (response) {
                $scope.notifMedP = response.data; //toutes les lignes de liste
                for ($scope.varJ = 0; $scope.varJ < $scope.notifMedP.length; $scope.varJ++) {
                    if (($scope.notifMedP[$scope.varJ].invite != '0000-00-00 00:00:00') && ($scope.notifMedP[$scope.varJ].repondu == '0000-00-00 00:00:00')) {
                        $scope.tab.push($scope.notifMedP[$scope.varJ]); //tab: lignes où med ont été invités mais n'ont pas répondu
                    }
                }
                var varI = 0;
                $scope.tab.forEach(function (ligne) {
                    console.log("TOUR" + varI);
                    var varTest = ligne.conference;
                    var varData = ligne.medecin;
                    console.log("VARTEST" + varTest);
                    $http({
                        method: "GET",
                        url: "http://localhost/WebServ/getNotifDateC.php",
                        params: {
                            titre: varTest
                        }
                    }).then(function (response) {

                        $scope.detConfP = response.data; //info de la conf dont le titre match
                        if ($scope.detConfP[0] && $scope.detConfP[0].titre) {
                            console.log($scope.detConfP[0].titre);
                        }
                        if ($scope.detConfP[0] && $scope.detConfP[0].debut && $scope.detConfP[0].debut != '0000-00-00 00:00:00') {
                            console.log("DEB" + $scope.detConfP[0].debut);
                            $scope.dateConfP = new Date($scope.detConfP[0].debut);
                        }
                        if (($scope.dateConfP - $scope.today < $scope.diffJours) && $scope.dateConfP - $scope.today > 0) {

                            console.log("OUI" + $scope.dateConfP);


                            var titreCetteConf = varTest;
                            var idCetteConf = $scope.detConfP[0].id;


                            //
                            $http({
                                method: "GET",
                                url: "http://localhost/WebServ/getNotifQuelMed.php",
                                params: {idMed: varData}
                            }).then(function (response) {
                                $scope.notifQuelMedP = response.data;
                                $scope.notifMedecinP.push({
                                    idMed: $scope.notifQuelMedP[0].id,
                                    nom: $scope.notifQuelMedP[0].nom,
                                    prenom: $scope.notifQuelMedP[0].prenom,
                                    idConf: idCetteConf,
                                    titre: titreCetteConf
                                });
                                console.log("0");
                                console.log($scope.notifMedecinP[0]);
                                console.log("1");
                                console.log($scope.notifMedecinP[1]);
                                console.log("2");
                                console.log($scope.notifMedecinP[2]);
                                console.log("3");
                                console.log($scope.notifMedecinP[3]);

                                $http({
                                    method: "POST",
                                    url: "http://localhost/WebServ/postNotif.php",
                                    data: {
                                        notif: $scope.notifQuelMedP,
                                        titre: titreCetteConf,
                                        date: $scope.today,
                                        nomNotif: "medPasse"
                                    }
                                }).then(function (response) {
                                    $scope.addNotifP = response.data;
                                    console.log(titreCetteConf);
                                }, function (response) {
                                    $scope.addNotifP = response.statusText;
                                });


                            }, function (response) {
                                $scope.notifQuelMedP = response.statusText;
                            });
                            //
                        }
                    }, function (response) {
                        $scope.detConfP = response.statusText;
                    });
                });
            }, function (response) {
                $scope.notifMedP = response.statusText;
            });
        };

        $scope.dbGetNotif();
        $scope.dbGetNotifMed();
        $scope.dbAfficherNotif();
        $scope.dbGetNotifPasse();


    }]);