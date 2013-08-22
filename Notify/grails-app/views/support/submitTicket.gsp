<head>
	<meta name='layout' content='main'/>
</head>
<body>
	<div class="small_container">
	    <h2>Submit Ticket</h2>
		<g:form name="submitTicket" controller="support">
			<div class="small_field">
				<label for="problem">Problem:</label>
				<span class="fill"><g:textField name="problem"/></span>
			</div>
			<div class="small_field">
		   		<label for="description">Description:</label>
				<span class="fill"><g:textArea name="description"/></span>
			</div>
			<div class="small_field">
		   		<label for="device">Device: </label>
				<span class="fill"><g:textField name="name" onkeypress="${remoteFunction(update:'findDevice', action:'findDevice', params: '\'name=\' + this.value')}"></g:textField></span>
			</div>
			
			<div id="findDevice"></div>
			<g:link action="downloadFile">
				<input type="button" value="Find My MAC Address"/>
			</g:link>
			<g:actionSubmit action="submit" value="Submit Ticket" />
		</g:form>
	</div>
</body>