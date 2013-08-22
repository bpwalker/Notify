package ittouch

class SupportController {

	def index() {
		render(view: "support", model: ['clients': Clients.notArchived.list()])
	}
	
	def email(){
		def person = People.notArchived.findByEmail(params.email);
		if(person){
			person.password = "test";
			person.passwordActive = true;
			person.save(validate: false);
			
			sendMail{
				to params.email
				subject "Notify Login Password"
				body "We've received a request to access your Notify account. \nTo complete this process, please click the following link: " +  g.createLink(action:"login", absolute:true) + "?password=" + person.password + "&email=" + person.email
			}
		} else{
			render(view: "index")
		}
		render(view: "checkEmail")
	}
	
	def login(){
		def person = People.findByEmailAndPasswordAndPasswordActive(params.email, params.password, true);
		if(person){
			session.person = person.id;
			person.passwordActive = false;
			person.save(validate:false);
		}
		
		if(session.person){
			render(view: "submitTicket")
		} else{
			render(view: "checkEmail")
		}
	}
	
	def submit(){
		if(params.description && params.problem){
			def person = People.get(session.person);
			def device = Devices.get(params.device);
			def ticket = new Tickets(description: params.description, problem: params.problem, person: person, client: person.groupid.client, device: device);
			ticket.save()
			render(view: "confirmation")
		}
	}
	
	def findDevice(){
		def person = People.get(session.person)
		println params.name
		render(view: "findDevice",model: ["devices": Devices.findAllByNameIlikeOrMacAddressIlike("%" + params.name + "%", "%" + params.name + "%")]);
	}
	
	def downloadFile(){
		def file = grailsAttributes.getApplicationContext().getResource("downloads/getMac.vbs").getFile();
		response.setContentType("application/octet-stream") // or or image/JPEG or text/xml or whatever type the file is
        response.setHeader("Content-disposition", "attachment;filename=${file.name}")
        response.outputStream << file.getBytes()
	}
		
}
