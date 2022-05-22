import handlers from "../../mid/midWare";
export default async function handler(req, res) {
  await handlers(req, res);
  const { query, method } = req;

  //const api = process.env.API;
  // if method is GET
  if (method === "GET") {
    const data = await fetch(`http://ip-api.com/json`);
    const country = await data.json();
    res.status(200).json({ country });
  }
}
