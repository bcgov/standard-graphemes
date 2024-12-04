import { useEffect, useState, FormEvent } from "react";
import { Button, InlineAlert } from "@bcgov/design-system-react-components";
import { FileTrigger, Button as RacButton } from "react-aria-components";

export default function OcrUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select an image file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError(null);

      // Send the image to the /ocr endpoint
      const response = await fetch("/api/v1/confusable/ocr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOcrText(data.text); // Set OCR text result
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to perform OCR.");
    } finally {
      setLoading(false);
    }
  };

  // Clean up the preview URL when the component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Revoke the object URL to free up memory
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <strong>OCR Image Upload</strong>
      <br />
      <p>
        This optical character recognition (OCR) feature uses{" "}
        <a href="https://github.com/naptha/tesseract.js">Tesseract.js</a>, a
        JavaScript port of the{" "}
        <a href="https://github.com/tesseract-ocr/tesseract">
          Tesseract Open Source OCR Engine
        </a>
        .
      </p>
      <br />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
        }}
      >
        <Button type="submit" isDisabled={!file || loading} size="small">
          {loading ? "Processing..." : "Upload and Process"}
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <FileTrigger
            onSelect={(e) => {
              if (!e) return;
              const selectedFile = e[0];
              setFile(selectedFile);
              setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate preview URL
              setOcrText(""); // Clear previous OCR result
              setError(null); // Clear previous error
            }}
          >
            <RacButton className="bcds-react-aria-Button secondary">
              Select a file
            </RacButton>
          </FileTrigger>
          {file && <span>{file.name}</span>}
        </div>
      </form>
      <br />

      {error && <InlineAlert variant="danger">{error}</InlineAlert>}

      {ocrText && (
        <div>
          <p>
            <strong>OCR Result:</strong>
          </p>
          <div>{ocrText}</div>
        </div>
      )}

      {ocrText && previewUrl && (
        <div>
          <p>
            <strong>Image Preview:</strong>
          </p>
          <img
            src={previewUrl}
            alt="Selected preview"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}
