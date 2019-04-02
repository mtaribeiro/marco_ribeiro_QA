const { remote } = require('webdriverio');

(async () => {
    const browser = await remote({
        logLevel: 'error',
        path: '/',
        capabilities: {
            browserName: 'firefox'
        }
    });
    
    await browser.url('https://www.computerhope.com/jargon/w/website.htm');

    const title = await browser.getTitle();
    console.log('Title was: ' + title);

    const lang = await $('#main-content').getValue();
    console.log(lang);


    /*const statusB = await browser.status();
    console.log ( statusB);
    const URL = await browser.getUrl();
    console.log(URL);
    */

    //var outerHTML = $('.status__text--is-active');
    //console.log(outerHTML);
    // const classAndText = $('.status__text--is-active');
    // console.log(classAndText.getText());

    await browser.deleteSession();
})().catch((e) => console.error(e));