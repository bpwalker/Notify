class UrlMappings {

	static mappings = {		
		"/api/$resource?/$id?/$search?/0?"(controller: "api"){
			action = [GET: "get", POST: "post", PUT: "put", DELETE: "delete"]
		}
		
		"/login"(controller: "login"){
			action = "index"
		}
		
		"/template/$resource"(controller: "template"){
			action = "index"
		}
		
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}
		
		"/dashboard"(controller: "dashboard"){
			action = "index"
		}
		
		"/"(view: "index")
		"404"(view:'/index')
	}
}
