foam.CLASS({
  package: 'foam.support',
  name: 'Message',

  properties: [
    {
      class: 'String',
      name: 'sender'
    },
    {
      class: 'String',
      name: 'receiver'
    },
    {
      class: 'Date',
      name: 'createdAt',
      factory: function(){
        return Date.now();
      }
    }
  ]
});