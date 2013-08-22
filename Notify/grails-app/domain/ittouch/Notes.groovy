package ittouch

import grails.converters.JSON

class Notes extends Audit {

	Groups groupid;
	People person;
	Devices device;
	String note;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("groups")){
			return Notes.withCriteria {
				eq("groupid", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		
		}
		if(field.equalsIgnoreCase("people")){
			return Notes.withCriteria {
				eq("person", People.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		
		}
		if(field.equalsIgnoreCase("devices")){
			return Notes.withCriteria {
				eq("device", Devices.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		
		}
	}
	
    static constraints = {
		groupid validator: Groups.hasPermission
		person validator: People.hasPermission
		device validator: Devices.hasPermission
		person nullable: true
		device nullable: true
		note nullable: true
    }
	
	public Notes(String data){
		bind(data);
    }
	
	def bind(String data){
		def map = JSON.parse(data);
		groupid = Groups.notArchived.get(map["GROUP_ID"]);
		person = People.notArchived.get(map["PERSON_ID"]);
		device = Devices.notArchived.get(map["DEVICE_ID"]);
		note = map["NOTE_MESSAGE"] ?: note;
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Notes) {
			return [
					NOTE_ID: it?.id,
					GROUP_ID: it?.groupid?.id,
					PERSON_ID: it?.person?.id,
					DEVICE_ID: it?.device?.id,
					NOTE_MESSAGE: it?.note/*,
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
		
		hasAccess { user, note ->
			if(note){
				eq("id", note)
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
