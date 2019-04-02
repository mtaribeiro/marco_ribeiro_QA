/**
 * Login validation for invalid users
 */

const assert = require('assert');


 /**
  * Setting environmnet
  */

// It is possible that this value cames by aurgment line, then the test will be more flexible
// right now it is a constant 
const selectedEnv = "uat";

// list of possible environmnets
const envURL = {"uat": "https://uat.ormuco.com/login"};

// configuring the field names according to the Environment
const envCredentials = { "uat" : { "login" : "username", "pw": "password"}};

// Error message according to the language select by user
const loginErrorMessage ={"PT": "Senha ou usuário incorreto.",
                    "EN": "The user or password is incorrect.",
                    "FR": "L'identifiant ou le mot de passe est erroné.",
                    "ES": "El usuario o contraseña son incorrectos.",
                    "JA": "ユーザーまたはパスワードが間違っています。",
                    "RU": "Неверное имя пользователя или пароль."};

// global variable used for all tests
var selectedLangue, languageName;

describe('checking login/password', () => {
    it('only with user name', () => {
        browser.url(envURL[selectedEnv]);
        browser.maximizeWindow();
        browser.pause(500);
        
        // language selected
        selectedLangue = $('div.lang_selected');
        languageName = selectedLangue.getText();

        $('#'+envCredentials[selectedEnv]['login']).setValue('ormuco@ormuco.com');
        $('button.button-login').click();
        browser.pause(500);

        // assert.equal(loginErrorMessage[languageName], warningMsg1);        
        assert.equal(loginErrorMessage[languageName], getErrorMessage() );

    }); 

    it('username and password', () => {

        $('#'+envCredentials[selectedEnv]['login']).setValue('ormuco@ormuco.com');
        $('#'+envCredentials[selectedEnv]['pw']).setValue('abcd1234com');

        $('button.button-login').click();
        browser.pause(500);

        assert.equal(loginErrorMessage[languageName], getErrorMessage() );


    });  
    it('ONLY password', () => {

       //  $('#'+envCredentials[selectedEnv]['login']).setValue('ormuco@ormuco.com');
        let elem = $('#'+envCredentials[selectedEnv]['login']);
        elem.clearValue();
        $('#'+envCredentials[selectedEnv]['pw']).setValue('abcd1234com');

        $('button.button-login').click();
        browser.pause(500);

        assert.equal(loginErrorMessage[languageName], getErrorMessage() );


    });  
    it('NO login and password', () => {

        //  $('#'+envCredentials[selectedEnv]['login']).setValue('ormuco@ormuco.com');
         let elem = $('#'+envCredentials[selectedEnv]['login']);
         elem.clearValue();
         let elempw = $('#'+envCredentials[selectedEnv]['pw']);
         elempw.clearValue();
 
         $('button.button-login').click();
         browser.pause(500);
 
         assert.equal(loginErrorMessage[languageName], getErrorMessage() );
 
 
     });  
});

function getErrorMessage() {
    return $('//*[@id="login_form"]/ng-form/div[3]/div[1]/div/div').getText();
}
