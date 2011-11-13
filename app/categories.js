//console.log(programDoc);
var allRecords = getDoc("Program.xml", "record");
var articles = getDoc("XMLarticlesAbstr.xml", "article");

	

	
function getAbstract(num, tableId) {
	console.log(num+ "   "+tableId);
	var element=document.getElementById("article" + num+tableId+"abstract"); 
   var parent = document.getElementById("1").childNodes[0];
	if (element!=null){
	
	parent.removeChild(element);
			} 
	else {
	
	var abstrRow = document.createElement("tr");
	abstrRow.setAttribute("id","article" + num+tableId+"abstract");
	var titlRow = document.getElementById("article" + num+tableId);	

	for (i=0; i<allRecords.length; i++){	
	var aName = titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue;
	var rowInAllRecords;
	try {rowInAllRecords=allRecords[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue;} 
	catch(err){rowInAllRecords="NODATA";}
	if (rowInAllRecords==titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue){
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

	var element = "<div id='event' style='visibility:hidden'><div class='summary'>"+category+"</div><span class='dtstart'>"+start+"</span><span class='dtend'>"+end+"</span><div class='location'>"+loc+"</div><div class='details'>"+aName+"</div></div>";	
	var listener = "<div class='textSmall' style='text-align:center;font-size:0.1em;'><a href='#null' id= 'btnW' class='ibutton'><div><b>Add to web calendar</b>"+element+"</div></a></div><a href='#null' id= 'btnL' class='ibutton2'><b>Add to local calendar</b></a></div>";	
	
	abstrRow.innerHTML = "<td class='event'><div class='textSmall'><b>Authors: </b>"+author+"<br><hr/><div class='textSmall'><b>Abstract: </b>"+artAbstract+"<br><hr/><i>"+start+" - "+end+"</i><br><a href='rooms.html#"+roomId(loc)+"'>"+loc+"</a></div>"+listener+"</td>";

console.log(titlRow.nextSibling);
console.log(document.getElementById("1").childNodes[0]);
	document.getElementById("1").childNodes[0].insertBefore(abstrRow,titlRow.nextSibling);	
	addToWebCalendar();	
	var btnL = document.getElementById("btnL");
	btnL.setAttribute("onclick","addToLocalCalendar('"+category+"','" +start+"','" +end+"','" +loc+"')");

	}
	}
	}
};