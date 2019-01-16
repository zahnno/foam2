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
  name: 'TicketSummaryView',
  extends: 'foam.u2.View',
<<<<<<< HEAD
  documentation: 'Top-level ticket summary view.',
  implements: [
    'foam.mlang.Expressions'
  ],
=======

  documentation: 'Top-level ticket summary view.',

  implements: [
    'foam.mlang.Expressions'
  ],

>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
  requires: [
    'foam.support.model.Ticket',
    'foam.support.view.SummaryCard',
    'foam.support.view.TicketView',
  ],
<<<<<<< HEAD
  imports: [
    'user'
  ],
  exports: [ 'as data' ],
 
  css: `
  ^ .blue-card-title{
    width: 100px;
    height: 100px;
    border-radius: 2px;
    background-color: #59a5d5;
    display: inline-block;
  }
  ^ .Mentions { 
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.25;
    letter-spacing: 0.3px;
    text-align: center;
    color: #ffffff;
    margin-top: 30px;
    margin-bottom: 5px;
  }
  ^ .M {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.86;
    letter-spacing: 0.2px;
    text-align: center;
    color: #ffffff;
  }
  ^ .ticketdiv{
    margin: 30px 0px;
  }
  ^ .foam-support-view-SummaryCard {
    width: 170px;
  }
  `,
  messages: [
    { name: 'title',          message: 'Tickets' },
    { name: 'newLabel',      message: 'New' },
    { name: 'updatedLabel',       message: 'Updated' },
    { name: 'openLabel',       message: 'Open' },
    { name: 'pendingLabel', message: 'Pending' },
    { name: 'solvedLabel',      message: 'Solved' }
  ],
=======

  imports: [
    'user'
  ],

  exports: [ 'as data' ],
 
  css: `
    ^ {
      margin-bottom: 20px;
    }
    ^:hover{
      cursor: pointer;
    }
  `,

  messages: [
    { name: 'title',        message: 'Tickets' },
    { name: 'newLabel',     message: 'New'     },
    { name: 'updatedLabel', message: 'Updated' },
    { name: 'openLabel',    message: 'Open'    },
    { name: 'pendingLabel', message: 'Pending' },
    { name: 'solvedLabel',  message: 'Solved'  }
  ],

>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
  properties: [
    {
      name: 'dao',
      factory: function() { return this.user.tickets; }
    },
    {
      class: 'Int',
<<<<<<< HEAD
      name: 'newCount',
      value: "...",
   
    },
    {
      class: 'Int',
      name: 'updatedCount',
      value: '...'
    },
    {
      class: 'Int',
      name: 'openCount',
      value: '...'
    },
    {
      class: 'Int',
      name: 'pendingCount',
      value: '...'
    },
    {
      class: 'Int',
      name: 'solvedCount',
      value: '...'
    },
    {
      class: 'Int',
      name: 'ticketCount',
      value: '...'
    },
    
  ],
  methods: [
    function initE() {
    this.dao.on.sub(this.onDAOUpdate);    
    this.onDAOUpdate();
      this
        .addClass(this.myClass())
        .start('div')
          .start().addClass('ticketdiv')
            .start().addClass('blue-card-title')
              .start().add(this.title).addClass('Mentions').end()
                .start().add(this.ticketCount$).addClass('M').end()           
            .end()
            .tag({ class: 'foam.support.view.SummaryCard', count$: this.newCount$, status: this.newLabel })
            .tag({ class: 'foam.support.view.SummaryCard', count$: this.updatedCount$, status: this.updatedLabel })
            .tag({ class: 'foam.support.view.SummaryCard', count$: this.openCount$, status: this.openLabel })
            .tag({ class: 'foam.support.view.SummaryCard', count$: this.pendingCount$, status: this.pendingLabel })
            .tag({ class: 'foam.support.view.SummaryCard', count$: this.solvedCount$, status: this.solvedLabel })
          .end()
        .end()
    },
  ],
=======
      name: 'newCount'
    },
    {
      class: 'Int',
      name: 'updatedCount'
    },
    {
      class: 'Int',
      name: 'openCount'
    },
    {
      class: 'Int',
      name: 'pendingCount'
    },
    {
      class: 'Int',
      name: 'solvedCount'
    },
    {
      class: 'Int',
      name: 'ticketCount'
    }
  ],

  methods: [
    function initE() {
    this.dao.on.sub(this.onDAOUpdate);
    this.onDAOUpdate();

    this
      .addClass(this.myClass())
      .start().addClass('blue-card-title')
        .add(this.title)
        .start()
          .addClass('thin-align')
          .add(this.ticketCount$)
        .end()
      .end()
      .start('span')
        .tag(this.SummaryCard, {
          count$: this.newCount$,
          status: this.newLabel
        })
      .end()
      .start('span')
        .tag(this.SummaryCard, {
          count: this.updatedCount$,
          status: this.updatedLabel
        })
      .end()
      .start('span')
        .tag(this.SummaryCard, {
          count: this.openCount$,
          status: this.openLabel
        })
      .end()
      .start('span')
        .tag(this.SummaryCard, {
          count: this.pendingCount$,
          status: this.pendingLabel
        })
      .end()
      .start('span')
        .tag(this.SummaryCard, {
          count: this.solvedCount$,
          status: this.solvedLabel
        })
      .end();
    },
  ],

>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
  listeners: [
    {
      name: 'onDAOUpdate',
      isFramed: true,
      code: function() {
        var self = this;
        var newDAO = this.dao.where(this.EQ(this.Ticket.STATUS, "New"));
        newDAO.select(this.COUNT()).then(function(count) {
          self.newCount = count.value;
        });
        var updatedDAO = this.dao.where(this.EQ(this.Ticket.STATUS, "Updated"));
        updatedDAO.select(this.COUNT()).then(function(count) {
          self.updatedCount = count.value;
        });
        var openDAO = this.dao.where(this.EQ(this.Ticket.STATUS, "Open"));
        openDAO.select(this.COUNT()).then(function(count) {
          self.openCount = count.value;
        });
        var pendingDAO = this.dao.where(this.EQ(this.Ticket.STATUS, 'Pending'));
        pendingDAO.select(this.COUNT()).then(function(count) {
          self.pendingCount = count.value;
        });
        var solvedDAO = this.dao.where(this.EQ(this.Ticket.STATUS, 'Solved'));
        solvedDAO.select(this.COUNT()).then(function(count) {
          self.solvedCount = count.value;
        });
        this.dao.select(this.COUNT()).then(function(count) {
          self.ticketCount = count.value;
        });
      }
    }
  ]
});
