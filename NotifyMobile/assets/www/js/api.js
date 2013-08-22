//var server = "http://192.168.1.181:8080/itTouch/";
var server = "https://notify-synapps.rhcloud.com/";

function getTemplate(search, callback, failure){
	$.ajax
	({
	  type: "GET",
	  url: server + "template/" + search,
	  contentType: "application/json",
	  async: true,
	  cache: false,
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authentication',window.localStorage.getItem('credentials')); 
	    },
	  success: function (response){
	    callback(response); 
	  },
	  error: function(xhr, status, error) {
		  if (xhr.status == 401){
			  failure("The username and password cannot be authenticated.");
		  }else if (xhr.status == 400){
			  failure("Unable to complete the request.");
		  }else if (xhr.status == 500){
			  failure("Internal server error. Please contact server administrator.");
		  }else{
			  failure("Could not contact the server.");
		  }
	  }
	});
}

function getAPI(search, callback, failure){
	$.ajax
	({
	  type: "GET",
	  url: server + "api/" + search,
	  contentType: "application/json",
	  async: true,
	  cache: false,
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authentication',window.localStorage.getItem('credentials')); 
	    },
	  success: function (response){
	    callback(response); 
	  },
	  error: function(xhr, status, error) {
		  if (xhr.status == 401){
			  failure("The username and password cannot be authenticated.");
		  }else if (xhr.status == 400){
			  failure("Unable to complete the request.");
		  }else if (xhr.status == 500){
			  failure("Internal server error. Please contact server administrator.");
		  }else{
			  failure("Could not contact the server.");
		  }
	  }
	});
}

function getURL(type, id){
	if (type == 'person'){
		type = 'people';
	}else{
		type = type + 's';
	}
	
	if (id != null) {return type + '/' + id;}
	else {return type;}
}

function putAPI(url, data, callback, failure){
	$.ajax({
	  type: "PUT",
	  url: server + "api/" + url,
	  contentType: "application/json",
	  async: true,
	  cache: false,
	  data: JSON.stringify(data),
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authentication',window.localStorage.getItem('credentials')); 
	    },
	  success: function (response){
	    callback(response); 
	  },
	  error: function(xhr, status, error) {
		  if (xhr.status == 401){
			  failure("The username and password cannot be authenticated.");
		  }else if (xhr.status == 400){
			  failure("Unable to complete the request.");
		  }else if (xhr.status == 500){
			  failure("Internal server error. Please contact server administrator.");
		  }else{
			  failure("Could not contact the server.");
		  }
	}
	});
}

function deleteAPI(url, callback, failure){
	$.ajax
	({
	  type: "DELETE",
	  url: server + "api/" + url,
	  contentType: "application/json",
	  async: true,
	  cache: false,
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authentication',window.localStorage.getItem('credentials')); 
	    },
	  success: function (response){
	    callback(response); 
	  },
	  error: function(xhr, status, error) {
		  if (xhr.status == 401){
			  failure("The username and password cannot be authenticated.");
		  }else if (xhr.status == 400){
			  failure("Unable to complete the request.");
		  }else if (xhr.status == 500){
			  failure("Internal server error. Please contact server administrator.");
		  }else{
			  failure("Could not contact the server.");
		  }
	  }
	});
}

function makeAPI(url, data, callback, failure){
	$.ajax({
	  type: "POST",
	  url: server + "api/" + url,
	  async: true,
	  contentType: "application/json",
	  processData: false,
	  cache: false,
	  data: JSON.stringify(data),
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authentication',window.localStorage.getItem('credentials')); 
	    },
	  success: function (response){
	    callback(response); 
	  },
	  error: function(xhr, status, error) {
		  if (xhr.status == 401){
			  failure("The username and password cannot be authenticated.");
		  }else if (xhr.status == 400){
			  failure("Unable to complete the request.");
		  }else if (xhr.status == 500){
			  failure("Internal server error. Please contact server administrator.");
		  }else{
			  failure("Could not contact the server.");
		  }
	  }
	});
}

function loginAPI(callback, failure){
	$.ajax
	({
	  type: "GET",
	  url: server + "login",
	  dataType: 'json',
	  async: true,
	  cache: false,
	  beforeSend: function (xhr){ 
	        xhr.setRequestHeader('Authentication',window.localStorage.getItem('credentials')); 
	    },
	  success: function (response, status, xhr){
		  callback(response);
	  },
	  error: function(xhr, status, error) {
		  if (xhr.status == 401){
			  failure("The username and password cannot be authenticated.");
		  }else if (xhr.status == 400){
			  failure("Unable to complete the request.");
		  }else if (xhr.status == 500){
			  failure("Internal server error. Please contact server administrator.");
		  }else{
			  failure("Could not contact the server.");
		  }
	  }
	});
}