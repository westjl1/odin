// function stringToNumber(string) {
//   let hashCode = 0;
//   const primeNumber = 3;
//   for (let i = 0; i < string.length; i++) {
//     // hashCode += string.charCodeAt(i);
//     hashCode = primeNumber * hashCode + string.charCodeAt(i);
//   }

//   return hashCode;
// }

// function hash(name, surname) {
//   return stringToNumber(name) + stringToNumber(surname);
// }

// console.log(stringToNumber("Sara"));
// console.log(stringToNumber("raSa"));

// let map = new Map();
// map.set("key1", "I'm in key1");
// map.set("key2", "I'm in key2");

// console.log(map.get("key1"));
// console.log(map.get("key2"));
// console.log(map);

class MyHashMap {
  constructor() {
    this.load_factor = 0.75;
    this.capacity = 16;
    this.buckets = this.buildBuckets(this.capacity);
  }

  buildBuckets() {
    const retArray = Array.from({ length: this.capacity }, () => {
      return new Array();
    });
    return retArray;
  }

  checkCapacity() {
    const currentLength = this.length();

    if (currentLength >= Math.floor(this.capacity * this.load_factor)) {
      return true;
    }

    return false;
  }

  hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = key.charCodeAt(i);
    }

    return hashCode;
  }

  bucket(key) {
    const simpleHash = this.hash(key);
    const bucketIndex = simpleHash % this.capacity;

    if (bucketIndex < 0 || bucketIndex >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    const thisBucket = this.buckets[bucketIndex];
    return thisBucket;
  }

  bucketItemContent(bucket, key) {
    if (bucket && bucket.length > 0) {
      for (let obj of bucket) {
        if (obj.key == key) {
          return obj;
        }
      }
    }

    return null;
  }

  set(key, value) {
    if (this.checkCapacity()) {
      const currentEntries = this.entries();
      const newCapacity = this.capacity * 2;
      this.capacity = newCapacity;
      this.buckets = this.buildBuckets(newCapacity);
      currentEntries.forEach((entry) => {
        this.set(entry.key, entry.value);
      });
    }

    let currentBucket = this.bucket(key);
    let checkBucketItemContent = this.bucketItemContent(currentBucket, key);
    if (checkBucketItemContent) {
      checkBucketItemContent.value = value;
      return;
    }

    currentBucket.push({ key, value });
  }

  get(key) {
    let currentBucket = this.bucket(key);
    let checkBucketItemContent = this.bucketItemContent(currentBucket, key);
    if (checkBucketItemContent) {
      return checkBucketItemContent.value;
    }
    return null;
  }

  remove(key) {
    if (this.has(key)) {
      const currentBucket = this.bucket(key);

      const newBucket = currentBucket.filter((obj) => obj.key != key);

      const simpleHash = this.hash(key);
      const bucketIndex = simpleHash % this.capacity;

      if (bucketIndex < 0 || bucketIndex >= this.capacity) {
        throw new Error("Trying to access index out of bounds");
      }

      this.buckets[bucketIndex] = newBucket;
    }
  }

  clear() {
    this.buckets = this.buildBuckets();
  }

  has(key) {
    const currentBucket = this.bucket(key);
    const checkBucketItemContent = this.bucketItemContent(currentBucket, key);
    if (checkBucketItemContent) {
      return true;
    }
    return false;
  }

  length() {
    let itemCount = 0;
    this.buckets.forEach((bucket) => {
      if (bucket && bucket.length > 0) {
        bucket.forEach((item) => {
          if (item) {
            itemCount++;
          }
        });
      }
    });
    return itemCount;
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket && bucket.length > 0) {
        bucket.forEach((item) => {
          if (item.key) {
            keys.push(item.key);
          }
        });
      }
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      if (bucket && bucket.length > 0) {
        bucket.forEach((item) => {
          if (item.value) {
            values.push(item.value);
          }
        });
      }
    });
    return values;
  }

  entries() {
    let entries = [];

    this.buckets.forEach((bucket) => {
      if (bucket && bucket.length > 0) {
        bucket.forEach((item) => {
          if (item) {
            entries.push({ ...item });
          }
        });
      }
    });

    return entries;
  }
}

const myNewHashMap = new MyHashMap();
myNewHashMap.set("apple", "red");
myNewHashMap.set("banana", "yellow");
myNewHashMap.set("carrot", "orange");
myNewHashMap.set("dog", "brown");
myNewHashMap.set("elephant", "gray");
myNewHashMap.set("frog", "green");
myNewHashMap.set("grape", "purple");
myNewHashMap.set("hat", "black");
myNewHashMap.set("ice cream", "white");
myNewHashMap.set("jacket", "blue");
myNewHashMap.set("kite", "pink");
myNewHashMap.set("lion", "golden");

myNewHashMap.set("apple", "green");

myNewHashMap.set("moon", "silver");

myNewHashMap.remove("dog");

// console.log(myNewHashMap.has("cat"));

// console.log(myNewHashMap.length());
// console.log(myNewHashMap.keys());
// console.log(myNewHashMap.values());
console.log(myNewHashMap.entries());

myNewHashMap.clear();

console.log(myNewHashMap.entries());

console.log("Yep, still running");
