const backendApiUrl = "http://localhost:8080/api";

const routes = {
  PEMAKAI: "pemakai",
  PROVINSI: "provinsi",
  KONTRASEPSI: "kontrasepsi",
};

const methods = {
  GET: "get",
  GET_ALL: "getAll",
  REPORT: "report",
  POST: "add",
};

//api url
const apiUrl = (route, method, id = "") => `${backendApiUrl}/${route}/${method}${id && `/${id}`}`;

module.exports = { routes, methods, apiUrl };
