package ittouch
import grails.converters.JSON

class Appointments extends Audit {

	Tasks task;
	People person;
	Date time;
	String note;
	
	
    static constraints = {
		task validator: Tasks.hasPermission
		person validator: People.hasPermission
		time nullable: true
		note nullable: true
    }
	
	def static search(user, field, id){
		if(field.equalsIgnoreCase("tasks")){
			return Appointments.withCriteria {
				eq("call", Tasks.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}				
		}
		if(field.equalsIgnoreCase("people")){
			return Appointments.withCriteria {
				eq("person", People.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}			
		}
	}
	
	public Appointments(String data){
		bind(data);
	} 
	
	def bind(String data){
		def map = JSON.parse(data);
		task = Tasks.notArchived.get(map["TASK_ID"]);
		person = People.notArchived.get(map["PERSON_ID"]);
		time = map["APPOINTMENT_TIME"] as Date;
		note = map["APPOINTMENT_NOTE"];
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Appointments) {
			return [
					APPOINTMENT_ID: it?.id,
					TASK_ID: it?.task?.id,
					PERSON_ID: it?.person?.id,
					APPOINTMENT_TIME: it?.time,
					APPOINTMENT_NOTE: it?.note/*,
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
		
		hasAccess { user, app ->
			if(app){
				eq("id", app)
			}
			
			eq("task.call.user", user)
			
		}
	}
}
