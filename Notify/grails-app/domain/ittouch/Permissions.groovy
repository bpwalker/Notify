package ittouch

import grails.converters.JSON

class Permissions extends Audit {

	Users user;
	Groups groupid;
	
    static constraints = {
    }
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("groups")){
			return Permissions.withCriteria {
				eq("groupid", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}	
		}
		if(field.equalsIgnoreCase("users")){
			return Permissions.withCriteria {
				eq("user", Users.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}	
		}
	}
	
	public Permissions(String data){
		bind(data);
	}
	
	def bind(String data){
		def map = JSON.parse(data);
		user = Users.notArchived.get(["USER_ID"]);
		groupid = Groups.notArchived.get(["GROUP_ID"]);
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Permissions) {
			return [
					PERMISSION_ID: it?.id,
					USER_ID: it?.user?.id,
					GROUP_ID: it?.groupid?.id/*,
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
		
		hasAccess { user, p ->
			if(p){
				eq("id", p)
			}
			
			def groups = Groups.notArchived.hasAccess(user, null).list();
			if(groups.size() != 0){
				or{
					for(Groups group : groups){
						eq("groupid.id", group.id)
					}
				}
			} else {
				eq("groupid.id", -1 as Long)
			}
		}
	}
}
