conn = new Mongo(process.env.ATLAS_URI || "mongodb://localhost:27017");
db = conn.getDB("control_plane");

const Types = {
  Type1: "activity_type_1",
  Type2: "activity_type_2",
  Type3: "activity_type_3",
};

db.activity_records.insertMany([
  {
    uid: "8b03f80e-bc81-4e9c-8a77-3a2e8e554c69",
    name: "Activity1",
    type: Types.Type1,
    userId: "78bf0298-a898-4ed0-a6dd-e6e33001daf9",
    eventTime: new Date("1982-10-10"),
  },
  {
    uid: "0527c08f-2975-4cf8-8c25-38a240391fa2",
    name: "Activity2",
    type: Types.Type2,
    userId: "51930f68-de12-4d1d-bc51-60c17815dcc6",
    eventTime: new Date("1992-05-03"),
  },
  {
    uid: "8c4eec96-7f03-4fb5-903d-d3c74058e779",
    name: "Activity3",
    type: Types.Type3,
    userId: "4ed18622-5f9d-443f-aa10-3df8b643077e",
    eventTime: new Date("2013-12-05"),
  },
]);
