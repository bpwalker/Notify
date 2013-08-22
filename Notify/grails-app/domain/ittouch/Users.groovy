package ittouch

import grails.converters.JSON

import org.springframework.web.context.request.RequestContextHolder

class Users extends Audit {
	
	static hasMany = [calls : Calls, permissions : Permissions, recipients : Recipients];
	static hasPermission = {val, obj -> !val || Groups.notArchived.hasAccess(RequestContextHolder.currentRequestAttributes().session.account.user, null).listDistinct().any{it.id == val.groupid.id}}
	
	//
	
	Accounts account;
	Clients client;
	Groups groupid;
	String firstName;
	String middleName;
	String lastName;
	String email;
	String phoneNumber;
	AdminLevels level;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("clients")){
			return Users.withCriteria {
				eq("client", Clients.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		}
		if(field.equalsIgnoreCase("groups")){
			return Users.withCriteria {
				eq("groupid", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		
		}
	}

    static constraints = {
		client validator: Clients.hasPermission
		groupid validator: Groups.hasPermission
		firstName nullable: true
		middleName nullable: true
		lastName nullable: true
		email nullable: true
		phoneNumber nullable: true
    }
	
	public Users(String data){
		bind(data);
    }
	
	def bind(String data){
		def map = JSON.parse(data);
		client = Clients.notArchived.get(map["CLIENT_ID"]);
		groupid = Groups.notArchived.get(map["GROUP_ID"]);
		firstName = map["FIRST_NAME"];
		middleName = map["MIDDLE_NAME"];
		lastName = map["LAST_NAME"];
		email = map["EMAIL"];
		phoneNumber = map["PHONE_NUMBER"];
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Users) {
			return [
					USER_ID: it?.id,
					CLIENT_ID: it?.client?.id,
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
	
	static namedQueries = {
		
		archived {
			eq("archive", true)
		}
		
		notArchived {
			eq("archive", false)
		}
		
		hasAccess { user, u ->
			if(u){
				eq("id", u)
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
	
	def isAdmin(){
		return this.level.adminLevel >0;
	}

	def getFullName(){
		return firstName + " " + lastName;
	}
}
