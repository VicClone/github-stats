import path from "path";

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
  proxy_url: process.env.REACT_APP_PROXY_URL,
  base_url: process.env.BASE_URL
};
