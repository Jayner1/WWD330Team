function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then(function(data) { return data; }); // Line 12 updated here
}

export async function findProductById(id) {
  const products = await getData();
  return products.find(function(item) { return item.Id === id; }); // Line 17 updated here
}
