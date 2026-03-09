import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data Types
  type Article = {
    id : Nat;
    title : Text;
    summary : Text;
    category : Text;
    content : Text;
    publishedAt : Int; // timestamp
  };

  type Guide = {
    id : Nat;
    title : Text;
    description : Text;
  };

  type Tool = {
    id : Nat;
    name : Text;
    description : Text;
    link : Text;
  };

  type TopicCard = {
    id : Nat;
    title : Text;
    description : Text;
  };

  type Subscriber = {
    email : Text;
    subscribedAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  module Article {
    public func compareByPublishedAtDescending(a1 : Article, a2 : Article) : Order.Order {
      if (a1.publishedAt > a2.publishedAt) { #less } else {
        if (a1.publishedAt < a2.publishedAt) { #greater } else { #equal };
      };
    };
  };

  let articles = Map.empty<Nat, Article>();
  let guides = Map.empty<Nat, Guide>();
  let tools = Map.empty<Nat, Tool>();
  let topicCards = Map.empty<Nat, TopicCard>();
  let subscribers = Map.empty<Text, Subscriber>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var nextArticleId = 1;
  var nextGuideId = 1;
  var nextToolId = 1;
  var nextTopicCardId = 1;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Seed Data
  public shared ({ caller }) func seedData() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Only admin can seed data");
    };

    // Only seed if empty
    if (topicCards.size() == 0) {
      // TopicCards
      let topicCard1 : TopicCard = {
        id = nextTopicCardId;
        title = "Personal Growth";
        description = "Mindset, discipline, and habits for peak performance";
      };
      topicCards.add(nextTopicCardId, topicCard1);
      nextTopicCardId += 1;

      let topicCard2 : TopicCard = {
        id = nextTopicCardId;
        title = "Wealth";
        description = "Financial thinking and investing principles for long-term prosperity";
      };
      topicCards.add(nextTopicCardId, topicCard2);
      nextTopicCardId += 1;

      let topicCard3 : TopicCard = {
        id = nextTopicCardId;
        title = "Lifestyle";
        description = "Design a balanced life with purpose and intention";
      };
      topicCards.add(nextTopicCardId, topicCard3);
      nextTopicCardId += 1;
    };

    if (guides.size() == 0) {
      // Guides
      let guide1 : Guide = {
        id = nextGuideId;
        title = "Ultimate Productivity Guide";
        description = "Master your time and energy to achieve more with less effort";
      };
      guides.add(nextGuideId, guide1);
      nextGuideId += 1;

      let guide2 : Guide = {
        id = nextGuideId;
        title = "Wealth Building Blueprint";
        description = "A step-by-step framework for building lasting financial freedom";
      };
      guides.add(nextGuideId, guide2);
      nextGuideId += 1;

      let guide3 : Guide = {
        id = nextGuideId;
        title = "Design Your Life System";
        description = "A holistic system to design a life aligned with your values";
      };
      guides.add(nextGuideId, guide3);
      nextGuideId += 1;
    };

    if (tools.size() == 0) {
      // Tools
      let tool1 : Tool = {
        id = nextToolId;
        name = "Notion";
        description = "All-in-one workspace for notes, tasks, and databases";
        link = "https://notion.so";
      };
      tools.add(nextToolId, tool1);
      nextToolId += 1;

      let tool2 : Tool = {
        id = nextToolId;
        name = "Readwise";
        description = "Remember what you read with spaced repetition";
        link = "https://readwise.io";
      };
      tools.add(nextToolId, tool2);
      nextToolId += 1;

      let tool3 : Tool = {
        id = nextToolId;
        name = "Tally Forms";
        description = "Simple and powerful form builder for capturing ideas and leads";
        link = "https://tally.so";
      };
      tools.add(nextToolId, tool3);
      nextToolId += 1;
    };

    if (articles.size() == 0) {
      // Articles
      let article1 : Article = {
        id = nextArticleId;
        title = "The Compound Effect: How Small Habits Build Empires";
        summary = "Discover how consistent small actions lead to massive results over time.";
        category = "Personal Growth";
        content = "Content of the article goes here...";
        publishedAt = Time.now();
      };
      articles.add(nextArticleId, article1);
      nextArticleId += 1;

      let article2 : Article = {
        id = nextArticleId;
        title = "Index Funds: The Boring Path to Wealth";
        summary = "Learn why index funds are the most reliable way to build long-term wealth.";
        category = "Wealth";
        content = "Content of the article goes here...";
        publishedAt = Time.now();
      };
      articles.add(nextArticleId, article2);
      nextArticleId += 1;

      let article3 : Article = {
        id = nextArticleId;
        title = "Morning Routines of High Performers";
        summary = "Explore the daily routines of top achievers and how you can implement them.";
        category = "Lifestyle";
        content = "Content of the article goes here...";
        publishedAt = Time.now();
      };
      articles.add(nextArticleId, article3);
      nextArticleId += 1;
    };
  };

  // Public Read Operations
  public query ({ caller }) func getArticles() : async [Article] {
    articles.values().toArray().sort(Article.compareByPublishedAtDescending);
  };

  public query ({ caller }) func getGuides() : async [Guide] {
    guides.values().toArray();
  };

  public query ({ caller }) func getTools() : async [Tool] {
    tools.values().toArray();
  };

  public query ({ caller }) func getTopicCards() : async [TopicCard] {
    topicCards.values().toArray();
  };

  // Admin Write Operations
  public shared ({ caller }) func addArticle(title : Text, summary : Text, category : Text, content : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can add articles");
    };

    let article : Article = {
      id = nextArticleId;
      title;
      summary;
      category;
      content;
      publishedAt = Time.now();
    };

    articles.add(nextArticleId, article);
    nextArticleId += 1;
  };

  public shared ({ caller }) func updateArticle(id : Nat, title : Text, summary : Text, category : Text, content : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can update articles");
    };

    switch (articles.get(id)) {
      case (null) { Runtime.trap("Article not found") };
      case (?_) {
        let updatedArticle : Article = {
          id;
          title;
          summary;
          category;
          content;
          publishedAt = Time.now();
        };
        articles.add(id, updatedArticle);
      };
    };
  };

  public shared ({ caller }) func deleteArticle(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can delete articles");
    };

    if (not articles.containsKey(id)) {
      Runtime.trap("Article not found");
    };

    articles.remove(id);
  };

  public shared ({ caller }) func addGuide(title : Text, description : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can add guides");
    };

    let guide : Guide = {
      id = nextGuideId;
      title;
      description;
    };

    guides.add(nextGuideId, guide);
    nextGuideId += 1;
  };

  public shared ({ caller }) func updateGuide(id : Nat, title : Text, description : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can update guides");
    };

    switch (guides.get(id)) {
      case (null) { Runtime.trap("Guide not found") };
      case (?_) {
        let updatedGuide : Guide = {
          id;
          title;
          description;
        };
        guides.add(id, updatedGuide);
      };
    };
  };

  public shared ({ caller }) func deleteGuide(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can delete guides");
    };

    if (not guides.containsKey(id)) {
      Runtime.trap("Guide not found");
    };

    guides.remove(id);
  };

  public shared ({ caller }) func addTool(name : Text, description : Text, link : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can add tools");
    };

    let tool : Tool = {
      id = nextToolId;
      name;
      description;
      link;
    };

    tools.add(nextToolId, tool);
    nextToolId += 1;
  };

  public shared ({ caller }) func updateTool(id : Nat, name : Text, description : Text, link : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can update tools");
    };

    switch (tools.get(id)) {
      case (null) { Runtime.trap("Tool not found") };
      case (?_) {
        let updatedTool : Tool = {
          id;
          name;
          description;
          link;
        };
        tools.add(id, updatedTool);
      };
    };
  };

  public shared ({ caller }) func deleteTool(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can delete tools");
    };

    if (not tools.containsKey(id)) {
      Runtime.trap("Tool not found");
    };

    tools.remove(id);
  };

  public shared ({ caller }) func addTopicCard(title : Text, description : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can add topic cards");
    };

    let topicCard : TopicCard = {
      id = nextTopicCardId;
      title;
      description;
    };

    topicCards.add(nextTopicCardId, topicCard);
    nextTopicCardId += 1;
  };

  public shared ({ caller }) func updateTopicCard(id : Nat, title : Text, description : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can update topic cards");
    };

    switch (topicCards.get(id)) {
      case (null) { Runtime.trap("Topic card not found") };
      case (?_) {
        let updatedTopicCard : TopicCard = {
          id;
          title;
          description;
        };
        topicCards.add(id, updatedTopicCard);
      };
    };
  };

  public shared ({ caller }) func deleteTopicCard(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Only admin can delete topic cards");
    };

    if (not topicCards.containsKey(id)) {
      Runtime.trap("Topic card not found");
    };

    topicCards.remove(id);
  };

  // Public Write Operation
  public shared ({ caller }) func addSubscriber(email : Text) : async Text {
    if (subscribers.containsKey(email)) {
      Runtime.trap("Already subscribed");
    };

    let subscriber : Subscriber = {
      email;
      subscribedAt = Time.now();
    };

    subscribers.add(email, subscriber);
    "Successfully subscribed";
  };
};
