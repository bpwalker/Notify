
package ittouch

class DashboardController {

    def dashboard() {
		render(view: "index", model:[])
	}
	
	def ajaxMessages(){
		render "";
	}
	
	def ajaxCalls(){
		render(view: "calls", model:["calls": Calls.hasAccess(session.account.user, null).listDistinct(), "user": session.account.user]);
	}
	
	def ajaxDevices(){
		render(view: "devices", model:["devices": Devices.hasAccess(session.account.user, null).listDistinct(), "user": session.account.user]);
	}
	
	def ajaxPeople(){
		render(view: "people", model:["people": People.hasAccess(session.account.user, null).listDistinct(), "user": session.account.user]);
	}
	
	def ajaxCall(){
		render(view: "call", model:["call": Calls.hasAccess(session.account.user, params.call as Long).get(), "user": session.account.user]);
	}
	
	def ajaxDevice(){
		render(view: "device", model:["device": Devices.hasAccess(session.account.user, params.device as Long).get(), "user": session.account.user]);
	}
	
	def ajaxPerson(){
		println params.person
		render(view: "person", model:["person": People.hasAccess(session.account.user, params.person as Long).get(), "user": session.account.user]);
	}
	
	def assignTicket(){
		println "here"
		if(params.ticket  && params.user){
			try{
				def account = Accounts.get(session.account.id)
				def ticket = Tickets.get(params.ticket);
				def user = Users.get(params.user);
				
				def message = new Messages(header: ticket.description, message: ticket.problem, readStatus: 0, source: account.user);
				message.save(failOnError: true);
				def rec1 = new Recipients(user: account.user, message: message);
				rec1.save(failOnError: true);
				def rec2 = new Recipients(user: user, message: message);
				rec2.save(failOnError: true);
				def call = new Calls(message: message, user: user, groupid: ticket.person.groupid, header: ticket.description, person: ticket.person, currentStatus: 0);
				call.save(failOnError: true);
				
				ticket.delete(failOnError: true);
			} catch(Exception e){
				println e
			}
		}	
		redirect(action:"loadTickets")
	}
	
	def loadTickets(){
		def account = Accounts.get(session.account.id)
		render(view: "assignTicket", model:["tickets": Tickets.findAllByClient(account.user.client), "users": Users.notArchived.hasAccess(account.user, null).list()])
	}
	
	def loadTicketDetail(){
		def account = Accounts.get(session.account.id)
		if (params.name){
			render(view: "ticketDetail", model: ["ticket": Tickets.get(params.name)])
		}
	}
}
