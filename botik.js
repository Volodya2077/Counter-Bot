const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
let userState = {};
bot.start((ctx) => {
    console.log(ctx.update)

    ctx.reply(`Привет,${ctx.update.message.from.first_name},рады тебя видеть у нас в магазине...🧑🏻‍💻`, Markup
        .keyboard([
            ['О нас', 'Рассчет стоимости']
        ]).oneTime().resize())
});
bot.hears('О нас', (ctx)=>{
    return ctx.reply('мы крутые🧌')
})


bot.hears('Рассчет стоимости',(ctx)=>{
    userState[ctx.from.id] = ctx.message.text
    ctx.reply('Выбирите тип товара🛍️',Markup
        .keyboard([
            ['Обувь', 'Худи/Толстовки'],
            ['шорты/футболки','Аксессуары'],
            ['В меню']
        ]).oneTime().resize())
})
bot.hears(['Обувь', 'Худи/Толстовки', 'шорты/футболки', 'Аксессуары'], (ctx) => {
    userState[ctx.from.id] = ctx.message.text; // Сохраняем состояние пользователя
    ctx.reply(`Введите сумму в юанях¥💴`);
});
bot.hears('Рассчитать ещё🧮', (ctx)=>{
    ctx.reply('Выбирите тип товара🛍️',Markup
        .keyboard([
            ['Обувь', 'Худи/Толстовки'],
            ['шорты/футболки','Аксессуары'],
            ['В меню☞']
        ]).oneTime().resize())
})
bot.hears('Оформить заказ🧾', (ctx)=>{
    ctx.reply('Для заказа пишите мне в лс @AstanakX')
})

bot.hears('В меню☞',(ctx)=>{
    console.log(ctx.update)
    ctx.reply(`Привет,${ctx.update.message.from.first_name},рады тебя видеть у нас в магазине...🧑🏻‍💻`, Markup
        .keyboard([
            ['О нас', 'Рассчет стоимости'],
        ]).oneTime().resize()
    )
})
bot.on('text', (ctx) => {
    const action = userState[ctx.from.id]; // Получаем текущее состояние
    let response;
    if (action){
        const input = parseFloat(ctx.message.text);

        if (!isNaN(input)) {
            
            switch (action) {
                case 'Обувь':
                    response = `Результат: ${((input *13)+650+300)*1,1}₽`; // Пример добавления 10
                    break;
                case 'Худи/Толстовки':
                    response = `Результат: ${((input *13)+650+200)*1,1}`; // Пример вычитания 5
                    break;
                case 'Шорты/футболки':
                    response = `Результат: ${((input *13)+650+200)*1,1}`; // Пример умножения на 2
                    break;
                case 'Аксессуары':
                    response = `Результат: ${((input *13)+650+150)*1,1}`; // Пример деления на 2
                    break;
                default:
                    response = 'Я вас не понял🧐';
            }
            ctx.reply(response);
            ctx.reply('Что хотите сделать дальше?', Markup.keyboard([
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