const { Telegraf } = require('telegraf')

const bot = new Telegraf("5135051278:AAFDQZEzzNhSI0KKHetE1RylwXHHNAPOGUQ")

const { fetchJson, range, parseMarkdown } = require('./lib/function')
const help = require('./lib/help')
const tele = require('./lib/tele')
const fs = require('fs')
const { 
  exec
} = require('child_process')
const premium = JSON.parse(fs.readFileSync('./database/user/premium.json'))

//const das consultas e vips
const sinespApi = require('sinesp-api');
const { CNPJ } = require('cnpj-consulta');
const cep = require('cep-promise');
const ip = require('ip-promise');
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const ownerID = [`${setting.ownerID}`]

const grupvipID = [`${setting.grupvipID}`]
ifindApikey = setting.ifindApikey

const chalk = require('chalk')
const os = require('os')
const { apikey, bot_token, owner, ownerLink, version, prefix} = JSON.parse(fs.readFileSync(`./src/config.json`))


//Ligando o Bot caso ele consiga acessar o token 



bot.command('start', async(lxrd) => {
    user = tele.getUser(lxrd.message.from)
    await help.start(lxrd, user.full_name)
    
})
bot.command('menu', async(lxrd) => {
    user = tele.getUser(lxrd.message.from)
    await help.help(lxrd, user.full_name, lxrd.message.from.id.toString())
})

bot.on("callback_query", async(lxrd) => {
    cb_data = lxrd.callbackQuery.data.split("-")
    user_id = Number(cb_data[1])
    if (lxrd.callbackQuery.from.id != user_id) return lxrd.answerCbQuery("COMPRE ACESSO VIP PRA ACESSAR O BOTÃO", { show_alert: true })
    callback_data = cb_data[0]
    user = tele.getUser(lxrd.callbackQuery.from)
    const isGroup = lxrd.chat.type.includes("group")
    const groupName = isGroup ? lxrd.chat.title : ""
    if (!isGroup) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ AÇÕES ]"), chalk.whiteBright(callback_data), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name))
    if (isGroup) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ AÇÕES ]"), chalk.whiteBright(callback_data), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name), chalk.greenBright("no"), chalk.whiteBright(groupName))
    if (callback_data == "help") return await help[callback_data](lxrd, user.full_name, user_id)
    await help[callback_data](lxrd, user_id.toString())
})

bot.on("message", async(lxrd) => {
    try {
        const body = lxrd.message.text || lxrd.message.caption || lxrd.from.id || ""
        comm = body.trim().split(" ").shift().toLowerCase()
        cmd = false
        if (prefix != "" && body.startsWith(prefix)) {
            cmd = true
            comm = body.slice(1).trim().split(" ").shift().toLowerCase()
        }
        user_id = lxrd.from.id
        const command = comm
        const args = await tele.getArgs(lxrd)
        const user = tele.getUser(lxrd.message.from)
        
        

        const reply = async(text) => {
            for (var x of range(0, text.length, 4096)) {
                return await lxrd.replyWithMarkdown(text.substr(x, 4096), { disable_web_page_preview: true })
            }
        }
        
        
        
        
        
        const isCmd = cmd
        const isGroup = lxrd.chat.type.includes("group")
        const groupName = isGroup ? lxrd.chat.title : ""
        
        ///const de vip 
        const sender = lxrd.from.id || lxrd.chat.id
        const lx = "```"
        const tesk = args.join(" ")
       
      const isPrem = premium.includes(sender)
        
        const isOwner = ownerID[0].includes(sender)
        var fome = [5067459024]
        const isImage = lxrd.message.hasOwnProperty("photo")
        const isVideo = lxrd.message.hasOwnProperty("video")
        const isAudio = lxrd.message.hasOwnProperty("audio")
        const isSticker = lxrd.message.hasOwnProperty("sticker")
        const isContact = lxrd.message.hasOwnProperty("contact")
        const isLocation = lxrd.message.hasOwnProperty("location")
        const isDocument = lxrd.message.hasOwnProperty("document")
        const isAnimation = lxrd.message.hasOwnProperty("animation")
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation

        const quotedMessage = lxrd.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.hasOwnProperty("photo")
        const isQuotedVideo = quotedMessage.hasOwnProperty("video")
        const isQuotedAudio = quotedMessage.hasOwnProperty("audio")
        const isQuotedSticker = quotedMessage.hasOwnProperty("sticker")
        const isQuotedContact = quotedMessage.hasOwnProperty("contact")
        const isQuotedLocation = quotedMessage.hasOwnProperty("location")
        const isQuotedDocument = quotedMessage.hasOwnProperty("document")
        const isQuotedAnimation = quotedMessage.hasOwnProperty("animation")
        const isQuoted = lxrd.message.hasOwnProperty("reply_to_message")

        var typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = "Image"
        else if (isVideo) typeMessage = "Video"
        else if (isAudio) typeMessage = "Audio"
        else if (isSticker) typeMessage = "Sticker"
        else if (isContact) typeMessage = "Contact"
        else if (isLocation) typeMessage = "Location"
        else if (isDocument) typeMessage = "Document"
        else if (isAnimation) typeMessage = "Animation"

        if (!isGroup && !isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ PRIVADO ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name))
        if (isGroup && !isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[  GRUPO  ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name), chalk.greenBright("no"), chalk.whiteBright(groupName))
        if (!isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ COMANDO ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name))
        if (isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ COMANDO ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name), chalk.greenBright("no"), chalk.whiteBright(groupName))

        var file_id = ""
        if (isQuoted) {
            file_id = isQuotedImage ? lxrd.message.reply_to_message.photo[lxrd.message.reply_to_message.photo.length - 1].file_id :
                isQuotedVideo ? lxrd.message.reply_to_message.video.file_id :
                isQuotedAudio ? lxrd.message.reply_to_message.audio.file_id :
                isQuotedDocument ? lxrd.message.reply_to_message.document.file_id :
                isQuotedAnimation ? lxrd.message.reply_to_message.animation.file_id : ""
        }
        var mediaLink = file_id != "" ? await tele.getLink(file_id) : ""

        switch (command) {
        	case 'vipid':
				
					
					
					console.log(isPrem)
					console.log(sender)
					console.log(isOwner)
					
					break
            case 'addvip':
				
					if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					addp = args.join(" ")
					fome.push(`${addp}`)
					
					
					reply(`Adicionado com sucesso ${addp} para a lista premium`)
					break
case 'dellvip':
				if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					oh = args.join(" ")
					delp = premium.indexOf(oh)
					premium.splice(delp, 1)
					fs.writeFileSync('./database/user/premium.json', JSON.stringify(premium))
					reply(`Excluído com sucesso ${oh} Da Lista VIP`)
					break				
		case 'listprem':
				if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					
					 
					teks = `╭─「 *ID DE USUÁRIOS VIP* 」\n`
					no = 0
					for (let prem of fome) {
						no += 1
						teks += `│「${no.toString()}」 ${lx}${prem}${lx}\n`
					}
					
					teks += `│\n│ ID de usuários VIP : ${fome.length}\n╰───「 *Loli search* 」`
					reply(teks.trim())  
					break
case 'print': 
const user = tele.getUser(lxrd.message.from)
a = premium.data.replace(/"/g, '')
console.log(a)


break
case 'API':
const teski = args.join(" ")

var lxrd = "python3 api.py `${teski}`"

exec(lxrd, (err) => {

if(err) return reply(`${err}`)

})

const res = JSON.parse(fs.readFileSync(`./src/consulta.json`))

reply(`*「 C O N S U L T A S 」*
╴
「⎋」 *RESPOSTA EM JSON*: ${res}
「⎋」 *RESPOSTA EM STRING*: ${res.cpf}


ETC VC VAI ENTENDER

╴
×•-•-•⟮ Consulta ⟯•-•-•×`)


break




            case 'menu':
            case 'help':
                await help.help(lxrd, user.full_name, lxrd.message.from.id.toString())
                break
case 'ip': 
 if (!isPrem) return reply('Você não é vip')            
if (args.length == 0) return reply('Coloque uma IP para puxar.')
ip(`${args.join(" ")}`)
  .then(async (dados) => {
  console.log(dados);
				await reply(`*「 C O N S U L T A╷D E╷I P 」*
╴
「⎋」 *Cidade*: ${lx} ${dados.city}${lx} 
「⎋」 *Estado*: ${lx} ${dados.state}${lx} 
「⎋」 *País*: ${lx} ${dados.country}${lx} 
  
  `)
  
  	}).catch(async (err) => {
				console.log(err)
				await reply('ip não encontrado.')
				})
             break

case 'site':
if (args.length == 0) return reply('Coloque uma site para fazer a consulta!!!.')		
if (!isPrem) return reply('Você não é vip')		
				
					var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://ostone.dev/buceta/dominio.php?&key=uuepaaa',
  params: {lista: `${tesk}`},
  
};

axios.request(options).then(function (response) {
	console.log(response.data.replace('<br>',' '));
	reply(response.data.replace(/<br>/g, '\n'))
}).catch(function (error) {
	console.error(error);
	 
})

					break

            case 'setkey':
if (args.length < 1) return
if (!isOwner) return reply(ind.ownerb())
ifindApikey = tesk
setting.ifindApikey = ifindApikey
fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
reply(`key do iFind foi mudado para : ${ifindApikey}`)
break

            case 'cpf':
            if (!isVip) return reply('Você não é vip')
                if (args.length == 0) return await reply(`Coloque o cpf pra consultar`)
                
                 result = await fetchJson(`http://cafecomleite.me/api/cadsus_cpf.php?token=xama&cpf=${tesk}`)
                if (result.erro) return reply('key expirada entre em contato com @lxrd_kiny ou @zyobu para adquirir uma key')  
                text = `
               
          ══════════════════════
😀  CONSULTA VIP REALIZADA  😀
══════════════════════

• USUÁRIO: ${user.full_name}
• GRAU QUALIDADE: ${result.grauQualidade}
• CNS: ${result.numeroCns}
• NOME: ${result.nome}
• NOME SOCIAL: ${result.nomeSocial}
• DATA NASCIMENTO: ${result.dataNascimento}
• NOME MAE: ${result.nomeMae}
• NOME PAI: ${result.nomePai}
• SEXO: ${result.sexo}
• SEXO DESCRICAO: ${result.sexoDescricao}
• RACA COR: ${result.racaCor}
• RACA COR DESCRICAO: ${result.racaCorDescricao}
• ETNIA INDIGENA: ${result.etniaIndigena}
• TIPO SANGUINEO: ${result.tipoSanguineo}
• NACIONALIDADE: ${result.nacionalidade}
• PAIS NASCIMENTO CODIGO: ${result.paisNascimentoCodigo}
• PAIS NASCIMENTO: ${result.paisNascimento}
• MUNICIPIO NASCIMENTO CODIGO: ${result.municipioNascimentoCodigo}
• MUNICIPIO NASCIMENTO: ${result.enderecoMunicipio}

EMAIL ENCONTRADOS

• EMAIL CODIGO: SEM INFORMAÇÃO
• EMAIL DESCRICAO: SEM INFORMAÇÃO
• EMAIL PRINCIPAL VALIDADO: ${result.emailPrincipalValidado}
• EMAIL ALTERNATIVO VALIDADO: ${result.emailAlternativoValidado}
• NOMADE: ${result.nomade}

• ENDERECO CODIGO: ${result.enderecoCodigo}
• ENDERECO TIPO LOGRADOURO: ${result.enderecoTipoLogradouro}
• ENDERECO TIPO LOGRADOURO CODIGO: ${result.enderecoTipoLogradouroCodigo}
• ENDERECO LOGRADOURO: ${result.enderecoLogradouro}
• ENDERECO NUMERO: ${result.enderecoNumero}
• ENDERECO COMPLEMENTO: ${result.enderecoComplemento}
• ENDERECO BAIRRO CODIGO: ${result.enderecoBairroCodigo}
• ENDERECO BAIRRO: ${result.enderecoBairro}
• ENDERECO CEP: ${result.enderecoCep}
• ENDERECO MUNICIPIO CODIGO: ${result.enderecoMunicipioCodigo}
• ENDERECO MUNICIPIO: ${result.enderecoMunicipio}
• PAIS RESIDENCIA CODIGO: ${result.paisResidenciaCodigo}
• PAIS RESIDENCIA DESCRICAO: ${result.paisResidenciaDescricao}

TELEFONE ENCONTRADOS

• CODIGO: ${result.telefone[0].codigo}
• TIPO: ${result.telefone[0].tipo}
• DDD: ${result.telefone[0].ddd}
• NUMERO: ${result.telefone[0].numero}
• TIPO DESCRICAO: ${result.telefone[0].tipoDescricao}

• CPF: ${result.cpf}
• ENCONTRADO RECEITA: ${result.encontradoReceita}

RG DADOS ENCONTRADOS

• RG CODIGO: SEM INFORMAÇÃO
• RG NUMERO: SEM INFORMAÇÃO
• RG DATA EMISSAO: SEM INFORMAÇÃO
• RG ORGAO EMISSOR: SEM INFORMAÇÃO
• RG ORGAO EMISSOR DESCRICAO: SEM INFORMAÇÃO
• RG UF: SEM INFORMAÇÃO


CERTIDAO DADOS ENCONTRADOS

• CERTIDAO CODIGO: SEM INFORMAÇÃO
• CERTIDAO TIPO: ${result.certidao}
• CERTIDAO MODELO: SEM INFORMAÇÃO
• CERTIDAO CARTORIO: SEM INFORMAÇÃO
• LIVRO: SEM INFORMAÇÃO
• FOLHA: SEM INFORMAÇÃO
• TERMO: SEM INFORMAÇÃO
• DATA EMISSAO CERTIDAO: SEM INFORMAÇÃO


• Canal: https://t.me/kinyreferencias      
                
                
    
                `
                
                
                
                
                lxrd.replyWithMarkdown(text, {
        reply_markup: {
            inline_keyboard: [
            [
                    { text: 'DELETAR🚮', callback_data: 'cpf-' + lxrd.message.from.id},
                    
                    
                ],
                
            ]
        }
    })
                break
case 'cnpj':
if (args.length == 0) return reply('Coloque uma CNPJ para puxar.')				
					var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://ostone.dev/buceta/cnpj.php?lista=&key=uuepaaa',
  params: {lista: `${tesk}`},
  
};

axios.request(options).then(function (response) {
	console.log(response.data.replace(/<br>/g, '\n'));
	let text = response.data.replace(/<br>/g, '\n').replace(/•/g, '「⎋」')
	
 lxrd.replyWithMarkdown(text, {
        reply_markup: {
            inline_keyboard: [
            [
                    { text: 'APAGAR', callback_data: 'cnpj-' + lxrd.message.from.id},
                    
                    
                ],
                
            ]
        }
    })
    
	
}).catch(function (error) {
	console.error(error);
	 
})



					break

case 'cep': 
             
if (args.length == 0) return reply('Coloque uma CEP para puxar.')
if (!isPrem === true) return reply('Você não é vip')
cep(`${args.join(" ")}`)
  .then(async (dados) => {
  console.log(dados);
				await reply(`*「 C O N S U L T A╷D E╷C E P 」*
╴
「⎋」 *Cep*: ${lx} ${dados.cep}${lx} 
「⎋」 *Cidade*: ${lx} ${dados.city}${lx} 
「⎋」 *Estado*: ${lx} ${dados.state}${lx} 
「⎋」 *R°*: ${lx} ${dados.street}${lx} 
「⎋」 *Bairro*: ${lx} ${dados.neighborhood}${lx} 
  
  `)
  
  	}).catch(async (err) => {
				console.log(err)
				await reply('CEP não encontrado.')
				})
             break


            case 'cnpj2':
            if (args.length == 0) return reply('Coloque uma CPNJ para puxar.')
    
            CNPJ.info(`${args.join(" ")}`)
  .then(async (dados) => {
    console.log(dados);
    await reply(`*「 C O N S U L T A╷D E╷C N P J 」*
╴
「⎋」 *CNPJ*: ${lx} ${dados.cnpj}${lx} 
「⎋」 *Nome*: ${lx} ${dados.nome} ${lx}
「⎋」 *Abertura*: ${lx} ${dados.abertura}${lx} 
「⎋」 *Tipo*: ${lx} ${dados.tipo}${lx} 
「⎋」 *UF*: ${lx} ${dados.uf}${lx} 
「⎋」 *Fantasia*: ${lx} ${dados.fantasia}${lx} 
「⎋」 *Situação*: ${lx} ${dados.situacao}${lx} 
「⎋」 *Bairro*: ${lx} ${dados.bairro}${lx} 
「⎋」 *Logradouro*: ${lx} ${dados.logradouro}${lx} 
「⎋」 *N°*: ${lx} ${dados.numero}${lx} 
「⎋」 *CEP*: ${lx} ${dados.cep}${lx} 
「⎋」 *Municipio*: ${lx} ${dados.municipio}${lx} 
「⎋」 *Telefone*: ${lx} ${dados.telefone}${lx} 
「⎋」 *email*: ${lx} ${dados.email}${lx} 

  
  `)
    
    
    
  }).catch(err => {
    console.log(err);
  });
            break

case 'p':


	if (fome.includes(sender) == true) {  
    //Codigo se for verdadeiro  
	if (args.length == 0) return reply('Coloque uma CEP para puxar.')

cep(`${args.join(" ")}`)
  .then(async (dados) => {
  console.log(dados);
				await reply(`*「 C O N S U L T A╷D E╷C E P 」*
╴
「⎋」 *Cep*: ${lx} ${dados.cep}${lx} 
「⎋」 *Cidade*: ${lx} ${dados.city}${lx} 
「⎋」 *Estado*: ${lx} ${dados.state}${lx} 
「⎋」 *R°*: ${lx} ${dados.street}${lx} 
「⎋」 *Bairro*: ${lx} ${dados.neighborhood}${lx} 
  
  `)
  
  	}).catch(async (err) => {
				console.log(err)
				await reply('CEP não encontrado.')
				})
	
	

    } else {  
     reply('VOCE NÃO É UM USARIO NO BANCO DE DADOS.')
     reply('😔')
    //codigo se falso  
    }
break

case 'placa':
			
				if (args.length == 0) return reply('Coloque uma placa para puxar.')
				
				sinespApi.search(`${args.join(" ")}`).then(async (dados) => {
					console.log(dados);
				await reply(`*「 C O N S U L T A╷D E╷P L A C A 」*
╴
「⎋」 *Placa*: ${lx} ${dados.placa}${lx} 
「⎋」 *Situação*: ${lx} ${dados.situacao}${lx} 
「⎋」 *Modelo*: ${lx} ${dados.modelo}${lx} 
「⎋」 *Marca*: ${lx} ${dados.marca}${lx} 
「⎋」 *Cor*: ${lx} ${dados.cor}${lx} 
「⎋」 *Ano*: ${lx} ${dados.ano}${lx} 
「⎋」 *Ano modelo*: ${lx} ${dados.anoModelo}${lx} 
「⎋」 *Estado*: ${lx} ${dados.uf}${lx} 
「⎋」 *Município*: ${lx} ${dados.municipio}${lx} 
「⎋」 *Chassi*: ${lx} ${dados.chassi}${lx} 
「⎋」 *Roubo/Furto*: ${lx} ${dados.dataAtualizacaoRouboFurto}${lx} 
「⎋」 *Características Veículo*: ${lx} ${dados.dataAtualizacaoCaracteristicasVeiculo}${lx} 
「⎋」 *Atualização Alarme*: ${lx} ${dados.dataAtualizacaoAlarme}${lx} 
╴
×•-•-•⟮ Base Sinesp ⟯•-•-•×`)

				}).catch(async (err) => {
				console.log(err)
				await reply('Placa não encontrada.')
				})
				
				break
 

            case 'id':
            
            await reply(`${lxrd.message.from.id}`)
            break
            case 'grupid':
           
            
            await reply(`${groupID}`)
            break
default:

if (body.startsWith('$')){
if (!isOwner) return 
var konsol = body.slice(1)
exec(konsol, (err, stdout) => {
if(err) return reply(`${err}`)
if (stdout) {
reply(`${stdout}`)
}
})
} 

            
        }//cases e defaut
        
        
        
        
  } catch (e) {
        console.log(chalk.whiteBright("├"), chalk.cyanBright("[  E R R O  4 0 4  ]"), chalk.redBright(e))
  }
}); 
bot.launch()
bot.telegram.getMe().then((getme) => {
    itsPrefix = (prefix != "") ? prefix : "Sem prefixo"
    console.log(chalk.greenBright(' ===================================================='))
    console.log(chalk.greenBright(" │ + Proprietário    : " + owner || ""))
    console.log(chalk.greenBright(" │ + Nome do bot : " + getme.first_name || ""))
    console.log(chalk.greenBright(" │ + Versão  : " + version || ""))
    console.log(chalk.greenBright(" │ + Host     : " + os.hostname() || ""))
    console.log(chalk.greenBright(" │ + Plataforma : " + os.platform() || ""))
    console.log(chalk.greenBright(" │ + Prefix   : " + itsPrefix))
    console.log(chalk.greenBright(' ===================================================='))
    console.log(chalk.whiteBright('╭─── [ REGISTROS ]'))
})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))