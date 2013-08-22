package ittouch

import grails.converters.JSON

class LoginFilters {

    def filters = {
        all(controller:'login', action:'*') {
            before = {
				
				if(!request.getContentType() == "application/json"){
					response.sendError(406);
					return false;
				}
				
				def header = JSON.parse(request.getHeader("Authentication") ?: "{}");
				
				if(!header){
					response.sendError(401);
					return false;
				}
				
				def username = header.userName;
				def salt = Accounts.notArchived.findByUserName(username)?.salt;
				def password = PasswordEncryption.encrypt(salt, header.password);
				def account = Accounts.findByUserNameAndPassword(username, password);
				
				if(!account){
					response.sendError(401);
					return false;
				}
				
				session.account = new AccountManager(account.user);
				
            }
            after = { Map model ->

            }
            afterView = { Exception e ->

            }
        }
    }
}
