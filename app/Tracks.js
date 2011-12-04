var records = getDoc("Program.xml", "record");
var articles = getDoc("ArticlesAbstract.xml", "article");

function getAbstract(num, tableId) {
	//console.log(num+ "   "+tableId);
	var element=document.getElementById("article" + num+tableId+"abstract"); 
	var parent = document.getElementById("1").childNodes[0];
	if (element!=null){
		parent.removeChild(element);
	} else {
		var abstrRow = document.createElement("tr");
		abstrRow.setAttribute("id","article" + num+tableId+"abstract");
		var titlRow = document.getElementById("article" + num+tableId);	
		for (i=0; i<records.length; i++){	
			var aName = titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue;
			var rowInrecords;
			try {rowInrecords=records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue;} 
			catch(err){rowInrecords="NODATA";}
			if (rowInrecords==titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue){
				var start;
				var end;
				var loc;
				var author;
				var aId;
				var artAbstract;
				try {author = records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue; } catch (err) {author = "Not defined";}
				try {start = records[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue;} catch (err) {start="Not defined";}
				try {end=records[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue} catch (err) {end="Not defined";}
				try {loc=records[i].getElementsByTagName("location")[0].childNodes[0].nodeValue} catch (err) {loc="Not defined";}
				try {category=records[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue} catch (err) {loc="Not defined";}
				try {aId = records[i].getElementsByTagName("submissionId")[0].childNodes[0].nodeValue;
					for (j=0; j<articles.length; j++){
						var localId = articles[j].getElementsByTagName("articleId")[0].childNodes[0].nodeValue;
						//console.log(articles[j]+" "+aId+" "+localId);
						if	(localId == aId){
							artAbstract=articles[j].getElementsByTagName("abstract")[0].childNodes[0].nodeValue; 	
						}
					}	
				} catch (err) {artAbstract="Not provided";	}

				var element = "<div id='event' style='visibility:hidden'><div class='summary'>"+category+"</div><span class='dtstart'>"+start+"</span><span class='dtend'>"+end+"</span><div class='location'>"+loc+"</div><div class='details'>"+aName+"</div></div>";	
				var listener = "<div class='textSmall'><a href='#null' id= 'btnW' class='ibutton'><div><b>Add to web calendar</b>"+element+"</div></a></div><a href='#null' id= 'btnL' class='ibutton2'><b>Add to local calendar</b></a></div>";	
				
				abstrRow.innerHTML = "<td class='event'><div class='textSmall'><b>Authors: </b>"+author+"<br><hr/><div class='textSmall'><b>Abstract: </b>"+artAbstract+"<br><hr/><i>"+start+" - "+end+"</i><br><a href='rooms.html'>"+loc+"</a></div>"+listener+"</td>";

				//console.log(titlRow.nextSibling);
				//console.log(document.getElementById("1").childNodes[0]);
				document.getElementById("1").childNodes[0].insertBefore(abstrRow,titlRow.nextSibling);	
				addToWebCalendar();	
				var btnL = document.getElementById("btnL");
				btnL.setAttribute("onclick","addToLocalCalendar('"+category+"','" +start+"','" +end+"','" +loc+"')");
			}
		}
	}
};