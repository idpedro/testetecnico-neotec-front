const API = {
  hostname: process.env.API_HOSTNAME ?? "localhost",
  port: process.env.API_PORT ?? "3333",
};
export const API_CONTANTS = {
  BASE_URL: `http://${API.hostname}:${API.port}`,
  STATIC_FILES_URL: `http://${API.hostname}:${API.port}/static`,
};
