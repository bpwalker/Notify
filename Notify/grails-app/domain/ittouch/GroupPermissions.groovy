package ittouch

class GroupPermissions extends Audit {

	Groups groupid;
	Boolean addGroupBelow;
	Boolean deleteGroupBelow;
	Boolean addUserPermission;
	Boolean deleteUserPermission;
	Boolean addUserPermissionBelow;
	Boolean deleteUserPermissionBelow;
	Boolean addGroupPermission;
	Boolean deleteGroupPermission;
	Boolean addGroupPermissionBelow;
	Boolean deleteGroupPermissionBelow;
	Boolean addInformation;
	Boolean deleteInformation;
	Boolean addInformationBelow;
	Boolean deleteInformationBelow;
	
	
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
