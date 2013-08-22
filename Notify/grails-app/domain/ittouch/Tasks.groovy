package ittouch

import grails.converters.JSON

import org.springframework.web.context.request.RequestContextHolder

class Tasks extends Audit {

	static hasMany = [appointments : Appointments];
	static hasPermission = {val, obj -> !val || val.call.user.id == RequestContextHolder.currentRequestAttributes().session.account.user.id}
	//
	Calls call;
	String description;
	Date expectedTime;
	Integer status;
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("calls")){
			return Tasks.withCriteria {
				eq("call", Calls.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}		
		}
	}
	
    static constraints = {
		//call validator: Calls.hasPermission
		description nullable: true
		expectedTime nullable: true
		status nullable: true
    }
	
	public Tasks(String data){
		bind(data);
    }
	
	def bind(String data){
		def map = JSON.parse(data);
		call = Calls.notArchived.get(["CALL_ID"]);
		description = map["DESCRIPTION"];
		expectedTime = map["EXPECTED_TIME"] as Date;
		status = map["STATUS"] as Integer;
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Tasks) {
			return [
					TASK_ID: it?.id,
					CALL_ID: it?.call?.id,
					DESCRIPTION: it?.description,
					EXPECTED_TIME: it?.expectedTime,
					STATUS: it?.status/*,
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
		
		hasAccess { user, task ->
			if(task){
				eq("id", task)
			}
			
			eq("call.user", user)
		}
	}
}
