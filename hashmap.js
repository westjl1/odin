function stringToNumber(string) {
  let hashCode = 0;
  const primeNumber = 3;
  for (let i = 0; i < string.length; i++) {
    // hashCode += string.charCodeAt(i);
    hashCode = primeNumber * hashCode + string.charCodeAt(i);
  }

  return hashCode;
}

function hash(name, surname) {
  return stringToNumber(name) + stringToNumber(surname);
}

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
    this.buckets = [...Array(this.capacity)];
  }

  hash(key) {
    let hashCode = 0;

    // const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = key.charCodeAt(i) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {}
}

const myNewHashMap = new MyHashMap();
console.log("Yep, still running");

class HashMap {
  constructor() {
    this.buckets = [[], [], []];
  }

  bucket(key) {
    let mm3Hash = murmur3(key);
    return this.buckets[mm3Hash % this.buckets.length];
  }

  entry(bucket, key) {
    for (let e of bucket) {
      if (e.key === key) {
        return e;
      }
    }
    return null;
  }

  set(key, value) {
    let b = this.bucket(key);
    let e = this.entry(b, key);
    if (e) {
      e.value = value;
      return;
    }
    b.push({ key, value });
  }

  get(key) {
    let b = this.bucket(key);
    let e = this.entry(b, key);
    if (e) {
      return e.value;
    }
    return null;
  }
}
