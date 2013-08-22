<div class="small_field">
	<label>Select Device:</label>
	<span class="fill">
		<g:select size="10" optionKey="id" optionValue="${{it.name + ' -- ' + (it.macAddress ?: 'Not Found')}}" name="device" from='${devices}'/>
	</span>
</div>