export const PRIOTITYSTYELS = {
  high: "rgb(220 38 38)",
  medium: "rgb(202 138 4)",
  low: "rgb(37 99 235)",
};

export const TASK_TYPE = {
  todo: "rgb(37 99 235)",
  "in progress": "rgb(202 138 4)",
  completed: "rgb(22 163 74)",
};

export const BGS = [
  "rgb(37 99 235)",
  "rgb(202 138 4)",
  "rgb(220 38 38)",
  "rgb(22 163 74)",
];

export function getNameFirstLetter(name) {
  return name.charAt(0).toUpperCase();
}
