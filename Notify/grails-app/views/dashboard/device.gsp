<div class="field"><label for="devicename">Name:</label><span class="fill"><g:textField name="devicename" value="${device.name}"/></span></div>
<div class="field"><label for="devicetype">Type:</label><span class="fill"><g:textField name="devicetype" value="${device.type}"/></span></div>
<div class="field"><label for="devicegroup">Group:</label><span class="fill"><g:textField name="devicegroup" value="${device.groupid.groupName}"/></span></div>
<div class="field"><label for="deviceuser">Primary User:</label><span class="fill"><g:textField name="deviceuser" value="${device.primaryUser.getFullName()}"/></span></div>
<div class="field"><label for="devicelocation">Location:</label><span class="fill"><g:textField name="devicelocation" value="${device.location}"/></span></div>
<div class="field"><label for="deviceip">IP Address:</label><span class="fill"><g:textField name="deviceip" value="${device.ipAddress}"/></span></div>
<div class="field"><label for="devicemac">MAC Address:</label><span class="fill"><g:textField name="devicemac" value="${device.macAddress}"/></span></div>