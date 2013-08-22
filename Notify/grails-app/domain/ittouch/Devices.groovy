package ittouch

import grails.converters.JSON

import org.springframework.web.context.request.RequestContextHolder

class Devices extends Audit {

	static hasMany = [calls : Calls, notes : Notes];
	static hasPermission = {val, obj -> !val || Groups.notArchived.hasAccess(RequestContextHolder.currentRequestAttributes().session.account.user, null).listDistinct().any{it.id == val.groupid.id}}
	
	//
	
	String type;
	Groups groupid;
	String name;
	String macAddress;
	String ipAddress;
	String location;
	People primaryUser;
	String deviceInfo;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("groups")){
			return Devices.withCriteria {
				eq("groupid", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		}
		if(field.equalsIgnoreCase("people")){
			return Devices.withCriteria {
				eq("primaryUser", People.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
	}
	
    static constraints = {
		groupid validator: Groups.hasPermission
		primaryUser validator: People.hasPermission
		type nullable: true
		name nullable: true
		macAddress nullable: true
		ipAddress nullable: true
		location nullable: true
		primaryUser nullable: true
		deviceInfo nullable: true
    }
		
	public Devices(String data){
		bind(data);
    }
	
	def bind(String data){
		def map = JSON.parse(data);
		type = map["DEVICE_TYPE"];
		groupid = Groups.notArchived.get(map["GROUP_ID"]);
		name = map["DEVICE_NAME"];
		macAddress = map["MAC_ADDRESS"];
		ipAddress = map["IP_ADDRESS"];
		location = map["LOCATION"];
		primaryUser = People.notArchived.get(map["PRIMARY_USER"]);
		deviceInfo = map["DEVICE_INFO"];
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Devices) {
			return [
					GROUP_ID: it?.groupid?.id,
					DEVICE_ID: it?.id,
					CLIENT_ID: it?.groupid?.client?.id,
					DEVICE_TYPE: it?.type,
					DEVICE_NAME: it?.name,
					MAC_ADDRESS: it?.macAddress,
					IP_ADDRESS: it?.ipAddress,
					LOCATION: it?.location,
					PRIMARY_USER: it?.primaryUser?.id,
					DEVICE_INFO: it?.deviceInfo/*,
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
		
		hasAccess { user, device ->
			if(device){
				eq("id", device)
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
