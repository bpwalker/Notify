package ittouch

import grails.converters.JSON

import org.hibernate.criterion.CriteriaSpecification
import org.springframework.web.context.request.RequestContextHolder

class Groups extends Audit {

	static hasMany = [calls : Calls, devices : Devices, notes : Notes, people : People, permissions : Permissions, users : Users];
	static hasPermission = {val, obj -> !val || Groups.notArchived.hasAccess(RequestContextHolder.currentRequestAttributes().session.account.user, null).listDistinct().any{it.id == val.id}}
	
	//
	
	//GroupPermissions groupPermission;
	Clients client;
	String groupName;
	Groups parentGroup;
	
	def static search(user, field, id){
		/*
		if(field.equalsIgnoreCase("clients")){
			return Groups.withCriteria {
				
			}
		}*/
		if(field.equalsIgnoreCase("groups")){
			return Groups.withCriteria {
				eq("parentGroup", Groups.notArchived.hasAccess(user, id).get())
				eq("archive", false)
			}
		}
	}
	
	static constraints = {
		parentGroup validator: Groups.hasPermission
		client validator: Clients.hasPermission
		groupName nullable: true
		parentGroup nullable: true
	}
	
	public Groups(String data){
		bind(data);
	}
	
	def bind(String data){
		def map = JSON.parse(data);
		client = Clients.notArchived.get(map["CLIENT_ID"]);
		groupName = map["GROUP_NAME"];
	}
	
	def static register(){
		JSON.registerObjectMarshaller(Groups) {
			return [
					GROUP_ID: it?.id,
					CLIENT_ID: it?.client?.id,
					GROUP_NAME: it?.groupName,
					PARENT_GROUP: it?.parentGroup/*,
					ADD_WHO: it.addWho.id,
					EDIT_WHO: it.editWho.id,
					ADD_DATE: it.dateCreated,
					EDIT_DATE: it.lastUpdated*/
			]
		}
	}
	
	static namedQueries = {
	
		archived {
			eq("archive", true)
		}
		
		notArchived {
			eq("archive", false)
		}
		
		hasAccess { user, groupid ->
			if(groupid){
				eq("id", groupid)
			}
			createAlias("client.users.permissions", "p", CriteriaSpecification.LEFT_JOIN)
			or{
				and{
					if(groupid){
						eq("p.groupid.id", groupid)
					}
					eq ("p.archive", false)
					eq("id", user.id)
				}
				client{
					users{
						level{
							eq("archive", false)
							gt("adminLevel",0)
							eq("id", user.id)
						}
					}
				}
			}
		}
		
	}
	
	static canEdit = {
		canRead
	}
}
