export const categoryString = (topic) => {
  switch (topic) {
    case "":
    case undefined:
      return "Random";
    case "angular":
      return "Angular";
    case "cloudcomputing":
      return "Cloud Computing";
    case "css":
      return "CSS";
    case "dom":
      return "DOM";
    case "express":
      return "Express";
    case "html":
      return "HTML";
    case "git":
      return "Git";
    case "javascript":
    case "javascript-advanced":
    case "javascript-basics":
      return "JavaScript";
    case "mongodb":
      return "MongoDB";
    case "mysql":
      return "MySQL";
    case "other":
      return "Other";
    case "php":
      return "PHP";
    case "python":
      return "Python";
    case "node":
    case "node-js":
    case "nodejs":
      return "Node";
    case "react":
    case "reactjs":
      return "React";
    case "rest-api":
      return "REST API";
    case "testing":
      return "Testing";
    case "sql":
      return "SQL";
    case "typescript":
      return "TypeScript";
    case "vue":
      return "Vue";
    default:
      return "Random";
  }
};

export default categoryString;
