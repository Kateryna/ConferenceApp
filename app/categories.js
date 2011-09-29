//console.log(programDoc);
var allRecords = getDoc("Program.xml", "record");
var articles = getDoc("XMLarticlesAbstr.xml", "article");
function goToCategory(categoryId){
	location="demo.html?category="+categoryId;
	return false;	
}
	
function init(){
	var hash = window.location.search.substring(1);
	var categoryId = hash.replace("category=","");
//	console.log(categoryId)
	var categoryTitle;
	switch (categoryId) {
	case "Demo":
		categoryTitle = "Demo Track";
		break;
	case "Research":
		categoryTitle = "Research Track";
		break;
	case "ChallengesAndVision":
		categoryTitle = "Challenges and Vision Track";
		break;
	case "Industrial":
		categoryTitle = "Industrial Track";
		break;
	case "PhDWorkshop":
		categoryTitle = "PhD Workshop";
		break;
	case "Tutorial":
		categoryTitle = "Tutorials";
		break;
		
	}
	
	
	
	var articles = new Array();
	var articlesArray = new Array();
//	var articlesArraySorted = new Array();
	
for (i = 0; i < allRecords.length; i++) {
	if (allRecords[i].getElementsByTagName("sessionCategory")[0].childNodes[0].nodeValue==categoryId)
	{
		articlesArray.push(allRecords[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);
	}
}
	articlesArraySorted=articlesArray.sort();
	console.log(articlesArraySorted.length);
document.getElementById("category").innerHTML = "<h3>"+categoryTitle+"</h3>";
var table = fastMakeTable("", articlesArraySorted.length, 1, articlesArraySorted,1);	
document.getElementById("result").innerHTML = table;
//console.log(table);	

};
function getAbstract(num, tableId) {
	
	var element=document.getElementById("article" + num+tableId+"abstract"); 
   var parent = document.getElementById("1").childNodes[0];
	if (element!=null){
	
	parent.removeChild(element);
			} 
	else {
		console.log("creation");
	var abstrRow = document.createElement("tr");
	abstrRow.setAttribute("id","article" + num+tableId+"abstract");
	var titlRow = document.getElementById("article" + num+tableId);
	for (i=0; i<allRecords.length; i++){	
	if (allRecords[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue==articlesArraySorted[num]){
	var start;
	var end;
	var loc;
	var author;
	var aId;
	var artAbstract;
	try {author = allRecords[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue; } catch (err) {author = "Not defined";}
	try {start = allRecords[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue;} catch (err) {start="Not defined";}
	try {end=allRecords[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue} catch (err) {end="Not defined";}
	try {loc=allRecords[i].getElementsByTagName("location")[0].childNodes[0].nodeValue} catch (err) {loc="Not defined";}
	try {category=allRecords[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue} catch (err) {loc="Not defined";}
	try {aId = allRecords[i].getElementsByTagName("submissionId")[0].childNodes[0].nodeValue;
		for (j=0; j<articles.length; j++){
			var localId = articles[j].getElementsByTagName("articleId")[0].childNodes[0].nodeValue;
				//console.log(articles[j]+" "+aId+" "+localId);
			if	(localId == aId){
				artAbstract=articles[j].getElementsByTagName("abstract")[0].childNodes[0].nodeValue; 	
			}
		}	
	
	 } catch (err) {artAbstract="Not provided";	}

	var element = "<div id='event' style='visibility:hidden'><div class='summary'>"+category+"</div><span class='dtstart'>"+start+"</span><span class='dtend'>"+end+"</span><div class='location'>"+loc+"</div><div class='details'>"+articlesArraySorted[num]+"</div></div>";	
	var listener = "<div class='textSmall' style='text-align:center;font-size:0.1em;'><a href='#null' id= 'btnW' class='ibutton'><div><b>Add to web calendar</b>"+element+"</div></a></div><a href='#null' id= 'btnL' class='ibutton2'><b>Add to local calendar</b></a></div>";	
	
	abstrRow.innerHTML = "<td class='event'><div class='textSmall'><b>Authors: </b>"+author+"<br><hr/><div class='textSmall'><b>Abstract: </b>"+artAbstract+"<br><hr/><i>"+start+" - "+end+"</i><br><a href='rooms.html#"+roomId(loc)+"'>"+loc+"</a></div>"+listener+"</td>";


	document.getElementById("1").childNodes[0].insertBefore(abstrRow,titlRow.nextSibling);	
	addToWebCalendar();	
	var btnL = document.getElementById("btnL");
	btnL.setAttribute("onclick","addToLocalCalendar('"+category+"','" +start+"','" +end+"','" +loc+"')");

	}
	}
	}
};