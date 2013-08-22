package ittouch

class AdminLevels extends Audit {
	
	static hasMany = [users : Users];
	
	//
	
	Clients client;
	Integer adminLevel;
	String adminLevelName;
	
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
