/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'BaseNotificationClientDAO',
  extends: 'foam.dao.AbstractDAO',

  properties: [
    {
      class: 'Stub',
      of: 'foam.dao.DAO',
      name: 'delegate',
      methods: [],
      notifications: [
        'put_',
        'remove_',
        'removeAll_',
        'cmd_',
        'select_',
        'listen_',
        'find_'
      ]
    }
  ]
});
