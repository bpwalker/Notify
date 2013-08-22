package ittouch

import grails.converters.JSON

import org.hibernate.criterion.CriteriaSpecification
import org.springframework.web.context.request.RequestContextHolder

class Messages extends Audit {

	static hasMany = [recipients : Recipients, messages : Messages, calls: Calls];
	static hasPermission = {val, obj -> !val || Recipients.hasAccess(RequestContextHolder.currentRequestAttributes().session.account.user, null).listDistinct().any{it.user.id == RequestContextHolder.currentRequestAttributes().session.account.user.id}}
	
	//
	
	Messages replyTo;
	String header;
	String message;
	Integer readStatus;
	Users source;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("messages")){
			return Messages.withCriteria {
				eq("replyTo", Messages.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
		if(field.equalsIgnoreCase("users")){
			return Messages.withCriteria {
				eq("user", Users.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		
		}
	}
	
    static constraints = {
		replyTo validator: hasPermission
		replyTo nullable: true
		header nullable: true
		message nullable: true
		readStatus nullable: true
		source nullable: true
    }
	
	public Messages(String data){
		bind(data);
    }
	
	def bind(String data){
		def map = JSON.parse(data);
		replyTo = Messages.notArchived.get(map["REPLY_TO"]);
		header = map["HEADER"];
		message = map["MESSAGE"];
		readStatus = map["READ_STATUS"] as int;
		
		source = RequestContextHolder.currentRequestAttributes().session.account.user;
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Messages) {
			return [
					MESSAGE_ID: it?.id,
					SOURCE_ID: it?.source?.id,
					REPLY_TO: it?.replyTo?.id,
					HEADER: it?.header,
					READ_STATUS: it?.readStatus,
					MESSAGE: it?.message/*,
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
		
		hasAccess { user, message ->
			if(message){
				eq("id", message)
			}
			createAlias("recipients", "r", CriteriaSpecification.LEFT_JOIN)
			or{
				eq("r.user", user)
				eq("source", user)
			}
		}
	}
}
