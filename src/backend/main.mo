import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";

actor {
  type ContactSubmission = {
    senderName : Text;
    senderEmail : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(sub1 : ContactSubmission, sub2 : ContactSubmission) : Order.Order {
      switch (Text.compare(sub1.senderEmail, sub2.senderEmail)) {
        case (#equal) {
          switch (Text.compare(sub1.senderName, sub2.senderName)) {
            case (#equal) {
              switch (Text.compare(sub1.message, sub2.message)) {
                case (#equal) { Int.compare(sub1.timestamp, sub2.timestamp) };
                case (order) { order };
              };
            };
            case (order) { order };
          };
        };
        case (order) { order };
      };
    };
  };

  let submissions : List.List<ContactSubmission>;
  let accessControlState : AccessControl.AccessControlState;

  include MixinAuthorization(accessControlState, null);

  // Iterator yielding (index, submission) pairs so OQL can expose a stable
  // synthetic primary key without altering the ContactSubmission type.
  func indexedSubmissions() : Iter.Iter<(Nat, ContactSubmission)> {
    let snapshot = submissions.toArray();
    var i = 0;
    object {
      public func next() : ?(Nat, ContactSubmission) {
        if (i >= snapshot.size()) { null } else {
          let pair = (i, snapshot[i]);
          i += 1;
          ?pair;
        };
      };
    };
  };

  transient let e0 = OQL.Entity.manual<(Nat, ContactSubmission)>(
    "submission",
    indexedSubmissions,
    "Submission",
    "id",
  );
  transient let e1 = OQL.Entity.payload(e0, "id", func((i, _)) = i);
  transient let e2 = OQL.Entity.payload(e1, "senderName", func((_, s)) = s.senderName);
  transient let e3 = OQL.Entity.payload(e2, "senderEmail", func((_, s)) = s.senderEmail);
  transient let e4 = OQL.Entity.payload(e3, "message", func((_, s)) = s.message);
  transient let e5 = OQL.Entity.payload(e4, "timestamp", func((_, s)) = s.timestamp);
  transient let e6 = OQL.Entity.controllerOnly(e5);
  transient let e7 = OQL.Entity.build(e6);

  include Expose({
    entities = [e7];
  });

  public shared ({ caller }) func submitContactForm(senderName : Text, senderEmail : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      senderName;
      senderEmail;
      message;
      timestamp = Time.now();
    };
    submissions.add(submission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.toArray().sort();
  };
};
