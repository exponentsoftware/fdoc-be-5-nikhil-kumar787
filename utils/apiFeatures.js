class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    this.query = this.query.find(queryCopy);
    return this;
  }
}

export default APIFeatures;
