package ittouch


abstract class Audit {
	static mapping = {
		tablePerHierarchy	false
	}
	
	/*People addWho;
	People editWho;
	Date dateCreated
	Date lastUpdated*/
	Boolean archive = false;
	
	
	/*def beforeInsert() {
		addWho = session.account.user;
		editWho = session.account.user;
	}
	
	def beforeUpdate() {
		editWho = session.account.user;
	}*/
}
