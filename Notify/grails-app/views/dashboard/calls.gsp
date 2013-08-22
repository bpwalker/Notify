<table class="object_table output">
	<tr>
		<th> Header </th>
		<th> Group </th>
		<th> User Assigned </th>
		<th> Status </th>
	</tr>
	<g:each in="${calls}" status="i" var="call">
		<tr>
		   <td onclick="${remoteFunction(update:'detailView', action:'ajaxCall', params:['call': call.id])}">${call.header}</td>
		   <td>${call.groupid.groupName}</td>
		   <g:if test="${user.isAdmin()}">
			   <td>${call.user.getFullName()}</td>
		   </g:if>
		   <td>${call.getStatus()}</td>
		</tr>
	</g:each>
</table>