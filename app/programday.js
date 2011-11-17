var txt;
var records = getDoc("Program.xml", "record");

function getEventInfo(session){
	var sessionName;
	var sessionTitle;
	var loc;
	var sessionCategory;
	var submissionTitle;
	var submissionAuthors;
	var website;
	var presentationOrderAr = new Array();
	var submissionTitleAr = new Array();
	var submissionAuthorsAr = new Array();
	for (i=0; i<records.length; i++) {
		sessionName = records[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue;
		if (sessionName == session) {
			sessionCategory = sessionName.split(" ", 1);
			loc = records[i].getElementsByTagName("location")[0].childNodes[0].nodeValue;
			if (sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo'|| sessionCategory == 'Challenges' || sessionCategory == 'PhD') {
				try {sessionTitle = ': '+records[i].getElementsByTagName("sessionTitle")[0].childNodes[0].nodeValue; } catch (err) {sessionTitle = "";}
				presentationOrderAr.push (records[i].getElementsByTagName("presentationOrder")[0].childNodes[0].nodeValue);	
				submissionTitleAr.push (records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue);	
				submissionAuthorsAr.push (records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue);	
			} else if (sessionCategory == 'Keynote' || sessionCategory == 'Panel' || sessionCategory == 'Tutorial') {
				try {submissionTitle = ': '+records[i].getElementsByTagName("submissionTitle")[0].childNodes[0].nodeValue; } catch (err) {sessionTitle = "";}
				try {submissionAuthors = '<b>Authors:</b> '+records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue; } catch (err) {submissionAuthors = "";}
			} else {
				try {submissionAuthors = '<b>Organizers:</b> '+records[i].getElementsByTagName("submissionAuthors")[0].childNodes[0].nodeValue; } catch (err) {submissionAuthors = "";}
				try {website = '<b>Website:</b> <a href="'+records[i].getElementsByTagName("website")[0].childNodes[0].nodeValue+'">'+records[i].getElementsByTagName("website")[0].childNodes[0].nodeValue+'</a>'; } catch (err) {website = "";}
			}
		}
	}
				
	if (sessionCategory == 'Keynote'|| sessionCategory == 'Panel' || sessionCategory == 'Tutorial') {
		txt = '<div class = "headerImp"><div class = "sessionNameImp">'+session+submissionTitle+'</div><a class="locationImp" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br><div class = "allPresentationsImp">'+submissionAuthors+'</div>';
	}
	else if (sessionCategory == 'Challenges' || sessionCategory == 'PhD' || sessionCategory == 'Research' || sessionCategory == 'Industrial' || sessionCategory == 'Demo') {
		var presentations = '';			
		for (j=0; j<presentationOrderAr.length; j++){
			presentations += '<p class = "presentationNameImp">Presentation # '+presentationOrderAr[j]+'</p><p><b>Title:</b> "'+submissionTitleAr[j]+'"</p><p><b>Authors:</b> '+submissionAuthorsAr[j]+'</p>';
		}		
		txt ='<div class = "headerImp"><div class = "sessionNameImp">'+session+sessionTitle+'</div><a class="locationImp" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br><div class = "allPresentationsImp">'+presentations+'</div>';
	} 
	else {
		txt = '<div class = "headerImp"><div class = "sessionNameImp">'+session+'</div><a class="locationImp" href="rooms.html#'+roomId(loc)+'">('+loc+')</a></div><br><div class = "allPresentationsImp"><p>'+submissionAuthors+'</p><p>'+website+'</p></div>';	
	}
	addToCalendar(session,loc);
};

function addToCalendar(eventName,loc){
	var startTime = new Array();
	var endTime = new Array();
	for (i=0; i<records.length; i++){
		if (records[i].getElementsByTagName("sessionName")[0].childNodes[0].nodeValue == eventName){
			startTime.push(records[i].getElementsByTagName("startDate")[0].childNodes[0].nodeValue);
			endTime.push(records[i].getElementsByTagName("endDate")[0].childNodes[0].nodeValue);
		}
	}
	var start = parsingDate(startTime[0]);
	var end = parsingDate(endTime[0]);
	
	function mycallbackform(v,m,f){
		if (v!=2){
			addToLocalCalendar(eventName, startTime[0], endTime[0], loc);
			return false;
		} return true;					
	}
			
	$.prompt(txt,{
		submit: mycallbackform,
		buttons: {"Add to my calendar": '1', "Close": '2' },
		show:'slideDown'
	});
						
	$(document).ready(function() {
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

	