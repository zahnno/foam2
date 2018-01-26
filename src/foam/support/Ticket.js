foam.CLASS({
  package: 'foam.support',
  name: 'Ticket',

  properties: [
    {
      class: 'Long',
      name: 'id'
    },
    {
      class: 'String',
      name: 'supportEmail'
    },
    {
      class: 'String',
      name: 'requestor'
    },
    {
      class: 'String',
      name: 'publicMessage',
      view: { class: 'foam.u2.tag.TextArea', rows: 4, cols: 100 }
    },
    {
      class: 'String',
      name: 'internalNote',
      view: { class: 'foam.u2.tag.TextArea', rows: 4, cols: 100 }
    },
    {
      class: 'String',
      name: 'subject'
    },
    {
      class: 'Date',
      name: 'createdAt',
      factory: function(){
        return Date.now();
      }
    },
    {
      class: 'String',
      name: 'status'
    }
  ]
});