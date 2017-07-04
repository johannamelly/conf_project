'use strict';

angular.module('myApp.medecins', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/medecins', {
            templateUrl: 'medecins/medecins.html',
            controller: 'MedecinsCtrl'
        });
        $routeProvider.when('/medecins/:id', {
            templateUrl: 'medecins/detailmed.html',
            controller: 'MedecinsCtrl'
        });
    }])

    .controller('MedecinsCtrl', ['$scope', '$routeParams', '$http', '$filter', '$window', function ($scope, $routeParams, $http, $filter, $window) {

        //listes
        //$scope.infoMed = [];

        $scope.listChecked = [];
        $scope.stat = "show";
        $scope.infoTest = [
            {titre: "extitre", naissance: "momom", sexe: "omncds", travail: "obo"}
        ];
        $scope.adressesplit = [];
        $scope.testMed = [
            {cetId: 0, prenom: "nnnn", nom: "swrefs"},
            {cetId: 1, prenom: "uiom", nom: "noedvf"}
        ];
        $scope.listeSelect = ["Tout", "Nom", "Prénom", "Spécialisation"];
        $scope.listeConf = ["Conf1", "Conf2"];
        $scope.listeRep = ["Inconnu", "Oui", "Non"];
        $scope.nvlNotif = ["La Conf1 a lieu dans 1 mois", "Med3 a 3 jours pour répondre à l'invitation pour la Conf2"];

        //select élément liste
        $scope.selectedRep = $scope.listeRep[0];
        $scope.selectRep = $scope.listeRep[2];
        $scope.selecConf = $scope.listeConf[1];

        //date test
        $scope.datenaissance = new Date(1965, 8, 14);
        $scope.dateInv = new Date(2016, 1, 15);
        $scope.dateRend = new Date(2016, 1, 19);

        //ng-show
        $scope.showStat = false;
        $scope.bloque = true;
        $scope.showme = false;
        $scope.show = true;
        $scope.showMed = true;
        $scope.bloqueDet = true;
        $scope.alertDet = false;
        $scope.alertSuppr = false;
        $scope.alertAdd = false;
        $scope.ifStat = false;

        //compteurs
        $scope.cpt = 0;
        $scope.cetId = 1;
        $scope.cteur = 0;
        $scope.countIf = 0;

        //id de conf sélectionnée
        $scope.quelMed = $routeParams.id;



        //LineChart: nombre de conférences par année par médecin
        $scope.displayLineChart = function (label, donnees) {
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
            $(document).ready(function () {
                var ctx = $("#mycanvas").get(0).getContext("2d");
                //pie chart data
                var data = {
                    labels: label,
                    datasets: [{
                        data: donnees,
                        fillColor: "powderblue",
                        highlightFill: "lightskyblue"
                    }]
                };
                //draw
                var piechart = new Chart(ctx).Line(data);
            })
        };


        //Souci d'affichage
        //PieChart
        $scope.displayPieChart = function (oui, non, inconnu) {


            var total = (oui + non + inconnu);
            $scope.pcoui = Math.round(oui * 100 / total);
            $scope.pcnon = Math.round(non * 100 / total);
            $scope.pcnsp = Math.round(inconnu * 100 / total);

            $(document).ready(function () {
                var ctx = $("#acanvas").get(0).getContext("2d");
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

        $scope.medChecked = function (unId, chkd, prenom, nom) {
            if (chkd == 1) {
                $scope.listChecked.push({idMed: unId, prenom: prenom, nom: nom});
            } else {
                for (var i = 0; i < $scope.listChecked.length; i++) {
                    if (unId == $scope.listChecked[i].idMed) {
                        $scope.listChecked.splice(i, 1);
                    }
                }
            }
            $scope.bonjour = $scope.listChecked;
        };


        $scope.selectChange = function (value) {
            if (value != "Tout") {
                $scope.rech = value.toLowerCase();
                $scope.rech = $scope.rech.replace(new RegExp(/é/g), "e");
            } else {
                $scope.rech = "$";
            }
            $scope.recherche = {};
            $scope.recherche[$scope.rech] = $scope.searchKeyword;
            //console.log($scope.recherche);
        };

        /*
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
         */


        $scope.showStati = function () {
            if ($scope.showStat == true) {
                $scope.showStat = false;
                $scope.stat = "show";
                $scope.getAnnees();
            } else {
                $scope.showStat = true;
                $scope.stat = "hide";
            }
        };


        $scope.modifMed = function () {
            $scope.bloque = false;
            $scope.showValide = true;
        };

        $scope.annuleModif = function () {
            $scope.bloque = true;
            $scope.showValide = false;
        };


        $scope.modifNom = function () {
            $scope.showMed = false;
        };

        $scope.annuleNom = function () {
            $scope.showMed = true;
            $scope.alertDet = false;
            $scope.msgDet = "";
        };

        $scope.modifDetail = function () {
            $scope.bloqueDet = false;
            $scope.showValide2 = true;
        };

        $scope.annuleDetail = function () {
            $scope.bloqueDet = true;
            $scope.showValide2 = false;
        };

        $scope.afficherMed = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/getMedecins.php"
            }).then(function (response) {
                $scope.dbListeMed = response.data;
                // console.log = response;
            }, function (response) {
                $scope.dbListeMed = response.statusText;
            });

        };

        $scope.afficherMed();

        //détail med

        $scope.afficherDetails = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/detailMed.php",
                params: {id: $scope.quelMed}
            }).then(function (reponse) {
                $scope.dbDetailMed = reponse.data;
                if ($scope.dbDetailMed[0].sexe == "Homme") {
                    $scope.homme = true;
                    $scope.femme = false;
                } else {
                    $scope.homme = false;
                    $scope.femme = true;
                }
                //$scope.nvlDate=new Date($scope.dbDetailMed[0].naissance);
                if ($scope.dbDetailMed[0].naissance != '0000-00-00 00:00:00') {
                    $scope.dbDetailMed[0].naissance = new Date($scope.dbDetailMed[0].naissance);
                    console.log($scope.dbDetailMed[0].naissance);
                    //console.log($scope.nvlDate);
                } else {
                    $scope.dbDetailMed[0].naissance = null;
                }
            }, function (reponse) {
                $scope.dbDetailMed = reponse.statusText;
            });
        };

        //Ajouter médecin
        $scope.dbAddMed = function () {
            if ($scope.med.naissance != null) {
                $scope.med.naissance.setDate(($scope.med.naissance.getDate()) + 1);
            }

            $http({
                method: 'POST',
                url: "http://localhost/WebServ/addMed.php",
                data: {
                    nom: $scope.med.nom,
                    prenom: $scope.med.prenom,
                    titre: $scope.med.titre,
                    naissance: $scope.med.naissance,
                    sexe: $scope.med.radios,
                    lieu: $scope.med.lieu,
                    mail: $scope.med.mail,
                    numero: $scope.med.numero,
                    responsable: $scope.med.radioresp,
                    nomresp: $scope.med.nomresp,
                    preresp: $scope.med.preresp,
                    mailresp: $scope.med.mailresp

                }
            }).then(
                function (resp) {
                    $scope.ajoutMed = resp.data;
                    $scope.afficherMed();
                    $scope.med.nom = "";
                    $scope.med.prenom = "";
                    $scope.med.titre = "";
                    $scope.med.naissance = "";
                    $scope.med.radios = "";
                    $scope.med.lieu = "";
                    $scope.med.mail = "";
                    $scope.med.numero = "";
                    $scope.med.radioresp = "";
                    $scope.med.nomresp = "";
                    $scope.med.preresp = "";
                    $scope.med.mailresp = "";

                    $scope.alertAdd = true;
                    $scope.alertSuppr = false;
                }, function (resp) {
                    $scope.ajoutMed = resp.statusText;
                    $scope.alertAdd = true;
                    $scope.alertSuppr = false;
                }
            );
            $scope.show = true;
        };


        //Supprimer médecins cochés
        $scope.dbDeleteMed = function () {
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/deleteMed.php",
                data: {
                    listToDel: $scope.listChecked
                }
            }).then(
                function (rep) {
                    $scope.deletedMed = rep.data;
                    $scope.afficherMed();
                    $scope.msgSuppr = "Vous avez supprimé le(s) médecin(s) suivant(s): ";
                    $scope.listeAlerte = $scope.listChecked;
                    $scope.listChecked = [];
                    $scope.alertSuppr = true;
                    $scope.alertAdd = false;

                }, function (rep) {
                    $scope.deletedMed = rep.statusText;
                    $scope.alertSuppr = true;
                    $scope.alertAdd = false;
                    $scope.msgSuppr = "Il y a eu un problème lors la suppression."
                }
            )
        };


        //Supprimer médecin depuis détails
        $scope.dbDeleteMedDet = function (idMed) {
            if (confirm("Voulez-vous vraiment supprimer ce médecin?") == true) {
                $http({
                    method: 'POST',
                    url: "http://localhost/WebServ/deleteMedDet.php",
                    data: {
                        id: idMed
                    }
                }).then(
                    function (rep) {
                        $scope.deletedMedDet = rep.data;
                        $scope.afficherMed();
                        $window.location.href = '#/medecins';
                    }, function (rep) {
                        $scope.deletedMedDet = rep.statusText;
                    }
                )
            }
        };


        //Mofifier médecin
        $scope.dbModifMed = function (spe, nai, sx, lieu, mail, num, nresp, presp, mresp) {
            $scope.bonjour = spe;
            if (nai == null) {
                nai = new Date(0, 0, 0, 0, 0, 0);
            }
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/modifMed.php",
                data: {
                    specialisation: spe,
                    naissance: nai,
                    sexe: sx,
                    lieu: lieu,
                    mail: mail,
                    numero: num,
                    nomresp: nresp,
                    preresp: presp,
                    mailresp: mresp,
                    id: $scope.quelMed
                }
            }).then(
                function (retour) {
                    $scope.modifiMed = retour.data;
                    $scope.bloque = true;
                    $scope.showValide = false;
                    $scope.afficherDetails();
                    $scope.alertDet = true;
                    $scope.msgDet = "Vos informations ont été modifiées avec succès!";
                }, function (retour) {
                    $scope.modifiMed = retour.statusText;
                    $scope.msgDet = "Il y a eu un problème lors de la modification de vos informations.";
                    $scope.alertDet = true;
                }
            );
        };


        //Mofifier nom du médecin
        $scope.dbModifNomMed = function (pre, nom) {
            if (pre == "") {
                pre = $scope.dbDetailMed.prenom;
                $scope.msgDet = "Vous ne pouvez pas effacer le nom ou le prénom d'un médecin.";
                $scope.alertDet = true;
                $scope.countIf = 1;
            }
            if (nom == "") {
                nom = $scope.dbDetailMed.nom;
                $scope.msgDet = "Vous ne pouvez pas effacer le nom ou le prénom d'un médecin.";
                $scope.alertDet = true;
                $scope.countIf = 1;
            }
            if ($scope.countIf == 0) {
                $scope.msgDet = "";
                $scope.alertDet = false;
            }

            $scope.countIf = 0;

            $http({
                method: 'POST',
                url: "http://localhost/WebServ/modifNomMed.php",
                data: {
                    prenom: pre,
                    nom: nom,
                    id: $scope.quelMed
                }
            }).then(
                function (retour) {
                    $scope.mNomMed = retour.data;
                    $scope.showMed = true;
                    $scope.afficherDetails();
                }, function (retour) {
                    $scope.mNomMed = retour.statusText;
                }
            );

        };


        //Savoir si le médecin existe
        $http({
            method: "GET",
            url: "http://localhost/WebServ/medExiste.php",
            params: {id: $scope.quelMed}
        }).then(function (response) {
            $scope.existeOuPas = response.data;
            if ($scope.existeOuPas == 1) {
                $scope.idExiste = true;
            } else {
                $scope.idExiste = false;
            }
            // console.log = response;
        }, function (response) {
            $scope.existeOuPas = response.statusText;
        });

        //Afficher les conférences d'un médecin dans détails
        $scope.afficherConf = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/quellesConf.php",
                params: {id: $scope.quelMed}
            }).then(function (response) {
                $scope.statInconnu = 0;
                $scope.statOui = 0;
                $scope.statNon = 0;

                $scope.ceMedConf = response.data;
                for (var i = 0; i < $scope.ceMedConf.length; i++) {
                    if ($scope.ceMedConf[i].invite != '0000-00-00 00:00:00') {
                        console.log("sdovgosdvn");
                        $scope.ceMedConf[i].invite = new Date($scope.ceMedConf[i].invite);
                    } else {
                        console.log("fffffffffff");
                        $scope.ceMedConf[i].invite = null;
                    }

                    if ($scope.ceMedConf[i].repondu != '0000-00-00 00:00:00') {
                        $scope.ceMedConf[i].repondu = new Date($scope.ceMedConf[i].repondu);
                    } else {
                        $scope.ceMedConf[i].repondu = null;
                    }
                }

                for (i = 0; i < $scope.ceMedConf.length; i++) {
                    console.log($scope.ceMedConf.length);
                    if ($scope.ceMedConf[i].statut == "Oui") {
                        $scope.statOui++;
                        console.log("OUI: " + $scope.statOui);
                    } else {
                        if ($scope.ceMedConf[i].statut == "Non") {
                            $scope.statNon++;
                            console.log("NON: " + $scope.statNon);
                        } else {
                            $scope.statInconnu++;
                            console.log("INCONNU: " + $scope.statInconnu);
                        }
                    }
                }

                $scope.displayPieChart($scope.statOui, $scope.statNon, $scope.statInconnu);
                //   console.log = response;
                $scope.bonjour = $scope.ceMedConf;
            }, function (response) {
                $scope.ceMedConf = response.statusText;
            });
        };

        $scope.dbModifDate = function (conference, invite, repondu, selectedRep) {
            console.log("selectedRep" + selectedRep);
            if (invite == null) {
                invite = new Date(0, 0, 0, 0, 0, 0);
            }
            if (repondu == null) {
                repondu = new Date(0, 0, 0, 0, 0, 0);
            }
            $scope.bonjour = conference;
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/modifDate.php",
                data: {
                    medecin: $scope.quelMed,
                    conference: conference,
                    invite: invite,
                    repondu: repondu,
                    statut: selectedRep
                }
            }).then(
                function (retour) {
                    $scope.modifiDate = retour.data;
                    $scope.showValide2 = false;
                    $scope.afficherConf();
                }, function (retour) {
                    $scope.modifiDate = retour.statusText;
                }
            );
        };

        $scope.insertDate = function (cetteDate) {
            cetteDate.setDate((cetteDate.getDate()) + 1);
            $http({
                method: 'POST',
                url: "http://localhost/WebServ/insDate.php",
                data: {
                    date: cetteDate
                }
            }).then(
                function (retour) {
                    $scope.insertion = retour.data;
                }, function (retour) {
                    $scope.inserstion = retour.statusText;
                }
            );
        };


        $scope.getAnnees = function () {
            $http({
                method: "GET",
                url: "http://localhost/WebServ/getNbConf.php",
                params: {id: $scope.quelMed}
            }).then(function (response) {
                $scope.listeMConf = response.data;
                if ($scope.listeMConf.length != 0) {
                    $scope.ifStat = true;
                    $scope.listeAnnees = [];
                    for (var i = 0; i < $scope.listeMConf.length; i++) {
                        $scope.ligneListe = $scope.listeMConf[i];
                        $scope.listeMConf[i] = $scope.ligneListe[0];
                        if ($scope.listeMConf[i] && $scope.listeMConf[i].debut && $scope.listeMConf[i].debut != '0000-00-00 00:00:00') {
                            //console.log(new Date($scope.listeMConf[i].debut));
                            $scope.annee = new Date($scope.listeMConf[i].debut);
                            console.log($scope.annee.getFullYear());
                            $scope.annee = $scope.annee.getFullYear();
                            if ($scope.listeAnnees.length == 0) {
                                $scope.listeAnnees.push({annee: $scope.annee, nb: 1});
                                console.log("DEB: " + $scope.listeAnnees[0].annee);
                            } else {
                                for (var j = 0; j < $scope.listeAnnees.length; j++) {
                                    console.log("listeAnnees: " + $scope.listeAnnees[j].annee);
                                    console.log("annee: " + $scope.annee);

                                    if ($scope.listeAnnees[j].annee == $scope.annee) {
                                        $scope.note = j;
                                        $scope.retiens = $scope.listeAnnees[j].nb + 1;
                                        $scope.cteur++;
                                        console.log("IF= " + $scope.listeAnnees[j].annee);
                                    }
                                }
                                if ($scope.cteur == 0) {
                                    $scope.listeAnnees.push({annee: $scope.annee, nb: 1});
                                } else {
                                    $scope.listeAnnees[$scope.note].nb = $scope.retiens;
                                }
                                $scope.cteur = 0;
                            }
                        }
                    }
                    //les années sont triées dans l'ordre
                    for (var x = 0; x < $scope.listeAnnees.length; x++) {
                        for (var y = 0; y < $scope.listeAnnees.length; y++) {
                            if (x != y) {
                                if ($scope.listeAnnees[y].annee > $scope.listeAnnees[x].annee) {
                                    $scope.retenir = $scope.listeAnnees[y];
                                    $scope.listeAnnees[y] = $scope.listeAnnees[x];
                                    $scope.listeAnnees[x] = $scope.retenir;
                                }
                            }
                        }
                    }

                    $scope.tabAnnees = [];
                    $scope.tabCb = [];
                    for (var k = 0; k < $scope.listeAnnees.length; k++) {
                        $scope.tabAnnees[k] = $scope.listeAnnees[k].annee.toString();
                        $scope.tabCb[k] = $scope.listeAnnees[k].nb;
                    }

                    $scope.displayLineChart($scope.tabAnnees, $scope.tabCb);

                } else {
                    $scope.ifStat = false;
                }
            }, function (response) {
                $scope.listeMConf = response.statusText;
            });
        };
        if ($routeParams.id != null) {
            $scope.getAnnees();
            $scope.afficherDetails();
            $scope.afficherConf();
        }
    }]);