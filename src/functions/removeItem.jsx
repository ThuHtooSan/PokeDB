const removeItem = (arr, item) => {
  const itemIndex = arr.indexOf(item);
  return arr.slice(0, itemIndex).concat(arr.slice(itemIndex + 1));
}

export default removeItem;