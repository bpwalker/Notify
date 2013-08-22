package ittouch

import grails.converters.JSON

class AuthenticationFilters {

    def filters = {
        all(controller:'api', action:'*') {
            before = {
				try{
					WhiteList.checkWhiteList(params.resource);
					if(params.search){
						println "failed"
						WhiteList.checkWhiteList(params.search);
					}
				} catch(Exception e){
					response.sendError(400);
					return false;
				}
				
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
            after = {
                
            }
            afterView = {
                
            }
        }
    }
}
