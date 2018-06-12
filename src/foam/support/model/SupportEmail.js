foam.CLASS({
  package: 'foam.support.model',
  name: 'SupportEmail',

  requires: [
    'foam.support.model.SupportStatus'
  ],

  properties:[
    {
      class: 'Long',
      name: 'id'
    },
    {
      class: 'String',
      name: 'email'
    },
    {
      class: 'Enum',
      of: 'foam.support.model.SupportStatus',
      name: 'status',
      factory: function(){
        return this.SupportStatus.PENDING;
      }
    },
    {
      class: 'Date',
      name: 'connectedTime'
    },
    {
      class: 'Long',
      name: 'userId'
    },
    {
      class: 'Password',
      name: 'password'
    }
  ]
});

foam.ENUM({
  package: 'foam.support.model',
  name: 'SupportStatus',

  values: [
    {
      name: 'CONNECTED',
      label: 'Connected'
    },
    {
      name: 'PENDING',
      label: 'Pending'
    },
    {
      name: 'DISABLED',
      label: 'Disabled'
    }
  ]
})