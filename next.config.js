module.exports = {
  async redirects() {
    return [
      {
        source: "/youtube",
        destination: "https://www.youtube.com/channel/UCQGq3OYhoZJrlRaemSCe6Zg",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/futurebrian_/",
        permanent: true,
      },
      {
        source: "/twitch",
        destination: "https://www.twitch.tv/futurebrian",
        permanent: true,
      },
    ];
  },
};
