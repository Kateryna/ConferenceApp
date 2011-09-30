
		var txt;
		function addToCalendar(eventName,loc, docId){

			
	var startTime=[];
	var endTime=[];
	var allRecords=[];
if (docId==1){
 allRecords= getDoc("Program.xml", "record");
		for (i=0; i<allRecords.length; i++){
		if (allRecords[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue == eventName){
		try {startTime.push(allRecords[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue);} 
	
		catch (err) { startTime = ["8/30/2011 10:30:00 AM"];}
		try {
		endTime.push(allRecords[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue);}
		catch (err) { endTime = ["9/2/2011 5:30:00 PM"];}
		
		}
}

} else if (docId==2){
allRecords = getDoc("XMLworkshops.xml", "workshop");
		for (i=0; i<allRecords.length; i++){
		if (allRecords[i].getElementsByTagName("workshopAbbreviation")[0].childNodes[0].nodeValue.split(" ",1) == eventName){
		try {startTime.push(allRecords[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue);} 
			catch (err) { 
			desc="All day event";
			startTime=["8/30/2011 10:30:00 AM"];}
		try {endTime.push(allRecords[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue);}
		catch (err) {endTime = ["9/2/2011 5:30:00 PM"]; }
		console.log(startTime, endTime);
		}
		}

} else {console.log("Something wrong...");}

var start = parsingDate(startTime[0]);
var end = parsingDate(endTime[0]);



			function mycallbackform(v,m,f){
//				console.log(v);
				if (v!=2){
		//			console.log(startTime[0]);
//console.log("E "+eventName+"Start "+startTime[0]+"End "+endTime[0]+"Loc "+loc);					
addToLocalCalendar(eventName, startTime[0], endTime[0], loc);
return false;

//				location="calendarplugin.html?eventName="+eventName +"&loc="+loc+"&docId="+docId;
//				console.log(location);
				} return true;					
}
			$.prompt(txt,{
				submit: mycallbackform,
				buttons: {"Add to my calendar": '1', "Close": '2' },
				show:'slideDown'
			});
			
				
$(document).ready(function() {
	console.log('works');
	 $('.jqidefaultbutton').AddToCal({
    // ical and vcal require an ics or vcs file to be served. 
    // Disable these features if reqired (as a result the 30boxes, iCal and vCalendar menu links will not appear)
    icalEnabled:false,
    vcalEnabled:false,
    getEventDetails: function( element ) {
//console.log("goes to web calendar "+start+" "+end);
      // return the required event structure
      return { 
        webcalurl: null,
        icalurl: null,
        vcalurl: null, 
        start: start, 
        end: end, 
        title: eventName, 
        details: null, 
        location: loc, 
        url: null
        };
    },
  });
});
	};
							
			function getEventInfo(session){
				var sessionName;
				var sessionTitle;
				var loc;
				var sessionCategory;
				var submissionTitle;
				var submissionAuthors;
				var presentationOrderAr = new Array();
				var submissionTitleAr = new Array();
				var submissionAuthorsAr = new Array();
				records = getDoc("Program.xml", "record");
				for (i=0; i<records.length; i++) {
					sessionName = records[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue;
					if (sessionName == session) {
						sessionCategory = sessionName.split(" ", 1);
						loc = records[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
						if (sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo'|| sessionCategory == 'Challenges' || sessionCategory == 'PhD') {
							try {sessionTitle = ": "+records[i].getElementsByTagName("sessionTitle")[0].childNodes[0].nodeValue; } catch (err) {sessionTitle = "";}
							presentationOrderAr.push (records[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
							submissionTitleAr.push (records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
							submissionAuthorsAr.push (records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
						} else if (sessionCategory == 'Keynote' || sessionCategory == 'Panel' || sessionCategory == 'Tutorial') {
							submissionTitle = records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue;	
							submissionAuthors = records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue;	
						} 
					};
				}
				
				var allInfo;
				if (sessionCategory == 'Keynote'|| sessionCategory == 'Panel' || sessionCategory == 'Tutorial') {
					allInfo = '<div class = "allPresentations"><p><b>Authors:</b> '+submissionAuthors+'</p></div>';	
				}else if (sessionCategory == 'Challenges' || sessionCategory == 'PhD' || sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo') {
					var allPresentation = '';			
					for (j=0; j<presentationOrderAr.length; j++){
						presentation = '<p class = "presentationName">Presentation # '+presentationOrderAr[j]+'</p><p><b>Title:</b> "'+submissionTitleAr[j]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[j]+'</p>';
						allPresentation = allPresentation + presentation;
					}		
					allInfo ='<div class = "allPresentations">'+allPresentation+'</div>';	
				} 
				
				if (sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo' || sessionCategory == 'Challenges' || sessionCategory == 'PhD') {
					txt ='<div class = "header"><div class = "sessionName">'+session+sessionTitle+'</div><a class="location" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br>'+allInfo;	
				} else if (sessionCategory == 'Keynote' || sessionCategory == 'Panel' || sessionCategory == 'Tutorial'){
					txt = '<div class = "header"><div class = "sessionName">'+session+': '+submissionTitle+'</div><a class="location" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br>'+allInfo;	
				} 
			addToCalendar(session,loc, 1);
			};

			function getWorkshopInfo(workshop){
				var workshopAbb, workshopAbbSplit;
				var workshopName;
				var workshopDescription;
				var loc;
				var organizers;
				var website;
				workshops = getDoc("XMLworkshops.xml", "workshop");
				for (i=0; i<workshops.length; i++) {
					workshopAbbSplit = workshops[i].getElementsByTagName("workshopAbbreviation")[0].childNodes[0].nodeValue;
					if (workshopAbbSplit.split(" ", 1) == workshop) {
						workshopAbb = workshopAbbSplit;
						workshopName = workshops[i].getElementsByTagName("workshopName")[0].childNodes[0].nodeValue;
						loc = workshops[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
						organizers = workshops[i].getElementsByTagName("organizers")[0].childNodes[0].nodeValue;
						website = workshops[i].getElementsByTagName("website")[0].childNodes[0].nodeValue;
					};
				}
				txt ='<div class = "workshopName">'+workshopName+' ('+workshopAbb+')'+'</div><br><p class = "room"><b>Room: </b><a href="rooms.html#'+roomId(loc)+'">'+loc+'</a></p><p class = "organizers"><b>Organizers: </b>'+organizers+'</p><p class = "website"><b>Website: </b><a href="'+website+'">'+website+'</a></p><br>';
				addToCalendar(workshop,loc,2);	
			};
