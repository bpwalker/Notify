package ittouch

class Tickets {
	
	String description;
	String problem;
	People person;
	Devices device;
	Clients client;
	
	
    static constraints = {
		device nullable: true
    }
}
