// FRIDRIKSSON

var periodicByNumber=[]
var contenuFormule = []
var modal = "<div id='monModal'class='modal'><div class='modal-content'><span id='close'>&times;</span><h1></h1><p id='discover'></p><p id='moreinfo'></p><a class='safety' href='#'target='_blank'>Voir la page Wikipedia!</a></div></div>"
var categories={
	'alcalins':['Alcalins', [3,11,19,37,55,87]],
	'alcalinoterreux':['Alcalinoterreux', [4,12,20,38,56,88]],
	'lanthanides':['Lanthanides', [57,58,59,60,61,62,63,64,65,66,67,68,69,70,71]],
	'actinides':['Actinides', [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103]],
	'transmets':['Métaux de transition',[21,22,23,24,25,26,27,28,29,39,40,41,42,43,44,45,46,47,72,73,74,75,76,77,78,79,104,105,106,107,108,112]],
	'pauvmets':['Métaux pauvres', [13,30,31,48,49,50,80,81,82,83,84]],
	'metalloides':['Métalloïdes', [5,14,32,33,51,52,85]],
	'nonmets':['Autres non-métaux', [1,6,7,8,15,16,34]],
	'halogenes':['Halogènes', [9,17,35,53]],
	'gaznobles':['Gaz nobles',[2,10,18,36,54,86]],
	'nonclasses':['Non classés',[109,110,111,113,114,115,116,117,118]],
	'primordial':['Primordial', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43
		,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,90
		,92]],
		'desintautrelems':["Désintégration d'autres éléments", [84,85,86,87,88,61,89,91,93,94]],
		'synthetiques':["Synthétique", [104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,95,96,97,98,99,100,101,102,103]]

	}

	function init() {
		$("#elemtable .elem").each(function() {
			a=parseInt($(this).attr('data-num'));
			nom = "<span class='name'>"+periodicByNumber[a]['name']+"</span>"
			symbol = "<span class='symbol'>"+periodicByNumber[a]['symbol']+"</span>"
			number = "<span class='number'>"+periodicByNumber[a]['number']+"</span>"
			$(this).html(nom+symbol+number);
			for (var categorie in categories){
				if (categories[categorie][1].includes(a)){
					$(this).addClass(categorie)
				}
			}
			$(this).click(setModalContent(periodicByNumber[a]))
		})
	}

	function setModalContent(element)	{
		return function()	{

			$('#monModal').show();
			$('#monModal h1').text(element["name"])
			$('#monModal #discover').text(element["discovered_by"])
			$('#monModal #moreinfo').text(element["summary"])
			$('#monModal a').attr("href", element["source"]);
		}
	}

	function toggleElement(elem)	{
		return function()	{
			$(this).toggleClass("backwhite")
			if (['primordial', 'desintautrelems', 'synthetiques'].includes(elem)){
				$("td.elem."+elem).toggleClass("forcehidden");
			}
			else {
				{
					$("td.elem."+elem).toggleClass("hidden");
				}
			}
		}
	}

	function updateFormule()	{
		var formuleTxt = ""
		var repet = 1
		for (var i = 0; i < contenuFormule.length; i++)	{
			while (contenuFormule[i+1] == contenuFormule[i]){
				repet++
				i++
			}
			if (repet>1){
				formuleTxt+=contenuFormule[i]+"<sub>"+repet+"</sub>"
				repet = 1
			}
			else {
				formuleTxt+=contenuFormule[i]
			}
		}
		$("#formule").html(formuleTxt)
	}

	$(document).ready(function() {

		$( "body" ).append(modal)

		$("#monModal").mouseup(function(e){
				if ($(this).is(e.target))
				{
					$(this).hide();
				}
		})

		$('#close').click(function() {
			$('#monModal').hide();
		})

		for (var i in periodic['elements']) {
			x=periodic['elements'][i];
			periodicByNumber[x['number']]=x;
		}

		init();
		$("form").html("<div id='boutons'></div>")
		$('.elemrange').eq(0).html("<span class='name'>Lanthanides</span><span class='range'>57‒71</span>").addClass("lanthanides")
		$('.elemrange').eq(1).html("<span class='name'>Actinides</span><span class='range'>89‒103</span>").addClass("actinides")
		$("h2").eq(0).text("Cliquer sur les symboles pour faire une formule | Cliquer sur la case pour plus d'infos")


		for (var categorie in categories){
			bouton = $("<span></span>")
			bouton.addClass(categorie+' bouton')
			bouton.text(categories[categorie][0])

			bouton.click(toggleElement(categorie))

			$("#boutons").append(bouton)
		}

		$(document).on('click','.symbol',function(e){
			e.stopPropagation();
			e.preventDefault();
			$("#monModal").hide()
			contenuFormule.push($(this).html())
			updateFormule();
		});


		$("#formuleclear").click(function(){contenuFormule = []; updateFormule()})

	})
