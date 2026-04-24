import fs from "fs/promises";

export const deleteFileFromUploads = async (filePath: string) => {
  try {
    await fs.unlink(filePath);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Failed to delete file:", error);
    throw error;
  }
};
