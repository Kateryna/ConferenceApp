function getDoc(nameDoc,tagName){
xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET","app/"+nameDoc, false);
xmlhttp.send();
programDoc = xmlhttp.responseXML;
//console.log(tagName);
var allRecords = programDoc.getElementsByTagName(tagName);
return allRecords;
};


//Function for table creation about authores
function makeTable(buf, row, col, cell, tableId) {
	var COLS = col;
	var ROWS = row;
	
	buf += "<div align='center'><table id='"+tableId+"' style='bordborder-collapse:collapse;table-layout:fixed;width:90%'>";
	buf +="<tr class='date'><td><a name='A'>A</a></td></tr>";
	for ( var i = 0; i < ROWS; i++) {
		
		var row = "<tr id='article" + i + tableId+"'>";
		var anch=cell[i].split("");
		anch[0];
		for ( var j = 0; j < COLS; j++) {
					
			row += "<td class='sessionFirstTypeList'><a onclick='getAbstract("
					+ i +","+tableId+ ")'><div>" + cell[i] + "</div></a></td>";
		}
		row += "</tr>";
		
			if ((i+1)!=ROWS){		
				var nextAnch=cell[i+1].split("");
			//	console.log("anchor "+anch+nextAnch);
					if (nextAnch[0]!=anch[0]){
			//			console.log("not equal");
						row += "<tr class='date'><td><a name='"+nextAnch[0]+"'>"+nextAnch[0]+"</a></td></tr>";
					}
			}
				buf += row;
	}
	buf += "</table><br></div>";

	return buf;
};

function fastMakeTable(buf, row, col, cell, tableId) {
	var COLS = col;
	var ROWS = row;

	buf += "<div align='center'><table id='"+tableId+"' style='bordborder-collapse:collapse;table-layout:fixed;width:90%'>";
	for ( var i = 0; i < ROWS; i++) {
		var row = "<tr id='article" + i + tableId+"'>";
		for ( var j = 0; j < COLS; j++) {
			row += "<td class='sessionFirstTypeList'><a onclick='getAbstract("
					+ i +","+tableId+ ")'><div>" + cell[i] + "</div></a></td>";
		}
		row += "</tr>";

		buf += row;
	}
	buf += "</table><br></div>";

	return buf;
};

function roomId(roomName){
//console.log("room id " + roomName);
var roomid;

switch (roomName) {
case "Grand Crescent":
		roomid = "grandCrescent";
		break;
case "Grand 1":
		roomid = "grand1";
		break;
case "Grand 2":
		roomid = "grand2";
		break;
case "Grand 3":
		roomid = "grand3";
		break;
case "Cascade 1":
		roomid = "cascade";
		break;
case "Cascade 2":
		roomid = "cascade";
		break;		
case "Cascade 1 & 2":
		roomid = "cascade";
		break;
		
case "Vashon":
		roomid = "vashon";
		break;
case "Fifth Avenue":
		roomid = "fifthAvenueRoom";
		break;
case "Not defined":
		roomid = "hello";
		break;
		
}
return roomid;
console.log("room id " + roomid);

}

			
function parsingDate(dateData){
	dateString=dateData.replace(/ /g, "/").replace(/:/g,"/");
	var d = dateString.split("/",7);
	var hours=parseInt(d[3]);
	
//	console.log(d);
	if ((d[6]=="PM")&&(hours!=12) )
	hours+=12;
	
	var date = new Date (d[2],d[0]-1,d[1],hours,d[4]);
//	console.log(date);
//alert("DATE "+date);
	return date;
// new Date = 
}	



function addToWebCalendar (){
/*
		var start = parsingDate(sTime);
		var end = parsingDate(eTime);
		if (sTime=="Not defined") start = parsingDate("8/30/2011 10:30:00 AM");
		if (eTime=="Not defined") end = parsingDate("8/30/2011 10:30:00 AM");
		try {start = parsingDate(sTime);}
		catch (err) { start = parsingDate("8/30/2011 10:30:00 AM");}
		try {end =  parsingDate(eTime);}
		catch (err) { end = parsingDate("9/2/2011 5:30:00 PM");}
*/	


$(document).ready(function() {
  
  $('.ibutton').AddToCal({
    // ical and vcal require an ics or vcs file to be served. 
    // Disable these features if reqired (as a result the 30boxes, iCal and vCalendar menu links will not appear)
    icalEnabled:false,
    vcalEnabled:false,
    getEventDetails: function( element ) {

 			var 
          dtstart_element = element.find('.dtstart'), start,
          dtend_element = element.find('.dtend'), end,
          title_element = element.find('.summary'), eName,
          location_element = element.find('.location'), loc,
        	details_element = element.find('.details'), details;
        
 			start = dtstart_element.length ? dtstart_element.html() : element.html();
	
         end = dtend_element.length ? dtend_element.html() : element.html();
			if (start=="Not defined") start="8/30/2011 10:30:00 AM";
			if (end=="Not defined") end="9/1/2011 5:30:00 PM";
   
        eName = title_element.length ? title_element.html() : element.html();
        loc = location_element.length ? location_element.html() : element.html();
        details = details_element.length ? details_element.html() : element.html();
        var estart = parsingDate(start);
        var eend = parsingDate(end);
        // in this demo, we attempt to get hCalendar attributes or otherwise just dummy the values

      // return the required event structure
      console.log("in function "+ eName+start+end+loc);
      return { 
        webcalurl: null,
        icalurl: null,
        vcalurl: null, 
        start: estart, 
        end: eend, 
        title: eName, 
        details: details, 
        location: loc, 
        url: null
        };
    },
  });

});	

}
