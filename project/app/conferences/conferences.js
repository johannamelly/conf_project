// Ctrl+Alt+L = indentation
'use strict';

angular.module('myApp.conferences', ['ngRoute', 'angularModalService', 'ngMap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/conferences', {
            templateUrl: 'conferences/conferences.html',
            controller: 'ConferencesCtrl'
        });
        $routeProvider.when('/conferences/:id', {
            templateUrl: 'conferences/detailconf.html',
            controller: 'ConferencesCtrl'
        });
    }])

    .controller('ConferencesCtrl', ['$scope', 'ModalService', '$routeParams', '$http', '$filter', '$rootScope', '$window', 'NgMap', function ($scope, ModalService, $routeParams, $http, $filter, $rootScope, $window, NgMap) {


        $scope.displayBarChart = function (label, data, id) {
            var chart = {
                labels: label,
                datasets: [
                    {
                        label: "My First dataset",

                        fillColor: "powderblue",
                        highlightFill: "lightskyblue",
                        borderWidth: 1,

                        data: data
                    }
                ]
            };


            var ctx = document.getElementById(id).getContext("2d");

            new Chart(ctx).Bar(chart);
        };


        $scope.displayLineChart = function (label, data, id) {
            var chart = {
                labels: label,
                datasets: [
                    {
                        label: "My First dataset",

                        fillColor: "powderblue",
                        highlightFill: "lightskyblue",
                        borderWidth: 1,

                        data: data
                    }
                ]
            };


            var ctx = document.getElementById(id).getContext("2d");

            new Chart(ctx).Line(chart);
        };


        //piecharts en pourcentage
        $scope.displayPieChart = function (oui, non, inconnu) {


            var total = (oui + non + inconnu);
            $scope.pcoui = Math.round(oui * 100 / total);
            $scope.pcnon = Math.round(non * 100 / total);
            $scope.pcnsp = Math.round(inconnu * 100 / total);

            $(document).ready(function () {
                var ctx = $("#mycanvas").get(0).getContext("2d");
                //pie chart data
                var data = [
                    {
                        value: oui,
                        color: "palegreen",
                        highlight: "lime",
                        label: "Accepté"
                    },
                    {
                        value: non,
                        color: "lightpink",
                        highlight: "deeppink",
                        label: "Décliné"
                    },
                    {
                        value: inconnu,
                        color: "mediumturquoise",
                        highlight: "aqua",
                        label: "Pas de réponse"
                    }
                ];
                //draw
                var piechart = new Chart(ctx).Pie(data);
            });
        };

        //listes

        //$scope.infoConf = [];
        $scope.critRech = ["Tout", "Titre", "Ville", "Pays", "Année", "Invités"];
        $scope.stat = "show";
        $scope.reponsesConf = ["Inconnu", "Oui", "Non"];
        $scope.selectedRep = $scope.reponsesConf[0];
        $scope.selectRep = $scope.reponsesConf[0];
        $scope.checkedRow = [];
        $scope.listePays = [];
        $scope.lignesCochees = [];
        $scope.listeSelectMed = [];
        $scope.critSelect = ["Tout", "Nom", "Prénom"];
        $scope.listeMedInv = [];
        $scope.listeMednInv = [];

        //ng-show
        $scope.bloque = true;
        $scope.showConf = true;
        $scope.showStat = false;
        $scope.show = true;
        $scope.disableRep = true;
        $scope.showMed = false;
        $scope.alertDet = false;
        $scope.alertSuppr = false;
        $scope.alertAdd = false;
        $scope.showErrAlert = false;
        $scope.ajouterMed = false;
        $scope.nullDeb = false;
        $scope.nullFin = false;
        $scope.showPieText=false;
        $scope.showDescr=true;
        $scope.displayVille=false;
        $scope.displayPays=false;


        //compteurs
        $scope.cetId = 0;
        $scope.cpt = 0;
        $scope.compteur = 0;
        $scope.count = 0;

        //id URL
        $scope.quelleConf = $routeParams.id;

        //dates test
        $scope.datedebut = new Date(2016, 4, 11);
        $scope.datefin = new Date(2016, 4, 20);

        //select présélectionné
        $scope.repSel = $scope.reponsesConf[1];

//ajouter médecin participant à la conférence
        $scope.newAddMed = function (idMed, nomMed, prenomMed, selectedRep, invite, repondu) {
            if (invite != null) {
                invite.setDate((invite.getDate()) + 1);
            } else {
                invite = "";
            }
            if (repondu != null) {
                repondu.setDate((repondu.getDate()) + 1);

            } else {
                repondu = "";
            }
            if ((invite != "") && (repondu != "") && (invite > repondu)) {
                $scope.errAddAlert = "La date de fin est située avant la date de début. Veuillez réessayer.";
                $scope.showErrAlert = true;
            } else {
                $scope.showErrAlert = false;
                $scope.varTest = 0;
                for (var i = 0; i < $scope.listeMedInv.length; i++) {
                    if ($scope.listeMedInv[i].idMed == idMed.toString()) {
                        if ($scope.listeMedInv[i].statutInv == selectedRep.toString()) {
                            $scope.varTest = 1;
                            $scope.msg = "Vous avez déjà ajouté ce médecin.";
                        } else {
                            $scope.varTest = 2;
                            $scope.listeMedInv.splice(i, 1);
                            $scope.listeMedInv.push({
                                idMed: idMed.toString(),
                                nomMed: nomMed.toString(),
                                prenomMed: prenomMed.toString(),
                                statutInv: selectedRep.toString(),
                                invitation: invite,
                                reponse: repondu
                            });
                        }

                    }
                }
                if ($scope.varTest == 0) {

                    $scope.listeMedInv.push({
                        idMed: idMed.toString(),
                        nomMed: nomMed.toString(),
                        prenomMed: prenomMed.toString(),
                        statutInv: selectedRep.toString(),
                        invitation: invite,
                        reponse: repondu
                    });


                    $scope.msg = "";
                }
                $scope.varTest = 0;
            }
        };


        //hide / show
        $scope.nvlConf = function () {
            $scope.show = false;
            $scope.alertSuppr = false;
        };
        $scope.retourConf = function () {
            $scope.show = true;
        };


        //Ajoute les conf cochées à un tableau
        $scope.checkedBox = function (unId, value, titre) {
            if (value == 1) {
                $scope.lignesCochees.push({idConf: unId, titre: titre});
            } else {
                for (var i = 0; i < $scope.lignesCochees.length; i++) {
                    if (unId == $scope.lignesCochees[i].idConf) {
                        $scope.lignesCochees.splice(i, 1);
                    }
                }
            }
        };


        //Change la sélection (nom de variable incorrect)
        $scope.selectChange = function (value) {
            if (value != "Tout") {
                $scope.rech = value.toLowerCase();
                $scope.rech = $scope.rech.replace(new RegExp(/é/g), "e");
            } else {
                $scope.rech = "$";
            }
            $scope.recherche = {};
            $scope.recherche[$scope.rech] = $scope.searchKeyword;
            console.log($scope.recherche);
        };


        //ng-show
        $scope.showStati = function () {
            if ($scope.showStat == true) {
                $scope.showStat = false;
                $scope.stat = "show";
            } else {
                $scope.showStat = true;
                $scope.stat = "hide";
            }
        };

        //Ajoute med cochés à liste (détail)
        $scope.checkChkd = function (value, med) {
            if (value == 1) {
                $scope.test = 1;
                $scope.checkedRow.push({medecin: med});
            } else {
                $scope.test = 0;
                for (var i = 0; i < $scope.checkedRow.length; i++) {
                    if ($scope.checkedRow[i].medecin == med) {
                        $scope.checkedRow.splice(i, 1);
                    }
                }
            }
            $scope.test = $scope.checkedRow;
        };

        //ng-show
        $scope.modifConf = function () {
            $scope.bloque = false;
            $scope.showValide = true;
        };

        $scope.annuleConf = function () {
            $scope.bloque = true;
            $scope.showValide = false;
            $scope.afficherDetails();
        };

        $scope.modifTitre = function () {
            $scope.showConf = false;
        };

        $scope.annuleModTi = function () {
            $scope.showConf = true;
            $scope.afficherDetails()
        };

        //Afficher conférences
        $scope.afficherConf = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/getConferences.php"
            }).then(function (response) {
                $scope.dbListeConf = response.data;
                for (var i = 0; i < $scope.dbListeConf.length; i++) {
                    if ($scope.dbListeConf[i].debut != '0000-00-00 00:00:00') {
                        $scope.dbListeConf[i].debut = new Date($scope.dbListeConf[i].debut);
                    } else {
                        $scope.dbListeConf[i].debut = null;
                    }
                    if ($scope.dbListeConf[i].fin != '0000-00-00 00:00:00') {
                        $scope.dbListeConf[i].fin = new Date($scope.dbListeConf[i].fin);
                    } else {
                        $scope.dbListeConf[i].fin = null;
                    }
                    console.log($scope.dbListeConf[i].debut + " " + $scope.dbListeConf[i].fin);
                }
                console.log(response);
            }, function (response) {
                $scope.dbListeConf = response.statusText;
            });

        };
        $scope.afficherConf();

        //Détail d'une conférence

        $scope.afficherDetails = function () {
            if ($routeParams.id != null) {
                $http({
                    method: "GET",
                    url: "http://localhost/WebServ/detailConf.php",
                    params: {id: $scope.quelleConf}
                }).then(function (reponse) {
                    $scope.dbDetailConf = reponse.data;
                    if ($scope.dbDetailConf[0].debut != '0000-00-00 00:00:00') {
                        $scope.dbDetailConf[0].debut = new Date($scope.dbDetailConf[0].debut);
                    } else {
                        $scope.dbDetailConf[0].debut = null;
                    }
                    if ($scope.dbDetailConf[0].fin != '0000-00-00 00:00:00') {
                        $scope.dbDetailConf[0].fin = new Date($scope.dbDetailConf[0].fin);
                    } else {
                        $scope.dbDetailConf[0].fin = null;
                    }
                    console.log(reponse);

                    if($scope.dbDetailConf[0].ville!=''){

                        $scope.displayVille=true;

                        console.log($scope.dbDetailConf[0].ville);
                        var geocoder = new google.maps.Geocoder();
                        geocoder.geocode( { "address": $scope.dbDetailConf[0].ville }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                                var location = results[0].geometry.location,
                                    lat      = location.lat(),
                                    lng      = location.lng();
                                $scope.latitude=lat;
                                $scope.longitude=lng;

                            }
                        });

                        NgMap.getMap().then(function(map) {
                            console.log(map.getCenter());
                            console.log('markers', map.markers);
                            console.log('shapes', map.shapes);
                        });

                    }else{
                        if($scope.dbDetailConf[0].pays!=''){
                            $scope.displayPays=true;
                            console.log($scope.dbDetailConf[0].pays);
                            console.log($scope.dbDetailConf[0].ville);
                            geocoder = new google.maps.Geocoder();
                            geocoder.geocode( { "address": $scope.dbDetailConf[0].pays }, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                                    var location = results[0].geometry.location,
                                        lat      = location.lat(),
                                        lng      = location.lng();
                                    $scope.latitude=lat;
                                    $scope.longitude=lng;

                                }
                            });

                            NgMap.getMap().then(function(map) {
                                console.log(map.getCenter());
                                console.log('markers', map.markers);
                                console.log('shapes', map.shapes);
                            });



                        }
                    }



                }, function (reponse) {
                    $scope.dbDetailConf = reponse.statusText;
                });
            }
        };

        //Supprimer conférences
        $scope.dbDeleteConf = function () {
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/deleteConf.php",
                data: {
                    listToDel: $scope.lignesCochees
                }
            }).then(
                function (rep) {
                    $scope.deletedConf = rep.data;
                    $scope.afficherConf();
                    $scope.listeAlerte = $scope.lignesCochees;
                    $scope.lignesCochees = [];
                    $scope.alertSuppr = true;
                    $scope.msgSuppr = "Vous avez supprimé les conférences suivantes: "
                }, function (rep) {
                    $scope.deletedConf = rep.statusText;
                    $scope.alertSuppr = true;
                    $scope.msgSuppr = "Il y a eu un problème lors de la suppression."

                }
            )
        };

        //Ajouter conférences
        $scope.dbAddConf = function () {

            if (($scope.conf.fin != null) && ($scope.conf.debut != null) && ($scope.conf.fin < $scope.conf.debut)) {
                $scope.errAddAlert = "La date de fin est située avant la date de début. Veuillez réessayer.";
                $scope.showErrAlert = true;
            } else {
                if ($scope.conf.debut != null) {
                    $scope.conf.debut.setDate(($scope.conf.debut.getDate()) + 1);
                }
                if ($scope.conf.fin != null) {
                    $scope.conf.fin.setDate(($scope.conf.fin.getDate()) + 1);
                }
                $http({
                    method: 'POST',
                    url: "http://localhost/WebServ/addConf.php",
                    data: {
                        titre: $scope.conf.titre,
                        description: $scope.conf.description,
                        debut: $scope.conf.debut,
                        fin: $scope.conf.fin,
                        horaires: $scope.conf.horaires,
                        ville: $scope.conf.ville,
                        pays: $scope.conf.pays,
                        organisateurs: $scope.conf.organisateurs
                    }
                }).then(
                    function (resp) {
                        $scope.ajoutConf = resp.data;
                        $scope.afficherConf();
                        $scope.conf.titre = "";
                        $scope.conf.description = "";
                        $scope.conf.debut = "";
                        $scope.conf.fin = "";
                        $scope.conf.horaires = "";
                        $scope.conf.ville = "";
                        $scope.conf.pays = "";
                        $scope.conf.organisateurs = "";
                        $scope.alertAdd = true;
                        $scope.dbGetPays();
                    }, function (resp) {
                        $scope.ajoutConf = resp.statusText;
                        $scope.alertAdd = true;
                    }
                );


                //Ajouter liste
                $http({
                    method: 'POST',
                    url: "http://localhost/WebServ/addListe.php",
                    data: {
                        arrayMed: $scope.listeMedInv,
                        conference: $scope.conf.titre
                    }
                }).then(
                    function (resp) {
                        $scope.ajoutListe = resp.data;
                    }, function (resp) {
                        $scope.ajoutListe = resp.statusText;
                    }
                );


                $scope.show = true;
                $scope.listeMedInv = [];
            }

        };

//Liste de médecins

        $http({
            method: "GET",
            url: "http://localhost/WebServ/getMedecins.php"
        }).then(function (response) {
            $scope.dbListeMed = response.data;
            console.log(response);
        }, function (response) {
            $scope.dbListeMed = response.statusText;
        });

        $scope.sel = function () {
            for (var k = 0; k < $scope.dbListeMed.length; k++) {
                $scope.listeSelectMed[k] = $scope.dbListeMed[k].nom + dbListeMed[k].prenom;
            }
        };

//Afficher liste des invités

        //Get la liste des invités de cette conférence
        $http({
            method: "GET",
            url: "http://localhost/WebServ/getListe.php",
            params: {titre: "rtrt"}
        }).then(function (response) {
            $scope.dbListe = response.data;
            console.log(response);
        }, function (response) {
            $scope.dbListe = response.statusText;
        });

        $scope.sel = function () {
            for (var k = 0; k < $scope.dbListeMed.length; k++) {
                $scope.listeSelectMed[k] = $scope.dbListeMed[k].nom + dbListeMed[k].prenom;
            }
        };


        //Savoir si la conférence existe (si on a mis un id dans l'URL)
        $http({
            method: "GET",
            url: "http://localhost/WebServ/confExiste.php",
            params: {id: $scope.quelleConf}
        }).then(function (response) {
            $scope.existeOuPas = response.data;
            if ($scope.existeOuPas == 1) {
                $scope.idExiste = true;
            } else {
                $scope.idExiste = false;
            }
            console.log(response);
        }, function (response) {
            $scope.existeOuPas = response.statusText;
        });

//ng-show


        $scope.showMedVar = function () {
            if ($scope.showMed == false) {
                $scope.showMed = true;
            } else {
                $scope.showMed = false;
            }
        };


        //Supprimer conférence depuis détails
        $scope.dbDeleteConfDet = function (idConf) {
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/deleteConfDet.php",
                data: {
                    id: idConf
                }
            }).then(
                function (rep) {
                    $scope.deletedConfDet = rep.data;
                    $scope.afficherConf();
                    $window.location.href = '#/conferences';
                }, function (rep) {
                    $scope.deletedConfDet = rep.statusText;
                }
            )
        };


        //Liste des non invités
        $scope.afficherNonInvites = function () {
            $http({
                //get le titre de la conférence
                method: "GET",
                url: "http://localhost/WebServ/getTitreConf.php",
                params: {id: $scope.quelleConf}
            }).then(function (response) {
                $scope.titreConf = response.data;
                //
                $http({
                    //get les id des médecins invités à cette conférence
                    method: "GET",
                    url: "http://localhost/WebServ/getListe.php",
                    params: {titre: $scope.titreConf[0].titre}
                }).then(function (response) {

                    $scope.lesMeds = response.data;
                    $scope.arrayIds = [];
                    if ($scope.lesMeds[0] == null) {
                        $scope.lesMeds = [{"medecin": "0", "statut": "Inconnu"}];
                    }
                    for (var i = 0; i < $scope.lesMeds.length; i++) {
                        $scope.arrayIds.push({id: $scope.lesMeds[i].medecin});
                    }

                    $scope.tableau = [];
                    $scope.tableau = {liste: $scope.arrayIds};

                    //get les noms et prénoms des médecins correspondant aux ID
                    //ne prend que la dernière ligne de listeMedConf
                    $http({
                        method: "GET",
                        url: "http://localhost/WebServ/getNonMedecins.php",
                        params: {id: $scope.tableau}
                    }).then(function (reponse) {
                        $scope.pasMed = reponse.data;
                    }, function (reponse) {
                        $scope.pasMed = reponse.statusText;
                    });
                    //
                }, function (response) {
                    $scope.lesMeds = response.statusText;
                });
                //
            }, function (response) {
                $scope.titreConf = response.statusText;
            });
        };


        //Mofifier conférence
        $scope.dbModifConf = function (deb, fin, hor, vil, pays, org) {
            if (deb == null) {
                deb = "";
            }
            if (fin == null) {
                fin = "";
            }

            $http({
                method: 'POST',
                url: "http://localhost/WebServ/modifConf.php",
                data: {
                    debut: deb,
                    fin: fin,
                    horaire: hor,
                    ville: vil,
                    pays: pays,
                    organisateurs: org,
                    id: $scope.quelleConf
                }
            }).then(
                function (retour) {
                    $scope.modifiConf = retour.data;
                    $scope.bloque = true;
                    $scope.afficherDetails();
                    $scope.showValide = false;
                    $scope.alertDet = true;
                    $scope.msgDet = "Vos informations ont été modifiées avec succès.";
                }, function (retour) {
                    $scope.modifiConf = retour.statusText;
                    $scope.alertDet = true;
                    $scope.msgDet = "Il y a eu un problème lors de la modifications de vos informations.";
                }
            );
        };

        //Mofifier nom de la conférence
        $scope.dbModifNomConf = function (ttr) {
console.log("WWWWWW" + $scope.dbDetailConf[0].titre);
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/modifNomConf.php",
                data: {
                    ancienTitre: $scope.dbDetailConf[0].titre,
                    titre: ttr,
                    id: $scope.quelleConf
                }
            }).then(
                function (retour) {
                    $scope.mNomConf = retour.data;
                    $scope.showConf = true;
                    $scope.afficherDetails();
                    console.log($scope.dbDetailConf[0].titre);
                    console.log($scope.mNomConf);
                    if($scope.dbDetailConf[0].titre==$scope.mNomConf){
                        $scope.msgDet="Un conférence porte déjà ce nom.";
                        $scope.alertDet=true;
                    }else{
                        $scope.msgDet="";
                        $scope.alertDet=false;
                    }
                }, function (retour) {
                    $scope.mNomConf = retour.statusText;
                }
            );
        };

        $scope.showAdd = function () {
            if ($scope.ajouterMed == false) {
                $scope.ajouterMed = true;
            } else {
                $scope.ajouterMed = false;
            }
        };


        //Liste des invités
        $scope.afficherInvites = function () {
            $http({
                //get le titre de la conférence
                method: "GET",
                url: "http://localhost/WebServ/getTitreConf.php",
                params: {id: $scope.quelleConf}
            }).then(function (response) {
                $scope.titreConf = response.data;
                console.log($scope.titreConf[0].titre);
                //
                $http({
                    //get les id des médecins invités à cette conférence
                    method: "GET",
                    url: "http://localhost/WebServ/getListe.php",
                    params: {titre: $scope.titreConf[0].titre}
                }).then(function (response) {

                    $scope.listeMedConf = response.data;
                    $scope.arrayMed = [];
                    $scope.arrayMed = [{medListe: $scope.listeMedConf}];
                    //get les noms et prénoms des médecins correspondant aux ID
                    //ne prend que la dernière ligne de listeMedConf
                    $http({
                        method: "GET",
                        url: "http://localhost/WebServ/getNomMed.php",
                        params: {listeMed: $scope.arrayMed}
                    }).then(function (reponse) {
                        $scope.nomsMedecins = reponse.data;
                        console.log(reponse);
                        $scope.tousElements = [];
                        for (var i = 0; i < $scope.nomsMedecins.length; i++) {
                            $scope.tousElements.push({
                                nom: $scope.nomsMedecins[i].nom,
                                prenom: $scope.nomsMedecins[i].prenom,
                                statut: $scope.listeMedConf[i].statut,
                                id: $scope.listeMedConf[i].medecin
                            });
                        }
                    }, function (reponse) {
                        $scope.nomsMedecins = reponse.statusText;
                    });
                    //
                }, function (response) {
                    $scope.listeMedConf = response.statusText;
                });
                //
            }, function (response) {
                $scope.titreConf = response.statusText;
            });
        };


        //ajouter un médecin à la conférence
        $scope.dbAddMedConf = function (id, statut, invite, repondu) {
            if (invite != null) {
                invite.setDate((invite.getDate()) + 1);
            } else {
                invite = new Date(0, 0, 0, 0, 0, 0);
            }
            if (repondu != null) {
                repondu.setDate((repondu.getDate()) + 1);
            } else {
                repondu = new Date(0, 0, 0, 0, 0, 0)
            }


            $scope.listeMednInv = [{idMed: id, invitation: invite, reponse: repondu, statutInv: statut}];

            $scope.bonjour = $scope.listeMednInv;
            $scope.dbAddNew();
        };


        //ajouter un médecin à la liste des invités d'une conférence sélectionnée
        $scope.dbAddNew = function () {
            $scope.tabTest = {array: $scope.listeMednInv};
            $http({
                //get le titre de la conférence
                method: "GET",
                url: "http://localhost/WebServ/getTitreConf.php",
                params: {id: $scope.quelleConf}
            }).then(function (response) {
                $scope.titreConf = response.data;
                //
                $http({
                    method: 'POST',
                    url: "http://localhost/WebServ/addListe.php",
                    data: {
                        arrayMed: $scope.tabTest.array,
                        conference: $scope.titreConf[0].titre
                    }
                }).then(
                    function (resp) {
                        $scope.newInvMed = resp.data;
                        $scope.listeMednInv = [];
                        $scope.afficherInvites();
                        $scope.afficherNonInvites();
                    }, function (resp) {
                        $scope.newInvMed = resp.statusText;
                    }
                );
                //
            }, function (response) {
                $scope.titreConf = response.statusText;
            });


            //}

        };

        //deleter l'invité d'une conférence sélectionnée
        $scope.dbDeleteInv = function () {
            $http({
                //get le titre de la conférence
                method: "GET",
                url: "http://localhost/WebServ/getTitreConf.php",
                params: {id: $scope.quelleConf}
            }).then(function (response) {
                $scope.titreConf = response.data;
                //
                $http({
                    method: 'POST',
                    url: "http://localhost/WebServ/deleteMedListe.php",
                    data: {
                        listeMed: $scope.checkedRow,
                        conference: $scope.titreConf[0].titre
                    }
                }).then(
                    function (resp) {
                        $scope.medsDelete = resp.data;
                        $scope.checkedRow = [];
                        $scope.afficherInvites();
                        $scope.afficherNonInvites();
                    }, function (resp) {
                        $scope.medsDelete = resp.statusText;
                    }
                );
                //
            }, function (response) {
                $scope.titreConf = response.statusText;
            });
        };

        //Tableau avec nombre de conférences par pays et bar chart
        //Ne prend pas le premier pays (deuxième à l'écran, mais premier de la deuxième boucle)
        $scope.dbGetPays = function () {
            if ($routeParams.id == null) {
                $http({
                    method: "GET",
                    url: "http://localhost/WebServ/getPays.php"
                }).then(function (response) {
                    $scope.lesPays = response.data;
                    $scope.listePays = [];
                    for (var i = 0; i < $scope.lesPays.length; i++) {
                        console.log($scope.lesPays[i].pays);
                        if (($scope.lesPays[i].pays == "") || ($scope.lesPays[i].pays) == null) {
                            $scope.bonjour = 2;
                        } else {
                            $scope.listePays.push({pays: $scope.lesPays[i].pays, nb: 1});
                            $scope.retiens = i;
                            i = $scope.lesPays.length;
                        }
                    }

                    for (var j = $scope.retiens + 1; j < $scope.lesPays.length; j++) {
                        if (($scope.lesPays[j].pays == "") || ($scope.lesPays[j].pays == null)) {
                            $scope.var = 0;
                            console.log("non" + $scope.lesPays[j].pays);

                        } else {
                            $scope.bonjour = $scope.listePays[($scope.listePays.length) - 1];
                            console.log("oui" + $scope.lesPays[j].pays);
                            console.log($scope.listePays.length);

                            for (var k = 0; k < $scope.listePays.length; k++) {
                                console.log("lesPays: " + $scope.lesPays[j].pays);
                                console.log("listePays: " + $scope.listePays[k].pays);
                                if ($scope.listePays[k].pays.toString() == $scope.lesPays[j].pays.toString()) {
                                    $scope.getNb = ($scope.listePays[k].nb) + 1;
                                    console.log("getNb: " + $scope.getNb);
                                    $scope.listePays[k] = {pays: $scope.lesPays[j].pays, nb: $scope.getNb};
                                    $scope.compteur = k;
                                }
                            }
                            if ($scope.compteur == 0) {
                                $scope.listePays.push({pays: $scope.lesPays[j].pays, nb: 1});

                            }
                            $scope.compteur = 0;
                        }
                    }
                    $scope.chartPays = [];
                    $scope.chartNb = [];
                    for (i = 0; i < $scope.listePays.length; i++) {
                        $scope.chartPays[i] = $scope.listePays[i].pays;
                        $scope.chartNb[i] = $scope.listePays[i].nb;
                    }
                    $scope.displayBarChart($scope.chartPays, $scope.chartNb, "barChart");

                }, function (response) {
                    $scope.lesPays = response.statusText;
                });
            }
        };


//Stat nombre de conf par pays
        $scope.dbGetNbTotalConf = function () {
            $http({
                //get le titre de la conférence
                method: "GET",
                url: "http://localhost/WebServ/getNbTotalConf.php"
            }).then(function (response) {
                $scope.nbTotConf = response.data;
                $scope.anneesConf = [];
                for (var i = 0; i < $scope.nbTotConf.length; i++) {
                    if ($scope.nbTotConf[i].debut != '0000-00-00 00:00:00') {
                        $scope.cAnnee = new Date($scope.nbTotConf[i].debut);
                        $scope.cAnnee = $scope.cAnnee.getFullYear();
                        $scope.anneesConf.push($scope.cAnnee);
                    }
                }
                console.log("anneeConf[]: " + $scope.anneesConf[0]);

                $scope.nbConfAnnee = [{annee: $scope.anneesConf[0], nb: 1}];
                console.log("TEST: " + $scope.nbConfAnnee[0].nb);

                for (var j = 1; j < $scope.anneesConf.length; j++) {
                    console.log("première boucle");
                    for (var k = 0; k < $scope.nbConfAnnee.length; k++) {
                        console.log("deuxième boucle");
                        if ($scope.anneesConf[j] == $scope.nbConfAnnee[k].annee) {

                            $scope.count++;
                            $scope.reti = k;
                            console.log("reti: " + $scope.reti);
                        }
                    }

                    if ($scope.count == 0) {
                        $scope.nbConfAnnee.push({annee: $scope.anneesConf[j], nb: 1})

                    } else {
                        console.log("oncws" + $scope.nbConfAnnee[0]);
                        console.log($scope.anneesConf[$scope.reti]);
                        $scope.quelNb = $scope.nbConfAnnee[$scope.reti].nb + 1;
                        $scope.nbConfAnnee[$scope.reti].nb = $scope.quelNb;
                    }
                    $scope.count = 0;
                }

                for (var x = 0; x < $scope.nbConfAnnee.length; x++) {
                    for (var y = 0; y < $scope.nbConfAnnee.length; y++) {
                        if (x != y) {
                            if ($scope.nbConfAnnee[y].annee > $scope.nbConfAnnee[x].annee) {
                                $scope.retenir = $scope.nbConfAnnee[y];
                                $scope.nbConfAnnee[y] = $scope.nbConfAnnee[x];
                                $scope.nbConfAnnee[x] = $scope.retenir;
                            }
                        }
                    }
                }


                $scope.tabAnConf = [];
                $scope.tabNbConf = [];
                for (var p = 0; p < $scope.nbConfAnnee.length; p++) {
                    $scope.tabAnConf.push($scope.nbConfAnnee[p].annee.toString());
                    $scope.tabNbConf.push($scope.nbConfAnnee[p].nb);
                }

                $scope.displayLineChart($scope.tabAnConf, $scope.tabNbConf, "newBarChart");


            }, function (response) {
                $scope.nbTotConf = response.statusText;
            });
        };


        $scope.dbGetRepParConf = function () {
            $http({
                //get le titre de la conférence
                method: "GET",
                url: "http://localhost/WebServ/getTitreConf.php",
                params: {id: $scope.quelleConf}
            }).then(function (response) {
                $scope.titreConf = response.data;
                console.log("IUHIN" + $scope.titreConf[0].titre);
                $http({
                    method: 'GET',
                    url: "http://localhost/WebServ/getNbRep.php",
                    params: {
                        titre: $scope.titreConf[0].titre
                    }
                }).then(
                    function (retour) {
                        $scope.nbRep = retour.data;
                        $scope.tabNbRep = [];
                        $scope.cbOui = parseInt($scope.nbRep[0][0].oui);
                        $scope.cbNon = parseInt($scope.nbRep[1][0].non);
                        $scope.cbNsp = parseInt($scope.nbRep[2][0].inconnu);
                        if ($scope.cbOui != 0 || $scope.cbNon != 0 || $scope.cbNsp != 0) {
                            $scope.displayPieChart($scope.cbOui, $scope.cbNon, $scope.cbNsp);
                            $scope.showPieText=true;
                        }else{
                            $scope.showPieText=false;
                        }

                    }, function (retour) {
                        $scope.nbRep = retour.statusText;
                    }
                );
            }, function (response) {
                $scope.titreConf = response.statusText;
            })
        };

        $scope.modifDescr=function(){
          $scope.showDescr=false;
        };

        $scope.dbModifDescrConf=function(dscr){
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/modifDescrConf.php",
                data: {
                    descriptif: dscr,
                    id: $scope.quelleConf
                }
            }).then(
                function (retour) {
                    $scope.mDescrConf = retour.data;
                    $scope.showDescr = true;
                    $scope.afficherDetails();
                }, function (retour) {
                    $scope.mDescrConf = retour.statusText;
                }
            );
        };

        $scope.showAdd = function () {
            if ($scope.ajouterMed == false) {
                $scope.ajouterMed = true;
            } else {
                $scope.ajouterMed = false;
            }
        };

        $scope.annuleModDe=function(){
            $scope.showDescr=true;
            $scope.afficherDetails();
        };


        $scope.showAModal = function () {

            // Just provide a template url, a controller and call 'showModal'.
            ModalService.showModal({
                templateUrl: "yesno.html",
                controller: "SampleModalController"
            }).then(function (modal) {
                // The modal object has the element built, if this is a bootstrap modal
                // you can call 'modal' to show it, if it's a custom modal just show or hide
                // it as you need to.
                modal.element.modal();

            });

        };

        $scope.dbGetNotifications=function(){
            $http({
                method: 'GET',
                url: "http://localhost/WebServ/getLNotif.php"
            }).then(
                function (retour) {
                    $scope.listeN = retour.data;
                    $scope.combienDeNotif=$scope.listeN.length;

                }, function (retour) {
                    $scope.listeN = retour.statusText;
                }
            );
        };


        /*
        $scope.getPaysDetail=function(){
            $http({
                method: 'GET',
                url: "http://localhost/WebServ/getPaysCoor.php",
                params: $scope.quelleConf
            }).then(
                function (retour) {
                    $scope.cePays = retour.data;

                }, function (retour) {
                    $scope.cePays = retour.statusText;
                }
            );
        };
*/


        $scope.spliceMed=function(cetId){
            for (var i = 0; i < $scope.listeMedInv.length; i++) {
                if ($scope.listeMedInv[i].idMed == cetId.toString()) {

                        $scope.listeMedInv.splice(i, 1);


                }
            }
        };

        $scope.dbGetNotifications();
        $scope.dbGetPays();

        if ($routeParams.id == null) {
            $scope.dbGetNbTotalConf()
        }

        if ($routeParams.id != null) {
            $scope.afficherDetails();
            $scope.afficherInvites();
            $scope.afficherNonInvites();
            $scope.dbGetRepParConf();
        }
    }])


    //Controller du modal
    .controller('SampleModalController', function ($scope, close, $http) {

        $scope.dismissModal = function (result) {
            close(result, 200); // close, but give 200ms for bootstrap to animate
        };

        $http({
            method: 'GET',
            url: "http://localhost/WebServ/getLNotif.php"
        }).then(
            function (retour) {
                $scope.listeN = retour.data;
                for(var i=0;i<$scope.listeN.length;i++){
                    $scope.listeN[i].date=new Date($scope.listeN[i].date);
                    $scope.listeN[i].date=new Date($scope.listeN[i].date.getFullYear(),$scope.listeN[i].date.getMonth(),$scope.listeN[i].date.getDate());
                }
                $scope.combienDeNotif=$scope.listeN.length;

            }, function (retour) {
                $scope.listeN = retour.statusText;
            }
        );


    });