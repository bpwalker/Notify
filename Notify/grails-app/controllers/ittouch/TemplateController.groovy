package ittouch

import grails.converters.JSON

class TemplateController {

    def index() {
		try{
			def resource = grailsApplication.domainClasses.find { it.clazz.simpleName.toUpperCase() == params.resource.toUpperCase() }.clazz
			render resource.newInstance() as JSON;
		} catch(Exception e){
			e.println()
			e.printStackTrace()
			response.sendError(400);
		}
	}
}
