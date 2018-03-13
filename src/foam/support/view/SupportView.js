foam.CLASS({
  package: 'foam.support.view',
  name: 'SupportView',
  extends: 'foam.u2.View',
  
  methods: [
    function initE(){
      this
        .addClass(this.myClass())
        .add('Replace with TicketView in menus file.')
    }
  ]
});