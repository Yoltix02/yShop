ESX = exports['es_extended']:getSharedObject()


local sendNotif = nil
local count = 0


RegisterServerEvent('achat')
AddEventHandler('achat', function(label, qty, prix, name, total)
    count = count + 1

	local xPlayer = ESX.GetPlayerFromId(source)
	local playerMoney = xPlayer.getAccount('bank').money


    local calul = 0

    if playerMoney > total then
   
        xPlayer.addInventoryItem(name, qty)
    
        sendNotif = "succes"
    else
        calul = playerMoney - total
        sendNotif = "error"
    end
    
    print(count)
    if count <= 1 then
        if sendNotif == "succes" then
            print("test")
            xPlayer.removeAccountMoney("bank", total)
            TriggerClientEvent("notifsucces", source, total)
            TriggerClientEvent('esx:showNotification', source, 'Votre achat a bien ete effectuer')

            
        elseif sendNotif== "error" then        
            TriggerClientEvent('esx:showNotification', source, 'Il vous manque '..calul.."$")

        end

    end
end)
