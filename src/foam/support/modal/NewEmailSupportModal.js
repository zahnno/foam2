foam.CLASS({
  package: 'foam.support.modal',
  name: 'NewEmailSupportModal',
  extends: 'foam.u2.Controller',

  documentation:'EMAIL SUPPORT MODAL',

  requires: [
    'foam.support.modal.NewEmailSupportConfirmationModal',
    'foam.support.model.SupportEmail',
    'foam.u2.ModalHeader',
    'foam.u2.dialog.NotificationMessage',
    'foam.u2.dialog.Popup'
  ],

  imports: [
    'closeDialog',
    'ctrl',
    'supportEmailDAO',
    'user'
  ],

  exports:[
    'as data'
  ],

  css:`
    ^ {
      height: 240px;
      width: 448px;
    }
    ^ .input-wide{
      width: 408px;
      height: 40px;
      margin: 20px;
    }
    ^ .btn{
      font-weight: 100;
      font-size: 13px;
      border: none;
    }
    ^ .grey-button{
      margin: 20px;
    }
    ^ .label{
      text-align: center;
    }
    `,

    properties: [
      {
        class: 'String',
        name: 'email'
      },
      {
        class: 'Long',
        name: 'id'
      }
    ],

    messages:[
      { name:'title', message:'New Email' },
      { name:'titlelabel', message:'Input the email address you want to connect to the help desk.' },
    ],

    methods:[
      function initE(){

        this.addClass(this.myClass())
        this
        .tag(this.ModalHeader.create({
          title: 'New Email'
        }))
        .start().addClass('label') 
            .add(this.titlelabel)
        .end()
        .start(this.EMAIL).addClass('input-wide').end()
        .start(this.CLOSE_MODAL).addClass('btn').addClass('grey-button')
        .end()
          .startContext({ data : this })
        .start(this.NEXT_BUTTON).addClass('btn').addClass('blue-button')
        .end()
          .endContext()
        .end()
      }
    ], 

    actions: [
      {
        name: 'nextButton',
        label: 'Next',
        code: function(X){
          if(!this.email) return;
          var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!emailRegex.test(this.email)){
            this.add(this.NotificationMessage.create({ message: 'The email you have entered is invalid, try again.', type: 'error' })); 
            return;
          }
          var email = this.SupportEmail.create({
            email: this.email,
            userId: this.user.id
          })
          this.supportEmailDAO.put(email);
          this.ctrl.add(foam.u2.dialog.Popup.create().tag({ class: 'foam.support.modal.NewEmailSupportConfirmationModal'}));
          X.closeDialog()
        }
      },
      {
        name: 'closeModal',
        label: 'Cancel',
        code: function(X){
          X.closeDialog()
        }
      }
    ]
});