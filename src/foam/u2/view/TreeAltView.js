/**
 * @license
 * Copyright 2017 FOAM contributors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.view',
  name: 'TreeAltView',
  extends: 'foam.u2.view.AltView',

  methods: [
    function init(){
      this.views = [[ { class: 'foam.u2.view.TableView' }, 'Table' ], [ { class: 'foam.u2.view.TreeView', relationship: MenuRelationship, formatter: function(){ this.add(this.data.label); } }, 'Tree'  ]]
    }
  ]
});