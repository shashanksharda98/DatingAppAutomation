require('chromedriver');
let swd = require('selenium-webdriver');
let fs = require('fs');
let bldr = new swd.Builder();
let driver = bldr.forBrowser('chrome').build();

let no_of_swipes = process.argv[3];
let cred = process.argv[2];

(async function(){
    try{
        await driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 10000
        });

        let contents = await fs.promises.readFile(cred, "utf-8");
        let obj = JSON.parse(contents);

        await driver.get(obj.fburl);
        await driver.manage().window().maximize();


        let userdetail = await driver.findElement(swd.By.css('#email')); 
        let pwd = await driver.findElement(swd.By.css('#pass'));

        //console.log(userdetail.length);
        //console.log(pwd.length);
        //console.log(loginbtn.length);

        await userdetail.sendKeys(obj.un);
        await pwd.sendKeys(obj.pwd);
        let loginbtn = await driver.findElement(swd.By.css('#loginbutton'));
        await loginbtn.click();
        
        await driver.executeScript('window.open("https://bumble.com/get-started");');
        
        
        let windowhandles = await driver.getAllWindowHandles();
        await driver.switchTo().window(windowhandles[1]);
        let fbbtn = await driver.findElements(swd.By.css('.button-group__item'));
        await fbbtn[1].click();

        for(let i = 0; i < no_of_swipes; i++){

            let buttons = await driver.findElements(swd.By.css('.encounters-action__icon'));
            //console.log(buttons.length);
            await buttons[2].click();
            //console.log("clicked");
            //driver.sleep(5000);

        }

        await driver.get(obj.spotify);
        
        let spotifyun = await driver.findElement(swd.By.css('#login-username'));
        let spotifypwd = await driver.findElement(swd.By.css('#login-password'));

        await spotifyun.sendKeys(obj.unspotify);
        await spotifypwd.sendKeys(obj.pwdspotify);

        let lgbtnspotify = await driver.findElement(swd.By.css('#login-button'));
        await lgbtnspotify.click();

        
        let tabs = await driver.findElements(swd.By.css('.svelte-12h6dnj.mh-footer-primary'));

        let webplayer = await tabs[9].getAttribute('href');
        
        await driver.executeScript('window.open("' + webplayer + '");');
        
        //console.log(webplayer.toString());
        let windowhandles2 = await driver.getAllWindowHandles();
        await driver.switchTo().window(windowhandles2[2]);
        let playlists = await driver.findElements(swd.By.css('.RootlistItem__link'));
        //console.log(playlists.length);
        let playlist1 = await playlists[0].getAttribute('href');
        await driver.executeScript('window.open("' + playlist1 + '");');
        let windowhandles3 = await driver.getAllWindowHandles();
        await driver.switchTo().window(windowhandles3[3]);
        let playbtn = await driver.findElements(swd.By.css('._11f5fc88e3dec7bfec55f7f49d581d78-scss'));

        //console.log(playbtn.length);
        await playbtn[1].click();

    }catch (err){
        console.log(err);
    }
})();