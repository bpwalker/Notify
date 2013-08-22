package ittouch

class DashboardFilters {

    def filters = {
        all(controller:'dashboard', action:'*') {
            before = {
				if(!session.account){
					if(params.username && params.password){
						def username = params.username;
						def salt = Accounts.notArchived.findByUserName(username)?.salt;
						def password = PasswordEncryption.encrypt(salt, params.password);
						def account = Accounts.findByUserNameAndPassword(username, password);
						
						if(account){
							session.account = account;
							return true;
						}
					}
					redirect(uri: "/")
					return false;
				}
            }
            after = { Map model ->

            }
            afterView = { Exception e ->

            }
        }
    }
}
