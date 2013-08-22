package ittouch

import grails.converters.JSON

class Recipients extends Audit {

	Users user;
	Messages message;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("messages")){
			return Recipients.withCriteria {
				eq("message", Messages.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
		if(field.equalsIgnoreCase("users")){
			return Recipients.withCriteria {
				eq("user", Users.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
	}
	
    static constraints = {
		user validator: Users.hasPermission
		message validator: Messages.hasPermission
    }
	
	public Recipients(String data){
		bind(data);
    }
	
	def bind(String data){
		def map = JSON.parse(data);
		user = Users.notArchived.get(["USER_ID"]);
		message = Messages.notArchived.get(["MESSAGE_ID"]);
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Recipients) {
			return [
					RECIPIENT_ID: it?.id,
					USER_ID: it?.user?.id,
					MESSAGE_ID: it?.message?.id/*,
					ADD_WHO: it.addWho.id,
					EDIT_WHO: it.editWho.id,
					ADD_DATE: it.dateCreated,
					EDIT_DATE: it.lastUpdated*/
			]
		}
	}
	
static namedQueries = {
		archived {
			eq("archive", true)
		}
		
		notArchived {
			eq("archive", false)
		}
		
		hasAccess { user, rec ->
			if(rec){
				eq("id", rec)
			}
			
			message{
				recipients{
					eq("user", user)
				}
			}
		}
	}
}
