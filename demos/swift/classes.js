/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var classes = [
  'foam.blob.Blob',
  'foam.box.Box',
  'foam.box.BoxRegistry',
  'foam.box.BoxService',
  'foam.box.ClientBoxRegistry',
  'foam.box.Context',
  'foam.box.FunctionBox',
  'foam.box.HTTPBox',
  'foam.box.LogBox',
  'foam.box.Message',
  'foam.box.NullBox',
  'foam.box.RPCMessage',
  'foam.box.ReplyBox',
  'foam.box.ReturnBox',
  'foam.core.AbstractEnum',
  'foam.core.Identifiable',
  'foam.dao.AnonymousSink',
  'foam.dao.ArraySink',
  'foam.dao.ClientDAO',
  'foam.dao.ClientSink',
  'foam.dao.ManyToManyRelationshipDAO',
  'foam.dao.ManyToManyRelationshipImpl',
  'foam.dao.ReadOnlyDAO',
  'foam.dao.RelationshipDAO',
  'foam.dao.SequenceNumberDAO',
  'foam.dao.SlowDAO',
  'foam.log.LogLevel',
  'foam.mlang.ArrayConstant',
  'foam.mlang.Constant',
  'foam.mlang.predicate.Eq',
  'foam.mlang.sink.Count',
  'foam.nanos.app.Mode',
  'foam.nanos.auth.Country',
  'foam.nanos.auth.Group',
  'foam.nanos.auth.Language',
  'foam.nanos.auth.Permission',
  'foam.nanos.auth.ServiceProvider',
  'foam.nanos.auth.User',
  'foam.nanos.auth.UserUserJunction',
  'foam.nanos.demo.relationship.Course',
  'foam.nanos.demo.relationship.CourseType',
  'foam.nanos.demo.relationship.Professor',
  'foam.nanos.demo.relationship.Student',
  'foam.nanos.demo.relationship.StudentCourseJunction',
  'foam.nanos.fs.File',
  'foam.nanos.menu.Menu',
  'foam.nanos.mrac.MRACConfig',
  'foam.support.model.SupportEmail',
  'foam.support.model.Ticket',
  'foam.support.model.TicketMessage',
  'foam.swift.dao.ArrayDAO',
  'foam.swift.dao.CachingDAO',
  'foam.swift.parse.StringPStream',
  'foam.swift.type.Util',
  'foam.swift.ui.DAOTableViewSource',
  'foam.swift.ui.DetailView',
  'foam.swift.ui.FOAMUILabel',
  'foam.swift.ui.FOAMUITextField',
  'foam.swift.ui.FOAMUITextFieldInt',
  'foam.swift.ui.PropertyView',
  'foam.u2.ControllerMode',
  'foam.u2.DisplayMode',
  'foam.swift.ui.ScrollingViewController',
  'foam.u2.Visibility',
  'somepackage.TestApp',
  'somepackage.TestDetailView',
  'somepackage.TestExtended',
];

module.exports = {
  classes: classes,
}
