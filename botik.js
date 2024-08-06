const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
let userState = {};
bot.start((ctx) => {
    console.log(ctx.update)
    ctx.reply(`Привет,${ctx.update.message.from.first_name}, рады тебя видеть у нас🧑🏻‍💻`, Markup
        .keyboard([
            ['О нас', 'Рассчет стоимости', 'Отзывы']   
        ]).oneTime())
});
bot.hears('О нас', (ctx)=>{
    ctx.reply('Доставляем товар с Китая/Америки ✅Poizon/95/Taobao/1688, больше у нас в канале➠https://t.me/AstanakLogistixxx/3',Markup
        .keyboard([
            ['Рассчет стоимости', 'Отзывы']
        ]).oneTime().resize())
})
bot.hears('Отзывы',(ctx)=>{
    const link = `https://t.me/AstanakLogistixxx/599`;
    ctx.reply(`${link} Много отзывов у нас в канале, остальные ищите по #отзывы`, Markup
        .keyboard([
            ['О нас','Рассчет стоимости']
        ]).oneTime().resize());
})


bot.hears('Рассчет стоимости',(ctx)=>{
    userState[ctx.from.id] = ctx.message.text
    ctx.reply('Выбирите тип товара🛍️',Markup
        .keyboard([
            ['Обувь👟', 'Штаны/Толстовки👖','Куртки🏂'],
            ['Шорты/футболки👕','Аксессуары⌚️'],
            ['В меню☞']
        ]).oneTime().resize())
})
const media =  [
    {type: 'photo',
    media: { source: '/Users/vohino-grekovo/Desktop/telegrafbot/excemple1.jpg',
    }},
    {type: 'photo',
    media: { source: '/Users/vohino-grekovo/Desktop/telegrafbot/excample2.jpg'}
    },
]

bot.hears(['Обувь👟', 'Штаны/Толстовки👖', 'Шорты/футболки👕', 'Аксессуары⌚️','Куртки🏂'], (ctx) => {
    userState[ctx.from.id] = ctx.message.text; 
    ctx.replyWithMediaGroup(media)
    ctx.reply('Введите цену в ¥💴')
   
});
bot.hears('Рассчитать ещё🧮', (ctx)=>{
    ctx.reply('Выбирите тип товара🛍️',Markup
        .keyboard([
            ['Обувь👟', 'Штаны/Толстовки👖','Куртки🏂'],
            ['Шорты/футболки👕','Аксессуары⌚️'],
            ['В меню☞']
        ]).oneTime().resize())
})
bot.hears('Оформить заказ🧾', (ctx)=>{
    ctx.reply('Для заказа пишите мне в лс @AstanakX')
})

bot.hears('В меню☞',(ctx)=>{
    console.log(ctx.update)
    ctx.reply(`Привет, ${ctx.update.message.from.first_name},рады тебя видеть у нас🧑🏻‍💻`, Markup
        .keyboard([
            ['О нас', 'Рассчет стоимости', 'Отзывы'],
        ]).oneTime().resize(),{parse_mode: 'HTML'}
    )
})
bot.on('text', (ctx) => {
    const action = userState[ctx.from.id];
    let response;
    if (action){
        const input = parseFloat(ctx.message.text);

        if (!isNaN(input)) {
            
            switch (action) {
                case 'Обувь👟':
                    response = `Сумма заказа с учётом доставки и страховки до Москвы: ${Math.floor(((input *13)+850+350)*1.1)}₽

*В другие города цена обговаривается индивидуально*

Время доставки 13-16 дней🚢
По поводу авиа доставки🛩️  писать - @AstanakX
                    `; 
                    break;
                case 'Штаны/Толстовки👖':
                    response = `Сумма заказа с учётом доставки и страховки до Москвы: ${Math.floor(((input *13)+650+150)*1.1)}₽

*В другие города цена обговаривается индивидуально*

Время доставки 13-16 дней🚢
По поводу авиа доставки🛩️  писать - @AstanakX
                        `; 
                    break;
                case 'Шорты/футболки👕':
                    response = `Сумма заказа с учётом доставки и страховки до Москвы: ${Math.floor(((input *13)+500+150)*1.12)}₽

*В другие города цена обговаривается индивидуально*

Время доставки 13-16 дней🚢
По поводу авиа доставки🛩️  писать - @AstanakX
                    `;  
                    break;
                case 'Куртки🏂':
                    response = `Сумма заказа с учётом доставки и страховки до Москвы: ${Math.floor(((input *13)+700+150)*1.1)}₽

*В другие города цена обговаривается индивидуально*

Время доставки 13-16 дней🚢
По поводу авиа доставки🛩️  писать - @AstanakX`
                case 'Аксессуары⌚️':
                    response = `Сумма заказа с учётом доставки и страховки до Москвы: ${Math.floor(((input *13)+550+250)*1,1)}₽

*В другие города цена обговаривается индивидуально*

Время доставки 13-16 дней🚢
По поводу авиа доставки🛩️  писать - @AstanakX
                     `;  
                    break;
                default:
                    response = 'Я вас не понял🧐';
            }
            ctx.reply(response);
            ctx.reply('⬇︎⬇⬇︎',Markup.keyboard([
                ['Рассчитать ещё🧮'],
                ['Оформить заказ🧾'],
                ['В меню☞']
            ]).oneTime().resize());
            
            delete userState[ctx.from.id];
        }else {
            ctx.reply('Пожалуйста, введите корректное число.');
        }
    } 
    
})

bot.launch()
    .then(() => {
        console.log('Bot is running');
    })
    .catch((error) => {
        console.error('Error launching bot:', error);
    })  