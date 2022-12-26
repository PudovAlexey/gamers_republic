async function parseToBase64(file) {
    return await new Promise(resolve => {
        var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        resolve(reader.result)
    };
    reader.onerror = function (error) {
      resolve({message: error})
    };
    })
 }

 export {
    parseToBase64
 }