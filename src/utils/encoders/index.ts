import { TError } from '@/types/index';

async function parseToBase64(
  file: File
): Promise<string | ArrayBuffer | TError> {
  return await new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      resolve({
        type: 'error',
        message: String(error),
      });
    };
  });
}

export { parseToBase64 };
