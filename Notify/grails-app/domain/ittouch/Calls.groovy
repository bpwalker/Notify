package ittouch

import grails.converters.JSON

import org.springframework.web.context.request.RequestContextHolder

class Calls extends Audit {

	static hasMany = [adminLevels : AdminLevels, tasks : Tasks];	
	static hasPermission = {val, obj -> !val || Groups.notArchived.hasAccess(RequestContextHolder.currentRequestAttributes().session.account.user, null).listDistinct().any{it.id == val.groupid.id}}
	
	//
	
	Messages message;
	Groups groupid;
	Users user;
	String header;
	Integer priority;
	Integer currentStatus;
	String followUp;
	People person;
	Devices device;
	Date followUpDate;
	Date endDate;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("groups")){
			return Calls.withCriteria {
				eq("groupid", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
		if(field.equalsIgnoreCase("users")){
			return Calls.withCriteria {
				eq("user", Users.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
		if(field.equalsIgnoreCase("people")){
			return Calls.withCriteria {
				eq("person", People.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
		if(field.equalsIgnoreCase("devices")){
			return Calls.withCriteria {
				eq("device", Devices.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
		if(field.equalsIgnoreCase("messages")){
			return Calls.withCriteria {
				eq("message", Messages.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
	}
	
    static constraints = {
		message validator: Messages.hasPermission
		groupid validator: Groups.hasPermission
		user validator: Users.hasPermission
		person validator: People.hasPermission
		device validator: Devices.hasPermission
		header nullable: true
		currentStatus nullable: true
		person nullable: true
		device nullable: true
		priority nullable: true
		followUpDate nullable: true
		followUp nullable: true
		endDate nullable: true
    }
	
	public Calls(String data){
		bind(data);
	}  
	
	def bind(String data){
		def map = JSON.parse(data);
		groupid = Groups.notArchived.get(map["GROUP_ID"]);
		user = Users.notArchived.get(map["USER_ID"]);
		message = Messages.notArchived.get(map["MESSAGE_ID"]);
		header = map["HEADER"];
		priority = map["PRIORITY"] as Integer;
		currentStatus = map["CURRENT_STATUS"] as Integer;
		person = People.notArchived.get(map["PERSON_ID"]);
		device = Devices.notArchived.get(map["DEVICE_ID"]);
		followUp = map["FOLLOW_UP"];
		followUpDate = map["FOLLOW_UP_DATE"] as Date;
		endDate = map["END_DATE"] as Date;
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Calls) {
			return [
					CALL_ID: it?.id,
					GROUP_ID: it?.groupid?.id,
					USER_ID: it?.user?.id,
					MESSAGE_ID: it?.message?.id,
					PERSON_ID: it?.person?.id,
					DEVICE_ID: it?.device?.id,
					HEADER: it?.header,
					PRIORITY: it?.priority,
					CURRENT_STATUS: it?.currentStatus,
					FOLLOW_UP: it?.followUp,
					FOLLOW_UP_DATE: it?.followUpDate,
					END_DATE: it?.endDate/*,
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
		
		hasAccess { user, call ->
			if(call){
				eq("id", call)
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
	
	def getStatus(){
		if(currentStatus == 0){
			return "Open"
		} else if(currentStatus == 1){
			return "In progress"
		} else if(currentStatus == 2){
			return "Waiting"
		} else if(currentStatus == 3){
			return "Resolved"
		}
		return "Unassigned"
	}
}
