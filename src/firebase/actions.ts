import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

export async function uploadImage(file: File, path: string) {
  try {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return {
      response: url,
      success: true,
    };
  } catch (err: any) {
    return {
      response: err.message as string,
      success: false,
    };
  }
}
