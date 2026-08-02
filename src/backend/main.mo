import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Int "mo:core/Int";

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

  let submissions = List.empty<ContactSubmission>();

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
