import grails.util.Environment
import ittouch.Accounts
import ittouch.AdminLevels
import ittouch.Calls
import ittouch.Clients
import ittouch.Devices
import ittouch.GroupPermissions
import ittouch.Groups
import ittouch.Marshallers
import ittouch.Messages
import ittouch.PasswordEncryption
import ittouch.People
import ittouch.Permissions
import ittouch.Recipients
import ittouch.Users

class BootStrap {

    def init = { servletContext ->
		Marshallers.register();
		//Environment.executeForCurrentEnvironment {
			//development{
				testSetup()
		//	}
		//}
    }
	
    def destroy = {
    }
	
	def testSetup(){
		try{
			def client = new Clients(clientName: "Wake Tech")
			client.save(failOnError: true, validate: false)
			def homeGroup = new Groups(client: client, groupPermission: new GroupPermissions().save(), groupName: "Main Campus")
			homeGroup.save(failOnError: true, validate: false)
			def level = new AdminLevels(client: client, adminLevel: 0, adminLevelName: "Wake Tech Technician")
			level.save(failOnError: true, validate: false)
			
			def salt = "test"
			def init = "test"
			def password = PasswordEncryption.encrypt(salt, init)
			
			def acc = new Accounts(salt: salt, password: password, userName: "brandon")
			acc.save(failOnError: true, validate: false)
			def user = new Users(account: acc, groupid: homeGroup, client: client, level: level);
			user.save(failOnError: true, validate: false)
			
			def client2 = new Clients(clientName: "NC State")
			client2.save(failOnError: true, validate: false)
			def homeGroup2 = new Groups(client: client2, groupPermission: new GroupPermissions().save(), groupName: "Engineering Dept.")
			homeGroup2.save(failOnError: true, validate: false)
			def salt2 = "test"
			def init2 = "test"
			def password2 = PasswordEncryption.encrypt(salt2, init2)
			def acc2 = new Accounts(salt: salt2, password: password2, userName: "brandon2")
			acc2.save(failOnError: true, validate: false)
			def level2 = new AdminLevels(client: client2, adminLevel: 3, adminLevelName: "NC State Admin")
			level2.save(failOnError: true, validate: false)
			def user2 = new Users(account: acc2, groupid: homeGroup2, client: client2, level: level2, firstName: "Brandon", middleName: "Phillip", lastName: "Walker");
			user2.save(failOnError: true, validate: false)
			
			//def permission = new Permissions(user: user2, groupid: homeGroup2, archive: false);
			//permission.save(failOnError: true, validate: false);
			def person = new People(groupid: homeGroup2, firstName: "Stephanie", middleName: "Megan", lastName: "King")
			person.save(failOnError: true, validate: false);
			
			//No access for 2 unless admin
			def homeGroup3 = new Groups(client: client2, groupPermission: new GroupPermissions().save(), groupName: "Management Dept.")
			homeGroup3.save(failOnError: true, validate: false)
			def salt3 = "test"
			def init3 = "test"
			def password3 = PasswordEncryption.encrypt(salt3, init3)
			def acc3 = new Accounts(salt: salt2, password: password2, userName: "michael3")
			acc3.save(failOnError: true, validate: false)
			def level3 = new AdminLevels(client: client2, adminLevel: 0, adminLevelName: "Managment Technician")
			level3.save(failOnError: true, validate: false)
			def user3 = new Users(account: acc3, groupid: homeGroup3, client: client2, level: level3, firstName: "Michael", middleName: "Anthony", lastName: "Gagliardo");
			user3.save(failOnError: true, validate: false)
			
			def permission3 = new Permissions(user: user3, groupid: homeGroup3, archive: false);
			permission3.save(failOnError: true, validate: false);
			
			def person2 = new People(groupid: homeGroup3, firstName: "Dominic", middleName: "Francis", lastName: "Gagliardo")
			person2.save(failOnError: true, validate: false);
			
			def device = new Devices(groupid: homeGroup3, type: "Laptop", name: "Dominic's Laptop", primaryUser: person2)
			device.save(failOnError: true, validate: false);
			
			def message = new Messages(header:"Laptop Having Trouble Connecting To Wifi", message:"Hi, my laptop is currently having trouble connecting to the internet in Textiles. Can you please come and have a look at it?", source: user3)
			message.save(failOnError: true, validate: false);
			
			def message2 = new Messages(header:"Re: Laptop Having Trouble Connecting To Wifi", message:"Sure! When are you free to have me take a look at your laptop?", source: user3, replyTo: message)
			message2.save(failOnError: true, validate: false);
			
			
			def recipient = new Recipients(user: user2, message: message);
			recipient.save(failOnError: true, validate: false);
			
			def recipient2 = new Recipients(user: user3, message: message);
			recipient2.save(failOnError: true, validate: false);
			
			def call1 = new Calls(message: message, groupid: homeGroup3, user: user3, header: "Laptop Having Trouble Connecting To Wifi", person: person2, device: device);
			call1.save(failOnError: true, validate: false);
			
			
			//Michael and Brandon as people for guests
			def person3 = new People(groupid: homeGroup3, firstName: "Brandon", middleName: "Phillip", lastName: "Walker", email: "brandon.p.walker@gmail.com")
			person3.save(failOnError: true, validate: false);
			
			def person4 = new People(groupid: homeGroup3, firstName: "Michael", middleName: "Anthony", lastName: "Gagliardo", email: "magaglia@ncsu.edu")
			person4.save(failOnError: true, validate: false);
			
		} catch(Exception e){
			e.println()
		}
	}
}
