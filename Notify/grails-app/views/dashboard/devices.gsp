<table class="object_table output">
	<tr>
		<th> Type </th>
		<th> Name </th>
		<th> Group </th>
		<th> Primary User</th>
	</tr>
	<g:each in="${devices}" status="i" var="device">
		<tr>
			<td onclick="${remoteFunction(update:'detailView', action:'ajaxDevice', params:['device': device.id])}">${device.name}</td>
			<td>${device.type}</td>
			<td>${device.groupid.groupName}</td>
			<td>${device.primaryUser.getFullName()}</td>
		</tr>
	</g:each>
</table>