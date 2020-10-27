/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.u2.navigation',
  name: 'SignUp',

  documentation: `Model used for registering/creating an user.
  Hidden properties create the different functionalities for this view (Ex. coming in with a signUp token)`,

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'appConfig',
    'auth',
    'ctrl',
    'stack',
    'user'
  ],

  requires: [
    'foam.log.LogLevel',
    'foam.nanos.auth.User',
    'foam.u2.dialog.NotificationMessage'
  ],

  messages: [
    { name: 'TITLE', message: 'Create an account' },
    { name: 'FOOTER_TXT', message: 'Already have an account?' },
    { name: 'FOOTER_LINK', message: 'Sign in' },
    { name: 'ERROR_MSG', message: 'There was a problem creating your account' },
    { name: 'EMAIL_EMPTY_ERR', message: 'Please enter email' },
    { name: 'EMAIL_SYNTAX_ERR', message: 'Please enter valid email' },
    { name: 'EMAIL_AVAILABILITY_ERR', message: 'This email is taken. Please try another.' },
    { name: 'USERNAME_EMPTY_ERR', message: 'Please enter username' },
    { name: 'USERNAME_AVAILABILITY_ERR', message: 'This username is taken. Please try another.' }
  ],

  properties: [
    {
      name: 'dao_',
      hidden: true
    },
    {
      class: 'String',
      name: 'group_',
      documentation: `Group this user is going to be apart of.`,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'isLoading_',
      documentation: `Condition to synchronize code execution and user response.`,
      hidden: true
    },
    {
      class: 'String',
      name: 'token_',
      documentation: `Input to associate new user with something.`,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'disableEmail_',
      documentation: `Set this to true to disable the email input field.`,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'emailAvailable',
      documentation: `Binded property used to display email not available error.`,
      value: true,
      hidden: true
    },
    {
      class: 'EMail',
      name: 'email',
      placeholder: 'example@example.com',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.UserPropertyAvailabilityView',
          icon: 'images/checkmark-small-green.svg',
          onKey: true,
          isAvailable$: X.data.emailAvailable$,
          targetProperty: foam.nanos.auth.User.EMAIL,
          inputValidation: /\S+@\S+\.\S+/,
          restrictedCharacters: /^[^\s]$/,
          displayMode: X.data.disableEmail_ ? foam.u2.DisplayMode.DISABLED : foam.u2.DisplayMode.RW
        };
      },
      validateObj: function(email, emailAvailable) {
        // Empty Check
        if ( email.length === 0 || ! /\S+@\S+\.\S+/.test(email) ) return this.EMAIL_ERR;
        // Availability Check
        if ( ! emailAvailable ) return this.EMAIL_AVAILABILITY_ERR;
      },
      required: true
    },
    {
      class: 'Boolean',
      name: 'usernameAvailable',
      documentation: `Binded property used to display username not available error.`,
      value: true,
      hidden: true
    },
    {
      class: 'String',
      name: 'userName',
      label: 'Username',
      placeholder: 'example123',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.UserPropertyAvailabilityView',
          icon: 'images/checkmark-small-green.svg',
          onKey: true,
          isAvailable$: X.data.usernameAvailable$,
          targetProperty: foam.nanos.auth.User.USER_NAME,
          inputValidation: /^[^\s\/]+$/,
          restrictedCharacters: /^[^\s\/]$/
        };
      },
      validateObj: function(userName, usernameAvailable) {
        // Empty Check
        if ( userName.length === 0 ) return this.USERNAME_EMPTY_ERR;
        // Availability Check
        if ( ! usernameAvailable ) return this.USERNAME_AVAILABILITY_ERR;
      },
      required: true
    },
    {
      class: 'Password',
      name: 'desiredPassword',
      label: 'Password',
      view: {
        class: 'foam.u2.view.PasswordView',
        passwordIcon: true
      },
      minLength: 6
    }
  ],

  methods: [
    {
      name: 'footerLink',
      code: function(topBarShow_, param) {
        window.history.replaceState(null, null, window.location.origin);
        this.stack.push({ class: 'foam.u2.view.LoginView', mode_: 'SignIn', topBarShow_: topBarShow_, param: param }, this);
      }
    },
    {
      name: 'subfooterLink',
      code: function() {
        return;
      }
    },
    {
      name: 'updateUser',
      code: async function(x) {
        await this.finalRedirectionCall(x);
      }
    },
    {
      name: 'finalRedirectionCall',
      code: async function(x) {
        if ( this.user.emailVerified ) {
          // When a link was sent to user to SignUp, they will have already verified thier email,
          // thus thier user.emailVerified should be true and they can simply login from here.
          window.history.replaceState(null, null, window.location.origin);
          location.reload();
        } else {
          await this.auth.login(x, this.email, this.desiredPassword);
          this.stack.push({
            class: 'foam.nanos.auth.ResendVerificationEmail'
          });
        }
      }
    }
  ],

  actions: [
    {
      name: 'login',
      label: 'Get started',
      isEnabled: function(errors_, isLoading_) {
        return ! errors_ && ! isLoading_;
      },
      code: function(x) {
        this.isLoading_ = true;
        this.dao_
          .put(this.User.create({
            userName: this.userName,
            email: this.email,
            desiredPassword: this.desiredPassword,
            signUpToken: this.token_,
            group: this.group_
          }))
          .then(async (user) => {
            this.user.copyFrom(user);
            await this.updateUser(x);
          }).catch((err) => {
            this.ctrl.add(this.NotificationMessage.create({
              message: err.message || this.ERROR_MSG,
              type: this.LogLevel.ERROR
            }));
          })
          .finally(() => {
            this.isLoading_ = false;
          });
      }
    }
  ]
});
