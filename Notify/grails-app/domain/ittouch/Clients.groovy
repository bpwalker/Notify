package ittouch

import grails.converters.JSON

import org.springframework.web.context.request.RequestContextHolder

class Clients extends Audit {

	static hasMany = [groups : Groups, users : Users];
	static hasPermission = {val, obj -> !val || RequestContextHolder.currentRequestAttributes().session.account.user.client.id == val.id}
	

	//
	
	String clientName;
	Groups homeGroup;
	
	def static search(user, field, id){
			return Clients.withCriteria {
				eq("homeGroup", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
	}
	
    static constraints = {
		homeGroup validator: {val, obj -> val? Groups.hasPermission : true}
		clientName nullable: true
		homeGroup nullable: true
    }
	
	static namedQueries = {
		
		archived {
			eq("archive", true)
		}
		
		notArchived {
			eq("archive", false)
		}
		
		hasAccess { user, client ->
			if(client){
				eq("id", client)
			}
			
			eq("id", user.client.id)
		}
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Clients) {
			return [
					CLIENT_ID: it?.id,
					CLIENT_NAME: it?.clientName,
					HOME_GROUP: it?.homeGroup/*,
					ADD_WHO: it.addWho.id,
					EDIT_WHO: it.editWho.id,
					ADD_DATE: it.dateCreated,
					EDIT_DATE: it.lastUpdated*/
			]
		}
	}
	
}
