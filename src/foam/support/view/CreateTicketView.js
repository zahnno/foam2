<<<<<<< HEAD
=======
/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
foam.CLASS({
  package: 'foam.support.view',
  name: 'CreateTicketView',
  extends: 'foam.u2.View',

  implements: [
    'foam.mlang.Expressions'
  ],

  requires: [
    'foam.support.model.Ticket',
    'foam.support.model.TicketMessage',
    'foam.u2.PopupView',
    'foam.u2.dialog.NotificationMessage'
  ],

  imports:[
    'ctrl',
    'ticketDAO',
    'user',
    'hideSummary',
    'stack'
  ],

  exports: [
<<<<<<< HEAD
    'as data'
  ],

  css: `
  * {
    box-sizing: border-box;
  }
  .foam-support-view-CreateTicketView {
    margin-top:20px;
  }
  .div{
    margin-top: 40px;
  }
  .Rectangle-7 {
    width: 135px;
    height: 40px;
    border-radius: 2px;
    background-color: rgba(164, 179, 184, 0.1);
    box-shadow: 0 0 1px 0 rgba(9, 54, 73, 0.8);
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.86;
    letter-spacing: 0.2px;
    text-align: center;
    color: #093649;
  }
  ^ .Rectangle-8 {
    padding: 0 10px;
    border: solid 0.5px #59a5d5 !important;
    margin: 0px 2px !important;
    -webkit-box-shadow: none;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    text-align: center;
    color: #ffffff;
    float: right;
    height: 40px;
    border-radius: 2px;
    background: #59a5d5; 
  }
  ^ .label{
    height: 16px;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.2px;
    text-align: left;
    color: #093649;
  }
  .foam-u2-TextField {
    margin-bottom:20px;
    margin-top:8px;
    background-color: #ffffff;
    border: solid 1px rgba(164, 179, 184, 0.5);
  }
  .foam-u2-tag-TextArea {
    margin-top:8px;
  }
  .property-requestorEmail,.property-requestorName{
    width: 450px;
    height: 40px;
  }
  .property-message{
    width: 940px;
    height: 240px;
    border: 1px solid lightgrey;
  }
  .property-subject{
    width: 940px;
    height: 40px;
  }
  .New-Ticket {
    margin-top:30px;
    width: 186px;
    height: 20px;
    opacity: 0.6;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.3px;
    text-align: left;
    color: #093649;
  } 
  .bg2 {
    margin-top:20px;
    border-radius: 2px;
    background-color: #ffffff;
    padding: 20px;
  }
  .foam-u2-UnstyledActionView-voidDropDown{
    padding: 0px;
    float: right;
    width: 30px;
    height: 40px;
    background: #59a5d5 !important;
    -webkit-box-shadow: none !important;
    box-shadow:none !important;
    margin: 0px !important;
    border: solid 0.5px #59a5d5 !important;
  }
  .foam-u2-PopupView {
    background: #ffffff !important; 
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.2px;
    color: #093649;
    line-height: 30px;
    position: absolute; 
  }
  .foam-u2-UnstyledActionView > button {
    margin:0px;
    box-shadow:none;
    border: solid 0.5px #59a5d5;
    background-color: #59a5d5;
  }
  .popUpDropDown {
    padding: 0 !important;
    width: 170px;
    background: #ffffff;
    z-index: 10000;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.19);
  }
  .popUpDropDown > div {     
    padding: 8px 0 0 11px;
    box-sizing:border-box;
    width: 170px;
    height: 35px;  
    z-index: 10000
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: 0.2px;
    text-align: left;
    color: #093649;
  }
  .popUpDropDown > div:hover {
    background-color: rgba(89, 165, 213, 0.3);
  }
  ^ .status{
    color: white;
    display: inline-block;
    text-align: center;
    padding-top: 4px;
    font-size: 10px;
  }
  .Submit-as{
    float: left;
    margin-top:2px;
    margin-right:10px;
  }
  .SubmitButton{
    margin-top:1.5px;
    margin-right:10px;
    float: left;
  }
  .SubmitLabel {
    float:right;
    min-width: 60px;
  }
  .SubmitLabel span{
    font-size: 10px;
    position: relative;
    top: 4px;
  }
  .rname {
    margin-right:20px;
    float:left;
  }
  `,

  properties: [
=======
    'as data',
    'submitAsPopUp'
  ],

  css: `
    ^ {
      box-sizing: border-box;
    }
    ^ .actions {
      width: 970px;
      height: 40px;
      margin: 0 auto;
      padding: 20px 0 20px 0;
    }
    ^ .left-actions {
      display: inline-block;
      float: left;
    }
    ^ .right-actions {
      display: inline-block;
      float: right;
    }
    ^ .foam-support-view-CreateTicketView {
      margin-top:20px;
    }
    ^ .div{
      margin-top: 40px;
    }
    ^ .label{
      height: 16px;
      font-family: Roboto;
      font-size: 14px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: 0.2px;
      text-align: left;
      color: #093649;
      margin: 0px;
    }
    ^ .foam-u2-TextField {
      margin-bottom:20px;
      margin-top:8px;
      background-color: #ffffff;
      border: solid 1px rgba(164, 179, 184, 0.5);
    }
    ^ .foam-u2-tag-TextArea {
      margin-top:8px;
    }
    ^ .property-requestorEmail,.property-requestorName{
      width: 450px;
      height: 40px;
    }
    ^ .property-message{
      width: 940px;
      height: 240px;
      border: 1px solid lightgrey;
    }
    ^ .property-subject{
      width: 940px;
      height: 40px;
    }
    ^ .New-Ticket {
      margin-top:30px;
      width: 186px;
      height: 20px;
      opacity: 0.6;
      font-family: Roboto;
      font-size: 20px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0.3px;
      text-align: left;
      color: #093649;
    }
    ^ .bg2 {
      margin-top:20px;
      border-radius: 2px;
      background-color: #ffffff;
      padding: 20px;
    }
    ^ .popUpDropDown {
      padding: 0 !important;
      width: 165px;
      background: #ffffff;
      z-index: 10000;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.19);
    }
    ^ .popUpDropDown > div > div {
      padding: 8px 0 0 11px;
      box-sizing:border-box;
      width: 165px;
      height: 35px;
      z-index: 10000
      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: 0.2px;
      text-align: left;
      color: #093649;
    }
    ^ .popUpDropDown > div > div:hover {
      background-color: rgba(89, 165, 213, 0.3);
    }
    ^ .status{
      color: white;
      display: inline-block;
      text-align: center;
      font-size: 10px;
      line-height: 20px;
    }
    ^ .Submit-as{
      float: left;
      margin-top:2px;
      margin-right:10px;
    }
    ^ .rname {
      margin-right:20px;
      float:left;
    }
  `,

  properties: [
    'submitAsMenuBtn_',
    'submitAsPopUp',
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    {
      name: 'dao',
      factory: function() { return this.user.tickets; }
    },
    {
      class: 'String',
      name: 'requestorEmail'
    },
    {
      class: 'String',
      name: 'requestorName'
    },
    {
      class: 'String',
      name: 'subject'
    },
    {
      class: 'String',
      name: 'message',
      view: 'foam.u2.tag.TextArea'
    },
    {
      class: 'String',
      name: 'status',
      value: 'New'
    },
    {
      class: 'Int',
      name: 'ticketCount',
      value: '...'
<<<<<<< HEAD
    },
    'voidMenuBtn_',
    'voidPopUp_'
  ],

  methods: [
    function initE(){
      this.dao.on.sub(this.onDAOUpdate);    
      this.onDAOUpdate(); 
      this.SUPER();
      this.hideSummary = true;
      this
        .addClass(this.myClass())
        .start(this.DELETE_DRAFT).addClass('Rectangle-7').end()
        .start(this.VOID_DROP_DOWN, null, this.voidMenuBtn_$)
          .start({class:'foam.u2.tag.Image',data:'../../..//foam/support/images/drop_down.png'}).end()
        .end()
        .start(this.SUBMIT_TICKET).addClass('Rectangle-8')
            .start().add('Submit as').addClass('SubmitButton').end()
            .start().addClass('SubmitLabel')
              .start().addClass(this.status$).add(this.status$).end()
            .end()
        .end()
        .start().addClass('New-ticket').add('New Ticket #',this.ticketCount$).end()
      
=======
    }
  ],

  methods: [
    function initE() {
      this.hideSummary = true;

      this.dao.on.sub(this.onDAOUpdate);
      this.onDAOUpdate();

      this
        .addClass(this.myClass())
        .start().addClass('actions')
          .start().addClass('left-actions')
            .start(this.DELETE_DRAFT).end()
          .end()
          .start().addClass('right-actions')
            .start(this.SUBMIT_AS_DROP_DOWN, null, this.submitAsMenuBtn_$).end()
            .start(this.SUBMIT_AS, {
              label: this.slot(function (status) {
                return 'Submit as ' + status;
              }, this.status$)
            }).end()
          .end()
        .end()

        .start().addClass('New-ticket').add('New Ticket #', this.ticketCount$).end()

>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
        .start().addClass('bg2')
        .start()
          .start().addClass('rname')
            .start().addClass('label')
              .add('Requestor Name')
            .end()
            .start()
              .tag(this.REQUESTOR_NAME)
            .end()
          .end()
          .start().addClass('remail')
            .start().addClass('label')
<<<<<<< HEAD
              .add('Requestor Email')
=======
              .add('Requestor Email (optional)')
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
            .end()
            .start()
              .tag(this.REQUESTOR_EMAIL)
            .end()
          .end()
        .end()
          .start().addClass('label')
            .add('Subject')
          .end()
          .start()
            .tag(this.SUBJECT)
          .end()
          .start().addClass('label')
<<<<<<< HEAD
            .add('Message')
=======
            .add('Description')
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
          .end()
          .start()
            .tag(this.MESSAGE)
          .end()
        .end()
    }
  ],

  actions: [
    {
<<<<<<< HEAD
      name: 'submitTicket',
      label: '',
      code: function(){
=======
      name: 'deleteDraft',
      code: function(X) {
        this.hideSummary = false;
        X.stack.back();
      }
    },
    {
      name: 'submitAs',
      code: function (X) {
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
        var self = this;

        var ticket = this.Ticket.create({
          requestorEmail: this.requestorEmail,
          requestorName: this.requestorName,
          userId: this.user.id,
          subject: this.subject,
          status: this.status
        });

<<<<<<< HEAD
        console.log("this.user: "+ this.user);
=======
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
        this.dao.put(ticket).then(function(ticket){
          if (self.message == "") return;
          var message = self.TicketMessage.create({
            senderId: self.user.id,
            dateCreated: new Date(),
            message: self.message,
            type: 'Internal'
          });
          ticket.messages.put(message).then(function(a){
            ctrl.add(self.NotificationMessage.create({ message: 'Ticket Created!' }));
          });
        });
        this.stack.push({ class: 'foam.support.view.TicketView' });
      }
    },
    {
<<<<<<< HEAD
      name: 'deleteDraft',
      code: function(X){
        X.stack.push({ class: 'foam.support.view.TicketView'});
      }
    },
    {
      name: 'voidDropDown',
      label: '',
      code: function(X) {
        var self = this;
        if(this.voidPopUp_) {
          this.voidPopUp_ = null;
          return;
        }
        
        self.voidPopUp_ = self.PopupView.create({
          x: -140,
          y: 40,
          width: 170,
        })
        self.voidPopUp_.addClass('popUpDropDown')
        .start('div').on('click', function(){
          self.status = 'Pending'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Pending').addClass('Pending status').end()
        .end()
        .start('div').on('click', function(){
          self.status = 'New'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('New').addClass('New status').end()
        .end()
        .start('div').on('click', function(){
          self.status = 'Solved'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Solved').addClass('Solved status').end()
        .end()
        .start('div').on('click', function(){
          self.status = 'Updated'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Updated').addClass('Updated status').end()
        .end()
        .start('div').on('click', function(){
          self.status = 'Open'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Open').addClass('Open status').end()
        .end()
                 
        self.voidMenuBtn_.add(self.voidPopUp_)
      }
    }
  ],
  listeners: [
    function voidPopUp(){
      var self = this;
      self.voidPopUp_.close();
    },
=======
      name: 'submitAsDropDown',
      label: '',
      code: function(X) {
        var self = this;
        if ( this.submitAsPopUp ) {
          this.submitAsPopUp = null;
          return;
        }

        // create popup view
        this.submitAsPopUp = foam.u2.PopupView.create({
          width: 165,
          x: -137,
          y: 40
        });

        // add items
        this.submitAsPopUp.addClass('popUpDropDown')
          .add(this.slot(function (status) {
            var statuses = ['New', 'Pending', 'Open', 'Updated', 'Solved'].filter(function (status) {
              return status !== self.status;
            });

            return this.E().forEach(statuses, function (status) {
              this
                .start('div')
                .start().add('Submit as').addClass('Submit-as').end()
                .start().addClass(status).addClass('status').add(status).end()
                .on('click', function () {
                  self.status = status;
                  self.submitAsPopUp.close();
                })
                .end();
            })
          }, this.status$));

        this.submitAsMenuBtn_.add(this.submitAsPopUp);
      }
    }
  ],

  listeners: [
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    {
      name: 'onDAOUpdate',
      isFramed: true,
      code: function() {
        var self = this;
        this.dao.select(this.COUNT()).then(function(count) {
<<<<<<< HEAD
          self.ticketCount = count.value;
=======
          self.ticketCount = count.value + 1;
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
        });
      }
    }
  ]
});
