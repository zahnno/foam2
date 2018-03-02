
foam.CLASS({
  package: 'foam.gui',
  name: 'SummaryView',
  extends: 'foam.u2.View',

  documentation: 'summary view displaying 3 properties.',

  implements: [
    'foam.mlang.Expressions'
  ],

  exports: [ 'as data' ],

  css: `
  
  `,

  properties: [
    'dao'
  ],

  methods: [
    function initE() {
      this.dao.on.sub(this.onDAOUpdate);
      this.onDAOUpdate();

      this
        .addClass(this.myClass())
        .start().addClass('blue-card-title')
          .add(this.title)
          .start().addClass('thin-align').add(this.formattedPayableAmount$).end()
        .end()
        .tag({ class: 'foam.gui.SummaryCard', count$: this.overDueCount$, amount$: this.overDueAmount$, status: this.overDueLabel })
    },
  ],

  listeners: [
    {
      name: 'onDAOUpdate',
      isFramed: true,
      code: function() {
        var self = this;
        
        var payablesSumDAO = this.dao.where(
          this.NEQ(this.Invoice.STATUS, "Void")
        );

        payablesSumDAO.select(this.SUM(this.Invoice.AMOUNT)).then(function(sum){
          self.payableAmount = sum.value.toFixed(2);
        });

        var overDueDAO = this.dao.where(this.EQ(this.Invoice.STATUS, 'Overdue'));

        overDueDAO.select(this.COUNT()).then(function(count) {
          self.overDueCount = count.value;
        });
        overDueDAO.select(this.SUM(this.Invoice.AMOUNT)).then(function(sum) {
          self.overDueAmount = sum.value.toFixed(2);
        });
      }
    }
  ]
});
