// Scrolls for each list
var callScroll = null;
var personScroll = null;
var deviceScroll = null;
var selectScroll = null;
var messageThreadScroll = null;
var messageScroll = null;

//Default list (inflated at the beginning)
var people = [];
var devices = [];
var calls = [];
var groups = [];
var users = [];
var messageThreads = [];
var messages = [];
var threadlist = [];
var clients = [];

// Filtered lists for each object
var filterPeople = [];
var filterDevices = [];
var filterCalls = [];
var filterSelect = [];
var filterGroups = [];
var filterUsers = [];
var filterMessageThreads = [];
var filterMessages = [];

// Tags to filter on
var filterPersonTags = [];
var filterDeviceTags = [];
var filterCallTags = [];
var filterGroupTags = [];
var filterUserTags = [];
var filterMessageTags = [];

// Default res MDPI
var res = 'hdpi';

// Holds last nav element
var lastElement = [];
var lastFooter = [];
var lastTitle = [];
var currentSelection = null;

var toLoad = [];
var refreshAll = false;

// Should show as a button
var callReferenceTags = {'PERSON_ID':'person', 'DEVICE_ID':'device', 'GROUP_ID':'group', 'USER_ID':'user', 'MESSAGE_ID':'messageThread'};
var personReferenceTags = {'GROUP_ID':'group'};
var deviceReferenceTags = {'PRIMARY_USER':'person', 'GROUP_ID':'group', 'CLIENT_ID':'client'};
var groupReferenceTags = {'PARENT_GROUP':'group', 'CLIENT_ID':'client'};
var userReferenceTags = {'GROUP_ID':'group', 'CLIENT_ID':'client'};
var messageReferenceTags = {'REPLY_TO':'message', 'SOURCE_ID':'user'};

var multilineTags = ['MESSAGE'];

// References that are required to have
var callRequiredTags = ['USER_ID', 'GROUP_ID'];
var personRequiredTags = ['GROUP_ID'];
var deviceRequiredTags = ['GROUP_ID'];

// Should not allow edit
var callDisabledTags = [ 'CALL_ID', 'MESSAGE_ID', 'HEADER'];
var personDisabledTags = ['PERSON_ID'];
var deviceDisabledTags = ['DEVICE_ID'];
var groupDisabledTags = ['GROUP_ID'];
var messageDisabledTags = ['MESSAGE_ID'];
var userDisabledTags = ['USER_ID'];

document.addEventListener("deviceready", onDeviceReady, false);

function checkRes(){
	var ratio = window.devicePixelRatio;
	
	if (ratio > 1.5){
		res = "xhdpi";
	}
	
	$('.nav_arrow_detail img').each(function(){
		$(this).attr('src','images/' + res + '/arrow_back_normal.png');
	});
	
	$('.home_icon img').each(function(){
		$(this).attr('src','images/' + res + '/home_icon_normal.png');
	});
	
	$('#open_menu img').attr('src','images/' + res + '/menu_icon_normal.png');
	
	$('#create_object').attr('src','images/' + res + '/add_icon_normal.png');
	$('#refresh_list').attr('src','images/' + res + '/refresh_icon_normal.png');
}

function destroyScroll(){
	if (callScroll != null){
		callScroll.destroy();
		callScroll = null;
	}
	
	if (personScroll != null){
		personScroll.destroy();
		personScroll = null;
	}
	
	if (deviceScroll != null){
		deviceScroll.destroy();
		deviceScroll = null;
	}
	
	if (selectScroll != null){
		selectScroll.destroy();
		selectScroll = null;
	}
	
	if (messageThreadScroll != null){
		messageThreadScroll.destroy();
		messageThreadScroll = null;
	}
	
	if (messageScroll != null){
		messageScroll.destroy();
		messageScroll = null;
	}
}

function resetScroll(){
	if ($('#call_list').is(':visible')) callScroll = new iScroll('call_list', { vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true });
	if ($('#person_list').is(':visible')) personScroll = new iScroll('person_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true });
	if ($('#device_list').is(':visible')) deviceScroll = new iScroll('device_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true });
	if ($('#select_list').is(':visible')) selectScroll = new iScroll('select_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true });
	if ($('#message_thread_list').is(':visible')) messageThreadScroll = new iScroll('message_thread_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false });
	if ($('#message_list').is(':visible')) messageThreadScroll = new iScroll('message_thread_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false });
}

function showLists(filter, show, type){
	var tempCalls, tempPeople, tempDevices, tempSelect, tempMessages, tempMessageThreads;
	if (show == null) show = 'ALL';
	
	destroyScroll();
	
	if (show == 'select'){
		$('#select_item_list').children().hide();
		$('#select_item_list ul').children().hide();
	}else if (show == 'message'){
		$('#message_list div').hide().children('div').hide();
	}else if (show == 'messageThread'){
		$('#message_thread_list').children().hide();
		$('#message_thread_list div').children().hide();
	}else{
		$('.item_list').children().hide();
		$('.item_list ul').children().hide();
	}
	
	if (show == 'ALL' || show == 'call'){
		tempCalls = filter ? filterCalls : calls;
		if (tempCalls.length > 0){
			$('#call_list ul').show();
			$.each(tempCalls, function(id,call){
				$('#call_list ul li[id="call.' + getID('call',call) + '"]').show();
			});
		}
	}

	if (show == 'ALL' || show == 'person'){
		tempPeople = filter ? filterPeople : people;
		if (tempPeople.length > 0){
			$('#person_list ul').show();
			$.each(tempPeople, function(id,person){
				$('#person_list ul li[id="person.' + getID('person',person) + '"]').show();
			});
		}
	}

	if (show == 'ALL' || show == 'device'){
		tempDevices = filter ? filterDevices : devices;
		if (tempDevices.length > 0){
			$('#device_list ul').show();
			$.each(tempDevices, function(id,device){
				$('#device_list ul li[id="device.' + getID('device',device) + '"]').show();
			});
		}
	}
	
	if (show == 'message'){
		tempMessages = filter ? filterMessages : threadlist;
		if (tempMessages.length > 0){
			$('#message_list > div').show();
			$.each(tempMessages, function(id,message){
				$('#message_list div div[id="message.' + getID('message',message) + '"]').show();
			});
		}
	}
	
	if (show == 'messageThread'){
		tempMessageThreads = filter ? filterMessageThreads : messageThreads;
		if (tempMessageThreads.length > 0){
			$('#device_list div').show();
			$.each(tempMessageThreads, function(id,thread){
				$('#message_thread_list div ul[id="messageThread.' + getID('messageThread',thread) + '"]').show();
			});
		}
	}

	if (show == 'select'){
		tempSelect = filter ? filterSelect : [];
		if (tempSelect.length > 0){
			$('#select_list ul').show();
			$.each(tempSelect, function(id,item){
				$('#select_list ul li[id$=".' + getId(type,item) + '.select"]').show();
			});
		}
	}
	
	// Filter
	resetScroll();
}

function getInitialPath(tag){
	var path = 'images/' + res + '/' + tag +'_normal.png';
	return path;
}

function getAllPeople(){
	people = [];
	getAPI('people',function(response){
		// Add each to list
		$.each(response, function(index, person) {
			people.push(person);
        });

		// Set the filter to initial array
		filterPeople = people;
		
		// Create the filter tags
		if (people.length > 0){
			var person = people[0];
			for (var key in person){
				filterPersonTags.push(key);
			}
		}
		postLoad('people');
	}, function(response){
		alert(response);
	});
}

function getAllDevices(){
	devices = [];
	getAPI('devices',function(response){
		var deviceList = $('#device_list ul');
		// Add each to list
		$.each(response, function(index, device) {
			devices.push(device);
        });

		// Set the filter to initial array
		filterDevices = devices;
		
		if (devices.length > 0){
			var device = devices[0];
			for (var key in device){
				filterDeviceTags.push(key);
			}
		}
		
		postLoad('devices');
	}, function(response){
		alert(response);
	});
}

function getCurrentCalls(){
	calls = [];
	messages = [];
	messageThreads = [];
	getAPI('users/' + window.localStorage.getItem("currentUser") + '/calls',function(response){
		var callList = $('#call_list ul');
		
		
		// Add each to list
		$.each(response, function(index, call) {
			calls.push(call);
        });

		// Set the filter to initial array
		filterCalls = calls;
		
		if (calls.length > 0){
			var call = calls[0];
			for (var key in call){
				filterCallTags.push(key);
			}
		}
		postLoad('calls');
	}, function(response){
		alert(response);
	});
	
	getAPI('messages',function(response){
		messages = response;
		
		messageThreads = jQuery.grep(response, function(message,i){
			return (String(message['REPLY_TO']) == 'null');
		});

		// Set the filter to initial array
		filterMessageThreads = messageThreads;
		
		if (messageThreads.length > 0){
			var messageThread = messageThreads[0];
			for (var key in messageThread){
				filterMessageTags.push(key);
			}
		}
		postLoad('messages');
	}, function(response){
		alert(response);
	});
}

function getAllGroups(){
	groups = [];
	getAPI('groups',function(response){
		
		$.each(response, function(index, group) {
			groups.push(group);
        });

		// Set the filter to initial array
		filterGroups = groups;
		
		if (groups.length > 0){
			var group = groups[0];
			for (var key in group){
				filterGroupTags.push(key);
			}
		}
		postLoad('groups');
	}, function(response){
		alert(response);
	});
}

function getAllClients(){
	clients = [];
	getAPI('clients',function(response){
		$.each(response, function(index, client) {
			clients.push(client);
        });
		postLoad('clients');
	}, function(response){
		alert(response);
	});
}

function getAllUsers(){
	users = [];
	getAPI('users',function(response){
		
		$.each(response, function(index, user) {
			users.push(user);
        });

		// Set the filter to initial array
		filterUsers = users;
		
		if (users.length > 0){
			var user = users[0];
			for (var key in user){
				filterUserTags.push(key);
			}
		}
		postLoad('users');
	}, function(response){
		alert(response);
	});
}

function getLists(type){
	destroyScroll();
	if (type == null) {
		toLoad = ['groups','people','devices','messages','users', 'calls', 'clients'];
		refreshAll = true;
		getAllPeople();
		getAllDevices();
		getCurrentCalls();
		getAllGroups();
		getAllClients();
		getAllUsers();
	}
	else if (type == 'call'){
		$('#call_list > ul').empty();
		toLoad = ['messages','calls'];
		getCurrentCalls();
	}
	else if (type == 'person'){
		$('#person_list > ul').empty();
		toLoad = ['people'];
		getAllPeople();
	}
	else if (type == 'device'){
		$('#device_list > ul').empty();
		toLoad = ['devices'];
		getAllDevices();
	}
}

function postLoad(type){
	var i = $.inArray(type,toLoad);
	if (i > -1) toLoad.splice(i, 1);
	
	if (!toLoad.length){
		var list = $('#person_list > ul');
		if (!list.children().length || refreshAll){
			list.empty();
			$.each(people, function(index, person) {
				list.append('<li class="item" id="person.' + getID('person',person) +'"><p class="main_text">' + getDisplay('person',person) + '</p><p class="sub_text">' + getSubDisplay('person',person) + '</p></li>');
	        });
		}
		
		list = $('#device_list > ul');
		if (!list.children().length || refreshAll){
			list.empty();
			$.each(devices, function(index, device) {
				list.append('<li class="item" id="device.' + getID('device',device) +'"><p class="main_text">' + getDisplay('device',device) + '</p><p class="sub_text">' + getSubDisplay('device', device) + '</p></li>');
	        });
		}
		
		
		list = $('#call_list > ul');
		if (!list.children().length|| refreshAll){
			list.empty();
			$.each(calls, function(index, call) {
				list.append('<li class="item" id="call.' + getID('call',call) +'"><p class="main_text">' + getDisplay('call',call) + '</p><p class="sub_text">' + getSubDisplay('call',call) + '</p></li>');
	        });
		}
		
		$('message_thread_list > div').empty();
		refreshAll = false;
		resetScroll();
	}
}

function createFilterHTML(type, select){
	var filter = $('#filter_items');
	filter.empty();
	var temp = [];

	if (type == 'device'){
		temp = filterDeviceTags;
	}else if (type == 'person'){
		temp = filterPersonTags;
	}else if (type == 'call'){
		temp = filterCallTags;
	}else if (type == 'group'){
		temp = filterGroupTags;
	}else if (type == 'user'){
		temp = filterUserTags;
	}else if (type == 'message' || type == 'messageThread'){
		temp = filterMessageTags;
	}

	var form = $(document.createElement('form'));
	form.attr('class','standard_form');
	
	$.each(temp, function(i,key){
		var element = $(document.createElement('div'));
		element.append('<label for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
		if (key == 'name'){
			element.append('<input name="' + key + '" class="filters" type="text" id="filter.' + key + '" default="true">');
		}else{
			element.append('<input name="' + key + '" class="filters" type="text" id="filter.' + key + '">');
		}
		
		form.append(element);
	});
	filter.append(form);
	if (select == true){
		filter.attr('type',type + '.select');
	}else{
		filter.attr('type',type);
	}
	
}

function removeObject(type,id){
	if (type == 'call'){
		calls = jQuery.grep(calls, function(call,i){
			return (String(getID(type,call)) != id);
		});
	
	}else if (type == 'device'){
		devices = jQuery.grep(devices, function(device,i){
			return (String(getID(type,device)) != id);
		});
	}else if (type == 'person'){
		people = jQuery.grep(people, function(person,i){
			return (String(getID(type,person)) != id);
		});
	}
	
	var container = $('#' + type + '\\.' + id);
	if (container.length) {
		container.remove();
	}
}

function addObject(type, object){
	if (type == 'call'){
		calls.push(object);
		filterCalls = calls;
		$('#call_list ul').append('<li class="item" id="call.' + getID('call',object) +'"><p class="main_text">' + getDisplay('call',object) + '</p><p class="sub_text">' + getSubDisplay('call',object) + '</p></li>');
	}else if (type == 'person'){
		people.push(object);
		filterPeople = people;
		$('#person_list ul').append('<li class="item" id="person.' + getID('person',object) +'"><p class="main_text">' + getDisplay('person',object) + '</p><p class="sub_text">' + getSubDisplay('person',object) + '</p></li>');
	}else if (type == 'device'){
		devices.push(object);
		filterDevices = devices;
		$('#device_list ul').append('<li class="item" id="device.' + getID('device',object) +'"><p class="main_text">' + getDisplay('device',object) + '</p><p class="sub_text">' + getSubDisplay('device',object) + '</p></li>');
	}else if (type == 'message'){
		messages.push(object);
		filterMessages = messages;
		var item = object;
		var parent = getObject('message',item.REPLY_TO);
		var user = getObject('user',item.SOURCE_ID);
		var to = "";
		var from = "";
		if (parent != null) {
			var parentUser = getObject('user',parent.SOURCE_ID);
			if (parentUser != null) to = getDisplay('user',parentUser);
		}
		if (user != null) from = getDisplay('user',user);
		
		
        var message = $(document.createElement('div'));
        message.attr('id','message.' + getID(type,item));
        message.addClass('message_list_item');

        message.append('<ul class="message_list_item_closed open_message">' +
                '<li class="message_thread_title">' + item.HEADER + '</li>' +
                '<li class="message_thread_date">Not Set Up Yet</li>' +
                '</ul>' +
                '<div class="message_content">' +
                '<p><b>Subject: </b>' + item.HEADER + '</p>' +
                '<p><b>To: </b>' + to + '</p>' +
                '<p><b>From: </b>' + from + '</p>' +
                '<p>' + item.MESSAGE + '</p>' +
                '</div>' +
                '<div class="message_buttons">' + 
                '<ul>' + 
                '<li>Inflate To Call</li>' +
                '<li class="message_reply">Reply</li>' +
                '</ul>' +
                '</div>');
        $('#message_list > div').append(message);
	}else if (type == 'messageThread'){
		messageThreads.push(object);
		messages.push(object);
		filterMessageThreads = messageThreads;
		$('#message_thread_list > div').empty();
		
	}
}

function updateObject(type, object){
	if (type == 'call'){
		for (var call in calls){
			if (getID(type, calls[call]) == getID(type, object)){
				for (var prop in object){
					calls[call][prop] = object[prop];
				}
				break;
			}
		}
	}else if (type == 'person'){
		for (var person in people){
			if (getID(type, people[person]) == getID(type, object)){
				for (var prop in object){
					people[person][prop] = object[prop];
				}
				break;
			}
		}
	}else if (type == 'device'){
		for (var device in devices){
			if (getID(type, devices[device]) == getID(type, object)){
				for (var prop in object){
					devices[device][prop] = object[prop];
				}
				break;
			}
		}
	}else if (type == 'group'){
		for (var group in groups){
			if (getID(type, groups[group]) == getID(type, object)){
				for (var prop in object){
					groups[group][prop] = object[prop];
				}
				break;
			}
		}
	}else if (type == 'message'){
		for (var message in messages){
			if (getID(type, messages[message]) == getID(type, object)){
				for (var prop in object){
					messages[message][prop] = object[prop];
				}
				break;
			}
		}
	}else if (type == 'user'){
		for (var user in users){
			if (getID(type, users[user]) == getID(type, object)){
				for (var prop in object){
					users[user][prop] = object[prop];
				}
				break;
			}
		}
	}
}

function getObject(type, id){
	var item = null;
	if (type == 'call'){
		item = jQuery.grep(calls, function(call,i){
			return (String(getID(type,call)) == String(id));
		});
	}else if (type == 'device'){
		item = jQuery.grep(devices, function(device,i){
			return (String(getID(type,device)) == String(id));
		});
	}else if (type == 'person'){
		item = jQuery.grep(people, function(person,i){
			return (String(getID(type,person)) == String(id));
		});
	}else if (type == 'group'){
		item = jQuery.grep(groups, function(group,i){
			return (String(getID(type,group)) == String(id));
		});
	}else if (type == 'user'){
		item = jQuery.grep(users, function(user,i){
			return (String(getID(type,user)) == String(id));
		});
	}else if (type == 'messageThread'){
		item = jQuery.grep(messageThreads, function(messageThread,i){
			return (String(getID(type,messageThread)) == String(id));
		});
	}else if (type == 'message'){
		item = jQuery.grep(messages, function(message,i){
			return (String(getID(type,message)) == String(id));
		});
	}else if (type == 'client'){
		item = jQuery.grep(clients, function(client,i){
			return (String(getID(type,client)) == String(id));
		});
	}
	
	if (item != null && item.length) return item[0];
	else return null;
}

function getID(type,object){
	if (type == 'person'){
		return object.PERSON_ID;
	}else if (type == 'device'){
		return object.DEVICE_ID;
	}else if (type == 'call'){
		return object.CALL_ID;
	}else if (type == 'group'){
		return object.GROUP_ID;
	}else if (type == 'user'){
		return object.USER_ID;
	}else if (type == 'message' || type == 'messageThread'){
		return object.MESSAGE_ID;
	}else if (type == 'client'){
		return object.CLIENT_ID;
	}
}

function getSubDisplay(type, object){
    var subtext = " ";
    if (type == 'person'){
        var group = getObject('group',object.GROUP_ID);
        if (group != null) subtext = 'Group: ' + getDisplay('group', group);
    }else if (type == 'device'){
        var owner = getObject('person',object.PRIMARY_USER);
        if (owner != null) subtext = 'Owner: ' + getDisplay('person', owner);
        else{
            var group = getObject('group',object.GROUP_ID);
            if (group != null) subtext = 'Group: ' + getDisplay('group', group);
        }
    }else if (type == 'call'){
        var device = getObject('device',object.DEVICE_ID);
        if (device != null) subtext = 'Associated with: ' + getDisplay('device', device);
        else{
            var owner = getObject('person',object.PERSON_ID);
            if (owner != null) subtext = 'Associated with: ' + getDisplay('person', owner);
            else{
                var group = getObject('group',object.GROUP_ID);
                if (group != null) subtext = 'Group: ' + getDisplay('group', group);
            }
        }
    }else if (type == 'group'){
        var parent = getObject('group',object.PARENT_GROUP);
        if (parent != null) subtext = 'Parent Group: ' + getDisplay('group', group);
        else{
            var client = getObject('client',object.CLIENT_ID);
            if (client != null) subtext = 'Client: ' + getDisplay('client', client);
        }
    }else if (type == 'user'){
        var group = getObject('group',object.GROUP_ID);
        if (group != null) subtext = 'Group: ' + getDisplay('group', group);
    }

    return subtext;
}

function getDisplay(type,object){
	if (type == 'person'){
		var fname = ((String(object.FIRST_NAME) != 'null') ? object.FIRST_NAME : "");
		var lname = ((String(object.LAST_NAME) != 'null') ? object.LAST_NAME : "");
		
		if (fname != '' || lname != ''){
			return  fname + ' ' + lname
		}else{
			return "Unknown";
		}
	}else if (type == 'device'){
		var name = ((String(object.DEVICE_NAME) != 'null') ? object.DEVICE_NAME : "");
		if (name != ''){
			return name;
		}else return "Unknown";
	}else if (type == 'call'){
		var name = ((String(object.HEADER) != 'null') ? object.HEADER : "");
		if (name != ''){
			return name;
		}else return "Unknown";
	}else if (type == 'group'){
		var name = ((String(object.GROUP_NAME) != 'null') ? object.GROUP_NAME : "");
		if (name != ''){
			return name;
		}else return "Unknown";
	}else if (type == 'user'){
		var fname = ((String(object.FIRST_NAME) != 'null') ? object.FIRST_NAME : "");
		var lname = ((String(object.LAST_NAME) != 'null') ? object.LAST_NAME : "");
		
		if (fname != '' || lname != ''){
			return  fname + ' ' + lname
		}else{
			return "Unknown";
		}
	}else if (type == 'message' || type == 'messageThread'){
		var name = ((String(object.HEADER) != 'null') ? object.HEADER : "");
		if (name != ''){
			return name;
		}else return "Unknown";
	}else if (type == 'client'){
		var name = ((String(object.CLIENT_NAME) != 'null') ? object.CLIENT_NAME : "");
		if (name != ''){
			return name;
		}else return "Unknown";
	}
}

function checkAllowEdit(type, key){
	if (type == 'call'){
		return ($.inArray(key,callDisabledTags) == -1);
	}else if (type == 'device'){
		return ($.inArray(key,deviceDisabledTags) == -1);
	}else if (type == 'person'){
		return ($.inArray(key,personDisabledTags) == -1);
	}else if (type == 'user'){
		return ($.inArray(key,userDisabledTags) == -1);
	}else if (type == 'group'){
		return ($.inArray(key,groupDisabledTags) == -1);
	}else if (type == 'messageThread'){
		return ($.inArray(key,messageDisabledTags) == -1);
	}
	return true;
}

function checkDetailExists(type, id){
	var nextContainer = $('#' + type + '\\.' + id + '\\.detail');
	if (!nextContainer.length){
		nextContainer = inflateDetail(type,getObject(type,id));
		if (!nextContainer) {
			return null;
		}
	}
	return nextContainer;
}

function checkIsReference(type, key){
	var refType = null;
	if (type == 'call'){
		for (var reference in callReferenceTags){
			if (reference.toUpperCase().indexOf(key.toUpperCase()) >= 0){
				refType = callReferenceTags[reference];
				break;
			}
		}
	}else if (type == 'person'){
		for (var reference in personReferenceTags){
			if (reference.toUpperCase().indexOf(key.toUpperCase()) >= 0){
				refType = personReferenceTags[reference];
				break;
			}
		}
	}else if (type == 'device'){
		for (var reference in deviceReferenceTags){
			if (reference.toUpperCase().indexOf(key.toUpperCase()) >= 0){
				refType = deviceReferenceTags[reference];
				break;
			}
		}
	}else if (type == 'group'){
		for (var reference in groupReferenceTags){
			if (reference.toUpperCase().indexOf(key.toUpperCase()) >= 0){
				refType = groupReferenceTags[reference];
				break;
			}
		}
	}else if (type == 'user'){
		for (var reference in userReferenceTags){
			if (reference.toUpperCase().indexOf(key.toUpperCase()) >= 0){
				refType = userReferenceTags[reference];
				break;
			}
		}
	}else if (type == 'message'){
		for (var reference in messageReferenceTags){
			if (reference.toUpperCase().indexOf(key.toUpperCase()) >= 0){
				refType = messageReferenceTags[reference];
				break;
			}
		}
	}
	return refType;
}

function validateFields(type, object){
	var required = [];
	
	if (type == 'call') required = callRequiredTags;
	else if (type == 'device') required = deviceRequiredTags;
	else if (type == 'person') required = personRequiredTags;
	
	for (var key in object){
		var i = $.inArray(key,required);
		if (i > -1) required.splice(i, 1);
	}
	
	if (required.length){
		var missing = '';
		$.each(required, function(index, key) {
			missing = missing + '-' + key.replace(/_/g,' ').toUpperCase() + '\n';
		});
		alert('The following fields are required: \n' + missing);
		return false;
	}
	return true;
}

function preCreate(type, object, callback){ // Should be handled by the server
	if (type == 'call'){ // Create message first
		var message = {'HEADER':object.HEADER, 'MESSAGE': 'Initial message.', 'READ_STATUS': '0', 'SOURCE_ID':window.localStorage.getItem('currentUser')};
		makeAPI('messages', message, function(response){
			addObject('messageThread', response);
			object['MESSAGE_ID'] = getID('message',response);
			callback(object);
		},function(response){
			alert(response);
			callback(null);
		});
	}else{
		callback(object);
	}
}

function appendInitialValues(type, form, sourceObject){
	if (type == 'message'){
		var user = getObject('user',window.localStorage.getItem('currentUser'));
		form.find(':input[id$="REPLY_TO"]').attr('refID',getID('message', sourceObject)).attr('value',getDisplay('message', sourceObject)).attr('disabled','true');
		form.find(':input[id$="SOURCE_ID"]').attr('value',getDisplay('user',user)).attr('refID',getID('user', user)).attr('disabled','true');
	}
	return form;
}

function refreshList(type){
	getLists(type);
}

function createObjectForm(type, sourceObject){
	getTemplate(getURL(type), function(response){
		var newCont = $(document.createElement('div'));
		newCont.attr('class','main_container').attr('id',type +'.createForm.detail').hide();
		newCont.append('<div class="nav_arrow_detail"><img src="images/' + res + '/arrow_back_normal.png" title="Back"/></div>');
		newCont.append('<div class="home_icon"><img src="images/' + res + '/home_icon_normal.png" title="Dashboard"/></div>');
		newCont.append('<h2 class="detail_title">CREATE ' + type.toUpperCase() + '</h2>');
		
		var form = $(document.createElement('form'));
		form.attr('class','standard_form');
		
		for(var key in response){
			var element = $(document.createElement('div'));
			var refType = checkIsReference(type, key);
			
			if (refType != null){
				if (key != 'MESSAGE_ID'){
					element.append('<label class="button_label" for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
					element.append('<input name="' + key + '" type="button" value="<Not Specified>" id="' + type + '.createForm.' + key + '" refType = "' + refType + '" refID="" edit="true">');
				}else continue;
			}else{
				var value = '';
				if (key != (type.toUpperCase() + '_ID')){
					element.append('<label for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
					element.append('<input name="' + key + '" type="text" value="' + value + '" id="' + type +'.createForm.' + key + '">');
				}else continue;
				
			}
			form.append(element);
		}
		form = appendInitialValues(type, form, sourceObject);
		newCont.append(form);
		$('#main').append(newCont);
		navForward(newCont, ['edit'], 'CREATE ' + type.toUpperCase(), function(){
			$('#edit').find('.ui-btn-text').text('DONE');
			$('#delete').attr('disabled','true');
		})
	}, function(response){
		alert('Error contacting the server.');
	});
	
}

function replyMessage(id){
	createObjectForm('message', getObject('message',id));
}

function inflateMessageThreads(){
	var messageThreadList = $('#message_thread_list > div');
	if (messageThreadList.children().length > 0) return;
	for (var i=0; i < messageThreads.length; i++){
		var thread = messageThreads[i];
		var sender = "";
		var user = getObject('user',thread.SOURCE_ID);
		if (user != null) sender = getDisplay('user',user);
		messageThreadList.append('<ul class="message_thread_item" id="messageThread.' + getID('messageThread',thread) + '">' +
                '<li class="message_thread_title">' + thread.HEADER + '</li>' +
                '<li class="message_thread_date">' + 'NOT SET UP YET' + '</li>' +
                '<li class="message_thread_sender">' + sender + '</li>' +
                '</ul>');
	}
}

function inflateMessages(type, object){
	var messageList = $('#message_list > div');
	messageList.empty();
	threadlist = [object];
	
	var j = 0;
	while(j < threadlist.length){
		var temp = jQuery.grep(messages, function(message,i){
			return (String(message['REPLY_TO']) == String(getID(type, threadlist[j])));
		});
		
		for (var i = 0; i < temp.length; i++){
			threadlist.push(temp[i]);
		}
		
		j++;
	}
	
	 for (var i = 0; i < threadlist.length; i++){
		var item = threadlist[i];
		var parent = getObject('message',item.REPLY_TO);
		var user = getObject('user',item.SOURCE_ID);
		var to = "";
		var from = "";
		if (parent != null) {
			var parentUser = getObject('user',parent.SOURCE_ID);
			if (parentUser != null) to = getDisplay('user',parentUser);
		}
		if (user != null) from = getDisplay('user',user);
		
		
        var message = $(document.createElement('div'));
        message.attr('id','message.' + getID(type,item));
        message.addClass('message_list_item');

        message.append('<ul class="message_list_item_closed open_message">' +
                '<li class="message_thread_title">' + item.HEADER + '</li>' +
                '<li class="message_thread_date">Not Set Up Yet</li>' +
                '</ul>' +
                '<div class="message_content">' +
                '<p><b>Subject: </b>' + item.HEADER + '</p>' +
                '<p><b>To: </b>' + to + '</p>' +
                '<p><b>From: </b>' + from + '</p>' +
                '<p>' + item.MESSAGE + '</p>' +
                '</div>' +
                '<div class="message_buttons">' + 
                '<ul>' + 
                '<li>Inflate To Call</li>' +
                '<li class="message_reply">Reply</li>' +
                '</ul>' +
                '</div>');
        messageList.append(message);
	   }
	 
	 messageList.find('.open_message:last').removeClass('message_list_item_closed').addClass('message_list_item_open');
	 
	return $('#messages');
	
}

function inflateDetail(type, object){
		if (object == null) return null;
		if (type == 'messageThread') return inflateMessages(type, object);
	
		var newCont = $(document.createElement('div'));
		newCont.attr('class','main_container').attr('id',type +'.' + getID(type,object) + '.detail').hide();
		newCont.append('<div class="nav_arrow_detail"><img src="images/' + res + '/arrow_back_normal.png" title="Back"/></div>');
		newCont.append('<div class="home_icon"><img src="images/' + res + '/home_icon_normal.png" title="Dashboard"/></div>');
		newCont.append('<h2 class="detail_title">' + getDisplay(type,object) +'</h2>');
		
		var form = $(document.createElement('form'));
		form.attr('class','standard_form');
		
		for (var key in object){
			var element = $(document.createElement('div'));
			var refType = checkIsReference(type, key);
					
			if (refType != null){
				
				if (String(object[key]) == 'null'){
					element.append('<label class="button_label" for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
					element.append('<input name="' + key + '" type="button" value="<Not Specified>" id="' + type +'.' + getID(type,object) +'.' + key + '" refType = "' + refType + '" refID="" edit="false">');
				}else{
					var item = getObject(refType,object[key]);
					if (item != null){
						element.append('<label class="button_label" for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
						element.append('<input name="' + key + '" type="button" value="' + getDisplay(refType,item) + '" id="' + type +'.' + getID(type,object) +'.' + key + '" refType = "' + refType + '" refID="' + getID(refType,item) + '" edit="false">');
					}else{
						element.append('<label class="button_label" for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
						element.append('<input name="' + key + '" type="button" value="<Not Found>" id="' + type +'.' + getID(type,object) +'.' + key + '" refType = "' + refType + '" refID="" edit="false">');
					}
				}
			}else{
				var value = (String(object[key]) == 'null') ? '' : object[key];
				
				element.append('<label for="' + key + '" class="label">' + key.replace(/_/g,' ').toUpperCase() + ':</label>');
				element.append('<input name="' + key + '" type="text" class="disabled_field" value="' + value + '" id="' + type +'.' + getID(type,object) +'.' + key + '" disabled>');
			}
			form.append(element);
		};
		
		newCont.append(form);
		$('#main').append(newCont);
		return newCont;
}

function handleMenu(id){
	var footer  = $('#footer');
	var shown = footer.attr('shown');
	var container = $('#' + id);
	
	if (!container.is(":visible")){
		if (shown == "true"){
			var currentContainer = $('.footer_content:visible');
			footer.animate({bottom: '-' + currentContainer.outerHeight() + 'px'},500,function(){
				currentContainer.hide();
				footer.css('bottom','0px');
				container.show();
				footer.css('bottom', '-' + container.outerHeight() + 'px');
				footer.animate({bottom: '0px'},500);
				destroyScroll();
			});
		}else{
			container.show();
			footer.css('bottom', '-' + container.outerHeight() + 'px');
			footer.animate({bottom: '0px'},500);
			footer.attr('shown','true');
			destroyScroll();
		}
	}else{
		footer.animate({bottom: '-' + container.outerHeight() + 'px'},500,function(){
			container.hide();
			footer.css('bottom','0px');
		});
		footer.attr('shown','false');
		resetScroll();
	}
}

function popupSelectObject(type){
	var container = $('#select_object');
	var height = $(window).height();
	var width = $(window).width();
	
	var footer = $('.footer_content:visible');
    if (footer.length){ // Close Footer
    	handleMenu(footer.attr('id'));
    }
    $('.open_footer').hide();
	
	container.show().animate({width: width + 'px',
		height: height + 'px',
		top: '0',
		left: '0'}, 200, function(){
			showHideSpinner(true);
			$('#open_footer_filter').show();
			createFilterHTML(type, true);
			var list = $('#select_list ul');
			if (type == 'call'){
				$('#call_list li').each(function(){
					var $this = $(this);
					var id = $this.attr('id');
					$this.clone(false).attr('id',id + '.select').removeClass('item').addClass('selector').appendTo(list);
				});
			}else if (type == 'person'){
				$('#person_list li').each(function(){
				var $this = $(this);
				var id = $this.attr('id');
				$this.clone(false).attr('id',id + '.select').removeClass('item').addClass('selector').appendTo(list);
			});
			}else if (type == 'device'){
				$('#device_list li').each(function(){
					var $this = $(this);
					var id = $this.attr('id');
					$this.clone(false).attr('id',id + '.select').removeClass('item').addClass('selector').appendTo(list);
				});
			}else if (type == 'group'){
				$.each(groups, function(index, group) {
					var item = $(document.createElement('li'));
					item.addClass('selector').attr('id','group.' + getID('group',group) + '.select');
					item.append('<p class="main_text">' + getDisplay('group',group) + '</p><p class="sub_text">' + getSubDisplay('group',group) + '</p></li>');
					item.appendTo(list);
		        });
			}else if (type == 'client'){
				$.each(clients, function(index, client) {
					var item = $(document.createElement('li'));
					item.addClass('selector').attr('id','client.' + getID('client',client) + '.select');
					item.append('<p class="main_text">' + getDisplay('client',client) + '</p><p class="sub_text">' + getSubDisplay('client',client) + '</p></li>');
					item.appendTo(list);
		        });
			}else if (type == 'user'){
				$.each(users, function(index, user) {
					var item = $(document.createElement('li'));
					item.addClass('selector').attr('id','user.' + getID('user',user) + '.select');
					item.append('<p class="main_text">' + getDisplay('user',user) + '</p><p class="sub_text">' + getSubDisplay('user',user) + '</p></li>');
					item.appendTo(list);
		        });
			}
			list.show();
			$('#select_list li').show();
			resetScroll();
			showHideSpinner(false);
		});
}

function navForward(container,footers,title,callback){
	var current = $('div[class$="_container"]:visible');
	lastElement.push(current);
	lastTitle.push($('#title p').text());
	$('#title p').text(title);
	
	var currentFooter = [];
	$('.open_footer:visible').each(function(){
		var id = $(this).attr('id').split('_');
		currentFooter.push(id[2]);
	});
	lastFooter.push(currentFooter);
	
	var footer = $('.footer_content:visible');
    if (footer.length){ // Close Footer
    	handleMenu(footer.attr('id'));
    }
    $('.open_footer').hide();
    
    $('#search_header').slideUp('fast',function(){
        $('div[class$="_container"]').filter(function(){ return ! $(this).is(":hidden"); })
        .hide('slide', {direction: 'left'}, 300, function(){
    		$(container).show('slide', {direction: 'right'}, 500);
    		
    		if ($.inArray('menu',footers) > -1){
    			$('#open_footer_main').show();
    		}
    		
    		if ($.inArray('filter',footers) > -1){
    			$('#open_footer_filter').show();
    		}
    		
    		if ($.inArray('edit',footers) > -1){
    			$('#open_footer_edit').show();
    		}
    		
    		if (callback != null) callback();
    		
    	});
    });
}

function navBack(callback){
	$('.open_footer').hide();
	parent = lastElement.pop();
	var footers = lastFooter.pop();
	$('#title p').text(lastTitle.pop());
	
	var list = $('div[id$="_list"]:visible');
	if (list.length) {
		destroyScroll();
	}
	
	$('div[class$="_container"]').filter(function(){ return ! $(this).is(":hidden"); })
    .hide('slide', {direction: 'right'}, 300, function(){
		parent.show('slide', {direction: 'left'}, 500, function(){
			if (parent.attr('id') == 'dashboard_content') {
				var _class = parent.find('tr:first').attr('class');
				if (_class == 'menu_items_search'){
					$('#open_footer_main').show();
					$('#search_header').slideDown('fast');
					showLists(true, null);
				}else if (_class == 'menu_enlarged_search' || _class == 'menu_enlarged'){
					createFilterHTML($('.menu_icon:visible').attr('id'));
					$('#open_footer_filter').show();
					$('#open_footer_main').show();
					parent.find('td:visible:first').attr('id');
					showLists(true, parent.find('td:visible:first').attr('id'));
				}else{
					$('#open_footer_main').show();
					$('#search_header').slideDown('fast');
				}
	    	}else{
	    		if ($.inArray('menu',footers) > -1){
	    			$('#open_footer_main').show();
	    		}
	    		
	    		if ($.inArray('filter',footers) > -1){
	    			$('#open_footer_filter').show();
	    		}
	    		
	    		if ($.inArray('edit',footers) > -1){
	    			$('#open_footer_edit').show();
	    		}
	    	}

			if (callback != null) callback();
		});
	});
}

function hidePopup(){
	$('.open_footer').hide();
	var popup = $('.popup_container:visible');
	var parent = $('div[class$="_container"]:visible');
	
	if (popup.attr('id') == 'select_object'){
		var list = popup.find('ul');
		destroyScroll();
		list.empty();
		list.hide();
	}
	
	popup.animate({width: '10px',
		height: '10px',
		top: '50%',
		left: '50%',
		marginTop: '-5px',
		marginLeft: '-5px'},200, function(){
			$(this).hide();
			$('#open_footer_edit').show();
		});
}

function backKeyDown() { 
	var footer = $('.footer_content:visible');
	var popup = $('.popup_container:visible');
	var edit = $('#edit');
    if (footer.length){ // Close Footer
    	handleMenu(footer.attr('id'));
    }else if (popup.length){
    	hidePopup();
    }else if (edit.find('.ui-btn-text').text() != 'EDIT') {
    	edit.trigger('click');
    }else if(lastElement.length > 0){
    		navBack();
    }else{
    	// Return to default layout
    	var _class = $('#menu').attr('class');
    	if (_class == 'menu_enlarged_search' || _class == 'menu_enlarged'){
    		$('.menu_icon:visible img').trigger('click');
    	}else if (_class == 'menu_items_search'){
    		$('.exit_icon').trigger('vclick');
    	}else{
    		logout();
    	}
    }
    return false;
}

function logout(){
	navigator.notification.confirm(
	        'Are you sure you want to logout?',  // message
	        onConfirm,              // callback to invoke with index of button pressed
	        'Exiting',            // title
	        'No,Yes'          // buttonLabels
	    );
}

function onDeleteItem(button){
	var container = $('div[id$="\\.detail"]:visible:first');
	var ids = container.attr('id').split('.');
	
	if (ids[1] == 'createForm') return false;
	
	switch(button){
	case 3://Yes
		deleteAPI(getURL(ids[0], ids[1]), function(response){
			navigator.notification.alert('Successfully deleted!',function(){
				$('#edit').find('.ui-btn-text').text('EDIT');
				if ($('#edit').is(':visible')) $('#open_footer_edit').trigger('vclick');
				removeObject(ids[0],ids[1]);
				if (lastElement.length > 0){
		    		navBack(function(){
						container.remove();
					});
			    }
			}, 'Success');
		},function(response){
			alert(response);
		});
		break;
	}
}

function onSaveItem(button){
	var container = $('div[id$="\\.detail"]:visible:first');
	var ids = container.attr('id').split('.');
	
	switch(button){
	case 2: //No

		$('#edit').find('.ui-btn-text').text('EDIT');
		if ($('#edit').is(':visible')) $('#open_footer_edit').trigger('vclick');
		
		if (ids[1] == 'createForm'){
			$('#delete').removeAttr('disabled');
			if (lastElement.length > 0){
	    		navBack(function(){
					container.remove();
				});
		    }
		}else{
			var object = getObject(ids[0], ids[1]);
			
			container.attr('id','old');
			var newCont = inflateDetail(ids[0],object);
			container.hide('fast',function(){
				newCont.show();
				container.remove();
			});
		}
		break;
	case 3: // Yes
		var fields = container.find('.standard_form div');
		var object = {};
		fields.each(function(){
			var input = $(this).find(':input');
			var id = input.attr('id');
			var item = id.split('.'); // type_id_key
			var value = null;
			
			if (input.attr('type') == 'text'){
				var value = input.attr('value');
			}else if (input.attr('type') == 'button'){
				var value = input.attr('refID');
			}
			
			if (value != null && value != ""){
				object[String(item[2])] = value;
			}
		});
		if (!validateFields(ids[0], object)) return;
		if (ids[1] == 'createForm'){
			preCreate(ids[0], object, function(object){
				if (object == null) return;
				makeAPI(getURL(ids[0]), object, function(response){
					navigator.notification.alert('Successfully created!',function(){
						container.find(':input[type="text"]').attr('disabled','true').css('background','#d2cfcc');
						container.find(':input[type="button"]').attr('edit','false').removeAttr('disabled');
						$('#edit').find('.ui-btn-text').text('EDIT');
						if ($('#edit').is(':visible')) $('#open_footer_edit').trigger('vclick');
						addObject(ids[0], response);
						if (lastElement.length > 0){
				    		navBack(function(){
								container.remove();
							});
					    }
					}, 'Success');
				},function(response){
					alert(response);
				});
			});
			
		}else{
			putAPI(getURL(ids[0], ids[1]), object, function(response){
				navigator.notification.alert('Successfully saved!',function(){
					container.find(':input[type="text"]').attr('disabled','true').css('background','#d2cfcc');
					container.find(':input[type="button"]').attr('edit','false').removeAttr('disabled');
					$('#edit').find('.ui-btn-text').text('EDIT');
					if ($('#edit').is(':visible')) $('#open_footer_edit').trigger('vclick');
					updateObject(ids[0], object);
				}, 'Success');
			},function(response){
				alert(response);
			});
		}
		break;
	}
	
	
	
	
}

function onConfirm(button){
	switch(button){
	case 2: //YES
		window.location = 'login.html';
		break;
	}
}


function showHideSpinner(show){
	var spinner = $('#spinner_container');
	spinner.css('width',window.innerWidth);
	spinner.css('height',window.innerHeight);
	
	if (show){
		  spinner.css('visibility','visible');
	}else{
		spinner.css('visibility','hidden');
	}
}

function withinElement(element, x, y){
	var offset = element.offset();
	if (x > offset.left && x < (offset.left + element.width())){
		if (y > offset.top && y < (offset.top + element.height())){
			return true;
		}
	}
	
	return false;
}

$.fn.draggs = function() {
	  var offset = null;
	  var item = null;
	  var menu = $('#drag_menu');
	  var addNew = $('#create_object');
	  var refresh = $('#refresh_list');
	  var start = function(e) {
		var orig = e.originalEvent;
		var mainItem = $(this);
	    var pos = mainItem.position();
		item = $('#drag');
		item.find('img').attr('src',mainItem.attr('src')).attr('id',mainItem.attr('id').replace('icon','drag'));
		item.css({left:orig.changedTouches[0].pageX - (mainItem.width()/2), top:orig.changedTouches[0].pageY - (mainItem.height()/2)});
	    offset = {
	      x: (mainItem.width()/2),
	      y: (mainItem.height()/2)
	    };
	  };
	  var stop = function(e){
		  e.preventDefault();
		  var within = null;
		  var orig = e.originalEvent;
		  var endX = orig.changedTouches[0].pageX;
		  var endY = orig.changedTouches[0].pageY;
		  
		  if (withinElement(addNew,endX,endY)){
			  within = addNew;
		  }else if (withinElement(refresh, endX, endY)){
			  within = refresh;
		  }
		  
		  item.hide();
		  menu.hide('slide', {direction: 'down'}, 200,function(){
			  if (within != null) {
				  if (within.attr('id') == 'create_object'){
					  createObjectForm(item.find('img').attr('id').replace('_drag',''));
				  }else if (within.attr('id') == 'refresh_list'){
					  refreshList(item.find('img').attr('id').replace('_drag',''));
				  }
			  }
		  });
		  
		  
	  }
	  var moveMe = function(e) {
	    e.preventDefault();
	    if (!item.is(':visible')) item.show();
	    if (!menu.is(':visible')) menu.show('slide', {direction: 'down'}, 200);
	    var orig = e.originalEvent;
	    var newTop, newLeft;
	    var $this = item;
	    var height = $(window).height();
	    var width = $(window).width();
	    newTop = orig.changedTouches[0].pageY - offset.y;
	    newLeft = orig.changedTouches[0].pageX - offset.x;
	    if (newTop < 0){
	    	newTop = 0;
	    }

	    if (newLeft < 0){
	    	newLeft = 0;
	    }
	    
	    if (((newTop + $this.height()) > height) || ((newLeft + $this.width()) > width)){
	    	return;
	    }
	    
	    $this.css({
	      top: newTop,
	      left: newLeft
	    });
	    
	    if (withinElement(addNew,orig.changedTouches[0].pageX,orig.changedTouches[0].pageY)){
	    	addNew.attr('src',addNew.attr('src').replace('normal','selected')).attr('over', 'true');
	    }else{
	    	if (addNew.attr('over') == 'true') { addNew.attr('src',addNew.attr('src').replace('selected','normal')).removeAttr('over'); }
	    }
	    
	    if (withinElement(refresh,orig.changedTouches[0].pageX,orig.changedTouches[0].pageY)){
	    	refresh.attr('src',refresh.attr('src').replace('normal','selected')).attr('over', 'true');
	    }else{
	    	if (refresh.attr('over') == 'true') { refresh.attr('src',refresh.attr('src').replace('selected','normal')).removeAttr('over'); }
	    }
	  };
	  this.bind("touchstart", start);
	  this.bind("touchmove", moveMe);
	  this.bind("touchend", stop);
	};

function onDeviceReady(){
	document.addEventListener("backbutton", backKeyDown, true);
	$(document).ajaxStart(function(){
		showHideSpinner(true);
	}).ajaxStop(function(){
		showHideSpinner(false);
	});
	checkRes();
	
	$('#spinner_container').click(function(e){
		e.stopPropagation();
		return false;
	});
	
	$('#create_object').mouseover(function(){
		var src = $(this).attr('src');
		$(this).attr('src',src.replace('normal','selected'));
	}).mouseout(function(){
		var src = $(this).attr('src');
		$(this).attr('src',src.replace('selected','normal'));
	});
	
	$('#footer').live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		e.stopPropagation();
	});
	
	$('.open_footer').live('vmousedown',function(){
		$(this).css('background','#A3A3A3');
	}).live('vmouseup',function(){
		$(this).css('background','#CCCCCC');
	})
	
	$('.open_footer').live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		handleMenu($(this).attr('id').replace('open_',''));
		e.stopPropagation();
		return false;
	});
	
	$('.message_thread_item').live('vmousedown',function(e){
		var id= $(this).attr('id');
		$('.message_thread_item[id!="' + id + '"]').css('background','#ffffff');
		$(this).css('background','#cccccc');
	}).live('vmouseup',function(){
		$(this).css('background','#ffffff');
	}).live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		var id = $(this).attr('id').split('.');
		var message = getObject('messageThread',id[1]);
		if (message != null){
			inflateMessages('message',message);
			navForward($('#messages'),['filter'], 'MESSAGES', function(){
				var height = $('#messages').innerHeight() - 100;
				var list = $('#message_list');
				list.css('maxHeight', height + 'px');
				list.show().children().show();
	            list.children('div').children('div:last').find('div').show();
				messageScroll = new iScroll('message_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false});
				messageScroll.scrollTo(0, messageScroll.maxScrollY, 0);
			});
		}
		e.stopPropagation();
		
	});
	
	$('.open_message').live('vmousedown',function(e){
		var id= $(this).parent().attr('id');
		$('.message_list_item[id!="' + id + '"] .open_message').css('background','#ffffff');
		$(this).css('background','#cccccc');
	}).live('vmouseup',function(){
		$(this).css('background','');
	}).live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		var $this = $(this);
		destroyScroll();
		if($this.hasClass('message_list_item_open')){
			$this.removeClass('message_list_item_open');
			$this.addClass('message_list_item_closed');
			$this.siblings('div').hide();
			messageScroll = new iScroll('message_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false});
			
		}else{
			$this.removeClass('message_list_item_closed');
			$this.addClass('message_list_item_open');
			$this.siblings('div').show();
			messageScroll = new iScroll('message_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false});
			
		}
		
	});
	
	$('#search_icon').click(function(e){
		if (e.isPropagationStopped()) return;
		var footer = $('.footer_content:visible');
		if (footer.length) handleMenu(footer.attr('id'));
		
		window.plugins.barcodeScanner.scan( function(result) {
            if (!result.cancelled){
            	if (result.text != null && result.text.indexOf('.') > 0){
            		var item = result.text.split('.');
            		var container = checkDetailExists(item[0],item[1]);
            		if (!container) {
            			alert('You may not have access to the object.');
            			return false;
            		}else{
            			navForward(container,['edit'], item[0].toUpperCase());
            		}
            	}else{
            		navigator.notification.alert('Barcode could not be read. Please try again.','Failed');
            	}
            }
            
        }, function(error) {
            alert("Scanning failed: " + error);
        });
	});
	
	$('#message_icon').click(function(e){
		if (e.isPropagationStopped()) return;
		var footer = $('.footer_content:visible');
		if (footer.length) handleMenu(footer.attr('id'));
		$('#search_header').slideUp('fast',function(){
			inflateMessageThreads();
			createFilterHTML('messageThread');
			navForward($('#message_thread'),['filter'], 'MESSAGE THREADS', function(){
				var height = $('#message_thread').innerHeight() - 100;
				var thread = $('#message_thread_list');
				thread.css('maxHeight', height + 'px');
				thread.show().children().show();
				messageThreadScroll = new iScroll('message_thread_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false});
			});
		});
		
	});
	
	$('#note_icon').click(function(e){
		if (e.isPropagationStopped()) return;
		var footer = $('.footer_content:visible');
		if (footer.length) handleMenu(footer.attr('id'));
		$('#search_header').slideUp('fast',function(){
			navForward($('#messages'),['filter'], 'MESSAGES', function(){
				var height = $('#messages').innerHeight() - 100;
				var list = $('#message_list');
				list.css('maxHeight', height + 'px');
				list.show().children().show();
				list.find('.message_content:last').show();
				messageScroll = new iScroll('message_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false});
				messageScroll.scrollTo(0, messageScroll.maxScrollY, 0);
			});
		});
		
		e.stopPropagation();
		
	});
	
	$('.footer_icon img').each(function(){
		var $this = $(this);
		var tag = $this.attr('id');
		
		// initialize image
		$this.attr('src',getInitialPath(tag));
		
		// selector
		$this.live('vmousedown',function(){
			var src = $this.attr('src');
			$this.attr('src', src.replace('normal','selected'));
		}).live('vmouseup', function(){
			var src = $this.attr('src');
			$this.attr('src', src.replace('selected','normal'));
		});
	});
	
	$('.standard_form:visible :input[type="button"]').live('vclick',function(){
		var $this = $(this);
		var mode = $this.attr('edit');
		var type = $this.attr('refType');
		
		var id = $this.attr('refID');
		
		var detail = $(this).attr('id').split('.');
		
		if (mode == 'true'){ // EDIT
			currentSelection = $this;
			popupSelectObject(type);
		}else if (mode == 'false'){
			if (id == ""){
				if ($this.attr('value') == '<Not Found>'){
					navigator.notification.alert(
						    'The object may have been removed or you may not have access to it.',
						    null,
						    'Not Found',
						    'Ok'
						);
				}else{
					$this.blur();
				}
				
				return false;
			}
			
			var container = null;

			if (type != null){
				var container = checkDetailExists(type,id);
        		if (!container) {
        			alert('You may not have access to the object.');
        			return false;
        		}else{
        			if (type == 'messageThread'){
        				createFilterHTML('message');
        				navForward($('#messages'),['filter'], 'MESSAGES', function(){
        		            var height = $('#messages').innerHeight() - 100;
        		            var list = $('#message_list');
        		            list.css('maxHeight', height + 'px');
        		            list.show().children().show();
        		            list.children('div').children('div:last').find('div').show();
        		            messageScroll = new iScroll('message_list', {vScroll: true, hScroll: false, hScrollbar: false, lockDirection: true, hideScrollbar: true, bounce: false});
        		            messageScroll.scrollTo(0, messageScroll.maxScrollY, 0);
        		        });
        			}else{
        				navForward(container,['edit'], type.toUpperCase());
        			}
        		}
			}
		}
		return false;
	});
	
	$('.message_buttons li').live('vmousedown', function(e){
		if (e.isPropagationStopped()) return;
		$(this).css('background','#cccccc');
	}).live('vmouseup', function(e){
		if (e.isPropagationStopped()) return;
		$(this).css('background','');
	});
	
	$('.message_reply').live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		var $this = $(this);
		var id = $this.parents('.message_list_item').attr('id').split('.');
		replyMessage(id[1]);
	});
	
	$('#update_filter').live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		var type, loc;
		var attr = $('#filter_items').attr('type').split('.');
		type = attr[0];
		if (attr.length > 1){
			loc = attr[1];
		}
		var temp;
		
		if (type == 'call'){
			temp = calls;
		}else if (type == 'person'){
			temp = people;
		}else if (type == 'device'){
			temp = devices;
		}else if (type == 'user'){
			temp = users;
		}else if (type == 'group'){
			temp = groups;
		}else if (type == 'message'){
			temp = threadlist;
		}else if (type == 'messageThread'){
			temp = messageThreads;
		}
		
		
		$('#filter_items :input[id^="filter"]').each(function(){
			var $this = $(this);
			var id = String($this.attr('id').replace('filter.',''));
			var val = String($this.val());
			if (val.length > 0){
                temp = jQuery.grep(temp, function(item,i){
                    return (String(item[id]).toLowerCase().indexOf(val.toLowerCase()) >= 0);
                });
            }
		});
		
		if (loc == 'select'){
			filterSelect = temp;
		}else if (type == 'call'){
			filterCalls = temp;
		}else if (type == 'person'){
			filterPeople = temp;
		}else if (type == 'device'){
			filterDevices = temp;
		}else if (type == 'messageThread'){
			filterMessageThreads = temp;
		}else if (type == 'message'){
			filterMessages = temp;
		}

		if (loc == 'select'){
			showLists(true, 'select', type);
		}else{
			showLists(true, type);
		}
		
		handleMenu($('.footer_content:visible').attr('id'));
		e.preventDefault();
	});
	
	$('.menu_icon img').each(function(){
		var $this = $(this);
		var tag = $this.attr('id');
		
		// initialize image
		$this.attr('src',getInitialPath(tag));
		
		// selector
		$this.live('vmousedown',function(){
			var src = $this.attr('src');
			$this.attr('src', src.replace('normal','selected'));
		}).live('vmouseup', function(){
			var src = $this.attr('src');
			$this.attr('src', src.replace('selected','normal'));
		});
		
		$this.draggs();
		
		$this.click(function(e){
			if(e.isPropagationStopped()) return;
			var parentTR = $this.parents('tr:first');
			var _class = parentTR.attr('class');
			var parentTD = $this.parent().attr('id');
			
			if (_class == 'menu_items_search'){
				if ($('#' + tag.replace('icon','list') + ' ul').is(":visible")){
					$('.menu_icon[id!="' + parentTD + '"]').hide();
					parentTR.attr('class','menu_enlarged_search');
					$('#open_footer_filter').show();
					createFilterHTML(tag.replace('_icon',''));
					$(':input[default="true"]').val($('#search_field').val());
					$('#search_header').slideUp('fast');
				}
			}else if (_class == 'menu_enlarged_search'){
				parentTR.attr('class','menu_items_search');
				$('#open_footer_filter').hide();
				$('.menu_icon').show();
				$('#search_header').slideDown('fast');
				
			}else if (_class == 'menu_enlarged'){
				destroyScroll();
				$('.item_list').children().hide('fast', function(){
					var src = $this.attr('src');
					$this.attr('src',src.replace('_small',''));
					parentTR.attr('class','menu_items');
					$('#open_footer_filter').hide();
					$('.menu_icon[id!="' + parentTD + '"]').show();
					$('#search_header').slideDown('fast');
				});
				
			}else if (_class == 'menu_items'){
				var src = $this.attr('src');
				$this.attr('src',src.replace('.png','_small.png'));
				$('.menu_icon[id!="' + parentTD + '"]').hide();
				parentTR.attr('class','menu_enlarged');
				$('#open_footer_filter').show();
				createFilterHTML(tag.replace('_icon',''));
				$('#search_header').slideUp('fast');
				
				showLists(false,tag.replace('_icon',''));
			}
			e.stopPropagation();
		});
	});
	
	$('#delete').click(function(e){
		if(e.isPropagationStopped()) return;
		navigator.notification.confirm(
    	        'Are you sure you want to delete the object?',
    	        onDeleteItem,
    	        'Confirm Deletion',
    	        'Cancel,No,Yes'
    	    );
		e.stopPropagation();
		return false;
	});
	
	$('#edit').click(function(e){
		if(e.isPropagationStopped()) return;
		var container = $('div[id$="\\.detail"]:visible:first');
		
		if ($(this).find('.ui-btn-text').text() == 'EDIT'){
			var textfields = container.find(':input[type="text"]');
			textfields.each(function(){
				var $this = $(this);
				var ids = $this.attr('id').split('.');
				if (checkAllowEdit(ids[0], ids[2])){
					$this.removeAttr('disabled').css('background','#FFFFFF');
				}
			});
			
			var buttons = container.find(':input[type="button"]');
			buttons.each(function(){
				var $this = $(this);
				var ids = $this.attr('id').split('.');
				if (checkAllowEdit(ids[0], ids[2])){
					$this.attr('edit','true');
				}else{
					$this.attr('disabled','').attr('edit','NA');
				}
			});
			
			
			$(this).find('.ui-btn-text').text('DONE');
			$('#open_footer_edit').trigger('vclick');
		}else{
			navigator.notification.confirm(
	    	        'Save changes?',
	    	        onSaveItem,
	    	        'Confirm Save',
	    	        'Cancel,No,Yes'
	    	    );
		}
		e.stopPropagation();
		return false;
	});
	
	$('#search_field').keydown(function (e){
	    if(e.keyCode == 13){
	    	e.preventDefault();
			var value = $(this).val();
			if (value.length > 0){
				$('#menu').attr('class', 'menu_items_search');
				
				$('.menu_icon img').each(function(){
					var $this = $(this);
					var src = $this.attr('src');
					if (!(src.indexOf('_small') >= 0)){
						$this.attr('src',src.replace('.png','_small.png'));
					}
				});
				
				filterCalls = jQuery.grep(calls, function(call,i){
					return (getDisplay('call',call).toLowerCase().indexOf(value.toLowerCase()) >= 0);
				});
				
				filterPeople = jQuery.grep(people, function(person,i){
					return (getDisplay('person',person).toLowerCase().indexOf(value.toLowerCase()) >= 0);
				});
				
				filterDevices = jQuery.grep(devices, function(device,i){
					return (getDisplay('device',device).toLowerCase().indexOf(value.toLowerCase()) >= 0);
				});
				
				
				showLists(true, null);
				//
			}else{
				$('#menu ul').remove('li').hide();
				$('#menu').attr('class', 'menu_items');	
				$('.menu_icon img').each(function(){
					var $this = $(this);
					var src = $this.attr('src');
					$this.attr('src',src.replace('_small',''));
				});
			}
			return false;
	    }
	});
	
	$('.selector').live('vmousedown',function(e){
		$(this).css('backgroundColor','#ccc');
	}).live('vmouseup',function(e){
		$(this).css('backgroundColor','#fafafa');
	}).live('vclick',function(e){
		if(e.isPropagationStopped() || (e.target.nodeName != 'P' && e.target.nodeName != 'LI')) return;
		var id = $(this).attr('id');
		var objectID = id.split('.');
		var object = getObject(objectID[0],objectID[1]);
		var key = currentSelection.attr('id').split('.')[2];
		
		currentSelection.attr('value',getDisplay(objectID[0],object)).attr('refID',objectID[1]);
		hidePopup();
	});
	
	$('.item').live('vmousedown',function(e){
		$(this).css('backgroundColor','#ccc');
	}).live('vmouseup',function(e){
		$(this).css('backgroundColor','#fafafa');
	}).live('vclick',function(e){
		if(e.isPropagationStopped() || (e.target.nodeName != 'P' && e.target.nodeName != 'LI')) return;

		var $this = $(this);
		var id = $this.attr('id');
		var item = id.split('.');

		var container = checkDetailExists(item[0],item[1]);
		if (!container) {
			alert('You may not have access to the object.');
			return false;
		}else{
			destroyScroll();
			$('.item_list').children().hide();
			$('#search_header').slideUp('fast',function(){
				navForward(container,['edit'], item[0].toUpperCase(),null);
			});
		}
		return false;
	});
	
	$('.nav_arrow_detail').live('vmousedown',function(){
		var $this = $(this).find('img');
		var src = $this.attr('src');
		$this.attr('src',src.replace('normal','selected'));
	}).live('vmouseup',function(){
		var $this = $(this).find('img');
		var src = $this.attr('src');
		$this.attr('src',src.replace('selected','normal'));
	}).live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		
		// disable text boxes
		var container = $('div[id$="\\.detail"]:visible:first');
		container.find(':input').attr('disabled','true').css('background','#d2cfcc');
		$('#edit').find('.ui-btn-text').text('EDIT');
		
		//hide footer
		var footer = $('.footer_content:visible');
	    if (footer.length){
	    	handleMenu(footer.attr('id'));
	    }
		
	    if (lastElement.length > 0){
    		navBack();
	    }
		return false;
	});
	
	$('.exit_icon').live('vmousedown',function(){
		var $this = $(this);
		var src = $this.attr('src');
		$this.attr('src',src.replace('normal','selected'));
	}).live('vmouseup',function(){
		var $this = $(this);
		var src = $this.attr('src');
		$this.attr('src',src.replace('selected','normal'));
	}).live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		var search = $('#search_field');
		search.val('');
		$('.item_list').children().hide();
		$('#menu').attr('class', 'menu_items');	
		$('.menu_icon img').each(function(){
			var $this = $(this);
			var src = $this.attr('src');
			$this.attr('src',src.replace('_small',''));
		});
		$('.open_footer[id!="open_footer_main"]').hide();
		return false;
	});
	
	$('.home_icon').live('vmousedown',function(){
		var $this = $(this).find('img');
		var src = $this.attr('src');
		$this.attr('src',src.replace('normal','selected'));
	}).live('vmouseup',function(){
		var $this = $(this).find('img');
		var src = $this.attr('src');
		$this.attr('src',src.replace('selected','normal'));
	}).live('vclick',function(e){
		if (e.isPropagationStopped()) return;
		$('div_container').filter(function(){ return ! $(this).is(":hidden"); })
        .hide('slide', {direction: 'right'}, 300, function(){
			$('.item_list').children().hide();
			$('.menu_icon').show();
			$('.open_footer[id!="open_footer_main"]').hide();	
			$('#open_footer_main').hide();	
			$('#menu').attr('class', 'menu_items');	
			$('.menu_icon img').each(function(){
				var $this = $(this);
				var src = $this.attr('src');
				$this.attr('src',src.replace('_small',''));
			});
			$('#dashboard_content').show('slide', {direction: 'left'}, 500);

		});
		return false;
	});
	
	$('.options_menu_item').live('vmousedown',function(){
		$(this).css('background','#365D89');
	}).live('vmouseup',function(){
		$(this).css('background','');
	}).live('vclick',function(e){
		e.stopPropagation();
		$('#open_menu').trigger('click');
		var id = $(this).attr('id');
		if (id == 'refresh_lists'){
			getLists();
		}else if (id == 'logout'){
			logout();
		}
		return false;
	});
	
	$('#open_menu').click(function(e){
		if (e.isPropagationStopped()) return;
		e.stopPropagation();
		var $this = $(this);
		var menu = $('#options_menu');
		
		if (menu.is(':visible')){
			$this.css('background','').css('borderLeft','1px solid #869EB8');
			menu.slideUp('fast');
		}else{
			var header = $('.header');
			var top = header.outerHeight();
			var height = $(window).height() - top;
			$this.css('background','#869EB8').css('borderLeft','1px solid #04356c');
			menu.css({'top':top + 'px', 'height':height + 'px'}).slideDown('fast');
		}
	});
	
	$('#options_menu').click(function(e){
		if (e.isPropagationStopped()) return;
		e.stopPropagation();
		$('#open_menu').trigger('click');
		return false;
	})
	
	$('#main').css('height',$(window).height() + 'px');
	
	$('#exit').attr('src','images/' + res + '/exit_icon_normal.png');
	$('.open_footer[id!="open_footer_main"]').hide();
	$('div[class$="_container"]').hide();
	$('#search_header').hide().show('slide', {direction: 'up'}, 300);
	$('#dashboard_content').show('slide', {direction: 'up'}, 300, function(){
		getLists();
	});
}