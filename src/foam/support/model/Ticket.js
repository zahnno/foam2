/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.support.model',
  name: 'Ticket',

  documentation: 'Ticket Model',

  javaImports: [
    'java.util.Date'
  ],

  tableColumns: [
    'id', 'requestorEmail', 'subject', 'createdAt', 'status'
  ],
  exports: [
    'subject'
  ],
  properties: [
    {
      class: 'Long',
      name: 'id',
      visibility: foam.u2.Visibility.RO,
      label:'Ticket ID'
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
      name: 'subject',
<<<<<<< HEAD
      label:'Subject',
=======
      label: 'Subject',
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    },
    {
      class: 'Date',
      name: 'createdAt',
      visibility: foam.u2.Visibility.RO,
      label: 'Time',
<<<<<<< HEAD
      factory: function(){
          return new Date();
      },
      javaFactory: 'return new Date();',
      tableCellFormatter: function(state, obj, rel){
        if(!state) return;
        var locale = "en-us";
        var month = state.toLocaleString(locale, {month: "short"});
        var date=state.getDate();
        var year=state.getFullYear();
        this.start().add(month+" "+date+", "+year).end();
=======
      factory: function() {
          return new Date();
      },
      javaFactory: 'return new Date();',
      tableCellFormatter: function(state, obj, rel) {
        if ( ! state ) return;
        var locale = 'en-us';
        var month = state.toLocaleString(locale, { month: 'short' });
        var date = state.getDate();
        var year = state.getFullYear();
        this.start().add(month+' '+date+', '+year).end();
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
      }
    },
    {
      class: 'String',
      name: 'supportEmail'
    },
    {
      class: 'String',
      name: 'internalNote'
    },
    {
      class: 'String',
      name: 'status',
<<<<<<< HEAD
      label:'Status',
      factory: function(){
        return 'New'
      },
      tableCellFormatter: function(state, obj, rel) {
        this.start()
          .start().add(state).addClass('generic-status '+ state).end()
        .end()
=======
      label: 'Status',
      factory: function() {
        return 'New';
      },
      tableCellFormatter: function(state, obj, rel) {
        this.start()
          .start().add(state).addClass('generic-status').addClass(state).end()
        .end();
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
      }
    },
    {
      class: 'Long',
<<<<<<< HEAD
      name:'emailId'
=======
      name: 'emailId'
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    }
  ]
});

<<<<<<< HEAD
=======

foam.RELATIONSHIP({
  sourceModel: 'foam.nanos.auth.User',
  targetModel: 'foam.support.model.Ticket',
  forwardName: 'tickets',
  inverseName: 'user'
});


>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
foam.RELATIONSHIP({
  sourceModel: 'foam.support.model.Ticket',
  targetModel: 'foam.support.model.TicketMessage',
  forwardName: 'messages',
  inverseName: 'ticketId'
<<<<<<< HEAD
});
=======
});
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
