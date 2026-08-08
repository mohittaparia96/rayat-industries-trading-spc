import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type ContactSubmission = {
    senderName : Text;
    senderEmail : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };

  type OldActor = {
    submissions : List.List<ContactSubmission>;
  };

  type NewActor = {
    submissions : List.List<ContactSubmission>;
    accessControlState : AccessControlState;
  };

  public func migration(old : OldActor) : NewActor {
    {
      submissions = old.submissions;
      accessControlState = {
        var adminAssigned = false;
        userRoles = Map.empty();
      };
    };
  };
};
