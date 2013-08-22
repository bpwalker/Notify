package ittouch

class LoginController {

    def index() { 
		render session.account.user?.id
	}
}
