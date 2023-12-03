RegisterNUICallback("npwd:qbx_mail:getMail", function(_, cb)
	TriggerServerEvent("npwd:qbx_mail:getMail")
	RegisterNetEvent("npwd:qbx_mail:sendMail", function(players)
		cb({ status = "ok", data = players })
	end)
end)

RegisterNUICallback("npwd:qbx_mail:updateRead", function(data, cb)
	TriggerServerEvent("npwd:qbx_mail:updateRead", data)
	cb({})
end)

RegisterNUICallback("npwd:qbx_mail:deleteMail", function(data, cb)
	TriggerServerEvent("npwd:qbx_mail:deleteMail", data)
	RegisterNetEvent("npwd:qbx_mail:mailDeleted", function(result)
		if result then
			cb({ status = "ok" })
		else
			cb({ status = "error" })
		end
	end)
end)

RegisterNUICallback("npwd:qbx_mail:updateButton", function(data, cb)
	TriggerEvent(data.button.buttonEvent, data.button.buttonData)
	TriggerServerEvent("npwd:qbx_mail:updateButton", data.mailid)
	RegisterNetEvent("npwd:qbx_mail:buttonUpdated", function(result)
		if result then
			cb({ status = "ok" })
		else
			cb({ status = "error" })
		end
	end)
end)

RegisterNetEvent('npwd:qbx_mail:newMail', function(data)
	exports.npwd:sendUIMessage({type = "npwd:qbx_mail:newMail", payload = {data}})
	exports["npwd"]:createNotification({
		notisId = "npwd:newmail",
		appId = "mail",
		content = Lang:t('newmail'),
		keepOpen = false,
		duration = 5000,
		path = "/mail",
	})
end)
