package ittouch

class Accounts extends Audit {

	static hasOne = [user: Users]
	
	String userName;
	String password;
	String salt;
	
    static constraints = {
    }
	
	static namedQueries = {
		
		archived {
			eq("archive", true)
		}
		
		notArchived {
			eq("archive", false)
		}
	}
}
