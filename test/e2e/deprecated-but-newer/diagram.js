'use strict';

function forElementToBePresent(findBy) {
  return function() {
    return browser.isElementPresent(findBy);
  };
}

var browser = protractor.getInstance();

/*
  describe('home page', function() {
  it('should have 1 body', function() {
    expect(element.all(by.css('body')).count()).toEqual(1);
  });
});
//*/

var HomePage = function() {
  this.diagramNameInput = element(by.css('#pathway-diagram'));
  this.svgEnabledRadioBtn = element(by.css("input[type='radio'][value='true']"));

  this.get = function() {
    browser.get(browser.baseUrl);
  };

  this.setDiagramName = function(name) {
    this.diagramNameInput.sendKeys(name);
  };

  this.setSvgEnabled = function() {
    this.svgEnabledRadioBtn.click();
  };
};

describe('homepage', function() {
  it('should take the user input data', function() {
    var homePage = new HomePage();
    homePage.get();

    homePage.setDiagramName('WP1');
    homePage.setSvgEnabled();
  });
});

var SignUp0 = function() {
  this.formHeader = element(by.css('#form-header'));
  this.userEmailInput = element(by.id('user-email'));
  this.userEmailConfirmInput = element(by.id('user-email-confirm'));
  this.passwordInput = element(by.id('password'));

  this.setUserEmail = function(email) {
    this.userEmailInput.sendKeys(email);
  };
  this.setUserEmailConfirm = function(email) {
    this.userEmailConfirmInput.sendKeys(email);
  };
  this.setPasswordInput = function(password) {
    this.passwordInput.sendKeys(password);
  };
};

describe('sign up page 0', function() {
  it('should take more user input data and display a header corresponding to the diagram name', function() {
    var signUp0 = new SignUp0();
    browser.findElement(by.id('create-diagram')).click();
    signUp0.setUserEmail('marylee@gmail.com');
    signUp0.setUserEmailConfirm('marylee@gmail.com');
    signUp0.setPasswordInput('truc2346kls45/maaet43');
    expect(signUp0.formHeader.getText()).toEqual("WP1, let's start creating your page: WP1.");
  });
});

// pause to allow developer to inspect console to see what's happening
thread.sleep(50000);


