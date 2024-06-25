import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";

// Function to generate a unique nine-digit barcode number
export function generateUniqueNineDigitNumber(): string {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}
// Function to generate a barcode and return it as a data URL
export function generateBarcode(value: string): string {
  const canvas = createCanvas(200, 100); // Create a canvas of desired size
  JsBarcode(canvas, value, {
    format: "CODE128",
    displayValue: true,
  });
  return canvas.toDataURL(); // Return the barcode as a data URL
}

// Function to generate nine barcodes with unique numbers
export function generateNineBarcodes(): string[] {
  const barcodes: string[] = [];
  for (let i = 0; i < 9; i++) {
    const uniqueNumber = generateUniqueNineDigitNumber(); // Generate a unique barcode number
    const barcodeDataUrl = generateBarcode(uniqueNumber);
    barcodes.push(barcodeDataUrl);
  }
  return barcodes;
}
