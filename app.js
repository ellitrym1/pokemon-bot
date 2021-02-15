const dotenv = require("dotenv")
dotenv.config()
const fetch = require("node-fetch")

const discord = require("discord.js")
const client = new discord.Client()

const prefix = "/"

client.on('ready', () => {
    console.log("Ready!")
})

client.on('message', (msg) => {
    if(!msg.content.startsWith(prefix)){
        return
    }

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const msgEmbed = new discord.MessageEmbed()
    // console.log(command)
    // console.log(args)
    
    if(command === 'poke'){
        if(args[0] === 'pic'){
            const pokeIndex = args[1]
            if(pokeIndex != null){
                if(pokeIndex != 0){
                    if(pokeIndex === 'random'){
                        getPokemon(getRandom(1, 898))
                            .then(res => {
                                msgEmbed
                                    .setTitle(res.name)
                                    .setImage(res.sprites.front_default)
                                    // .image(
                                    //     {
                                    //         url: res.sprites.front_default,
                                    //         height: 200,
                                    //         width: 200
                                    //     }
                                    // )
                                // msg.channel.send(res.name, { files: [res.sprites.front_default]})
                                msg.channel.send(msgEmbed)
                            })
                    }
                    else{
                        getPokemon(args[1])
                            .then(res => {
                                msgEmbed
                                    .setTitle(res.name)
                                    .setImage(res.sprites.front_default)
                                // msg.channel.send(res.name, { files: [res.sprites.front_default]})
                                msg.channel.send(msgEmbed)
                            })
                            .catch(err => {
                                console.log(err)
                                msgEmbed
                                    .setTitle("Oops!")
                                    .setDescription("Pokemon doesn't exist!")
                                // msg.channel.send(res.name, { files: [res.sprites.front_default]})
                                msg.channel.send(msgEmbed)
                                // msg.channel.send("Pokemon doesn't exist!")
                            })
                    }
                }
                else{
                    // msg.channel.send("pokemonId cannot be 0 / null")
                    msgEmbed
                        .setTitle("Oops!")
                        .setDescription("pokemonId cannot be 0 / null")
                        msg.channel.send(msgEmbed)
                }
            }
            else{
                // msg.channel.send("Syntax: /poke pic {pokemonId / pokemonName}")
                msgEmbed
                    .setTitle("Oops!")
                    .setDescription("Syntax: /poke pic {pokemonId / pokemonName}")
                    msg.channel.send(msgEmbed)
            }
        }
        else if(args[0] === 'info'){

        }
        else if(args[0] === 'help'){
            msgEmbed
                .setTitle("Help")
                .setThumbnail("https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg12.deviantart.net%2F2e51%2Fi%2F2016%2F158%2Fe%2F0%2Fflat_pokeball_by_himitsunochikara-d6v7eyk.png&f=1&nofb=1")
                .addFields(
                    {
                        name: 'Picture',
                        value: '/poke pic {random / pokemonId (1 - 898) / pokemonName}'
                    },
                    {
                        name: 'Info',
                        value: '/poke info {random / pokemonId (1 - 898) / pokemonName}'
                    }
                )
            msg.channel.send(msgEmbed)
        }
        else{
            // msg.channel.send("For available uses, /poke help")
            msgEmbed
                .setTitle("Oops!")
                .setDescription("For available uses, /poke help")
                msg.channel.send(msgEmbed)
        }
    }

})

function getPokemon(index){
    url = "https://pokeapi.co/api/v2/pokemon/" + index;
    pokeDataJson = fetch(url)
        .then(data => {
            return data.json()
        })
        .then(json => {
            return json
        })
        .catch(err => {
            console.log(err)
        })

    return pokeDataJson
}

function getRandom(min, max){
    num = Math.random() * (max - min) + min
    return Math.round(num)
}

client.login(process.env.TOKEN)