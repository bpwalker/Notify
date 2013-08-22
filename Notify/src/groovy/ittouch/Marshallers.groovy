package ittouch

class Marshallers {
	def static register(){

		Appointments.register();
		Calls.register();
		Devices.register();
		Groups.register();
		Messages.register();
		Notes.register();
		People.register();
		Permissions.register();
		Recipients.register();
		Tasks.register();
		Users.register();
		Clients.register();
	}
}
