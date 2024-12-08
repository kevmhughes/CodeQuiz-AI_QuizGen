export const categoryString = (topic) => {
  if (topic === "" || topic === undefined) {
    return (topic = "Random");
  } else if (topic === "angular") {
    return (topic = "Angular");
  } else if (topic === "cloudcomputing") {
    return (topic = "Cloud Computing");
  } else if (topic === "css") {
    return (topic = "CSS");
  } else if (topic === "datasecurity") {
    return (topic = "Data Security");
  } else if (topic === "dom") {
    return (topic = "DOM");
  } else if (topic === "express") {
    return (topic = "Express");
  } else if (topic === "html") {
    return (topic = "HTML");
  }else if (topic === "git") {
    return (topic = "Git");
  } else if (topic === "javascript-advanced") {
    return (topic = "JavaScript - Advanced");
  } else if (topic === "javascript-basics") {
    return (topic = "JavaScript - Basics");
  } else if (topic === "mongodb") {
    return (topic = "MongoDB");
  } else if (topic === "python") {
    return (topic = "Python");
  } else if (topic === "node") {
    return (topic = "Node");
  } else if (topic === "react") {
    return (topic = "React");
  } else if (topic === "testing") {
    return (topic = "Testing");
  } else if (topic === "sql") {
    return (topic = "SQL");
  } else if (topic === "typescript") {
    return (topic = "TypeScript");
  } else if (topic === "vue") {
    return (topic = "Vue");
  }
};

export default categoryString;
