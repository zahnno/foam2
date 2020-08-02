/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.medusa',
  name: 'MedusaAdapterDAO',
  extends: 'foam.dao.ProxyDAO',

  implements: [
//    'foam.nanos.boot.NSpecAware',
  ],

  documentation: `Create a medusa entry for argument model.`,

  javaImports: [
    'foam.core.FObject',
    'foam.dao.DOP',
    'foam.lib.formatter.FObjectFormatter',
    'foam.lib.formatter.JSONFObjectFormatter',
    'foam.nanos.logger.PrefixLogger',
    'foam.nanos.logger.Logger',
    'foam.nanos.pm.PM',
    'foam.util.SafetyUtil'
  ],

  properties: [
    {
      name: 'nSpec',
      class: 'FObjectProperty',
      of: 'foam.nanos.boot.NSpec'
    },
    {
      name: 'medusaEntryDAO',
      class: 'FObjectProperty',
      of: 'foam.dao.DAO',
      javaFactory: 'return (foam.dao.DAO) getX().get("localMedusaEntryDAO");'
    },
    {
      name: 'clientDAO',
      class: 'FObjectProperty',
      of: 'foam.dao.DAO',
      javaFactory: `
      return new foam.nanos.medusa.ClusterClientDAO.Builder(getX())
        .setNSpec(getNSpec())
        .setDelegate(new foam.dao.NullDAO(getX(), getDelegate().getOf()))
        .build();
      `
    },
    {
      name: 'logger',
      class: 'FObjectProperty',
      of: 'foam.nanos.logger.Logger',
      visibility: 'HIDDEN',
      javaFactory: `
        return new PrefixLogger(new Object[] {
          this.getClass().getSimpleName(),
          getNSpec().getName()
        }, (Logger) getX().get("logger"));
      `
    }
  ],

  axioms: [
    {
      name: 'javaExtras',
      buildJavaClass: function(cls) {
        cls.extras.push(foam.java.Code.create({
          data: `
  protected static final ThreadLocal<FObjectFormatter> formatter_ = new ThreadLocal<FObjectFormatter>() {
    @Override
    protected JSONFObjectFormatter initialValue() {
      JSONFObjectFormatter formatter = new JSONFObjectFormatter();
      formatter.setQuoteKeys(false); // default
      formatter.setOutputShortNames(true); // default
      formatter.setOutputDefaultValues(true);
      formatter.setOutputClassNames(true); // default
      formatter.setOutputDefaultClassNames(true); // default
      formatter.setOutputReadableDates(false);
      formatter.setPropertyPredicate(new foam.lib.StoragePropertyPredicate());
      return formatter;
    }

    @Override
    public FObjectFormatter get() {
      FObjectFormatter formatter = super.get();
      formatter.reset();
      return formatter;
    }
  };
          `
        }));
      }
    }
  ],

  methods: [
    {
      documentation: `
      1. If primary mediator, then delegate to medusaAdapter, accept result.
      2. If secondary mediator, proxy to next 'server', find result.
      3. If not mediator, proxy to the next 'server', put result.`,
      name: 'put_',
      javaCode: `
      if ( obj instanceof Clusterable &&
           ! ((Clusterable) obj).getClusterable() ) {
        getLogger().debug("put", "not clusterable", obj.getProperty("id"));
        return getDelegate().put_(x, obj);
      }

      ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
      ClusterConfig config = support.getConfig(x, support.getConfigId());
      ClusterCommand cmd = null;
      if ( obj instanceof ClusterCommand ) {
        cmd = (ClusterCommand) obj;
        obj = cmd.getData();
      }

      // Primary instance - put to MDAO (delegate)
      if ( config.getIsPrimary() ) {
        if ( cmd != null ) {
          getLogger().debug("put", "primary", "cmd", obj.getClass().getSimpleName());
        } else {
          getLogger().debug("put", "primary", "put", obj.getClass().getSimpleName());
        }

        FObject old = getDelegate().find_(x, obj.getProperty("id"));
        FObject nu = getDelegate().put_(x, obj);
        String data = data(x, nu, old, DOP.PUT);
        if ( SafetyUtil.isEmpty(data) ) {
          getLogger().info("put", "primary", obj.getProperty("id"), "data", "no delta");
        } else {
          MedusaEntry entry = (MedusaEntry) submit(x, data, DOP.PUT);
          if ( cmd != null ) {
            getLogger().debug("put", "primary", obj.getProperty("id"), "setMedusaEntryId", entry.toSummary(), entry.getId().toString());
            cmd.setMedusaEntryId(entry.getId());
            cmd.setData(nu);
          }
        }
        if ( cmd != null ) {
          return cmd;
        }
        return nu;
      }

      // Not primary - pass on to next Mediator.

      FObject old = getDelegate().find_(x, obj.getProperty("id"));
      if ( old != null ) {
        String data = data(x, obj, old, DOP.PUT);
        if ( SafetyUtil.isEmpty(data) ) {
          getLogger().info("put", "client", obj.getProperty("id"), "data", "no delta");
          return obj;
        }
      }

      if ( cmd == null ) {
        cmd = new ClusterCommand(x, getNSpec().getName(), DOP.PUT, obj);
      }
      getLogger().debug("put", "client", "cmd", obj.getProperty("id"), "send");
      cmd = (ClusterCommand) getClientDAO().cmd_(x, cmd);
      getLogger().debug("put", "client", "cmd", obj.getProperty("id"), "receive", cmd.getMedusaEntryId());
      if ( config.getType() == MedusaType.MEDIATOR ) {
        MedusaEntryId id = cmd.getMedusaEntryId();
        if ( id != null ) {
          getMedusaEntryDAO().find_(x, id); // blocking
        } else {
          // TODO/REVIEW: ??
          getLogger().warning("put", "client", "cmd", obj.getProperty("id"), "MedusaEntryId not found.");
          return obj;
        }
        FObject found = getDelegate().find_(x, obj.getProperty("id"));
        if ( found == null) {
          // FIXME: In Zone 1+, it would appear the client returns before the broadcast finishes.
          getLogger().warning("put", "client", "cmd", obj.getProperty("id"), "Object not found", obj.getProperty("id"));
          return obj;
        } else {
          getLogger().debug("put", "client", "cmd", obj.getProperty("id"), "Object found");
        }
        return found;
      }

      // Fall through when not Mediator and update local MDAO (delegate).
      FObject result = cmd.getData();
      if ( result != null ) {
        getLogger().debug("put", "delegate", result.getProperty("id"));
        return getDelegate().put_(x, result);
      }
      getLogger().warning("put", obj.getProperty("id"), "result,null");
      return result;
      `
    },
    {
      name: 'remove_',
      javaCode: `
      // INCOMPLETE.
      if ( obj instanceof Clusterable &&
           ! ((Clusterable) obj).getClusterable() ) {
        return getDelegate().remove_(x, obj);
      }

      if ( obj instanceof ClusterCommand ) {
        obj = ((ClusterCommand) obj).getData();
      }

      ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
      ClusterConfig config = support.getConfig(x, support.getConfigId());
      if ( config.getIsPrimary() ) {
        getDelegate().remove_(x, obj);
        return submit(x, data(x, obj, null, DOP.REMOVE), DOP.REMOVE);
      }

      FObject result = getClientDAO().remove_(x, obj);
      if ( config.getType() == MedusaType.MEDIATOR ) {
        return result;
      }
      return getDelegate().remove_(x, result);
      `
    },
    {
      name: 'cmd_',
      javaCode: `
      getLogger().debug("cmd");
      if ( foam.dao.MDAO.GET_MDAO_CMD.equals(obj) ) {
        return this;
        // return getDelegate().cmd_(x, obj);
      }
      // if ( ClusterServerDAO.GET_CLIENT_CMD.equals(obj) ) {
      //   return this;
      //   // if ( getConfig().getIsPrimary() ) {
      //   //   getLogger().debug("cmd", "GET_CLIENT_CMD", "this");
      //   //   return this;
      //   // } else {
      //   //   return getClientDAO();
      //   // }
      // }
      if ( obj instanceof ClusterCommand ) {
        ClusterConfigSupport support = (ClusterConfigSupport) x.get("clusterConfigSupport");
        ClusterConfig config = support.getConfig(x, support.getConfigId());
        if ( config.getIsPrimary() ) {
          ClusterCommand cmd = (ClusterCommand) obj;
          getLogger().debug("cmd", "ClusterCommand", "primary");

          if ( DOP.PUT == cmd.getDop() ) {
            // cmd.setData(put_(x, cmd.getData()));
            return put_(x, cmd);
          } else if ( DOP.REMOVE == cmd.getDop() ) {
            // cmd.setData(remove_(x, cmd.getData()));
            return remove_(x, cmd);
          } else {
            getLogger().warning("Unsupported operation", cmd.getDop().getLabel());
            throw new UnsupportedOperationException(cmd.getDop().getLabel());
          }
        }
      }
      getLogger().debug("cmd", "getClientDAO");
      return getClientDAO().cmd_(x, obj);
      `
    },
    {
      name: 'data',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'obj',
          type: 'FObject'
        },
        {
          name: 'old',
          type: 'FObject'
        },
        {
          name: 'dop',
          type: 'foam.dao.DOP'
        }
      ],
      type: 'String',
      javaCode: `
      PM pm = PM.create(x, this.getOwnClassInfo(), "data");
      String data = null;
      try {
        FObjectFormatter formatter = formatter_.get();
        if ( old != null ) {
          formatter.outputDelta(old, obj);
        } else {
          formatter.output(obj);
        }
        data = formatter.builder().toString();
      } finally {
        pm.log(x);
      }
      return data;
      `
    },
    {
      name: 'submit',
      args: [
        {
          name: 'x',
          type: 'Context'
        },
        {
          name: 'data',
          type: 'String'
        },
        {
          name: 'dop',
          type: 'foam.dao.DOP'
        }
      ],
      type: 'FObject',
      javaCode: `
      PM pm = PM.create(x, this.getOwnClassInfo(), "submit");
      MedusaEntry entry = x.create(MedusaEntry.class);
      try {
        DaggerService dagger = (DaggerService) x.get("daggerService");
        entry = dagger.link(x, entry);
        // entry.setMediator(config.getName());
        entry.setNSpecName(getNSpec().getName());
        entry.setDop(dop);
        entry.setData(data);

        getLogger().debug("submit", entry.toSummary());
        entry = (MedusaEntry) getMedusaEntryDAO().put_(x, entry); // blocking
        // entry = (MedusaEntry) getMedusaEntryDAO().find_(x, entry.getId());
        return entry;
      } catch (Throwable t) {
        getLogger().error("submit", entry.toSummary(), t.getMessage(), t);
        throw t;
      } finally {
        pm.log(x);
      }
      `
    }
  ]
});
