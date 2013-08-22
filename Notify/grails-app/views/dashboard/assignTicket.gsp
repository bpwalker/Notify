<g:formRemote update="assignTicket" name="assignTicket" controller="dashboard" url="[controller: 'dashboard', action: 'assignTicket']">
	<table class="ticket_table">
		<tr>
			<td>
				<div class="field">
					<label for="ticket">Ticket: </label>
					<span class="fill"><g:select size="15" id="type" optionKey="${{it?.id}}" name='ticket' optionValue="${{it?.problem}}"
						noSelection="${['null':'Select One...']}"
					   	from='${tickets}' onchange="${remoteFunction(update:'ticket_form', action:'loadTicketDetail', params: '\'name=\' + this.value')}">
					</g:select></span>
				</div>
			</td>
			<td>
				<div id="ticket_form"></div>
			</td>
		</tr>
		<tr>
			<td colspan="2">
			<div class="field">
				<label for="user">User:</label>
				<span class="fill"><g:select size="10" id="type" name='user' optionKey="${{it?.id}}" optionValue = "${{it?.firstName + " " + it?.lastName}}"
					noSelection="${['null':'Select One...']}"
				   	from='${users}'></span>
				</g:select>
			</div>
			</td>
		</tr>
	</table>
	<g:actionSubmit action="assignTicket" value="Assign Ticket" />
</g:formRemote>		