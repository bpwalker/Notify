package ittouch

import grails.converters.JSON

class ApiController {
	
    def get = {
		try{
			if(params.search){
				def search = grailsApplication.domainClasses.find { it.clazz.simpleName.toUpperCase() == params.search.toUpperCase() }.clazz
				def results = search.search(session.account.user, params.resource, params.id as Long)
				render results as JSON ?: [] as JSON
			} else{
				def resource = grailsApplication.domainClasses.find { it.clazz.simpleName.toUpperCase() == params.resource.toUpperCase() }.clazz
				def data = resource.notArchived().hasAccess(session.account.user, params.id as Long).listDistinct()
				render data as JSON ?: [] as JSON
			}
		} catch(Exception e){
			e.println()
			e.printStackTrace()
			response.sendError(400);
		}
	}
	
	def post = {
		def resource = grailsApplication.domainClasses.find { it.clazz.simpleName.toUpperCase() == params.resource.toUpperCase() }.clazz
		def post = resource.newInstance(request.reader.text);
		
		try{
			post.save(failOnError: true);
		} catch (Exception e){
			response.sendError(400);
			return;
		}
		render post as JSON ?: [] as JSON
	}
	
	def put = {
		if(params.id){
			def resource = grailsApplication.domainClasses.find { it.clazz.simpleName.toUpperCase() == params.resource.toUpperCase() }.clazz
			def put = resource.notArchived().hasAccess(session.account.user, params.id as Long).get()
			
			try{
				put.bind(request.reader.text);
				put.save(failOnError: true);
			} catch (Exception e){
				response.sendError(400);
				return;
			}
			
			render put.id;
		} else {
			response.sendError(400);
			return;
		}
	}
	
	def delete = {
		def resource = grailsApplication.domainClasses.find { it.clazz.simpleName.toUpperCase() == params.resource.toUpperCase() }.clazz
		def delete = resource.notArchived().hasAccess(session.account.user, params.id as Long).get();
		delete?.archive = true;
		try{
			delete.save(failOnError: true);
		} catch (Exception e){
			response.sendError(400);
			return;
		}
		
		render delete.id;
	}
	
	
}
