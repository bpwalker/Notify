package ittouch

import grails.converters.JSON

import org.springframework.web.context.request.RequestContextHolder

class People extends Audit {
	
	static hasMany = [appointments : Appointments, calls : Calls, devices : Devices, notes : Notes, messages : Messages];
	static mappedBy = [appointments: "person", calls: "person", notes: "person", devices: "primaryUser"]
	static hasPermission = {val, obj -> !val || Groups.notArchived.hasAccess(RequestContextHolder.currentRequestAttributes().session.account.user, null).listDistinct().any{it.id == val.groupid.id}}
	
	//
	Groups groupid;
	String firstName;
	String middleName;
	String lastName;
	String email;
	String phoneNumber;
	String password;
	boolean passwordActive;

	static constraints = {
		groupid validator: Groups.hasPermission
		firstName nullable: true
		middleName nullable: true
		lastName nullable: true
		email nullable: true
		phoneNumber nullable: true
		password nullable: true
	}
		
	static namedQueries = {
		
		archived {
			eq("archive", true)
		}
		
		notArchived {
			eq("archive", false)
		}
		
		hasAccess { user, person ->
			if(person){
				eq("id", person)
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
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("groups")){
			return People.withCriteria {
				eq("groupid", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
	}
	
	public People(String data){
		 bind(data);
	}
	
	def bind(String data){
		def map = JSON.parse(data);
		groupid = Groups.notArchived.get(map["GROUP_ID"]);
		firstName = map["FIRST_NAME"];
		middleName = map["MIDDLE_NAME"];
		lastName = map["LAST_NAME"];
		email = map["EMAIL"];
		phoneNumber = map["PHONE_NUMBER"];
	}
	
	def static register(){
		JSON.registerObjectMarshaller(People) {
			return [
					PERSON_ID: it?.id,
					GROUP_ID: it?.groupid?.id,
					FIRST_NAME: it?.firstName,
					MIDDLE_NAME: it?.middleName,
					LAST_NAME: it?.lastName,
					EMAIL: it?.email,
					PHONE_NUMBER: it?.phoneNumber/*,
					ADD_WHO: it.addWho.id,
					EDIT_WHO: it.editWho.id,
					ADD_DATE: it.dateCreated,
					EDIT_DATE: it.lastUpdated*/
			]
		}
	}
	
	def getFullName(){
		return firstName + " " + lastName;
	}
}
