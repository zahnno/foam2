/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

package foam.nanos.auth;

import foam.core.ContextAwareSupport;
import foam.core.X;
import foam.dao.ArraySink;
import foam.dao.DAO;
import foam.dao.Sink;
import foam.mlang.MLang;
import foam.nanos.NanoService;
import foam.nanos.session.Session;
import foam.util.Email;
import foam.util.Password;
import foam.util.SafetyUtil;
import foam.nanos.session.Session;
import foam.nanos.auth.Group;
import javax.security.auth.AuthPermission;
import java.security.Permission;
import java.util.Calendar;
import java.util.List;
import foam.nanos.auth.User;
import foam.nanos.auth.AuthenticationException;

public class AgentUserAuthService
  extends    ContextAwareSupport
  implements AgentAuthService, NanoService
{
  protected DAO userDAO_;
  protected DAO groupDAO_;
  protected DAO sessionDAO_;

  public AgentUserAuthService(X x) {
    setX(x);
  }

  @Override
  public void start() {
    userDAO_     = (DAO) getX().get("localUserDAO");
    groupDAO_    = (DAO) getX().get("groupDAO");
    sessionDAO_  = (DAO) getX().get("sessionDAO");
  }

  public User authorizeTo(X x, User sudoUser) throws AuthenticationException {
    User user = (User) x.get("user");

    if ( user == null ) {
      throw new AuthenticationException();
    }

    Group group = (Group) groupDAO_.find(user.getGroup());

    if ( group == null ) {
      throw new AuthenticationException("User must exist within a group.");
    }

    Session session = x.get(Session.class);
    session.setUserId(user.getId());
    session.setContext(session.getContext().put("user", sudoUser));
    session.setContext(session.getContext().put("agent", user));
    session.setContext(session.getContext().put("group", group));
    sessionDAO_.put(session);
    
    return user;
  }
}