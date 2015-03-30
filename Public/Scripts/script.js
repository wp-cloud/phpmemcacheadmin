/* phpMemcachedAdmin script.js */
/* global Chart: true, timeout: true */
Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
};

Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Verdana'
        }
    },
	global: {
	    useUTC: false
	}
});

function changeServer(obj) {
	if (obj.options[obj.selectedIndex].value != '') {
		window.location = 'index.php?server='
				+ obj.options[obj.selectedIndex].value;
	} else {
		window.location = 'index.php';
	}
}
function changeCluster(obj) {
	if (obj.options[obj.selectedIndex].value != '') {
		window.location = 'stats.php?cluster='
				+ obj.options[obj.selectedIndex].value;
	} else {
		window.location = 'stats.php';
	}
}
function show(target)
{
	var objects = document.getElementsByClassName(target);
	for(i = 0 ; i < objects.length ; i++){
		objects[i].style.display = '';
	}
}
function hide(target)
{
	var objects = document.getElementsByClassName(target);
	for(i = 0 ; i < objects.length ; i++){
		objects[i].style.display = 'none';
	}
}

function changeCommand(obj) {
	document.getElementById('request_key').value = '';
	document.getElementById('request_duration').value = '';
	document.getElementById('request_data').value = '';
	document.getElementById('request_delay').value = '';
	document.getElementById('request_value').value = '';
	var command = obj.options[obj.selectedIndex].value;
	var div_key = document.getElementById('div_key');
	var div_duration = document.getElementById('div_duration');
	var div_data = document.getElementById('div_data');
	var div_delay = document.getElementById('div_delay');
	var div_value = document.getElementById('div_value');
	if (command == 'get' || command == 'delete') {
		div_key.style.display = '';
		div_duration.style.display = 'none';
		div_data.style.display = 'none';
		div_delay.style.display = 'none';
		div_value.style.display = 'none';
	} else if (command == 'set') {
		div_key.style.display = '';
		div_duration.style.display = '';
		div_data.style.display = '';
		div_delay.style.display = 'none';
		div_value.style.display = 'none';
	} else if (command == 'flush_all') {
		div_key.style.display = 'none';
		div_duration.style.display = 'none';
		div_data.style.display = 'none';
		div_delay.style.display = '';
		div_value.style.display = 'none';
	} else if (command == 'increment' || command == 'decrement') {
		div_key.style.display = '';
		div_duration.style.display = 'none';
		div_data.style.display = 'none';
		div_delay.style.display = 'none';
		div_value.style.display = '';
	} else {
		div_key.style.display = 'none';
		div_duration.style.display = 'none';
		div_data.style.display = 'none';
		div_delay.style.display = 'none';
		div_value.style.display = 'none';
	}
}
function executeHideShow(target, input, force) {
	var object = document.getElementById(target);
	var input = document.getElementById(input);
	if ((object.style.display == "block") && (force != true))  {
		input.value = "Show Console";
		object.style.visibility = "hidden";
		object.style.display = "none";
	} else {
		object.style.visibility = "visible";
		object.style.display = "block";
		input.value = "Hide Console";
	}
}
function executeClear(target) {
	var object = document.getElementById(target);
	object.innerHTML = '';
}
function executeCommand(target, params) {
	if (params != null) {
		var request_url = 'commands.php?' + params;
		execute(request_url, target, true);
		return;
	}
	if (document.getElementById('request_command').value != '') {
		var request_url = 'commands.php?request_command='
				+ document.getElementById('request_command').value
				+ '&request_key='
				+ document.getElementById('request_key').value
				+ '&request_duration='
				+ document.getElementById('request_duration').value
				+ '&request_data='
				+ document.getElementById('request_data').value
				+ '&request_delay='
				+ document.getElementById('request_delay').value
				+ '&request_value='
				+ document.getElementById('request_value').value
				+ '&request_server='
				+ document.getElementById('request_server').value
				+ '&request_api='
				+ document.getElementById('request_api').value;
		execute(request_url, target, true);
		return;
	}
}
function searchKey(target) {
	if (document.getElementById('search_key').value != '') {
		var request_url = 'commands.php?request_command=search'
				+ '&request_key=' + document.getElementById('search_key').value
				+ '&request_level=' + document.getElementById('search_level').value
				+ '&request_more=' + document.getElementById('search_more').value
				+ '&request_server='
				+ document.getElementById('search_server').value;
		execute(request_url, target, true);
	}
}
function executeTelnet(target) {
	if (document.getElementById('request_telnet').value != '') {
		var request_url = 'commands.php?request_command=telnet'
				+ '&request_telnet='
				+ document.getElementById('request_telnet').value
				+ '&request_server='
				+ document.getElementById('request_telnet_server').value;
		execute(request_url, target, true);
	}
}
function execute(url, target, append) {
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			onExecute(target, append);
		};
		req.open('GET', url, true);
		req.send(null);
	} else if (window.ActiveXObject) {
		req = new ActiveXObject('Microsoft.XMLHTTP');
		if (req) {
			req.onreadystatechange = function() {
				onExecute(target, append);
			};
			req.open('GET', url, true);
			req.send();
		}
	}
}
function onExecute(target, append) {
	if (req.readyState == 1) {
		document.getElementById('loading').style.visibility = "visible";
	} else if (req.readyState == 4) {
		document.getElementById('loading').style.visibility = "hidden";
		if (req.status == 200 || req.status == 304) {
			if (append == true) {
				var object = document.getElementById(target);
				object.innerHTML += req.responseText;
				object.scrollTop = object.scrollHeight;
			} else {
				var object = document.getElementById(target);
				object.innerHTML = req.responseText;
				object.scrollTop = object.scrollHeight;
			}
		}
	} else {
		document.getElementById('loading').style.visibility = "hidden";
	}
}
var server_id = 1;
var cluster_id = 1;
function addCluster() {
	var clusterDiv = document.createElement('div');
	cluster_id++;
	clusterDiv.innerHTML = '<hr/><strong>Cluster <input type="text" style="width:200px;" name="cluster[' + cluster_id + ']" value=""/></strong>'
            + '<div style="margin-left:30px;margin-top:3px;">'
            + '<div style="width:150px;float:left;">Name (Optional)</div>'
            + '<div style="width:150px;float:left;margin-left:7px;">IP/Hostname</div>'
            + '<div style="width:50px;float:left;margin-left:7px;">Port</div></div>'
			+ '<div style="margin-left:40px;margin-top:6px;" id="cluster_' + cluster_id + '_commands">'
            + '<a class="list button" href="javascript:addServer(' + cluster_id + ')">'
			+ 'Add New Server to Cluster</a> <a class="list" style="padding:1px 2px;-moz-border-radius:3px;-webkit-border-radius:3px;" '
			+ 'href="#" onclick="deleteServerOrCluster(\'cluster_' + cluster_id + '\')">Delete Cluster</a></div><br/>';
	clusterDiv.setAttribute('id', 'cluster_' + cluster_id);
	document.getElementById('server_form').appendChild(clusterDiv);
	addServer(cluster_id);
}
function addServer(current_cluster_id) {
	var serverDiv = document.createElement('div');
	server_id++;
	serverDiv.innerHTML = '<div style="margin-left:30px;margin-top:3px;">'
			+ '<input type="text" style="width:150px;" name="server[' + current_cluster_id + '][' + server_id + '][name]"'
			+ '		  value="" id="name_' + server_id + '" onchange="nameOnChange(' + server_id + ') onKeyUp="hostOrPortOnChange(' + server_id + ')""/> '
			+ '<input type="text" style="width:150px;" name="server[' + current_cluster_id + '][' + server_id + '][hostname]"'
			+ '       value="hostname" id="host_' + server_id + '" onfocus="hostOnFocus(this)" onblur="hostOnBlur(this)" onchange="hostOrPortOnChange(' + server_id + ')"'
			+ '       onchange="hostOrPortOnChange(' + server_id + ')" onKeyUp="hostOrPortOnChange(' + server_id + ')" /> '
			+ '<input type="text" style="width:50px;" name="server[' + current_cluster_id + '][' + server_id + '][port]"'
			+ '       value="port" id="port_' + server_id + '" onfocus="portOnFocus(this)" onblur="portOnBlur(this) onchange="hostOrPortOnChange(' + server_id + ')"/> '
			+ '<a class="list button" style="padding:1px 2px;" href="#" onclick="deleteServerOrCluster(\'server_' + server_id + '\')">Delete</a>' + '</div>';
	serverDiv.setAttribute('id', 'server_' + server_id);
	document.getElementById('cluster_' + current_cluster_id).insertBefore(serverDiv, document.getElementById('cluster_' + current_cluster_id + '_commands'));
}
function deleteServerOrCluster(divID) {
	var div = document.getElementById(divID);
	div.parentNode.removeChild(div);
}
function nameOnChange(target) {
	portObject = document.getElementById('port_' + target);
	portObject.setAttribute("onchange", "return false;");
	hostObject = document.getElementById('host_' + target);
	hostObject.setAttribute("onchange", "return false;");
}
function hostOnFocus(object) {
	if (object.value == 'hostname') {
		object.value = '';
	}
}
function hostOnBlur(object) {
	if (object.value == '') {
		object.value = 'hostname';
	}
}
function hostOnChange(target) {
	document.getElementById(target);
	if (object.value == '') {
		object.value = 'port';
	}
}
function portOnFocus(object) {
	if (object.value == 'port') {
		object.value = '';
	}
}
function portOnBlur(object) {
	if (object.value == '') {
		object.value = 'port';
	}
}
function hostOrPortOnChange(target) {
	
	nameObject = document.getElementById('name_' + target);
	hostObject = document.getElementById('host_' + target);
	portObject = document.getElementById('port_' + target);
	if ((nameObject.value == '') || ((nameObject.value != hostObject.value + ':' + portObject.value))) {
		nameObject.value = hostObject.value + ':' + portObject.value;
	}
}
function ajax(url, target) {
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			ajaxDone(target);
		};
		req.open("GET", url, true);
		req.send(null);
	} else if (window.ActiveXObject) {
		req = new ActiveXObject('Microsoft.XMLHTTP');
		if (req) {
			req.onreadystatechange = function() {
				ajaxDone(target);
			};
			req.open("GET", url, true);
			req.send();
		}
	}
	setTimeout("ajax(page, 'stats')", timeout);
}
function ajaxDone(target) {
	if (req.readyState == 4) {
		if (req.status == 200 || req.status == 304) {
			results = req.responseText;
			document.getElementById(target).innerHTML = results;
		} else {
			document.getElementById(target).innerHTML = "Loading stats error : "
					+ req.statusText;
		}
	}
}