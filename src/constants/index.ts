import reactLogo from "../assets/react_logo.png";
import angularLogo from "../assets/angular_logo.jpg";
import vueLogo from "../assets/vue_logo.png";
export const frameworkOptions = [
  {
    id: "angular",
    text: "Angular",
    icon:angularLogo,
  },
  {
    id: "reactjs",
    text: "React",
    icon: reactLogo
  },
  {
    text: "Vuejs",
    icon:vueLogo
  },
];
export const API_URL =  'https://hn.algolia.com/api/v1/' 
export const SEARCH_BY_DATE_URL =  `search_by_date`