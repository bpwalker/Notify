<head>
	<meta name='layout' content='main'/>
</head>
<body>
	<div class="small_container" id="login_container">
    <h2>Login</h2>
	<g:form name="login" controller="dashboard">
		<div class="small_field">
			<label for="username">Username: </label>
			<span class="fill"><g:textField name="username"/></span>
		</div>
		<div class="small_field">
	   		<label for="password">Password: </label>
			<span class="fill"><g:passwordField name="password"/></span>
		</div>
		<g:actionSubmit action="dashboard" value="Login" />
	</g:form>
	</div>
</body>