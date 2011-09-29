
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

		if (allRecords[i].getElementsByTagName("workshopID")[0].childNodes[0].nodeValue == eventName){
	
		try {startTime.push(allRecords[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue);} 
			catch (err) { 
			desc="All day event";
			startTime=["8/30/2011 10:30:00 AM"];}
		try {endTime.push(allRecords[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue);}
		catch (err) {endTime = ["9/2/2011 5:30:00 PM"]; }
//		console.log(startTime, endTime);
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
							
			function getInfo(session){
				var sessionDescription;
				var loc;
				var sessionCategory;
				var submissionTitle;
				var submissionAuthorsAr;
				var presentationOrderAr = new Array();
				var submissionTitleAr = new Array();
				var submissionAuthorsAr = new Array();
				records = getDoc("Program.xml", "record");
				for (i=0; i<records.length; i++) {
					if (records[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue == session) {
						sessionCategory = records[i].getElementsByTagName("sessionCategory")[0].childNodes[0].nodeValue;
						if (sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo') {
							sessionDescription = records[i].getElementsByTagName("sessionDescription")[0].childNodes[0].nodeValue;
							loc = records[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
							presentationOrderAr.push (records[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
							submissionTitleAr.push (records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
							submissionAuthorsAr.push (records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
						} else if (sessionCategory == 'Keynote' || sessionCategory == 'Panel' || sessionCategory == 'Tutorial') {
							loc = records[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
							submissionTitle = records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue;	
							submissionAuthors = records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue;	
						} else if (sessionCategory == 'ChallengesAndVision' || sessionCategory == 'PhDWorkshop') {
							loc = records[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
							presentationOrderAr.push (records[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
							submissionTitleAr.push (records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
							submissionAuthorsAr.push (records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
						}
					};
				}
				
				var allInfo;
				if (sessionCategory == 'Keynote') {
					allInfo = '<div class = "allPresentations"><p><b>Author:</b> '+submissionAuthors+'</p></div>';	
				} if (sessionCategory == 'Panel' || sessionCategory == 'Tutorial') {
					allInfo = '<div class = "allPresentations"><p><b>Authors:</b> '+submissionAuthors+'</p></div>';	
				}else if (sessionCategory == 'ChallengesAndVision' || sessionCategory == 'PhDWorkshop' || sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo') {
					var allPresentation = '';			
					for (j=0; j<presentationOrderAr.length; j++){
						if (sessionCategory == 'ChallengesAndVision' || sessionCategory == 'PhDWorkshop' || sessionCategory == 'Research' || sessionCategory == 'Industrial') {
							presentation = '<p class = "presentationName">Presentation # '+presentationOrderAr[j]+'</p><p><b>Title:</b> "'+submissionTitleAr[j]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[j]+'</p>';
						} else if (sessionCategory == 'Demo') {
							presentation = '<p class = "presentationName">Demo # '+presentationOrderAr[j]+'</p><p><b>Title:</b> "'+submissionTitleAr[j]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[j]+'</p>';
						}
						allPresentation = allPresentation + presentation;
					}		
					allInfo ='<div class = "allPresentations">'+allPresentation+'</div>';	
				} 
				
				if (sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo') {
					txt ='<div class = "header"><div class = "sessionName">'+session+': '+sessionDescription+'</div><a class="location" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br>'+allInfo;	
				} else if (sessionCategory == 'Keynote' || sessionCategory == 'Panel' || sessionCategory == 'Tutorial'){
					txt = '<div class = "header"><div class = "sessionName">'+session+': '+submissionTitle+'</div><a class="location" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br>'+allInfo;	
				} else if (sessionCategory == 'ChallengesAndVision' || sessionCategory == 'PhDWorkshop'){
					txt = '<div class = "header"><div class = "sessionName">'+session+'</div><a class="location" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br>'+allInfo;	
				}
	//		console.log(session);
			addToCalendar(session,loc, 1);
			};

			function getGeneralInfo(workshop){
				var workshopName;
				var workshopDescription;
				var loc;
				var organizers;
				var website;

				workshops = getDoc("XMLworkshops.xml", "workshop");
				
				for (i=0; i<workshops.length; i++) {
					
					if ( workshops[i].getElementsByTagName("workshopID")[0].childNodes[0].nodeValue == workshop) {
						workshopName = workshops[i].getElementsByTagName("workshopName")[0].childNodes[0].nodeValue;
						workshopDescription = workshops[i].getElementsByTagName("workshopDescription")[0].childNodes[0].nodeValue;
						loc = workshops[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
						organizers = workshops[i].getElementsByTagName("organizers")[0].childNodes[0].nodeValue;
						website = workshops[i].getElementsByTagName("website")[0].childNodes[0].nodeValue;
					};
				}
				txt ='<div class = "workshopName">'+workshopName+'</div><br><p class = "room"><b>Room: </b><a href="rooms.html#'+roomId(loc)+'">'+loc+'</a></p><p class = "organizers"><b>Organizers: </b>'+organizers+'</p><p class = "website"><b>Website: </b><a href="'+website+'">'+website+'</a></p><br><div class = "workshopDescription">'+workshopDescription+'</div>';
	//			console.log(workshop);				
				addToCalendar(workshop,loc,2);	
			};
				
			function getDetailInfo(workshop) {
				var workshopName;
				var loc;
				var organizers;
				var website;
				var sessionCategory;
				var sessionName;
				var submissionTitle;
				var submissionAuthors;
				var sessionNameAr = new Array();
				var presentationOrderAr = new Array();
				var submissionTitleAr = new Array();
				var submissionAuthorsAr = new Array();

				workshops = getDoc("XMLworkshops.xml", "workshop");
				for (i=0; i<workshops.length; i++) {
					 
					if (workshops[i].getElementsByTagName("workshopID")[0].childNodes[0].nodeValue== workshop) {
						workshopName = workshops[i].getElementsByTagName("workshopName")[0].childNodes[0].nodeValue;
						loc = workshops[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
						organizers = workshops[i].getElementsByTagName("organizers")[0].childNodes[0].nodeValue;
						website = workshops[i].getElementsByTagName("website")[0].childNodes[0].nodeValue;
						sessionCategory = workshops[i].getElementsByTagName("sessionCategory")[0].childNodes[0].nodeValue;
						if (sessionCategory == 'KeynoteSession') {
							sessionName = workshops[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue;
							submissionTitle = workshops[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue;	
							submissionAuthors = workshops[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue;
						} else if (sessionCategory == 'ResearchSession') {
							sessionName = workshops[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue;
							presentationOrderAr.push (workshops[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
							submissionTitleAr.push (workshops[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
							submissionAuthorsAr.push (workshops[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
						} else if (sessionCategory == 'KeynoteResearchSession'){
							sessionNameAr.push (workshops[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue);
							presentationOrderAr.push (workshops[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
							submissionTitleAr.push (workshops[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
							submissionAuthorsAr.push (workshops[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
						}
					}
				}

				var allInfo;
				if (sessionCategory == 'KeynoteSession') {
					allInfo = '<p class = "workshopSessionName">'+sessionName+'</p><br><p><b>Title:</b> "'+submissionTitle+'"</p><p><b>Author:</b> '+submissionAuthors+'</p>';
				} else if (sessionCategory == 'ResearchSession') {
					var allPresentation = '';		
					for (j=0; j<presentationOrderAr.length; j++){
								presentation = '<p class = "presentationName">Presentation # '+presentationOrderAr[j]+'</p><p><b>Title:</b> "'+submissionTitleAr[j]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[j]+'</p>';
							allPresentation = allPresentation + presentation;
						}		
					allInfo = '<p class = "workshopSessionName">'+sessionName+'</p><br>'+allPresentation; 	
				} else if (sessionCategory == 'KeynoteResearchSession'){
					var allInfo1 = '<p class = "workshopSessionName">'+sessionNameAr[0]+'</p><br><p><b>Title: </b>"'+submissionTitleAr[0]+'"</p><p><b>Author: </b>'+submissionAuthorsAr[0]+'</p>';
					var allInfo2 = '';
					for (l=1; l<presentationOrderAr.length; l++){
							presentation = '<p class = "presentationName">Presentation # '+presentationOrderAr[l]+'</p><p><b>Title:</b> "'+submissionTitleAr[l]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[l]+'</p>';
						allInfo2 = allInfo2 + presentation;
					}		
					allInfo = allInfo1+'<br>'+'<p class = "workshopSessionName">'+sessionNameAr[1]+'<p><br>'+allInfo2;		
				}
				
				txt ='<div class = "workshopName">'+workshopName+'</div><br><p class = "room"><b>Room: </b><a href="rooms.html#'+roomId(loc)+'">'+loc+'</a></p><p class = "organizers"><b>Organizers: </b>'+organizers+'</p><p class = "website"><b>Website: </b><a href="'+website+'">'+website+'</a></p><br><div class = "allPresentations">'+allInfo+'</div>';
		//	console.log(workshop);
			addToCalendar(workshop, loc, 2);
			}	
			
			function getDetailMergedInfo(workshop) {
				var workshopName;
				var loc;
				var organizers;
				var website;
				var workshopNameMerged;
				var organizersMerged;
				var websiteMerged;
				var workshopDescriptionMerged;
				var sessionCategory;
				var sessionName;
				var submissionTitle;
				var submissionAuthors;
				var presentationOrderAr = new Array();
				var submissionTitleAr = new Array();
				var submissionAuthorsAr = new Array();

				workshops = getDoc("XMLworkshops.xml", "workshop");
				for (i=0; i<workshops.length; i++) {

					if ( workshops[i].getElementsByTagName("workshopID")[0].childNodes[0].nodeValue== workshop) {
						workshopName = workshops[i].getElementsByTagName("workshopName")[0].childNodes[0].nodeValue;
						loc = workshops[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
						organizers = workshops[i].getElementsByTagName("organizers")[0].childNodes[0].nodeValue;
						website = workshops[i].getElementsByTagName("website")[0].childNodes[0].nodeValue;
						workshopNameMerged = workshops[i].getElementsByTagName("workshopNameMerged")[0].childNodes[0].nodeValue;
						organizersMerged = workshops[i].getElementsByTagName("organizersMerged")[0].childNodes[0].nodeValue;
						websiteMerged = workshops[i].getElementsByTagName("websiteMerged")[0].childNodes[0].nodeValue;
						workshopDescriptionMerged = workshops[i].getElementsByTagName("workshopDescriptionMerged")[0].childNodes[0].nodeValue;
						sessionCategory = workshops[i].getElementsByTagName("sessionCategory")[0].childNodes[0].nodeValue;
						if (sessionCategory == 'KeynoteSession') {
							sessionName = workshops[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue;
							submissionTitle = workshops[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue;	
							submissionAuthors = workshops[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue;
						} else if (sessionCategory == 'ResearchSession') {
							sessionName = workshops[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue;
							presentationOrderAr.push (workshops[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
							submissionTitleAr.push (workshops[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
							submissionAuthorsAr.push (workshops[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
						} 
					}
				}

				var allInfo;
				if (sessionCategory == 'KeynoteSession') {
					allInfo = '<p class = "workshopSessionName">'+sessionName+'</p><br><p><b>Title:</b> "'+submissionTitle+'"</p><p><b>Author:</b> '+submissionAuthors+'</p>';
				} else if (sessionCategory == 'ResearchSession') {
					var allPresentation = '';		
					for (j=0; j<presentationOrderAr.length; j++){
								presentation = '<p class = "presentationName">Presentation # '+presentationOrderAr[j]+'</p><p><b>Title:</b> "'+submissionTitleAr[j]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[j]+'</p>';
							allPresentation = allPresentation + presentation;
						}		
					allInfo = '<p class = "workshopSessionName">'+sessionName+'</p><br>'+allPresentation; 	
				} 
						
				txt ='<div class = "workshopName">'+workshopName+'<br>and<br>'+workshopNameMerged+'</div><br><p class = "room"><b>Room: </b><a href="rooms.html#'+roomId(loc)+'">'+loc+'</a></p><br><p class = "organizers"><b>Organizers (DBRank 2011): </b>'+organizers+'</p><p class = "website"><b>Website (DBRank 2011): </b><a href="'+website+'">'+website+'</a></p><br><p class = "organizers"><b>Organizers (MUD 2011): </b>'+organizersMerged+'</p><p class = "website"><b>Website (MUD 2011): </b><a href="'+websiteMerged+'">'+websiteMerged+'</a></p><br><div class = "allPresentations">'+allInfo+'</div>';
		
			addToCalendar(workshop, loc, 2);
			}	
	
			
			
			
			
			
