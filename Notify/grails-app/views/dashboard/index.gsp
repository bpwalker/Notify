<head>
	<meta name='layout' content='main'/>
</head>
<body>
	<div id="search_bar">
		<g:form name="search" controller="search">
			<div class="field">
				<label for="username">Search: </label>
				<span class="fill"><g:textField name="username"/></span>
			</div>
	</g:form>
	</div>
	<div class="main_container" id="main_menu">
		<div class="main_container_title">
			<p>Main</p>
			<g:img dir="images" file="div_expand.png"/>
		</div>
		<div class="content">
			<table class="menu_table">
				<tr>
					<td onclick="<g:remoteFunction update='listView' action='ajaxCalls'/>"><g:img dir="images" file="call_icon_normal.png" id="Calls"/></td>
					<td onclick="<g:remoteFunction update='listView' action='ajaxDevices'/>"><g:img dir="images" file="device_icon_normal.png" id="Devices"/></td>
					<td onclick="<g:remoteFunction update='listView' action='ajaxPeople'/>"><g:img dir="images" file="person_icon_normal.png" id="People"/></td>
					<td onclick="<g:remoteFunction update='listView' action='ajaxMessages'/>"><g:img dir="images" file="message_icon_normal.png" id="Messages"/></td>
				</tr>
			</table>
		</div>
	</div>
	<div class="main_container" id="current_action">
		<div class="main_container_title">
			<p>Current Action</p>
			<g:img dir="images" file="div_expand.png"/>
		</div>
		<div class="content" id="listView">
		</div>
	</div>
	<div class="main_container" id="detailed_view">
		<div class="main_container_title">
			<p>Detailed View</p>
			<g:img dir="images" file="div_expand.png"/>
		</div>
		<div class="content" id="detailView">
		</div>
	</div>
	<g:if test="${session.account.user.isAdmin()}">
		<div class="main_container" id="admin_toolbox">
			<div onclick="<g:remoteFunction update='assignTicket' action='loadTickets'/>" class="main_container_title">
				<p>Administrative Toolbox</p>
				<g:img dir="images" file="div_expand.png"/>
			</div>
			<div class="content">
				<div class="assignTicket" id="assignTicket">		 
				</div>
			</div>
		</div>
	</g:if>
</body>