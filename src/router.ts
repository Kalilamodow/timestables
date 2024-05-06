import loadMenu from "./app/menu";
import loadApp from "./app/app";

loadMenu((min, max, lock) => {
  loadApp(min, max, lock);
});
