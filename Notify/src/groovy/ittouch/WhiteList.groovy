package ittouch

class WhiteList {
	def static checkWhiteList(table){
		if(table.equalsIgnoreCase("Groups")){
			return;
		} else if(table.equalsIgnoreCase("People")){
			return;
		} else if(table.equalsIgnoreCase("Notes")){
			return;
		} else if(table.equalsIgnoreCase("Devices")){
			return;
		} else if(table.equalsIgnoreCase("Messages")){
			return;
		} else if(table.equalsIgnoreCase("Calls")){
			return;
		} else if(table.equalsIgnoreCase("Users")){
			return;
		} else if(table.equalsIgnoreCase("Tasks")){
			return;
		} else if (table.equalsIgnoreCase("Recipients")){
			return;
		} else if(table.equalsIgnoreCase("Permissions")){
			return;
		} else if (table.equalsIgnoreCase("Appointments")){
			return;
		} else if (table.equalsIgnoreCase("Clients")){
			return;
		}
		
		throw Exception;
	}
}
