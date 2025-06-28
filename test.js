module.exports = [
  {
    profile: "Kid1",
    pin: "1234",
    enabled: true,
    restrictionLevel: "medium"
  },
  {
    profile: "Kid2",
    pin: "5678",
    enabled: true, // toggle remains OFF
    restrictionLevel: "medium" // ignored
  },
  {
    profile: "Teen",
    pin: "9999",
    enabled: true,
    restrictionLevel: "strong"
  }
];
