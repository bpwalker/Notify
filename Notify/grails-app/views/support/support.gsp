<head>
	<meta name='layout' content='main'/>
</head>
<body>
	<div class="small_container" id="login_container">
    <h2>Login</h2>
	<g:form name="support" controller="support">
		<div class="small_field">
			<label for="client">University: </label>
			<span class="fill"><g:select id="type" name='client' 
			noSelection="${['null':'Select One...']}"
   			from='${clients.clientName}'>
   			</g:select>
   		</span>
		</div>
		<div class="small_field">
	   		<label for="email">Email: </label>
			<span class="fill"><g:textField name="email"/></span>
		</div>
		<g:actionSubmit action="email" value="Login" />
	</g:form>
	</div>
</body>