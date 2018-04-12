import SparkMD5 from 'spark-md5'

export const getMD5 = (value: string | number) => {
  const spark = new SparkMD5()
  spark.append(value)
  return spark.end()
}

export const getFileMD5 = (file: File) => new Promise((resolve, reject) => {
  let blobSlice = File.prototype.slice,
    chunkSize = 2 * 1024 * 1024,
    chunks = Math.ceil(file.size / chunkSize),
    currentChunk = 0,
    spark = new SparkMD5.ArrayBuffer(),
    fileReader = new FileReader();

  fileReader.onload = function (e: any) {
    spark.append(e.target.result)
    currentChunk++
    if (currentChunk < chunks) {
      loadNext();
    } else {
      resolve(spark.end())
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