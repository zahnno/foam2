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
  name: 'TicketDetailView',
  extends: 'foam.u2.View',

  documentation: 'Ticket Detail View',

  requires: [
    'foam.nanos.auth.User',
    'foam.u2.PopupView',
    'foam.support.model.TicketMessage',
<<<<<<< HEAD
    'foam.nanos.notification.email.POP3Email',
    'foam.nanos.notification.email.POP3EmailService',
=======
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    'foam.support.view.ReplyView',
    
  ],

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'stack',
    'userDAO',
    'hideSummary',
<<<<<<< HEAD
    'messages',
    'pop3',
=======
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    'user'
  ],
  
  exports: [
    'as data',
    'viewData'
  ],

<<<<<<< HEAD
  properties: [
    'name',
=======
  css: `
    ^ {
      box-sizing: border-box;
    }
    ^ .actions {
      height: 40px;
      margin: 0 auto;
    }
    ^ .left-actions {
      display: inline-block;
      float: left;
    }
    ^ .right-actions {
      display: inline-block;
      float: right;
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
    ^ .Submit-as{
      float: left;
      margin-top:2px;
      margin-right:10px;
    }
    ^ .status {
      color: white;
      display: inline-block;
      text-align: center;
      padding-top: 4px;
      font-size: 10px;
    }
    ^ .header {
      text-align: left;
      color: #093649;
      margin: 30px 0 20px 0;
    }
    ^ .title {
      width: auto;
      height: 20px;
      font-family: Roboto;
      font-size: 20px;
      font-weight: 300;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0.3px;
      text-align: left;
      color: #093649;
      float:left;
      display: inline-block;
      padding-right: 20px;
    }
    ^ .generic-status {
      line-height: 1.2;
      height: 14px;
    }
    ^ .subtitle {
      opacity: 0.7;
      font-family: Roboto;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.33;
      letter-spacing: 0.2px;
      text-align: left;
      color: #093649;
      padding-top: 10px;
    }
  `,

  properties: [
    'name',
    'status',
    'messages',
    'submitAsMenuBtn_',
    'submitAsPopUp',
    {
      name: 'dao',
      factory: function () { return this.data.messages; }
    },
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    {
     name:'boolDropDown',
     value: true
    },
    {
      name:'boolViewFollowUp',
      value: false
     },
<<<<<<< HEAD
    'lbl',
    'voidMenuBtn_',
    'voidPopUp_',
    'status',
=======
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    {
      name: 'viewData',
      value: {}
    }
  ],

<<<<<<< HEAD
  css: `
  ^ {
    width: 1000px;
    margin-top: 25px;
    background-color: #edf0f5;
    display: inline-block;
  }
  ^ .foam-u2-UnstyledActionView-backAction {
    float:left;
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
  .Rectangle-9 {
    width: 135px;
    padding-left: 35px;
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
    width: 185px;
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
  .SubmitButton{
    margin-top:1.5px;
    margin-right:10px;
    float: left;
  }
  .SubmitLabel {
    float: right;
    min-width: 60px;
  }
  .Submit-as{
    float: left;
    margin-top:2px;
    margin-right:10px;
  }
  ^ .status{
    color: white;
    display: inline-block;
    text-align: center;
    padding-top: 4px;
    font-size: 10px;
  }
  ^ .Missing-Cash-Out-for {
    width: auto;
    height: 20px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.3px;
    text-align: left;
    color: #093649;
    float:left;
    display: inline-block;
    padding-right: 20px;
  }
  ^ .primarydiv{
    width: 1000px;
    height: 20px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 0.3px;
    text-align: left;
    color: #093649; 
    margin-top: 80px;    
  }
  ^ .sub-div-format {
    width: 488px;
    height: 16px;
    opacity: 0.7;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: 0.2px;
    text-align: left;
    color: #093649;
    margin-bottom: 20px;    
  }
  .SubmitLabel span{
    font-size: 10px;
    position: relative;
    top: 4px;
  }
  ^ .hide {
    display: none;
  }
  .def{
    position: relative;
    left: 20px;
  }
  ^ .followUp{
    padding: 13px 10px;
    border: solid 0.5px #59a5d5 !important;
    margin: 0px 2px !important;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    text-align: center;
    color: #ffffff;
    float: right;
    width: 135px;
    border-radius: 2px;
    background: #59a5d5;
  }
  `,

=======
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
  methods: [
    function initE(){
      var self = this;
      this.hideSummary = true;
<<<<<<< HEAD
      //format date for ui
      var formattedDate = this.formatDate(this.data.createdAt);
      this.status = this.data.status;
      this.addClass(this.myClass())
      .start()
        .start(this.BACK_ACTION).end()
        .start(this.VOID_DROP_DOWN, null, this.voidMenuBtn_$).enableClass('hide', this.status$.map(function(a){ return a == 'Solved' ? true : false; }))
          .start({class:'foam.u2.tag.Image',data:'../../..//foam/support/images/drop_down.png'}).end()
        .end()
          .start(this.SUBMIT_TICKET).addClass('Rectangle-8').enableClass('hide', this.status$.map(function(a){ return a == 'Solved' ? true : false; }))
            .start().add('Submit as').addClass('SubmitButton').end()
            .start().addClass('SubmitLabel')
              .start().addClass(this.data.status$).add(this.data.status$).end()
            .end()
          .end()
          .start().enableClass('hide', this.status$.map(function(a){ return a != 'Solved' ? true : false; }))
            .start().addClass('followUp').on('click', this.followUpSubmit)
              .add('Follow Up')
            .end()
          .end()
        .end()
        .start().addClass('primarydiv')
          .start().addClass('Missing-Cash-Out-for').add(this.data.subject + "...").end()
          .start().add(this.status).addClass('generic-status '+ this.status).end()
        .end()
        .br()
        .start().addClass('sub-div-format')
          .add("#", this.data.id, "   |    ", formattedDate.month, " ", formattedDate.date, " ", formattedDate.hours, ":", formattedDate.mins, "  |  ", this.data.requestorName, " <", this.data.requestorEmail, ">", "  |  Via support@mintchip.ca") 
        .end()
        .start().enableClass('hide', this.status$.map(function(a){ return a == 'Solved' ? true : false; }))
          .tag({ class: 'foam.support.view.ReplyView' })
        .end()
        .select(this.data.messages, function(a){
          self.tag({ class: 'foam.support.view.MessageCard', message: a })
        })
      .end()
    },

    function formatDate(date){
      var formattedDate = {
        month: date.toLocaleString("en-us", {month: "short"}),
         date: date.getDate(),
        hours: date.getHours(),
        mins: date.getMinutes()
      }
      return formattedDate;
=======
      this.status = this.data.status;

      this.dao.on.sub(this.onDAOUpdate);
      this.onDAOUpdate();

      this
        .addClass(this.myClass())
        .start().addClass('actions')
          .start().addClass('left-actions')
            .start(this.BACK_ACTION).end()
          .end()
          .start().addClass('right-actions')
            .start().show(this.status$.map(function (a) { return a !== 'Solved'; }))
              .start(this.SUBMIT_AS_DROP_DOWN, null, this.submitAsMenuBtn_$).end()
              .start(this.SUBMIT_AS, {
                label: this.slot(function (status) {
                  return 'Submit as ' + status;
                }, this.data.status$)
              }).end()
            .end()
            .start().show(this.status$.map(function (a) { return a === 'Solved'; }))
              .start(this.FOLLOW_UP).end()
            .end()
          .end()
        .end()
        .start().addClass('header')
          .start()
            .start().addClass('title').add(this.data.subject + "...").end()
            .start().addClass('generic-status').addClass(this.status).add(this.status).end()
          .end()
          .start().addClass('subtitle')
            .add("#", this.data.id, ' ', this.formatDate(this.data.createdAt), ' | ', this.data.requestorName, " <", this.data.requestorEmail, ">", "  |  Via support@mintchip.ca")
          .end()
        .end()
        .start('div')
          .start().show(this.status$.map(function (a) { return a !== 'Solved' }))
            .tag({ class: 'foam.support.view.ReplyView' })
          .end()
          .start().add(this.slot(function (messages) {
            if ( ! messages ) return;

            var self = this;
            return this.E().forEach(messages, function (message) {
              self.tag({ class: 'foam.support.view.MessageCard', message: message });
            });
          }, this.messages$)).end()
          .end()
        .end();
    },

    function formatDate(date) {
      return date.toLocaleString('en-us', { month: 'short' }) + ' ' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    }
  ],

  actions: [
    {
<<<<<<< HEAD
      name: 'submitTicket',
      label: '',
      code: function(){
=======
      name: 'backAction',
      label: 'Back',
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
        var receiverId = this.data.receiverId ? this.data.receiverId : null;
        var messageType = this.viewData.variant ? 'Internal' : 'Public';

        var message = this.TicketMessage.create({
          senderId: this.data.userId,
          receiverId: receiverId,
          dateCreated: new Date(),
          message: this.viewData.message,
          type: messageType
        });

<<<<<<< HEAD
        this.user.tickets.put(this.data).then(function(a){
          if (!a) return;
          if (self.viewData.message == "") {
            self.stack.push({ class: 'foam.support.view.TicketView' });
            return;
          }
          self.data.messages.put(message).then(function(a){
            if (!a) return;
            if( !self.data.emailId ){
              // var messageId = self.pop3.sendEmail(self.data.requestorEmail, self.data.subject, self.viewData.message)
              self.data.emailId = 2;
              self.user.tickets.put(self.data);
              self.stack.push({ class: 'foam.support.view.TicketView' });
            }
            self.stack.push({ class: 'foam.support.view.TicketView' });
          });
        });

        // if(this.viewData.variant == false && this.messages == "" && !this.data.requestorEmail){

        // }
      }
    },
    {
      name: 'backAction',
      label: 'Back',
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
          x: -155,
          y: 40,
          width: 185
        })
        self.voidPopUp_.addClass('popUpDropDown')
        .start('div').on('click', function(){
          self.data.status = 'Pending'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Pending').addClass('Pending status').end()
        .end()

        .start('div').on('click', function(){
          self.data.status = 'New'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('New').addClass('New status').end()
        .end()

        .start('div').on('click', function(){
          self.data.status = 'Solved'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Solved').addClass('Solved status').end()
        .end()

        .start('div').on('click', function(){
          self.data.status = 'Updated'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Updated').addClass('Updated status').end()
        .end()

        .start('div').on('click', function(){
          self.data.status = 'Open'
          self.voidPopUp()
        })
          .start().add('Submit as').addClass('Submit-as').end()
          .start().add('Open').addClass('Open status').end()
        .end()
                 
        self.voidMenuBtn_.add(self.voidPopUp_)
=======
        this.user.tickets.put(this.data).then(function(a) {
          if ( ! a ) return;
          if ( self.viewData.message === '' ) {
            self.stack.push({ class: 'foam.support.view.TicketView' });
            return;
          }

          self.data.messages.put(message).then(function(a) {
            if ( ! a ) return;
            if ( ! self.data.emailId ) {
              self.data.emailId = 2;
              self.user.tickets.put(self.data);
            }

            self.stack.push({ class: 'foam.support.view.TicketView' });
          });
        });
      }
    },
    {
      name: 'submitAsDropDown',
      label: '',
      code: function (X) {
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
                  self.data.status = status;
                  self.submitAsPopUp.close();
                })
                .end();
            })
          }, this.data.status$));

        this.submitAsMenuBtn_.add(this.submitAsPopUp);
      }
    },
    {
      name: 'followUp',
      code: function (X) {
        var self = this;
        this.data.status = 'Pending';

        this.user.tickets.put(this.data).then(function(a){
          if ( ! a ){
            throw new Error('No ticket created');
          }
          self.stack.push({ class: 'foam.support.view.TicketView' });
        });
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
      }
    }
  ],

  listeners: [
<<<<<<< HEAD
    function voidPopUp(){
      var self = this;
      self.voidPopUp_.close();
    },
    function followUpSubmit(){
      var self = this;
      this.data.status = 'Pending';
      self.user.tickets.put(this.data).then(function(a){
        if (!a){
          console.log('no ticket Created');
        }
        self.stack.push({ class: 'foam.support.view.TicketView' });
      })
    }
  ]
});
=======
    {
      name: 'onDAOUpdate',
      isFramed: true,
      code: function () {
        var self = this;
        this.dao.select().then(function (a) {
          self.messages = a.array;
        });
      }
    }
  ]
});
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
