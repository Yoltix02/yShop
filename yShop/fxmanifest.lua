fx_version "cerulean"
game "gta5"
lua54 'on'

client_script {
    "client.lua",
    "config.lua"

}
server_script {
    'server.lua',
    "config.lua",
    '@mysql-async/lib/MySQL.lua',
} 

shared_script {
    "config.lua",
}

ui_page {
    "html/index.html",
}

files {
    'html/*',
    'html/img/*'
}

