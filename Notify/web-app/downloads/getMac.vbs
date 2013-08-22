On error resume next
Dim ClipBoard

strComputer = "localhost"
if (strComputer <> Empty) Then

			Set objWMIServices = GetObject("winmgmts:\\" & strComputer & "\root\cimv2")
			Set colItems5 = objWMIServices.ExecQuery("Select * from Win32_NetworkAdapterConfiguration WHERE IPEnabled = 'True'",,48)

			For Each objItem in colItems5
				strMAC = objItem.MACAddress
			Next
End If


Set objIE = CreateObject("InternetExplorer.Application")
objIE.Navigate("about:blank")
objIE.document.parentwindow.clipboardData.SetData "text", "" + strMAC
objIE.Quit

Wscript.Echo "MAC Address has been copied. Please paste in the correct textfield."