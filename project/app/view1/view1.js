// Ctrl+Alt+L = indentation
'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
        $routeProvider.when('/view1/:id', {
            templateUrl: 'view1/view11.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        $scope.quelleConf = $routeParams.id;
        // n'apparaît pas si on change l'URL
        $scope.show = true;
        $scope.infoConf = [
            {
                cetId: 1008,
                titre: "conf1",
                description: "blablabla",
                debut: "2016-08-08",
                fin: "2016-08-09",
                horaires: "yas ovfiyushf",
                ville: "apnisc",
                pays: "ojblolj",
                organisateurs: "cpéksmlc",
                invites: ["med1", "med2", "med3", "med4", "med5"]
            }
        ];
        $scope.critRech = ["Tout", "Titre", "Ville", "Pays", "Année", "Invités"];
        $scope.cetId = 0;
        $scope.listePays = [];
        $scope.lignesCochees = [];
        $scope.showStat = false;
        $scope.stat = "show";
        $scope.reponsesConf = ["Inconnu", "Oui", "Non"];
        $scope.selectedRep = $scope.reponsesConf[0];
        $scope.listeMedNon = [];
        $scope.listeMedInc = [];
        $scope.listeMedOui = [];
        $scope.checkedRow = [];
        /*

         //Passage d'une vue à une autre par fonction
         $scope.changeView = function(){
         $location.path('../view2/view2.html'); // path not hash
         };



         //Liste de médecins si on ajoute nom: et id: dans listeMedecins
         for (var cpt=0;cpt<$scope.listeMedecins.length;cpt++){
         $scope.listeMed.push($scope.listeMedecins[cpt].nom.toString())
         }
         */

        //Ajouter des médecins à la liste
        $scope.listeMedecins = [
            "med1", "med2", "med3"];
        $scope.listeMedInv = [];
        $scope.addMed = function (selectedMed, selectedRep) {
            for (var i = 0; i < $scope.listeMedInv.length; i++) {
                if ($scope.listeMedInv[i] == selectedMed.toString()) {
                    $scope.varTest = 1;
                    $scope.msg = "Vous avez déjà ajouté ce médecin.";
                }
            }
            if ($scope.varTest != 1) {
                $scope.listeMedInv.push(selectedMed.toString());
                if (selectedRep == "Oui") {
                    $scope.msg = $scope.listeMedOui[i];
                    $scope.listeMedOui.push(selectedMed.toString());
                } else {
                    if (selectedRep == "Non") {
                        $scope.listeMedNon.push(selectedMed.toString());
                    } else {
                        $scope.listeMedInc.push(selectedMed.toString());
                    }
                }

                $scope.msg = "";
            }
            $scope.varTest = 0;
        };


        //hide / show
        $scope.nvlConf = function () {
            $scope.show = false;
        };
        $scope.retourConf = function () {
            $scope.show = true;
        };

//Ajouter infos formulaire à liste
        $scope.addConf = function () {
            if ($scope.conf.debut <= $scope.conf.fin) {
                $scope.message = "";

                $scope.infoConf.push({
                    cetId: $scope.cetId,
                    titre: $scope.conf.titre,
                    description: $scope.conf.description,
                    debut: $scope.conf.debut,
                    fin: $scope.conf.fin,
                    horaires: $scope.conf.horaires,
                    ville: $scope.conf.ville,
                    pays: $scope.conf.pays,
                    organisateurs: $scope.conf.organisateurs,
                    invites: $scope.listeMedInv
                });
                $scope.show = true;
                $scope.listeMedInv = "";
                $scope.cetId++;

                //Nombre de conférences par pays
                $scope.count = 0;
                $scope.countListe = 0;
                for (var i = 0; i < $scope.infoConf.length; i++) {
                    for (var l = 0; l < $scope.listePays.length; l++) {
                        if ($scope.infoConf[i].pays == $scope.listePays[l].pays) {
                            $scope.countListe++;
                            $scope.quelleLigne = l;
                        }
                    }
                    for (var j = 0; j < $scope.infoConf.length; j++) {
                        if ($scope.infoConf[i].pays == $scope.infoConf[j].pays) {
                            $scope.count++;
                        }
                    }

                    if ($scope.countListe == 0) {
                        $scope.listePays.push({pays: $scope.infoConf[i].pays, nb: $scope.count})
                    } else {
                        $scope.listePays[$scope.quelleLigne].nb = $scope.count;
                    }
                    $scope.countListe = 0;
                    $scope.count = 0;
                }


                $scope.cbConf = $scope.infoConf.length;

                $scope.listeData = [];
                for (i = 0; i < $scope.listePays.length; i++) {
                    $scope.dataPays = $scope.listePays[i].nb * 360 / $scope.cbConf;
                    $scope.listeData.push({pays: $scope.listePays[i].pays, part: $scope.dataPays});
                }

                /*
                 $scope.test1=new Date ($scope.conf.debut.getFullYear(),$scope.conf.debut.getMonth(), $scope.conf.debut.getDate());
                 $scope.test2= $scope.conf.debut;
                 */
            } else {
                $scope.msg = "Veuillez entrer une date de fin valable";
            }
        };

        $scope.selectAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
                $scope.bjr = 8;
            } else {
                $scope.selectedAll = false;
                $scope.bjr = 7;
            }

            angular.forEach($scope.removeLine, function (obj) {
                obj.selected = $scope.selectedAll;
            })
        };


        $scope.checkedBox = function (unId, value) {
            if (value == 1) {
                $scope.lignesCochees.push({idConf: unId});
            } else {
                for (var i = 0; i < $scope.lignesCochees.length; i++) {
                    if (unId == $scope.lignesCochees[i].idConf) {
                        $scope.lignesCochees.splice(i, 1);
                    }
                }
            }
            $scope.bonjour = $scope.lignesCochees;
        };

        $scope.deleteLigne = function () {

            if (confirm("Voulez-vous vraiment supprimer ces éléments?") == true) {
                for (var i = 0; i < $scope.lignesCochees.length; i++) {
                    $scope.x = $scope.lignesCochees[i].idConf;
                    $scope.index = $scope.x.toString();
                    $scope.index = parseInt($scope.index);
                    $scope.test = $scope.index;
                    for (var j = 0; j < $scope.infoConf.length; j++) {
                        if ($scope.index == $scope.infoConf[j].cetId) {
                            $scope.infoConf.splice(j, 1);
                        }
                    }
                }
                $scope.lignesCochees = [];
            }

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
            console.log($scope.recherche);
        };

        $scope.showStati = function () {
            if ($scope.showStat == true) {
                $scope.showStat = false;
                $scope.stat = "show";
            } else {
                $scope.showStat = true;
                $scope.stat = "hide";
            }
        };

        $scope.chkChkd = function (value, med) {
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

/*
        $scope.deleteRow = function () {
            for(var i=0; i<$scope.checkedRow.length;i++){
                for(var j=0; i<$scope.infoConf.length;j++){
                    for(var l=0; l<$scope.infoConf[j].invites.length;l++){
                        if()
                    }
                }
            }
        };
*/

        if ($routeParams.id == null) {
            $(document).ready(function () {
                var acontext = $("#piecanvas").get(0).getContext("2d");
                //pie chart data
                var data = [
                    {
                        value: 110,
                        color: "palegreen",
                        highlight: "lime",
                        label: "Suisse"
                    },
                    {
                        value: 90,
                        color: "lightpink",
                        highlight: "deeppink",
                        label: "France"
                    },
                    {
                        value: 160,
                        color: "mediumturquoise",
                        highlight: "aqua",
                        label: "Allemagne"
                    }
                ];
                //draw
                var apiechart = new Chart(acontext).Pie(data);
            });
        }
        /*
         if($routeParams.id!=null){
         $(document).ready(function(){
         var context=$("#autrecanvas").get(0).getContext("2d");
         //pie chart data
         var data= {
         labels: ["2011", "2012", "2013", "2014", "2015", "2016"],
         datasets: [{
         data: [65, 59, 80, 81, 56, 55],
         fillColor: "powderblue",
         highlightFill: "lightskyblue"
         }]
         };
         //draw
         var linechart=new Chart(context).Bar(data);
         });
         }
         */

        if ($routeParams.id != null) {

            //piecharts en pourcentage

            $scope.cboui = 90;
            $scope.cbnon = 50;
            $scope.cbnsp = 220;

            $(document).ready(function () {
                var ctx = $("#mycanvas").get(0).getContext("2d");
                //pie chart data
                var data = [
                    {
                        value: $scope.cboui,
                        color: "palegreen",
                        highlight: "lime",
                        label: "Accepté",
                    },
                    {
                        value: $scope.cbnon,
                        color: "lightpink",
                        highlight: "deeppink",
                        label: "Décliné"
                    },
                    {
                        value: $scope.cbnsp,
                        color: "mediumturquoise",
                        highlight: "aqua",
                        label: "Pas de réponse"
                    }
                ];
                //draw
                var piechart = new Chart(ctx).Pie(data);
            });
        }


        $scope.tblshow = false;
        $scope.changeValues = function () {
            $scope.tblshow = true;
            $http.get("view1/readData.php").success(
                function (response) {
                    $scope.bonjour = 2;
                    $scope.dbValue = response;
                });
        };

        /*
         $(document).ready(function () {
         var context = $("#autrecanvas").get(0).getContext("2d");
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
         var linechart = new Chart(context).Bar(data);
         });

         */
    }]);
