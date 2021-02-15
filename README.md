# todobot

To-do Bot basit bir yapılacaklar listesi tutan bir bottur, eğer ayarladığınız emojiyi mesajınızın en başına koyarsanız ve yapacağınız şeyi yazarsanız, bot mesajınızı, ayarladığınız sunucunun ayarladığınız kanalına gönderecektir, böylece mesajınızı orada istediğiniz zaman bulabileceksiniz.

## kurulum

Önce .env_config dosyasının adını .env olarak değiştirin ve ardından istenen bilgileri eşittir işaretlerinin karşısına yazın.

- `TOKEN`: Botunuzun tokeni
- `PREFIX`: Botunuzun prefixi
- `EMOJI`: Yapılacaklar listesine eklenecek şeyin başında gelecek emoji
- `AUTHOR_ID`: Kendi idniz
- `CHANNEL_ID`: Yapılacaklar listesine ekleneceklerin gönderileceği kanalın idsi
- `GUILD_ID`: Kanalın bulunduğu sunucunun idsi

Örnek: 
```
TOKEN=ABCDEFGHIJKLMNOPRSTUVYZ
PREFIX=!
EMOJI=<:to-do:123456789123456789>
AUTHOR_ID=123456789123456789
CHANNEL_ID=123456789123456789
GUILD_ID=123456789123456789
```

Ardından konsolu açın ve bunu konsola yazın:
```
node src/app.js
```

## bazı ekran görüntüleri
![](https://huh.is-inside.me/Juj6PHic.png)

![](https://huh.is-inside.me/LmSmDzJi.png)
