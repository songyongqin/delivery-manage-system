import SparkMD5 from './spark-md5.min.js';

export const getMD5 = (str = "") => {
  let spark = new SparkMD5();
  spark.append(str);
  return spark.end();
}

export default file => {
  return new Promise((resolve, reject) => {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunkSize = 2 * 1024 * 1024,
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = function (e) {
      spark.append(e.target.result);
      // currentChunk++;
      currentChunk = chunks.length - 1
      if (currentChunk < chunks) {
        loadNext();
      } else {
        let messageSpark = new SparkMD5();
        messageSpark.append(file.lastModified)
        messageSpark.append(file.name)
        messageSpark.append(file.size)
        messageSpark.append(spark.end())
        resolve(messageSpark.end())
      }
    };

    fileReader.onerror = function () {
      reject("read file error")
    };

    function loadNext() {
      var start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  })
}