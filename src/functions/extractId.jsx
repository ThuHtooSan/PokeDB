const extractId = (url) => {
  return Number(...url.match(/(?<=\/)\d+(?=\/?$)/));
}

export default extractId;