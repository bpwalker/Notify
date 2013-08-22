<table class="object_table output">
	<tr>
		<th> Name </th>
		<th> Group </th>
		<th> Email </th>
		<th> Phone Number </th>
	</tr>
	<g:each in="${people}" status="i" var="person">
		<tr>
		   <td onclick="${remoteFunction(update:'detailView', action:'ajaxPerson', params:['person': person.id])}">${person.getFullName()}</td>
		   <td>${person.groupid.groupName}</td>
		   <td>${person.email}</td>
		   <td>${person.phoneNumber}</td>
		</tr>
		   
	</g:each>
</table>