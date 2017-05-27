//+----------------------------------------------------------------------+
//|                          VARIABLES GLOBALES                          |
//+----------------------------------------------------------------------+
var couleurChoisi="";
var ligneActive=10;
var colorCellSolution = [];
var ColorSolutionExist = [];
//+--------------------------------------------------------------------+
//|                              METHODES                              |
//+--------------------------------------------------------------------+	
/**Au lancement de la page*/
$(document).ready(function() {
	//Création du tableau mastermind
	creationTableau();
	//Création de la solution
	solution();
	//recupère la couleur choisi
	$("button").click(function() {
		couleurChoisi= $(this).attr("class");
	});

});//END ready function

/**Au clic d'une case du tableau*/
function pushCell(event)
{
	//on récupère id du tableau
	celluleChoisi = event.target.id;
	//on vérifie si la cellule choisi est sur la ligne en jeu (ligne active) 
	var ligneActiveOk = verifLigneActive(celluleChoisi);
	//si la cellule est sur la ligne active on peu attribuer une couleur à une cellule
	if(ligneActiveOk)
	{
		//on attribut une couleur choisi préalablement à la cellule
		$("table#proposition").find("td#"+celluleChoisi).attr("class", couleurChoisi);
		//quand la cellule est remplie on peut proposer de valider 
		creaBouttonOk = passCelluleActive();
		if (creaBouttonOk) $("#proposition tr:nth-child("+ligneActive+") td:last-child.btnok").html("<button class='ok'>ok</button>");
		//une fois la cellule soumise on passe à la ligne suivante
		$("button.ok").click(function() {
			$(this).attr({"disabled" : "disabled"});
			indice();
			ligneActive--;
			
		});
				
	}
};//END pushCell indice

/**on créer un tableau de 10 lignes et 1 colone pour les indices du tableau, 4 colones de reponse, 1 colone de solution et 1 colone de validation d'un ligne active*/
function creationTableau()
{
	var tableau = "";
	//creation des lignes et colones
	for(var ligne=1; ligne<=10; ligne++)
	{
		tableau += "<tr>";
			for(var colone=1; colone<=7; colone++)
			{
				tableau += "<td></td>";
			};
		tableau += "</tr>";
	};
	
	$("table#proposition").html(tableau);
	
	//insertion des indices du tableau (de 10 à 1)
	var numeroligne = 10;
	for(var ligne=1; ligne<=10; ligne++)
	{	

		$("#proposition tr:nth-child("+ligne+") td:first-child").text(numeroligne);
		numeroligne--;
	};
	//Attribution d'un id et d'un class sur les 4 colones suivante
	var numeroligne = 1;
	for(var ligne=1; ligne<=10; ligne++)
	{
		for(var colone=2; colone<6; colone++)
		{
			var numerocolone = colone-1;
			//id correspond à C (cellule) + le numero de ligne + le numero de colone du tableau
			$("#proposition tr:nth-child("+ligne+") td:nth-child("+colone+")").attr({"id":"C_"+numeroligne+"_"+numerocolone});
		}
		numeroligne++;
		
	};
	////Attribution d'une class sur la colones suivante indice
	for(var ligne=1; ligne<=10; ligne++)
	{	

		$("#proposition tr:nth-child("+ligne+") td:nth-child(6)").attr({"class":"indice"});
	};
	////Attribution d'une class sur la colones suivante btnok
	for(var ligne=1; ligne<=10; ligne++)
	{	

		$("#proposition tr:nth-child("+ligne+") td:nth-child(7)").attr({"class":"btnok"});
	};	
	creationIndice();
};//END creationTableau function
function creationIndice()
{
	$("#proposition tr td:nth-child(6)").html('<div></div><div></div><div></div><div></div>'
	);
};//END creationIndice function
/**Verification que l'utilisateur joue sur la ligne en jeu, active*/
function verifLigneActive(celluleChoisi)
{
	var ligneActiveOk=false;
	//on récupère la ligne dans l'id
	ligneSelect=celluleChoisi.split("_");
	//on vérifie que la ligne de l'id choisi corespond à la ligne active
		if (ligneSelect[1]==ligneActive)
		{
			ligneActiveOk=true;
		}
		//retourne si on est, ou pas, sur la ligne active
	return ligneActiveOk;
};//END verifLigneActive function

/**verifie que la ligne active est complètement coloré par l'utilisateur*/
function passCelluleActive ()
{	
	var creaBouttonOk=true;
	//on parcour les 4 cellules de reponses de la ligneActive
	for(var cellReponse=1; cellReponse<=4; cellReponse++)
	{	
		//on recupère la valeur (class) des 4 cellules de reponses
		var cell = "C_"+ ligneActive +"_"+ cellReponse
		verifCellColor = $("#"+cell).attr("class");
		if (verifCellColor==undefined||verifCellColor=="")
		{
			creaBouttonOk=false;
		}
	}
	//on retourne si la ligne active est remplie ou pas
	return creaBouttonOk;
};//END passCelluleActive function
		
/**Créer une solution*/
function solution()
{
		var nbrcouleurstockee = 0;
	
		
		//On assigne la premier couleur et on augmente le nbrcouleurstockee
		colorCellSolution[1] = (Math.floor((8)*Math.random()+1));
		nbrcouleurstockee = 1;
				//assignation des 4 couleurs
				do{
					//On assigne un nombre aléaoire à temp (qui correspondra par la suite à une couleur)
					temp = (Math.floor((8)*Math.random()+1));
					//verification
					//Sécurité : colorCellSolution[x] contient quelque chose
					if(colorCellSolution[nbrcouleurstockee]!= undefined)
					{
						var SolutionOk = true;
						for(var cell=1; cell<=nbrcouleurstockee; cell++)
						{
							(temp!=colorCellSolution[cell])? ColorSolutionExist[cell]=true : ColorSolutionExist[cell]=false;
							if(ColorSolutionExist[cell]==false)SolutionOk=false;
						};
					};
					
					//Une fois le la solution vérifier on stocke la cellule dans le tableau des cellule solution. Puis on incrémente le nombre de couleur stocker.
					if(SolutionOk)
					{
						colorCellSolution[nbrcouleurstockee+1]= temp;
						nbrcouleurstockee++;
					};							

				}while(nbrcouleurstockee<4);
			
		//On attribut un chiffre à sa couleur
		for(cellSolution=1;cellSolution<=4;cellSolution++)
		{
			//Suivant affection de tabSolution, lui attribuer un fond de couleur
			switch(colorCellSolution[cellSolution])
			{
				case 1 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color1"});break;
				case 2 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color2"});break;
				case 3 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color3"});break;
				case 4 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color4"});break;
				case 5 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color5"});break;
				case 6 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color6"});break;
				case 7 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color7"});break;
				case 8 : $("#solution td:nth-child("+cellSolution+")").attr({"class" : "color8"});break;
			}
		};	
};//END solution function
var indice_reponse=[];
var Indice_solution=[];
var Indice_indice=[];
var verifier= [];

function indice ()
{
	//On récupère la couleur reponse
	for (var color=1; color<=4; color++)
	{
		indice_reponse[color] = $("#C_"+ligneActive+"_"+color).attr('class');

	}
	//On récupère la couleur solution
	for (var color=1; color<=4; color++)
	{
		Indice_solution[color] = $("#solution td:nth-child("+color+")").attr("class");

	}	
	//initialisation
	for(var i=1;i<=4;i++)
	{
		Indice_indice[i]=undefined;
		verifier[i] = false;
	}
	//On vérifie la réponse avec la solution
	for (var i=1; i<=4; i++)
	{	
		for (var k=1; k<=4; k++)
		{
			if(i==k)
			{
				if(Indice_solution[i]==indice_reponse[i])						
				{
					Indice_indice[i]="bienplace";
					verifier[i] = true;
					break;
				}	
			}
			else
			{
				if(Indice_solution[i]==indice_reponse[k] && verifier[i]==false)
				{
					Indice_indice[i]="malplacee";
					verifier[i] = true;
				}
			}
		}
	}
	
var cptNoir=0;
var cptBlanc=0;

	for (var i=1; i<=4; i++)
	{	
		if(Indice_indice[i]=="bienplace") cptNoir++;
		if(Indice_indice[i]=="malplacee") cptBlanc++;
	}
		
var NetB =(cptNoir+cptBlanc);	
console.log(NetB);
console.log(ligneActive);

		$("#proposition tr:nth-child("+ligneActive+") td.indice div:nth-child(-n+"+NetB+")").attr({'class': 'indiceCellWhite'}); 

		$("#proposition tr:nth-child("+ligneActive+") td.indice div:nth-child(-n+"+cptNoir+")").attr({'class': 'indiceCellBlack'}); 		
	
	if(cptNoir==4)gagnee();
	if(ligneActive==1)perdu();
}; //END indice function
function gagnee()
{
	alert("gagnee!!!!");
	$("#cachesolution").css({'background-color':'transparent'});
}
function perdu()
{
	alert("perdu!!!");
	$("#cachesolution").css({'background-color':'transparent'});
}