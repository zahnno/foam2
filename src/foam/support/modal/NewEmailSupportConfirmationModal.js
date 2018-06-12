foam.CLASS({
  package: 'foam.support.modal',
  name: 'NewEmailSupportConfirmationModal',
  extends: 'foam.u2.View',

  documentation:'EMAIL SUPPORT CONFIRMATION MODAL',

  requires: [
    'foam.u2.ModalHeader',
    'foam.u2.dialog.Popup'
  ],
  
  imports: [
    'closeDialog',
    'ctrl'
  ],

  css:`
    ^ .label {
      width: 395px;
      height: 16px;
      font-size: 12px;
      color: #093649;
      margin-left:20px;
      margin-bottom: 79px;
    }
    ^ .blue-button{
      border: none;
      background-color: #59a5d5;
      color: #ffffff;
      margin: 20px 150px;
      float: right;
      font-size: 13px;    
    }
    `,

    messages:[
      {name:'Title', message:'New Email'},
      {name:'Titlelabel', message:'Please go to the email box to validate the email address before you can connect to the help desk.'},  
    ],
        
    methods:[
      function initE(){
        this.addClass(this.myClass())
        this
        .tag(this.ModalHeader.create({
          title: this.Title
        }))
        .start().add(this.Titlelabel).addClass('label')
          .end()
          .start(this.CLOSE_MODAL).addClass('btn').addClass('blue-button')
          .end()
        .end();
      }
    ],
    
    actions: [
      {
        name: 'closeModal',
        label: 'OK',
        code: function(X){
          X.closeDialog()
        }
      }
    ]
  });