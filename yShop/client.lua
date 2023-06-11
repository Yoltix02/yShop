local display = false

ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(500)
	end
end)

local position = {
    {x = 373.875,   y = 325.896,  z = 103.566},
    {x = 2557.458,  y = 382.282,  z = 108.622},
    {x = -3038.939, y = 585.954,  z = 7.908},
    {x = -3241.927, y = 1001.462, z = 12.830},
    {x = 547.431,   y = 2671.710, z = 42.156},
    {x = 1961.464,  y = 3740.672, z = 32.343},
    {x = 2678.916,  y = 3280.671, z = 55.241},
    {x = 1729.216,  y = 6414.131, z = 35.037},
    {x = 1135.808,  y = -982.281,  z = 46.415},
    {x = -1222.915, y = -906.983,  z = 12.326},
    {x = -1487.553, y = -379.107,  z = 40.163},
    {x = -2968.243, y = 390.910,   z = 15.043},
    {x = 1166.024,  y = 2708.930,  z = 38.157},
    {x = 1392.562,  y = 3604.684,  z = 34.980},
    {x = -48.519,   y = -1757.514, z = 29.421},
    {x = 1163.373,  y = -323.801,  z = 69.205},
    {x = -707.501,  y = -914.260,  z = 19.215},
    {x = -1820.523, y = 792.518,   z = 138.118},
    {x = 25.75,     y = -1347.36,  z = 29.5},
    {x = 1698.388,  y = 4924.404,  z = 42.063}          
}  

local itemCount = 0



RegisterNetEvent('notifsucces')
AddEventHandler('notifsucces', function(source)

    SendNUIMessage({
        type = 'vider-panier',
    })
    itemCount = 0
    SendNUIMessage({
        type = 'panier',
        item = itemCount
    })
    
end)







Citizen.CreateThread(function()
    while true do
        local interval = false        
        for k in pairs(position) do
            local plyCoords = GetEntityCoords(PlayerPedId())
            local dist = GetDistanceBetweenCoords(plyCoords, position[k].x, position[k].y, position[k].z, true)

           
            
            if dist <= 2.0 then
                interval = true
                AddTextEntry(("E"), "Appuyez sur ~INPUT_PICKUP~ ~s~pour ouvrir la superette.")
                DisplayHelpTextThisFrame("E", false)
    

                if IsControlJustPressed(1,51) then
                    SendNUIMessage({
                        type = 'panier',
                        item = itemCount
                    })

                    local item = {}
                    for k, v in pairs(Config.item.manger) do
                      local itemDiv = {}
                      itemDiv.itemlabel = v.itemlabel
                      itemDiv.itemname =  v.itemname
                      itemDiv.price = v.price
                      itemDiv.photo = v.photo
                      table.insert(item, itemDiv)
                    end
                    SendNUIMessage({
                      type = "eat",
                      list = item
                    })

                    SetDisplay(not display)
                end  
            end

            
        end
 
        if interval then
            Wait(1)
        else
            Wait(1000)
        end
    end
    
end)






RegisterNUICallback("addpanier", function (data)
    itemCount =  itemCount + data.quantity
    SendNUIMessage({
        type = 'panier',
        item = itemCount
    })
    
end)

RegisterNUICallback("removepanier", function (data)
    itemCount =  itemCount - data.quantity
    SendNUIMessage({
        type = 'panier',
        item = itemCount
    })
    
end)

--
RegisterNUICallback("exit", function(data)
    
    SetDisplay(false)
end)

RegisterNUICallback("drink", function(data)
    local shop = {}
    for k, v in pairs(Config.item.boire) do
      local itemDiv = {}
      itemDiv.itemlabel = v.itemlabel
      itemDiv.itemname =  v.itemname
      itemDiv.price = v.price
      itemDiv.photo = v.photo
      table.insert(shop, itemDiv)
    end
    SendNUIMessage({
      type = "drink",
      list = shop
    })
end)




RegisterNUICallback("other", function(data)
    local shop = {}
    for k, v in pairs(Config.item.autre) do
      local itemDiv = {}
      itemDiv.itemlabel = v.itemlabel
      itemDiv.itemname =  v.itemname
      itemDiv.price = v.price
      itemDiv.photo = v.photo
      table.insert(shop, itemDiv)
    end
    SendNUIMessage({
      type = "other",
      list = shop
    })
end)



RegisterNUICallback("eat", function(data)

    local shope = {}
    for k, v in pairs(Config.item.manger) do
      local itemDiv = {}
      itemDiv.itemlabel = v.itemlabel
      itemDiv.itemname =  v.itemname
      itemDiv.price = v.price
      itemDiv.photo = v.photo
      table.insert(shope, itemDiv)
    end
    SendNUIMessage({
      type = "eat",
      list = shope
    })
end)

RegisterNUICallback("acht", function(data)
    TriggerServerEvent('achat', data.label, data.quantity, data.price, data.name, data.total)
    
end)





RegisterNUICallback("main", function(data)
   
    SetDisplay(false)
end)


function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool,
    })
end



Citizen.CreateThread(function()
    while display do
        Citizen.Wait(100)

        DisableControlAction(0, 1, display) -- LookLeftRight
        DisableControlAction(0, 2, display) -- LookUpDown
        DisableControlAction(0, 142, display) -- MeleeAttackAlternate
        DisableControlAction(0, 18, display) -- Enter
        DisableControlAction(0, 322, display) -- ESC
        DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
        
    end
end)



Citizen.CreateThread(function()
    for k in pairs(position) do
       local blip = AddBlipForCoord(position[k].x, position[k].y, position[k].z)
       SetBlipSprite(blip, 52)
       SetBlipColour(blip, 2)
       SetBlipAsShortRange(blip, true)

       BeginTextCommandSetBlipName('STRING')
       AddTextComponentString("Superette")
       EndTextCommandSetBlipName(blip)
   end
end)