//console.log(programDoc);
var allRecords = getDoc("Program.xml", "record");
var articles = getDoc("XMLarticlesAbstr.xml", "article");
var authorsArray = new Array();
var firstAuthorsArray = new Array();

function init(){
	
var h = window.innerHeight;

document.getElementById("right-sidebar").setAttribute("height",h-15);
/*document.body.addEventListener('touchmove', function(e) {
  // This prevents native scrolling from happening.
  e.preventDefault();
}, false);
*/
};

function getAbstract(tableId,num) {
console.log("Now "+ tableId);	
	//console.log("parent "+titlRow.parentNode.parentNode.getAttribute("id"));
	
if (tableId == 1){   
   
   var elements=document.getElementsByName("info"+num+tableId);
	var element=document.getElementById("article" + num +tableId+"abstract");
//console.log(elements[1]);
	var parent = document.getElementById(tableId).childNodes[0];
   
	if (elements.length!=0)
	{
		for (e=elements.length-1; e>-1; e--)
		{
	parent.removeChild(elements[e]);
		}
	} 
	else 
	{
	var titlRow = document.getElementById("article" + num+tableId);
	var allAuthArray=[];
	var start=[];
	var end=[];
	var loc=[];
	var category=[];	
	var submissionTitle=[];
	var articleIDs=[];
	var artAbstracts=[];	
	
	
		for (i=0; i<allRecords.length; i++)
		{	var str;
			try{str=allRecords[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue.split(", ");}
			catch(err){str="NODATA";}
			for (s in str)
			{
	//			console.log(titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue);
				if (str[s]== titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue)
				// authorsDistinquishFNSorted[num])
				{
				//	console.log("hurray+1");	
					allAuthArray.push(allRecords[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);
					try {start.push(allRecords[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue);} catch (err) {start.push("Not defined");}
					try {end.push(allRecords[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue);} catch (err) {end.push("Not defined");}
					try {loc.push(allRecords[i].getElementsByTagName("location")[0].childNodes[0].nodeValue);} catch (err) {loc.push("Not defined");}
					try {submissionTitle.push(allRecords[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);} catch (err) {category.push("Not defined");}	
					try {category.push(allRecords[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue);} catch (err) {category.push("Not defined");}	
				//	console.log(allRecords[i].getElementsByTagName("submissionId")[0].childNodes[0].nodeValue);
					try {
						var extId = allRecords[i].getElementsByTagName("submissionId")[0].childNodes[0].nodeValue;					
						articleIDs.push(extId);
							for (a=0; a<articles.length; a++){
							var localId = articles[a].getElementsByTagName("articleId")[0].childNodes[0].nodeValue;
					//			console.log(articles[a]+" "+extId+" "+localId);
								if	(localId == extId){
								artAbstracts.push(articles[a].getElementsByTagName("abstract")[0].childNodes[0].nodeValue); 	
									}
								}	
	
						 } catch (err) {artAbstracts.push("Not provided");	}					
					
				//	console.log(artAbstracts[i]);
					
					
				}
			}
		}
	//	console.log(category);
		for (j=0; j<allAuthArray.length; j++)
		{
			var abstrRow = document.createElement("tr");
			abstrRow.setAttribute("id","article" + num+tableId+"abstract");
			abstrRow.setAttribute("name","info"+num+tableId);
			var element = "<div id='event' style='visibility:hidden;font-size:1px;'><div class='summary'>"+category[j]+"</div><span class='dtstart'>"+start[j]+"</span><span class='dtend'>"+end[j]+"</span><div class='location'>"+loc[j]+"</div><div class='details'>"+submissionTitle[j]+"</div></div>";
			var listener = "<div class='textSmall' style='text-align:center; '><a href='#null' id= 'btnW' class='ibutton'><div><b>Add to web calendar</b>"+element+"</div></a></div><a href='#null' id= 'btnL' class='ibutton2'><b>Add to local calendar</b></a></div>";
			//console.log(listener);
			abstrRow.innerHTML = "<td class='event'><div><b>Article: </b>" +submissionTitle[j]+"</div><hr/><div class='textSmall'><b>Authors: </b>"+allAuthArray[j]+"<br><hr/><b>Abstract: </b>"+artAbstracts[j]+"<br><i>"+start[j]+" - "+end[j]+"</i><br><a href='rooms.html#"+roomId(loc[j])+"'>"+loc[j]+"</a><br>"+category[j]+"</div>"+listener+"</td>";
			document.getElementById(tableId).childNodes[0].insertBefore(abstrRow,	titlRow.nextSibling);

			var btnL = document.getElementById("btnL");
	//		console.log("in file "+category[j]);
			addToWebCalendar();

			btnL.setAttribute("onclick","addToLocalCalendar('"+category[j]+"','"+start[j]+"','"+end[j]+"','"+loc[j]+"')");
//			addToWebCalendar(start[j],end[j], category[j], loc[j]);
		
		}	
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
} else if (tableId==2){
	   
   var elements=document.getElementsByName("info"+num+tableId);
	var element=document.getElementById("article" + num +tableId+"abstract");
//console.log(elements[1]);
	var parent = document.getElementById(tableId).childNodes[0];
   
	if (elements.length!=0)
	{
		for (e=elements.length-1; e>-1; e--)
		{
	parent.removeChild(elements[e]);
		}
	} 
	else 
	{
	var titlRow = document.getElementById("article" + num+tableId);
	var allAuthArray=[];
	var start=[];
	var end=[];
	var loc=[];
	var category=[];	
	var submissionTitle=[];
	var articleIDs=[];
	var artAbstracts=[];	
	var authorName = titlRow.childNodes[0].childNodes[0].childNodes[0].firstChild.nodeValue.split(", ", 2);
	//authorsDistinquishLNSorted[num].split(", ", 2);
//	console.log(authorName[1]);
		for (i=0; i<allRecords.length; i++)
		{	
		var str;
			try{str=allRecords[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue.split(", ");}
			catch(err){str="NODATA";}

			for (s in str)
			{
				if (str[s]==authorName[1])
				{
		//			console.log("hurray");	
					allAuthArray.push(allRecords[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);
					try {start.push(allRecords[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue);} catch (err) {start.push("Not defined");}
					try {end.push(allRecords[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue);} catch (err) {end.push("Not defined");}
					try {loc.push(allRecords[i].getElementsByTagName("location")[0].childNodes[0].nodeValue);} catch (err) {loc.push("Not defined");}
					try {submissionTitle.push(allRecords[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);} catch (err) {category.push("Not defined");}	
					try {category.push(allRecords[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue);} catch (err) {category.push("Not defined");}
					
	//console.log(allRecords[i].getElementsByTagName("submissionId")[0].childNodes[0].nodeValue);
					try { var extId = allRecords[i].getElementsByTagName("submissionId")[0].childNodes[0].nodeValue;
						articleIDs.push(extId);
							for (a=0; a<articles.length; a++){
							var localId = articles[a].getElementsByTagName("articleId")[0].childNodes[0].nodeValue;
		//						console.log(articles[a]+" "+extId+" "+localId);
								if	(localId == extId){
		//							console.log("//////////////////////////////////////////////////////////////////////");
								artAbstracts.push(articles[a].getElementsByTagName("abstract")[0].childNodes[0].nodeValue); 	
									}
								}	
	
						 } catch (err) {artAbstracts.push("Not provided");	}									
					
					
					
						
				}
			}
		}
	//	console.log(category);
		for (j=0; j<allAuthArray.length; j++)
		{
			var abstrRow = document.createElement("tr");
			abstrRow.setAttribute("id","article" + num+tableId+"abstract");
			abstrRow.setAttribute("name","info"+num+tableId);
			var element = "<div id='event' style='visibility:hidden'><div class='summary'>"+category[j]+"</div><span class='dtstart'>"+start[j]+"</span><span class='dtend'>"+end[j]+"</span><div class='location'>"+loc[j]+"</div><div class='details'>"+submissionTitle[j]+"</div></div>";
			var listener = "<div class='textSmall' style='text-align:center; font-size:1px;'><a href='#null' id= 'btnW' class='ibutton'><div><b>Add to web calendar</b>"+element+"</div></a></div><a href='#null' id= 'btnL' class='ibutton2'><b>Add to local calendar</b></a></div>";
			//console.log(listener);
			abstrRow.innerHTML = "<td class='event'><div><b>Article: </b>" +submissionTitle[j]+"</div><hr/><div class='textSmall'><b>Authors: </b>"+allAuthArray[j]+"<br><hr/><b>Abstract: </b>"+artAbstracts[j]+"<br><i>"+start[j]+" - "+end[j]+"</i><br><a href='rooms.html#"+roomId(loc[j])+"'>"+loc[j]+"</a><br>"+category[j]+"</div>"+listener+"</td>";
			document.getElementById(tableId).childNodes[0].insertBefore(abstrRow,	titlRow.nextSibling);

			var btnL = document.getElementById("btnL");
	//		console.log("in file "+category[j]);
			addToWebCalendar();

			btnL.setAttribute("onclick","addToLocalCalendar('"+category[j]+"','"+start[j]+"','"+end[j]+"','"+loc[j]+"')");
//			addToWebCalendar(start[j],end[j], category[j], loc[j]);
		
		}	
	}
	
	} 
	
	
	
	else {alert("Somw mistake in authors");}
};	
