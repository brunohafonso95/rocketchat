
const fs = require('fs')

module.exports = (robot) => {

  robot.hear(/meme/i, (bot) => {
    try {
      const memes = JSON.parse(fs.readFileSync('./memes/memes.json')).memes
      const room = bot.message.room
      robot.adapter.send({ room, user: {} }, {
        attachments: [
          {
            image_url: bot.random(memes).url
          }
        ]
      }); 
    } catch (error) {
      bot.send('erro ao buscar memes ' + error)
    }
  });


  robot.respond(/teste/i, (res) => {
    res.reply("makes a freshly baked pie")
  });

  robot.respond(/mind (.*)$/i, (bot) => {
    robot.http(`https://mind.indra.es/rest/api/content?title=${bot.match[1]}`)
      .header('Authorization', 'Basic YmhlbnJpcXVlYTpAaW5kcmExMTIwMTg=')
      .get()((err, res, body) => {
        if (err) {
          bot.reply("Erro ao buscar conteúdo no mind")
          robot.emit('error', err, res)
          return;
        } else {
          const result = JSON.parse(body).results
          if (!result.length) return bot.reply(`Infelizmente não há nenhum conteúdo relacionado a ${bot.match[1]} no mind`)
          for (let i = 0; i < result.length; i++) {
            bot.reply(`${i + 1} de ${result.length} dos conteútos dísponiveis no mind sobre ${result[0].title} - https://mind.indra.es/pages/viewpage.action?pageId=${result[0].id}`)
            if (i == 5) break;
          }
        }
      });
  });
}

