#!/usr/bin/env zx

function formatKeycapString(keycap) {
  return `* [${chalk.yellow(keycap.name.toUpperCase())}]: ${
    keycap.vendor_link
  }`;
}

let resp = await fetch("https://strapi-bqla.onrender.com/keycaps");
if (resp.ok) {
  const keycaps = await resp.json();
  const using = keycaps.filter((keycap) => keycap.status === "using");
  const purchased = keycaps.filter((keycap) => keycap.status === "purchased");
  const storage = keycaps.filter((keycap) => keycap.status === "storage");

  console.log(chalk.blue(`\n========= Using: ${using.length} =========`));
  using.map(formatKeycapString).map((str) => console.log(str));

  console.log(chalk.red(`\n========= Storage: ${storage.length} =========`));
  storage.map(formatKeycapString).map((str) => console.log(str));

  console.log(
    chalk.green(`\n========= Purchased: ${purchased.length} =========`)
  );
  purchased.map(formatKeycapString).map((str) => console.log(str));
}
